"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatNumber, formatPercent } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function CoinDetails({ data }: { data: any }) {
  const { t } = useLanguage()

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-full overflow-hidden bg-background">
            <Image src={data.image.large || "/placeholder.svg"} alt={data.name} width={48} height={48} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{data.name}</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary">{data.symbol.toUpperCase()}</Badge>
              <Badge variant="outline">#{data.market_cap_rank || "—"}</Badge>
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t("coin.price")}</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold">{formatNumber(data.market_data.current_price.usd, "currency")}</p>
                  <div
                    className={`inline-flex items-center ${
                      data.market_data.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {data.market_data.price_change_percentage_24h >= 0 ? (
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-4 w-4" />
                    )}
                    {formatPercent(Math.abs(data.market_data.price_change_percentage_24h))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t("coin.market.cap")}</p>
                  <p className="font-medium">{formatNumber(data.market_data.market_cap.usd, "currency")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t("coin.24h.volume")}</p>
                  <p className="font-medium">{formatNumber(data.market_data.total_volume.usd, "currency")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t("coin.circulating.supply")}</p>
                  <p className="font-medium">
                    {formatNumber(data.market_data.circulating_supply)} {data.symbol.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t("coin.total.supply")}</p>
                  <p className="font-medium">
                    {data.market_data.total_supply
                      ? `${formatNumber(data.market_data.total_supply)} ${data.symbol.toUpperCase()}`
                      : "∞"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">{t("coin.all.time.high")}</p>
                <div className="flex items-center justify-between">
                  <p className="font-medium">{formatNumber(data.market_data.ath.usd, "currency")}</p>
                  <div
                    className={`text-sm ${
                      data.market_data.ath_change_percentage.usd >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {formatPercent(data.market_data.ath_change_percentage.usd)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex flex-wrap gap-2 mb-4">
          {data.categories?.slice(0, 5).map((category: string, index: number) => (
            <Badge key={index} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t("coin.price.change.24h")}</p>
                <p
                  className={`font-medium ${
                    data.market_data.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {formatPercent(data.market_data.price_change_percentage_24h)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t("coin.price.change.7d")}</p>
                <p
                  className={`font-medium ${
                    data.market_data.price_change_percentage_7d >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {formatPercent(data.market_data.price_change_percentage_7d)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t("coin.price.change.30d")}</p>
                <p
                  className={`font-medium ${
                    data.market_data.price_change_percentage_30d >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {formatPercent(data.market_data.price_change_percentage_30d)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t("coin.price.change.1y")}</p>
                <p
                  className={`font-medium ${
                    data.market_data.price_change_percentage_1y >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {formatPercent(data.market_data.price_change_percentage_1y)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t("coin.low.24h")}</p>
                <p className="font-medium">{formatNumber(data.market_data.low_24h.usd, "currency")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t("coin.high.24h")}</p>
                <p className="font-medium">{formatNumber(data.market_data.high_24h.usd, "currency")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-2">{t("coin.website")}</p>
              {data.links?.homepage?.[0] ? (
                <a
                  href={data.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm sm:text-base break-all"
                >
                  {data.links.homepage[0].replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              ) : (
                <p>{t("coin.not.available")}</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-2">{t("coin.explorer")}</p>
              {data.links?.blockchain_site?.[0] ? (
                <a
                  href={data.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm sm:text-base break-all"
                >
                  {data.links.blockchain_site[0].replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              ) : (
                <p>{t("coin.not.available")}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

