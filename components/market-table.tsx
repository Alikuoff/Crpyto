"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatNumber, formatPercent } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownRight, ChevronUp, ChevronDown, Search, ExternalLink, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

type SortKey = "market_cap_rank" | "current_price" | "price_change_percentage_24h" | "market_cap" | "total_volume"
type SortDirection = "asc" | "desc"

interface MarketTableProps {
  coins: any[]
}

export default function MarketTable({ coins }: MarketTableProps) {
  const { t } = useLanguage()
  const [sortKey, setSortKey] = useState<SortKey>("market_cap_rank")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")
  const [favorites, setFavorites] = useState<string[]>([])

  // Detect if we're on a small screen
  const detectScreenSize = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768 ? "cards" : "table"
    }
    return "table" // Default to table for SSR
  }

  // Set initial view mode based on screen size
  useState(() => {
    setViewMode(detectScreenSize())

    // Update view mode when window is resized
    const handleResize = () => {
      setViewMode(detectScreenSize())
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  })

  if (!coins || coins.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">{t("app.error")}</div>
  }

  // Toggle favorite status
  const toggleFavorite = (coinId: string) => {
    setFavorites((prev) => (prev.includes(coinId) ? prev.filter((id) => id !== coinId) : [...prev, coinId]))
  }

  // Filter coins based on search query
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort coins based on sort key and direction
  const sortedCoins = [...filteredCoins].sort((a, b) => {
    let aValue = a[sortKey]
    let bValue = b[sortKey]

    // Handle null values
    if (aValue === null) aValue = sortDirection === "asc" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY
    if (bValue === null) bValue = sortDirection === "asc" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY

    // Sort direction
    const modifier = sortDirection === "asc" ? 1 : -1

    return (aValue < bValue ? -1 : 1) * modifier
  })

  // Paginate coins
  const totalPages = Math.ceil(sortedCoins.length / perPage)
  const paginatedCoins = sortedCoins.slice((page - 1) * perPage, page * perPage)

  // Handle sort
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
  }

  // Render sort indicator
  const renderSortIndicator = (key: SortKey) => {
    if (sortKey !== key) return null

    return sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
  }

  // Toggle view mode (table or cards)
  const toggleViewMode = () => {
    setViewMode(viewMode === "table" ? "cards" : "table")
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <div className="w-full md:w-64 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("app.search.placeholder")}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setPage(1) // Reset to first page on search
            }}
            className="pl-10 bg-background border-primary/20 focus:border-primary"
          />
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-sm text-muted-foreground">{t("market.show")}</span>
          <Select
            value={perPage.toString()}
            onValueChange={(value) => {
              setPerPage(Number.parseInt(value))
              setPage(1) // Reset to first page when changing items per page
            }}
          >
            <SelectTrigger className="w-20 border-primary/20">
              <SelectValue placeholder="20" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleViewMode}
            className="hidden md:flex border-primary/20 hover:bg-primary/5"
          >
            {viewMode === "table" ? t("market.card.view") : t("market.table.view")}
          </Button>
        </div>
      </div>

      {/* Table View (Default for larger screens) */}
      {viewMode === "table" && (
        <div className="rounded-xl border border-primary/10 overflow-hidden mb-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="w-[80px] cursor-pointer" onClick={() => handleSort("market_cap_rank")}>
                    <div className="flex items-center">
                      {t("market.rank")} {renderSortIndicator("market_cap_rank")}
                    </div>
                  </TableHead>
                  <TableHead>{t("market.name")}</TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => handleSort("current_price")}>
                    <div className="flex items-center justify-end">
                      {t("market.price")} {renderSortIndicator("current_price")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-right cursor-pointer"
                    onClick={() => handleSort("price_change_percentage_24h")}
                  >
                    <div className="flex items-center justify-end">
                      {t("market.24h.change")} {renderSortIndicator("price_change_percentage_24h")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-right hidden md:table-cell cursor-pointer"
                    onClick={() => handleSort("market_cap")}
                  >
                    <div className="flex items-center justify-end">
                      {t("market.market.cap")} {renderSortIndicator("market_cap")}
                    </div>
                  </TableHead>
                  <TableHead
                    className="text-right hidden lg:table-cell cursor-pointer"
                    onClick={() => handleSort("total_volume")}
                  >
                    <div className="flex items-center justify-end">
                      {t("market.volume")} {renderSortIndicator("total_volume")}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCoins.length > 0 ? (
                  paginatedCoins.map((coin) => (
                    <TableRow key={coin.id} className="hover:bg-muted/30">
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.preventDefault()
                            toggleFavorite(coin.id)
                          }}
                        >
                          <Star
                            className={`h-4 w-4 ${favorites.includes(coin.id) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                          />
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium">{coin.market_cap_rank || "—"}</TableCell>
                      <TableCell>
                        <Link href={`/coin/${coin.id}`} className="flex items-center group">
                          <div className="h-8 w-8 mr-3 rounded-full overflow-hidden bg-background border border-border group-hover:border-primary transition-colors">
                            <Image
                              src={coin.image || "/placeholder.svg?height=32&width=32"}
                              alt={coin.name}
                              width={32}
                              height={32}
                            />
                          </div>
                          <div>
                            <div className="font-medium group-hover:text-primary transition-colors">{coin.name}</div>
                            <div className="text-xs text-muted-foreground">{coin.symbol.toUpperCase()}</div>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatNumber(coin.current_price, "currency")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full ${
                            coin.price_change_percentage_24h >= 0
                              ? "text-green-500 bg-green-500/10"
                              : "text-red-500 bg-red-500/10"
                          }`}
                        >
                          {coin.price_change_percentage_24h >= 0 ? (
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="mr-1 h-3 w-3" />
                          )}
                          {formatPercent(Math.abs(coin.price_change_percentage_24h))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right hidden md:table-cell">
                        {formatNumber(coin.market_cap, "currency")}
                      </TableCell>
                      <TableCell className="text-right hidden lg:table-cell">
                        {formatNumber(coin.total_volume, "currency")}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      {t("app.no.results")} {t("market.try.different.search")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Card View (for mobile and tablet or when toggled) */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {paginatedCoins.length > 0 ? (
            paginatedCoins.map((coin) => (
              <Link href={`/coin/${coin.id}`} key={coin.id}>
                <Card className="h-full hover:shadow-md transition-all duration-300 border-primary/10 overflow-hidden group">
                  <CardContent className="p-4 relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 absolute top-2 right-2 opacity-70 group-hover:opacity-100"
                      onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite(coin.id)
                      }}
                    >
                      <Star
                        className={`h-4 w-4 ${favorites.includes(coin.id) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                      />
                    </Button>

                    <div className="flex items-center">
                      <div className="h-10 w-10 mr-3 rounded-full overflow-hidden bg-background border border-border group-hover:border-primary transition-colors">
                        <Image
                          src={coin.image || "/placeholder.svg?height=40&width=40"}
                          alt={coin.name}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div>
                        <div className="font-medium group-hover:text-primary transition-colors">{coin.name}</div>
                        <div className="text-xs text-muted-foreground">{coin.symbol.toUpperCase()}</div>
                      </div>
                      <div className="ml-auto text-sm font-medium bg-muted/50 px-2 py-1 rounded-full">
                        #{coin.market_cap_rank || "—"}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
                        <div className="text-xs text-muted-foreground mb-1">{t("market.price")}</div>
                        <div className="font-medium">{formatNumber(coin.current_price, "currency")}</div>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
                        <div className="text-xs text-muted-foreground mb-1">{t("market.24h.change")}</div>
                        <div
                          className={`flex items-center text-sm ${
                            coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {coin.price_change_percentage_24h >= 0 ? (
                            <ArrowUpRight className="mr-1 h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="mr-1 h-4 w-4" />
                          )}
                          {formatPercent(Math.abs(coin.price_change_percentage_24h))}
                        </div>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
                        <div className="text-xs text-muted-foreground mb-1">{t("market.market.cap")}</div>
                        <div className="font-medium text-sm">{formatNumber(coin.market_cap, "currency")}</div>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-lg border border-border/50">
                        <div className="text-xs text-muted-foreground mb-1">{t("market.volume")}</div>
                        <div className="font-medium text-sm">{formatNumber(coin.total_volume, "currency")}</div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <div className="text-xs text-primary flex items-center group-hover:underline">
                        {t("market.view.details")} <ExternalLink className="h-3 w-3 ml-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-muted-foreground border rounded-lg">
              {t("app.no.results")} {t("market.try.different.search")}
            </div>
          )}
        </div>
      )}

      {/* Pagination - Responsive design */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/30 p-4 rounded-xl border border-primary/10">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            {t("market.showing")} {(page - 1) * perPage + 1} {t("market.to")}{" "}
            {Math.min(page * perPage, filteredCoins.length)} {t("market.of")} {filteredCoins.length}{" "}
            {t("market.results")}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="hidden sm:inline-flex border-primary/20 hover:bg-primary/5"
            >
              {t("market.first")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="border-primary/20 hover:bg-primary/5"
            >
              {t("market.previous")}
            </Button>
            <span className="flex items-center px-3 py-1 bg-primary/10 rounded-md text-sm font-medium">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="border-primary/20 hover:bg-primary/5"
            >
              {t("market.next")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="hidden sm:inline-flex border-primary/20 hover:bg-primary/5"
            >
              {t("market.last")}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

