"use client"

import { getCoins } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import MobileTabsOrDropdown from "@/components/mobile-tabs-or-dropdown"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function CoinsPage() {
  const { t } = useLanguage()
  const [coinsData, setCoinsData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const data = await getCoins(1, 250) // Get more coins for better filtering
      setCoinsData(data || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-32 mb-4" />
        <Skeleton className="h-10 w-80 mb-2" />
        <Skeleton className="h-5 w-full max-w-2xl mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t("app.back")}
          </Button>
        </Link>

        <h1 className="text-3xl font-bold mb-2">{t("top.crypto.title")}</h1>
        <p className="text-muted-foreground">{t("top.crypto.subtitle")}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("top.crypto.rankings")}</CardTitle>
          <CardDescription>{t("top.crypto.rankings.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <MobileTabsOrDropdown coinsData={coinsData} />
        </CardContent>
      </Card>

      <div className="mt-8 bg-card border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">{t("top.crypto.understanding")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">{t("top.crypto.market.cap.title")}</h3>
            <p className="text-muted-foreground mb-4">{t("top.crypto.market.cap.text")}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">{t("top.crypto.volume.title")}</h3>
            <p className="text-muted-foreground mb-4">{t("top.crypto.volume.text")}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">{t("top.crypto.price.change.title")}</h3>
            <p className="text-muted-foreground mb-4">{t("top.crypto.price.change.text")}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">{t("top.crypto.circulating.supply.title")}</h3>
            <p className="text-muted-foreground mb-4">{t("top.crypto.circulating.supply.text")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

