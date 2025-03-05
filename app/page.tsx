"use client"

import Hero from "@/components/hero"
import TrendingCoins from "@/components/trending-coins"
import CoinList from "@/components/coin-list"
import MarketStats from "@/components/market-stats"
import { getGlobalData } from "@/lib/api"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"

export default function Home() {
  const { t } = useLanguage()
  const [globalData, setGlobalData] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      const data = await getGlobalData()
      setGlobalData(data)
    }

    fetchData()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <Hero />

      {/* Show API status message if we're hitting rate limits */}
      {!globalData && (
        <Alert variant="warning" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{t("home.api.limit.warning")}</AlertDescription>
        </Alert>
      )}

      <MarketStats globalData={globalData} />
      <TrendingCoins />
      <CoinList />
    </div>
  )
}

