// CoinGecko API endpoints
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3"

// Cache duration in seconds
const CACHE_DURATION = {
  SHORT: 60 * 5, // 5 minutes
  MEDIUM: 60 * 30, // 30 minutes
  LONG: 60 * 60 * 6, // 6 hours
}

// Fallback data for when API is unavailable
const FALLBACK_DATA = {
  // Fallback for coins/markets endpoint
  markets: [
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      current_price: 48000,
      market_cap: 950000000000,
      market_cap_rank: 1,
      total_volume: 25000000000,
      price_change_percentage_24h: 2.5,
      circulating_supply: 19000000,
    },
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      current_price: 2800,
      market_cap: 340000000000,
      market_cap_rank: 2,
      total_volume: 15000000000,
      price_change_percentage_24h: 1.8,
      circulating_supply: 120000000,
    },
    {
      id: "tether",
      symbol: "usdt",
      name: "Tether",
      image: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
      current_price: 1,
      market_cap: 95000000000,
      market_cap_rank: 3,
      total_volume: 50000000000,
      price_change_percentage_24h: 0.1,
      circulating_supply: 95000000000,
    },
    {
      id: "binancecoin",
      symbol: "bnb",
      name: "BNB",
      image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
      current_price: 380,
      market_cap: 58000000000,
      market_cap_rank: 4,
      total_volume: 1500000000,
      price_change_percentage_24h: -0.5,
      circulating_supply: 153000000,
    },
    {
      id: "solana",
      symbol: "sol",
      name: "Solana",
      image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
      current_price: 120,
      market_cap: 52000000000,
      market_cap_rank: 5,
      total_volume: 2000000000,
      price_change_percentage_24h: 3.2,
      circulating_supply: 430000000,
    },
    {
      id: "ripple",
      symbol: "xrp",
      name: "XRP",
      image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
      current_price: 0.5,
      market_cap: 28000000000,
      market_cap_rank: 6,
      total_volume: 1000000000,
      price_change_percentage_24h: -1.2,
      circulating_supply: 56000000000,
    },
    {
      id: "cardano",
      symbol: "ada",
      name: "Cardano",
      image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
      current_price: 0.4,
      market_cap: 14000000000,
      market_cap_rank: 7,
      total_volume: 500000000,
      price_change_percentage_24h: 0.8,
      circulating_supply: 35000000000,
    },
    {
      id: "dogecoin",
      symbol: "doge",
      name: "Dogecoin",
      image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
      current_price: 0.08,
      market_cap: 11000000000,
      market_cap_rank: 8,
      total_volume: 600000000,
      price_change_percentage_24h: 1.5,
      circulating_supply: 140000000000,
    },
    {
      id: "polkadot",
      symbol: "dot",
      name: "Polkadot",
      image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
      current_price: 6.5,
      market_cap: 8500000000,
      market_cap_rank: 9,
      total_volume: 300000000,
      price_change_percentage_24h: -0.7,
      circulating_supply: 1300000000,
    },
    {
      id: "shiba-inu",
      symbol: "shib",
      name: "Shiba Inu",
      image: "https://assets.coingecko.com/coins/images/11939/large/shiba.png",
      current_price: 0.00001,
      market_cap: 6000000000,
      market_cap_rank: 10,
      total_volume: 200000000,
      price_change_percentage_24h: 2.1,
      circulating_supply: 589000000000000,
    },
  ],
  global: {
    data: {
      active_cryptocurrencies: 10000,
      total_market_cap: {
        usd: 2500000000000,
      },
      total_volume: {
        usd: 150000000000,
      },
      market_cap_percentage: {
        btc: 45,
        eth: 18,
      },
      market_cap_change_percentage_24h_usd: 0.5,
    },
  },
  market_chart: {
    prices: Array(168)
      .fill(0)
      .map((_, i) => [
        Date.now() - (168 - i) * 3600 * 1000,
        100 * (1 + Math.sin(i / 10) * 0.1), // Generate sine wave pattern
      ]),
    total_volumes: Array(168)
      .fill(0)
      .map((_, i) => [Date.now() - (168 - i) * 3600 * 1000, 10000000 * (0.8 + Math.random() * 0.4)]),
    market_caps: Array(168)
      .fill(0)
      .map((_, i) => [Date.now() - (168 - i) * 3600 * 1000, 1000000000 * (0.9 + Math.random() * 0.2)]),
  },
  trending: {
    coins: [
      {
        item: {
          id: "bitcoin",
          name: "Bitcoin",
          symbol: "BTC",
          thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
          small: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
          market_cap_rank: 1,
          price_btc: 1,
          price_btc_change_percentage_24h: 0,
        },
      },
      {
        item: {
          id: "ethereum",
          name: "Ethereum",
          symbol: "ETH",
          thumb: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
          small: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
          market_cap_rank: 2,
          price_btc: 0.06,
          price_btc_change_percentage_24h: 1.2,
        },
      },
      {
        item: {
          id: "solana",
          name: "Solana",
          symbol: "SOL",
          thumb: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png",
          small: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
          market_cap_rank: 5,
          price_btc: 0.0025,
          price_btc_change_percentage_24h: 3.5,
        },
      },
      {
        item: {
          id: "binancecoin",
          name: "BNB",
          symbol: "BNB",
          thumb: "https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png",
          small: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
          market_cap_rank: 4,
          price_btc: 0.008,
          price_btc_change_percentage_24h: -0.3,
        },
      },
    ],
  },
  exchanges: [
    {
      id: "binance",
      name: "Binance",
      year_established: 2017,
      country: "Cayman Islands",
      url: "https://www.binance.com",
      image: "https://assets.coingecko.com/markets/images/52/small/binance.jpg",
      trust_score: 10,
      trust_score_rank: 1,
      trade_volume_24h_btc: 500000,
    },
    {
      id: "coinbase",
      name: "Coinbase Exchange",
      year_established: 2012,
      country: "United States",
      url: "https://www.coinbase.com",
      image: "https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png",
      trust_score: 10,
      trust_score_rank: 2,
      trade_volume_24h_btc: 120000,
    },
    {
      id: "kraken",
      name: "Kraken",
      year_established: 2011,
      country: "United States",
      url: "https://www.kraken.com",
      image: "https://assets.coingecko.com/markets/images/29/small/kraken.jpg",
      trust_score: 10,
      trust_score_rank: 3,
      trade_volume_24h_btc: 80000,
    },
  ],
  search: {
    coins: [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        market_cap_rank: 1,
        thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
      },
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        market_cap_rank: 2,
        thumb: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
      },
    ],
    exchanges: [],
  },
}

