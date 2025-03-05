"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MarketTable from "@/components/market-table"
import { useLanguage } from "@/lib/language-context"

interface MobileTabsOrDropdownProps {
  coinsData: any[]
}

export default function MobileTabsOrDropdown({ coinsData }: MobileTabsOrDropdownProps) {
  const [activeTab, setActiveTab] = useState("market-cap")
  const [isMobile, setIsMobile] = useState(false)
  const { t } = useLanguage()

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial value
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Get sorted coins based on active tab
  const getSortedCoins = () => {
    if (!coinsData) return []

    switch (activeTab) {
      case "market-cap":
        return [...coinsData].sort(
          (a, b) => (a.market_cap_rank || Number.POSITIVE_INFINITY) - (b.market_cap_rank || Number.POSITIVE_INFINITY),
        )
      case "volume":
        return [...coinsData].sort((a, b) => (b.total_volume || 0) - (a.total_volume || 0))
      case "gainers":
        return [...coinsData]
          .filter((coin) => coin.price_change_percentage_24h !== null)
          .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      case "losers":
        return [...coinsData]
          .filter((coin) => coin.price_change_percentage_24h !== null)
          .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
      default:
        return coinsData
    }
  }

  // Get description based on active tab
  const getTabDescription = () => {
    switch (activeTab) {
      case "market-cap":
        return t("top.crypto.market.cap.description")
      case "volume":
        return t("top.crypto.volume.description")
      case "gainers":
        return t("top.crypto.gainers.description")
      case "losers":
        return t("top.crypto.losers.description")
      default:
        return ""
    }
  }

  // Mobile dropdown view
  if (isMobile) {
    return (
      <div>
        <Select value={activeTab} onValueChange={handleTabChange}>
          <SelectTrigger className="mb-4">
            <SelectValue placeholder={t("top.crypto.rankings")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="market-cap">{t("top.crypto.by.market.cap")}</SelectItem>
            <SelectItem value="volume">{t("top.crypto.by.volume")}</SelectItem>
            <SelectItem value="gainers">{t("top.crypto.top.gainers")}</SelectItem>
            <SelectItem value="losers">{t("top.crypto.top.losers")}</SelectItem>
          </SelectContent>
        </Select>

        <div className="mb-4 text-sm text-muted-foreground">{getTabDescription()}</div>

        <MarketTable coins={getSortedCoins()} />
      </div>
    )
  }

  // Desktop tabs view
  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="market-cap">{t("top.crypto.by.market.cap")}</TabsTrigger>
        <TabsTrigger value="volume">{t("top.crypto.by.volume")}</TabsTrigger>
        <TabsTrigger value="gainers">{t("top.crypto.top.gainers")}</TabsTrigger>
        <TabsTrigger value="losers">{t("top.crypto.top.losers")}</TabsTrigger>
      </TabsList>

      <TabsContent value="market-cap">
        <div className="mb-4 text-sm text-muted-foreground">{t("top.crypto.market.cap.description")}</div>
        <MarketTable coins={getSortedCoins()} />
      </TabsContent>

      <TabsContent value="volume">
        <div className="mb-4 text-sm text-muted-foreground">{t("top.crypto.volume.description")}</div>
        <MarketTable coins={getSortedCoins()} />
      </TabsContent>

      <TabsContent value="gainers">
        <div className="mb-4 text-sm text-muted-foreground">{t("top.crypto.gainers.description")}</div>
        <MarketTable coins={getSortedCoins()} />
      </TabsContent>

      <TabsContent value="losers">
        <div className="mb-4 text-sm text-muted-foreground">{t("top.crypto.losers.description")}</div>
        <MarketTable coins={getSortedCoins()} />
      </TabsContent>
    </Tabs>
  )
}

