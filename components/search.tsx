"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon, X, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useOnClickOutside } from "@/lib/hooks"
import { useLanguage } from "@/lib/language-context"

interface SearchResult {
  id: string
  name: string
  symbol: string
  market_cap_rank: number
  large?: string
  thumb?: string
}

export default function Search() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { t } = useLanguage()

  useOnClickOutside(searchRef, () => setIsOpen(false))

  useEffect(() => {
    const searchCoins = async () => {
      if (!query.trim() || query.length < 2) {
        setResults([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`)

        if (!response.ok) {
          throw new Error("Search request failed")
        }

        const data = await response.json()

        if (data.coins && Array.isArray(data.coins)) {
          setResults(data.coins.slice(0, 8)) // Limit to 8 results
        } else {
          setResults([])
        }
      } catch (err) {
        console.error("Search error:", err)
        setError(t("app.error"))
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    // Debounce search to avoid too many requests
    const timeoutId = setTimeout(() => {
      searchCoins()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query, t])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsOpen(value.trim().length > 0)
  }

  const handleClear = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Navigate to the first result on Enter if there are results
    if (e.key === "Enter" && results.length > 0) {
      e.preventDefault()
      router.push(`/coin/${results[0].id}`)
      setIsOpen(false)
    }
  }

  return (
    <div ref={searchRef} className="relative w-full md:w-64">
      <div className="relative">
        <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder={t("app.search.placeholder")}
          className="pl-8 pr-8"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.trim() && setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {query && (
          <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-2 py-0" onClick={handleClear}>
            <X className="h-4 w-4" />
            <span className="sr-only">Clear</span>
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-background shadow-lg">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">{t("app.loading")}</span>
            </div>
          ) : error ? (
            <div className="p-4 text-sm text-destructive">{error}</div>
          ) : results.length > 0 ? (
            <ul>
              {results.map((coin) => (
                <li key={coin.id} className="border-b last:border-0">
                  <Link
                    href={`/coin/${coin.id}`}
                    className="flex items-center p-3 hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="h-8 w-8 mr-3 rounded-full overflow-hidden bg-background flex items-center justify-center">
                      {coin.thumb ? (
                        <Image src={coin.thumb || "/placeholder.svg"} alt={coin.name} width={32} height={32} />
                      ) : (
                        <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-bold text-xs">{coin.symbol.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{coin.name}</div>
                      <div className="text-xs text-muted-foreground">{coin.symbol.toUpperCase()}</div>
                    </div>
                    {coin.market_cap_rank && (
                      <div className="text-xs font-medium rounded-full px-2 py-1 bg-primary/10 text-primary">
                        #{coin.market_cap_rank}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : query.length >= 2 ? (
            <div className="p-4 text-sm text-muted-foreground">{t("app.no.results")}</div>
          ) : (
            <div className="p-4 text-sm text-muted-foreground">{t("app.search.placeholder")}</div>
          )}
        </div>
      )}
    </div>
  )
}