// Fallback coin data for specific coins
const FALLBACK_COIN_DATA = {
  bitcoin: {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: {
      large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    },
    market_data: {
      current_price: { usd: 48000 },
      market_cap: { usd: 950000000000 },
      total_volume: { usd: 25000000000 },
      circulating_supply: 19000000,
      total_supply: 21000000,
      price_change_percentage_24h: 2.5,
      price_change_percentage_7d: 5.2,
      price_change_percentage_30d: 10.5,
      price_change_percentage_1y: 45.8,
      ath: { usd: 69000 },
      ath_change_percentage: { usd: -30.5 },
      low_24h: { usd: 47000 },
      high_24h: { usd: 49000 },
    },
    description: {
      en: "Bitcoin is the first decentralized cryptocurrency. It was created in 2009 by an unknown person or group of people using the pseudonym Satoshi Nakamoto. Bitcoin is a digital currency that uses cryptography for security and operates on a decentralized network.",
    },
    categories: ["Cryptocurrency", "Layer 1"],
    links: {
      homepage: ["https://bitcoin.org/"],
      blockchain_site: ["https://blockchair.com/bitcoin/"],
    },
  },
  ethereum: {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: {
      large: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    },
    market_data: {
      current_price: { usd: 2800 },
      market_cap: { usd: 340000000000 },
      total_volume: { usd: 15000000000 },
      circulating_supply: 120000000,
      total_supply: null,
      price_change_percentage_24h: 1.8,
      price_change_percentage_7d: 3.5,
      price_change_percentage_30d: 8.2,
      price_change_percentage_1y: 30.5,
      ath: { usd: 4800 },
      ath_change_percentage: { usd: -42 },
      low_24h: { usd: 2750 },
      high_24h: { usd: 2850 },
    },
    description: {
      en: "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform. It is the second-largest cryptocurrency by market capitalization, after Bitcoin.",
    },
    categories: ["Cryptocurrency", "Smart Contract Platform", "Layer 1"],
    links: {
      homepage: ["https://ethereum.org/"],
      blockchain_site: ["https://etherscan.io/"],
    },
  },
}

// In-memory cache for when browser cache is not available
const memoryCache = new Map()

