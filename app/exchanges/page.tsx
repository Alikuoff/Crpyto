"use client"

import { getExchanges } from "@/lib/api"
import ExchangeList from "@/components/exchange-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ExchangesPage() {
  const { t } = useLanguage()
  const [exchangesData, setExchangesData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const data = await getExchanges()
      setExchangesData(data || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-80 mb-2" />
        <Skeleton className="h-5 w-full max-w-2xl mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("exchanges.title")}</h1>
        <p className="text-muted-foreground">{t("exchanges.subtitle")}</p>
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>{t("exchanges.about.title")}</CardTitle>
          <CardDescription>{t("exchanges.about.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{t("exchanges.about.text")}</p>
        </CardContent>
      </Card>

      <ExchangeList exchanges={exchangesData} />
    </div>
  )
}

