"use client"

import { getCoinData, getCoinMarketChart } from "@/lib/api"
import { CoinDetails } from "@/components/coin-details"
import { PriceChart } from "@/components/price-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card } from "@/components/ui/card"

export default function CoinPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage()
  const [coinData, setCoinData] = useState<any>(null)
  const [marketChart, setMarketChart] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const [coinDataResult, marketChartResult] = await Promise.allSettled([
          getCoinData(params.id),
          getCoinMarketChart(params.id, 7),
        ])

        // Handle coin data result
        if (coinDataResult.status === "fulfilled" && coinDataResult.value) {
          setCoinData(coinDataResult.value)
        } else {
          console.error(
            "Failed to fetch coin data:",
            coinDataResult.status === "rejected" ? coinDataResult.reason : "No data returned",
          )
          // Set a minimal fallback data structure
          setCoinData({
            id: params.id,
            name: params.id.charAt(0).toUpperCase() + params.id.slice(1),
            symbol: params.id.substring(0, 3),
            market_data: {
              current_price: { usd: 0 },
              price_change_percentage_24h: 0,
              price_change_percentage_7d: 0,
              price_change_percentage_30d: 0,
              price_change_percentage_1y: 0,
              market_cap: { usd: 0 },
              total_volume: { usd: 0 },
              circulating_supply: 0,
              total_supply: 0,
              ath: { usd: 0 },
              ath_change_percentage: { usd: 0 },
              low_24h: { usd: 0 },
              high_24h: { usd: 0 },
            },
            image: { large: "/placeholder.svg?height=64&width=64" },
            description: { en: "Data temporarily unavailable" },
            categories: ["cryptocurrency"],
            links: {
              homepage: ["#"],
              blockchain_site: ["#"],
            },
          })
        }

        // Handle market chart result
        if (marketChartResult.status === "fulfilled" && marketChartResult.value) {
          setMarketChart(marketChartResult.value)
        } else {
          console.error(
            "Failed to fetch market chart:",
            marketChartResult.status === "rejected" ? marketChartResult.reason : "No data returned",
          )
          // Set fallback chart data
          setMarketChart({
            prices: Array(168)
              .fill(0)
              .map((_, i) => [Date.now() - (168 - i) * 3600 * 1000, 100 * (1 + Math.sin(i / 10) * 0.1)]),
            total_volumes: Array(168)
              .fill(0)
              .map((_, i) => [Date.now() - (168 - i) * 3600 * 1000, 10000000 * (0.8 + Math.random() * 0.4)]),
          })
        }
      } catch (error) {
        console.error("Error fetching coin data:", error)
        // Set minimal fallback data
        setCoinData({
          id: params.id,
          name: params.id.charAt(0).toUpperCase() + params.id.slice(1),
          symbol: params.id.substring(0, 3),
          market_data: {
            current_price: { usd: 0 },
            price_change_percentage_24h: 0,
            price_change_percentage_7d: 0,
            price_change_percentage_30d: 0,
            price_change_percentage_1y: 0,
            market_cap: { usd: 0 },
            total_volume: { usd: 0 },
            circulating_supply: 0,
            total_supply: 0,
            ath: { usd: 0 },
            ath_change_percentage: { usd: 0 },
            low_24h: { usd: 0 },
            high_24h: { usd: 0 },
          },
          image: { large: "/placeholder.svg?height=64&width=64" },
          description: { en: "Data temporarily unavailable" },
          categories: ["cryptocurrency"],
          links: {
            homepage: ["#"],
            blockchain_site: ["#"],
          },
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Skeleton className="h-8 w-32 mb-4" />
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!loading && (!coinData || !marketChart)) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Link href="/">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t("app.back")}
          </Button>
        </Link>

        <Alert variant="warning" className="mb-8">
          <AlertCircle className="h-5 w-5 mr-2" />
          <AlertDescription>
            <p className="font-medium">{t("app.error")}</p>
            <p className="text-sm mt-1">{t("app.api.limit.warning")}</p>
          </AlertDescription>
        </Alert>

        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Data Temporarily Unavailable</h2>
          <p className="mb-6">We're experiencing issues connecting to our data provider. Please try again later.</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </Card>
      </div>
    )
  }

  if (!coinData) {
    return <div className="container mx-auto px-4 py-16">Coin not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t("app.back")}
          </Button>
        </Link>

        <CoinDetails data={coinData} />
      </div>

      <Tabs defaultValue="chart" className="mt-6 sm:mt-8">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="chart">{t("coin.price.chart")}</TabsTrigger>
          <TabsTrigger value="info">{t("coin.information")}</TabsTrigger>
        </TabsList>
        <TabsContent value="chart" className="mt-4">
          <PriceChart data={marketChart} coinId={params.id} />
        </TabsContent>
        <TabsContent value="info">
          <div className="mt-4 space-y-4 bg-card p-4 sm:p-6 rounded-lg">
            <h3 className="text-xl font-semibold">
              {t("coin.about")} {coinData.name}
            </h3>
            <div
              className="prose prose-sm sm:prose dark:prose-invert max-w-none overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: coinData.description?.en || t("coin.no.description") }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

