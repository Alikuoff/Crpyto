"use client"

import { Card, CardContent } from "@/components/ui/card"
import { formatNumber, formatPercent } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, DollarSign, BarChart3, PieChart } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface MarketStatsProps {
  globalData?: any
}

export default function MarketStats({ globalData }: MarketStatsProps) {
  const { t } = useLanguage()

  // Check if we have valid data
  const hasData =
    globalData &&
    globalData.data &&
    typeof globalData.data.total_market_cap === "object" &&
    typeof globalData.data.total_volume === "object" &&
    typeof globalData.data.market_cap_percentage === "object"

  // Default values if data is missing
  const marketCap = hasData ? globalData.data.total_market_cap.usd : 0
  const volume = hasData ? globalData.data.total_volume.usd : 0
  const btcDominance = hasData ? globalData.data.market_cap_percentage.btc : 0
  const marketCapChange = hasData ? globalData.data.market_cap_change_percentage_24h_usd : 0

  const stats = [
    {
      title: t("home.market.cap"),
      value: formatNumber(marketCap, "currency"),
      change: marketCapChange,
      icon: DollarSign,
    },
    {
      title: t("home.volume"),
      value: formatNumber(volume, "currency"),
      icon: BarChart3,
    },
    {
      title: t("home.btc.dominance"),
      value: formatPercent(btcDominance),
      icon: PieChart,
    },
  ]

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                {stat.change !== undefined && (
                  <div className={`flex items-center text-sm ${stat.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {stat.change >= 0 ? (
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-4 w-4" />
                    )}
                    {formatPercent(Math.abs(stat.change))}
                  </div>
                )}
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

