import { getCoins, getGlobalData } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MarketTable from "@/components/market-table"
import MarketStats from "@/components/market-stats"

export const metadata = {
  title: "Cryptocurrency Market | Crypto Market",
  description: "Explore the cryptocurrency market with real-time prices, market caps, and more",
}

export default async function MarketPage() {
  const [coinsData, globalData] = await Promise.all([getCoins(1, 100), getGlobalData()])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Cryptocurrency Market</h1>
        <p className="text-muted-foreground">
          Track prices, market caps, and trading volumes for thousands of cryptocurrencies
        </p>
      </div>

      <MarketStats globalData={globalData} />

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
            <CardDescription>Cryptocurrency prices, market cap, volume, and more</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
                <TabsTrigger value="losers">Top Losers</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <MarketTable coins={coinsData} />
              </TabsContent>

              <TabsContent value="gainers">
                <MarketTable
                  coins={
                    coinsData
                      ? [...coinsData]
                          .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
                          .slice(0, 20)
                      : []
                  }
                />
              </TabsContent>

              <TabsContent value="losers">
                <MarketTable
                  coins={
                    coinsData
                      ? [...coinsData]
                          .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
                          .slice(0, 20)
                      : []
                  }
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

