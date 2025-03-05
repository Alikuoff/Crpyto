import { type NextRequest, NextResponse } from "next/server"

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const coinId = searchParams.get("coinId")
  const days = searchParams.get("days") || "7"

  if (!coinId) {
    return NextResponse.json({ error: "Missing coinId parameter" }, { status: 400 })
  }

  try {
    // Add a small delay to avoid hitting rate limits too quickly
    await new Promise((resolve) => setTimeout(resolve, 500))

    const response = await fetch(`${COINGECKO_API_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "CryptoMarket/1.0",
      },
      cache: "force-cache", // Use cache to reduce API calls
    })

    if (!response.ok) {
      // If we get a 401 or 429, it's likely a rate limit issue
      if (response.status === 401 || response.status === 429) {
        return NextResponse.json({ error: "API rate limit exceeded. Please try again later." }, { status: 429 })
      }

      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching chart data:", error)
    return NextResponse.json({ error: "Failed to fetch chart data. Please try again later." }, { status: 500 })
  }
}

