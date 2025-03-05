"use client"

import { getCoins } from "@/lib/api"
import Link from "next/link"
import Image from "next/image"
import { formatNumber, formatPercent } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownRight, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"

export default function CoinList() {
  const { t } = useLanguage()
  const [coinsData, setCoinsData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const data = await getCoins()

        if (data && Array.isArray(data) && data.length > 0) {
          setCoinsData(data)
          setError(null)
        } else {
          console.warn("Received empty or invalid data from getCoins")
          setCoinsData([])
          setError(t("app.error"))
        }
      } catch (err) {
        console.error("Error fetching coins:", err)
        setCoinsData([])
        setError(t("app.error"))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [t])

  // If we're loading, show a skeleton UI
  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">{t("home.top.by.market.cap")}</h2>
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  // If we have an error or no data, show an error message
  if (error || !coinsData || coinsData.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">{t("home.top.by.market.cap")}</h2>

        <Alert variant="warning" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{t("home.api.limit.warning")}</AlertDescription>
        </Alert>

        <div className="rounded-lg border overflow-hidden mb-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">{t("market.rank")}</TableHead>
                <TableHead>{t("market.name")}</TableHead>
                <TableHead className="text-right">{t("market.price")}</TableHead>
                <TableHead className="text-right">{t("market.24h.change")}</TableHead>
                <TableHead className="text-right hidden md:table-cell">{t("market.market.cap")}</TableHead>
                <TableHead className="text-right hidden lg:table-cell">{t("market.volume")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-4" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Skeleton className="h-8 w-8 mr-3 rounded-full" />
                        <div>
                          <Skeleton className="h-4 w-24 mb-1" />
                          <Skeleton className="h-3 w-12" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-20 ml-auto" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4 w-16 ml-auto" />
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">
                      <Skeleton className="h-4 w-24 ml-auto" />
                    </TableCell>
                    <TableCell className="text-right hidden lg:table-cell">
                      <Skeleton className="h-4 w-24 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center">
          <Link href="/coins">
            <Button variant="outline">{t("home.view.all.coins")}</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t("home.top.by.market.cap")}</h2>
      <div className="rounded-lg border overflow-hidden mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">{t("market.rank")}</TableHead>
              <TableHead>{t("market.name")}</TableHead>
              <TableHead className="text-right">{t("market.price")}</TableHead>
              <TableHead className="text-right">{t("market.24h.change")}</TableHead>
              <TableHead className="text-right hidden md:table-cell">{t("market.market.cap")}</TableHead>
              <TableHead className="text-right hidden lg:table-cell">{t("market.volume")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coinsData.slice(0, 10).map((coin) => (
              <TableRow key={coin.id}>
                <TableCell className="font-medium">{coin.market_cap_rank}</TableCell>
                <TableCell>
                  <Link href={`/coin/${coin.id}`} className="flex items-center">
                    <div className="h-8 w-8 mr-3 rounded-full overflow-hidden bg-background">
                      <Image src={coin.image || "/placeholder.svg"} alt={coin.name} width={32} height={32} />
                    </div>
                    <div>
                      <div className="font-medium">{coin.name}</div>
                      <div className="text-xs text-muted-foreground">{coin.symbol.toUpperCase()}</div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-right font-medium">{formatNumber(coin.current_price, "currency")}</TableCell>
                <TableCell className="text-right">
                  <div
                    className={`inline-flex items-center ${
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
                </TableCell>
                <TableCell className="text-right hidden md:table-cell">
                  {formatNumber(coin.market_cap, "currency")}
                </TableCell>
                <TableCell className="text-right hidden lg:table-cell">
                  {formatNumber(coin.total_volume, "currency")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center">
        <Link href="/coins">
          <Button variant="outline">{t("home.view.all.coins")}</Button>
        </Link>
      </div>
    </div>
  )
}