// Helper function to fetch data with error handling, caching, and retries
async function fetchWithErrorHandling(url: string, cacheDuration = CACHE_DURATION.SHORT, retries = 3) {
  // Generate a cache key based on the URL
  const cacheKey = `crypto-market-${url.replace(/[^a-zA-Z0-9]/g, "-")}`

  try {
    // Try to get data from memory cache first (for environments without caches API)
    if (memoryCache.has(cacheKey)) {
      const cachedData = memoryCache.get(cacheKey)
      if (Date.now() - cachedData.timestamp < cacheDuration * 1000) {
        console.log(`Using memory cached data for ${url}`)
        return cachedData.data
      }
    }

    // Try to get data from browser cache if available
    if (typeof caches !== "undefined") {
      try {
        const cache = await caches.open("crypto-market-cache")
        const cachedResponse = await cache.match(cacheKey)

        if (cachedResponse) {
          const data = await cachedResponse.json()
          const cachedTime = data._cachedAt || 0

          // If cache is still valid, return it
          if (Date.now() - cachedTime < cacheDuration * 1000) {
            console.log(`Using cached data for ${url}`)
            return data.value
          }
        }
      } catch (cacheError) {
        console.warn("Cache access error:", cacheError)
        // Continue with fetch if cache access fails
      }
    }

    // If not in cache or cache expired, fetch from API
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout (increased from 10)

    try {
      const response = await fetch(url, {
        next: { revalidate: cacheDuration }, // Cache for specified duration
        headers: {
          Accept: "application/json",
          "User-Agent": "CryptoMarket/1.0",
        },
        signal: controller.signal,
      }).finally(() => clearTimeout(timeoutId))

      // Handle rate limiting
      if (response.status === 429) {
        console.warn(`Rate limit exceeded for ${url}. Using fallback or cached data.`)
        return getFallbackData(url)
      }

      if (!response.ok) {
        console.error(`Error fetching data from ${url}: ${response.status} ${response.statusText}`)
        return getFallbackData(url)
      }

      const data = await response.json()

      // Store in browser cache if available
      if (typeof caches !== "undefined") {
        try {
          const cache = await caches.open("crypto-market-cache")
          const cacheData = {
            value: data,
            _cachedAt: Date.now(),
          }
          await cache.put(cacheKey, new Response(JSON.stringify(cacheData)))
        } catch (cacheError) {
          console.warn("Error storing in cache:", cacheError)
        }
      }

      // Store in memory cache as fallback
      memoryCache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      })

      return data
    } catch (fetchError) {
      // Handle fetch errors (network issues, timeouts, etc.)
      console.error(`Fetch error for ${url}:`, fetchError)

      // If retries left, wait and try again with exponential backoff
      if (retries > 0) {
        const backoffTime = Math.pow(2, 4 - retries) * 1000 // 2s, 4s, 8s...
        console.log(`Retrying in ${backoffTime}ms... (${retries} retries left)`)
        await new Promise((resolve) => setTimeout(resolve, backoffTime))
        return fetchWithErrorHandling(url, cacheDuration, retries - 1)
      }

      return getFallbackData(url)
    }
  } catch (error) {
    console.error(`Failed to fetch data from ${url}:`, error)
    return getFallbackData(url)
  }
}

// Helper function to get appropriate fallback data based on the URL
function getFallbackData(url: string) {
  // Try to find stale cache data first
  const cacheKey = `crypto-market-${url.replace(/[^a-zA-Z0-9]/g, "-")}`
  if (memoryCache.has(cacheKey)) {
    console.log(`Using stale memory cached data for ${url}`)
    return memoryCache.get(cacheKey).data
  }

  // Check for specific coin data
  if (url.includes("/coins/") && !url.includes("/market_chart")) {
    const coinId = url.split("/coins/")[1].split("?")[0]
    if (FALLBACK_COIN_DATA[coinId as keyof typeof FALLBACK_COIN_DATA]) {
      return FALLBACK_COIN_DATA[coinId as keyof typeof FALLBACK_COIN_DATA]
    }
  }

  // Check for markets data
  if (url.includes("/coins/markets")) {
    return FALLBACK_DATA.markets
  }

  // Check for global data
  if (url.includes("/global")) {
    return FALLBACK_DATA.global
  }

  // Check for market chart data
  if (url.includes("/market_chart")) {
    return FALLBACK_DATA.market_chart
  }

  // Check for trending data
  if (url.includes("/trending")) {
    return FALLBACK_DATA.trending
  }

  // Check for exchanges data
  if (url.includes("/exchanges")) {
    return FALLBACK_DATA.exchanges
  }

  // Check for search data
  if (url.includes("/search")) {
    return FALLBACK_DATA.search
  }

  // Default fallback - empty array or object
  return url.includes("markets") || url.includes("coins") ? [] : {}
}

