"use client"

import Image from "next/image"
import { formatNumber } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/lib/language-context"

interface ExchangeListProps {
  exchanges: any[]
}

export default function ExchangeList({ exchanges }: ExchangeListProps) {
  const { t } = useLanguage()

  if (!exchanges || exchanges.length === 0) {
    return (
      <div className="text-center py-8">
        <p>{t("app.error")}</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">{t("market.rank")}</TableHead>
            <TableHead>{t("market.name")}</TableHead>
            <TableHead className="text-right">{t("exchanges.trust.score")}</TableHead>
            <TableHead className="text-right">24h Volume (BTC)</TableHead>
            <TableHead className="text-right hidden md:table-cell">{t("exchanges.country")}</TableHead>
            <TableHead className="text-right hidden lg:table-cell">{t("exchanges.year.established")}</TableHead>
            <TableHead className="text-right hidden lg:table-cell">{t("exchanges.website")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exchanges.map((exchange) => (
            <TableRow key={exchange.id}>
              <TableCell className="font-medium">{exchange.trust_score_rank}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="h-8 w-8 mr-3 rounded-full overflow-hidden bg-background flex items-center justify-center">
                    {exchange.image ? (
                      <Image src={exchange.image || "/placeholder.svg"} alt={exchange.name} width={32} height={32} />
                    ) : (
                      <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-primary font-bold text-xs">{exchange.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{exchange.name}</div>
                    {exchange.centralized === false && (
                      <Badge variant="outline" className="text-xs">
                        DEX
                      </Badge>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  <div className={`h-4 w-8 rounded-full mr-2 ${getTrustScoreColor(exchange.trust_score)}`}></div>
                  <span>{exchange.trust_score}/10</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatNumber(exchange.trade_volume_24h_btc, "decimal")}
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">{exchange.country || "—"}</TableCell>
              <TableCell className="text-right hidden lg:table-cell">{exchange.year_established || "—"}</TableCell>
              <TableCell className="text-right hidden lg:table-cell">
                {exchange.url ? (
                  <a
                    href={exchange.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    <span className="mr-1">{t("exchanges.visit")}</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  "—"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function getTrustScoreColor(score: number): string {
  if (score >= 8) return "bg-green-500"
  if (score >= 6) return "bg-yellow-500"
  return "bg-red-500"
}

