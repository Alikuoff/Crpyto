import { getSearchResults } from "@/lib/api"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Search Results | Crypto Market",
  description: "Search for cryptocurrencies, exchanges, and more",
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q || ""
  const searchResults = query ? await getSearchResults(query) : null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Market
          </Button>
        </Link>

        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground">
          {query ? `Showing results for "${query}"` : "Enter a search term to find cryptocurrencies"}
        </p>
      </div>

      {!query && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              Use the search bar above to find cryptocurrencies, exchanges, and more.
            </p>
          </CardContent>
        </Card>
      )}

      {query && !searchResults && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Loading search results...</p>
          </CardContent>
        </Card>
      )}

      {searchResults && (
        <div className="space-y-8">
          {searchResults.coins && searchResults.coins.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Cryptocurrencies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {searchResults.coins.map((coin: any) => (
                  <Link href={`/coin/${coin.id}`} key={coin.id}>
                    <Card className="h-full transition-all hover:shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 mr-3 rounded-full overflow-hidden bg-background">
                            {coin.thumb ? (
                              <Image src={coin.thumb || "/placeholder.svg"} alt={coin.name} width={40} height={40} />
                            ) : (
                              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-primary font-bold text-xs">{coin.symbol.charAt(0)}</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{coin.name}</h3>
                            <p className="text-xs text-muted-foreground">{coin.symbol.toUpperCase()}</p>
                          </div>
                          {coin.market_cap_rank && (
                            <div className="ml-auto text-xs font-medium rounded-full px-2 py-1 bg-primary/10 text-primary">
                              #{coin.market_cap_rank}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {searchResults.exchanges && searchResults.exchanges.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Exchanges</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {searchResults.exchanges.map((exchange: any) => (
                  <Card key={exchange.id} className="h-full transition-all hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 mr-3 rounded-full overflow-hidden bg-background">
                          {exchange.thumb ? (
                            <Image
                              src={exchange.thumb || "/placeholder.svg"}
                              alt={exchange.name}
                              width={40}
                              height={40}
                            />
                          ) : (
                            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-primary font-bold text-xs">{exchange.name.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{exchange.name}</h3>
                          <a
                            href={exchange.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline"
                          >
                            Visit
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {(!searchResults.coins || searchResults.coins.length === 0) &&
            (!searchResults.exchanges || searchResults.exchanges.length === 0) && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No results found for "{query}". Try a different search term.</p>
                </CardContent>
              </Card>
            )}
        </div>
      )}
    </div>
  )
}

