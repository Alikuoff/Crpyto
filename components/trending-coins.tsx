"use client"

import { getTrendingCoins } from "@/lib/api"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { formatPercent } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"

export default function TrendingCoins() {
  const { t } = useLanguage()
  const [trendingData, setTrendingData] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      const data = await getTrendingCoins()
      setTrendingData(data)
    }

    fetchData()
  }, [])

  // If we couldn't get trending data, show a message
  if (!trendingData || !trendingData.coins || trendingData.coins.length === 0) {
    return (
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-primary" />
            {t("home.trending.coins")}
          </h2>
        </div>

        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{t("home.trending.unavailable")}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center">
          <TrendingUp className="mr-2 h-6 w-6 text-primary" />
          {t("home.trending.coins")}
        </h2>
        <Link href="/trending" className="text-sm text-primary hover:underline">
          {t("app.view.more")}
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingData.coins.slice(0, 4).map((item: any) => {
          const coin = item.item
          return (
            <Link href={`/coin/${coin.id}`} key={coin.id}>
              <Card className="h-full transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 mr-3 rounded-full overflow-hidden bg-background">
                        <Image src={coin.small || "/placeholder.svg"} alt={coin.name} width={40} height={40} />
                      </div>
                      <div>
                        <h3 className="font-medium">{coin.name}</h3>
                        <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                      </div>
                    </div>
                    <div className="text-xs font-medium rounded-full px-2 py-1 bg-primary/10 text-primary">
                      #{coin.market_cap_rank || "N/A"}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-lg font-bold">
                      {coin.price_btc ? (coin.price_btc * 1000).toFixed(8) : "N/A"} BTC
                    </p>
                    <div
                      className={`flex items-center text-sm ${
                        coin.price_btc_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {coin.price_btc_change_percentage_24h >= 0 ? (
                        <ArrowUpRight className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="mr-1 h-4 w-4" />
                      )}
                      {coin.price_btc_change_percentage_24h
                        ? formatPercent(Math.abs(coin.price_btc_change_percentage_24h))
                        : "N/A"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