// Get list of coins
export async function getCoins(page = 1, per_page = 100) {
  try {
    const data = await fetchWithErrorHandling(
      `${COINGECKO_API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${per_page}&page=${page}&sparkline=false&price_change_percentage=24h`,
      CACHE_DURATION.SHORT,
    )

    // If we got an empty array or null/undefined, use fallback data
    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.log("Using fallback coin data")
      return FALLBACK_DATA.markets
    }

    return data
  } catch (error) {
    console.error("Error in getCoins:", error)
    return FALLBACK_DATA.markets
  }
}

// Get single coin data
export async function getCoinData(coinId: string) {
  try {
    const data = await fetchWithErrorHandling(
      `${COINGECKO_API_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
      CACHE_DURATION.MEDIUM,
    )

    // If we got null/undefined, use fallback data for this specific coin if available
    if (!data) {
      console.log(`Using fallback data for coin: ${coinId}`)
      return FALLBACK_COIN_DATA[coinId as keyof typeof FALLBACK_COIN_DATA] || null
    }

    return data
  } catch (error) {
    console.error(`Error in getCoinData for ${coinId}:`, error)
    return FALLBACK_COIN_DATA[coinId as keyof typeof FALLBACK_COIN_DATA] || null
  }
}

// Get coin market chart data with improved error handling
export async function getCoinMarketChart(coinId: string, days: number) {
  try {
    const data = await fetchWithErrorHandling(
      `${COINGECKO_API_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
      CACHE_DURATION.SHORT,
      3, // Increase retry attempts
    )

    // If we got null/undefined, use fallback chart data
    if (!data) {
      console.log(`Using fallback market chart data for coin: ${coinId}`)
      return FALLBACK_DATA.market_chart
    }

    return data
  } catch (error) {
    console.error(`Failed to fetch market chart for ${coinId}:`, error)
    return FALLBACK_DATA.market_chart
  }
}

// Get trending coins
export async function getTrendingCoins() {
  try {
    const data = await fetchWithErrorHandling(`${COINGECKO_API_URL}/search/trending`, CACHE_DURATION.SHORT)

    // If we got null/undefined, use fallback trending data
    if (!data) {
      console.log("Using fallback trending data")
      return FALLBACK_DATA.trending
    }

    return data
  } catch (error) {
    console.error("Error in getTrendingCoins:", error)
    return FALLBACK_DATA.trending
  }
}

// Get global crypto data
export async function getGlobalData() {
  try {
    const data = await fetchWithErrorHandling(`${COINGECKO_API_URL}/global`, CACHE_DURATION.SHORT)

    // If we got null/undefined, use fallback global data
    if (!data) {
      console.log("Using fallback global data")
      return FALLBACK_DATA.global
    }

    return data
  } catch (error) {
    console.error("Error in getGlobalData:", error)
    return FALLBACK_DATA.global
  }
}

// Get exchanges list
export async function getExchanges(page = 1, per_page = 50) {
  try {
    const data = await fetchWithErrorHandling(
      `${COINGECKO_API_URL}/exchanges?per_page=${per_page}&page=${page}`,
      CACHE_DURATION.MEDIUM,
    )

    // If we got null/undefined or empty array, use fallback exchanges data
    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.log("Using fallback exchanges data")
      return FALLBACK_DATA.exchanges
    }

    return data
  } catch (error) {
    console.error("Error in getExchanges:", error)
    return FALLBACK_DATA.exchanges
  }
}

// Search for coins, exchanges, etc.
export async function getSearchResults(query: string) {
  try {
    const data = await fetchWithErrorHandling(
      `${COINGECKO_API_URL}/search?query=${encodeURIComponent(query)}`,
      CACHE_DURATION.MEDIUM,
    )

    // If we got null/undefined, use fallback search data
    if (!data) {
      console.log("Using fallback search data")
      return FALLBACK_DATA.search
    }

    return data
  } catch (error) {
    console.error("Error in getSearchResults:", error)
    return FALLBACK_DATA.search
  }
}

