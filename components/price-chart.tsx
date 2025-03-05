"use client"

import {
  Area,
  Bar,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Brush,
  ReferenceLine,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { formatDate, formatNumber } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, AlertCircle, TrendingUp, Clock, BarChart2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"

type TimeRange = "1d" | "7d" | "30d" | "90d" | "1y" | "max"

interface PriceChartProps {
  data: any
  coinId: string
}

export function PriceChart({ data, coinId }: PriceChartProps) {
  const { t } = useLanguage()
  const [timeRange, setTimeRange] = useState<TimeRange>("7d")
  const [chartData, setChartData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [priceChange, setPriceChange] = useState({
    change: 0,
    changePercent: 0,
    isPositive: true,
  })
  const [isMobile, setIsMobile] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [showVolume, setShowVolume] = useState(true)

  // Detect if we're on a small screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    // Set initial value
    checkMobile()

    // Add event listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Format the initial data
  useEffect(() => {
    if (data && data.prices) {
      try {
        const formattedData = formatChartData(data)
        setChartData(formattedData)
        calculatePriceChange(formattedData)
        setError(null) // Clear any previous errors
      } catch (err) {
        console.error("Error formatting chart data:", err)
        setError(t("app.error"))
        // Use fallback data if available
        if (fallbackData[coinId]) {
          setChartData(fallbackData[coinId])
          calculatePriceChange(fallbackData[coinId])
        } else {
          // Generate simple mock data if no fallback exists
          setChartData(generateMockData())
          calculatePriceChange(generateMockData())
        }
      }
    } else {
      // Handle case when data is null or API call failed
      setError(t("app.error"))
      // Use fallback data if available
      if (fallbackData[coinId]) {
        setChartData(fallbackData[coinId])
        calculatePriceChange(fallbackData[coinId])
      } else {
        // Generate simple mock data if no fallback exists
        setChartData(generateMockData())
        calculatePriceChange(generateMockData())
      }
    }
  }, [data, coinId, t])

  // Handle time range changes without making additional API calls
  const handleTimeRangeChange = (range: TimeRange) => {
    // If we're already on this range, do nothing
    if (range === timeRange) return

    setTimeRange(range)

    // For now, we'll just use the existing 7d data and show a message
    // This is a workaround for the API rate limits
    if (range !== "7d") {
      setError(t("app.error"))
    } else {
      setError(null)
    }

    // If we have the initial 7d data, use it
    if (data && data.prices) {
      const formattedData = formatChartData(data)

      // Simulate different time ranges by sampling the data differently
      let sampledData = formattedData

      if (range === "1d" && formattedData.length > 24) {
        // For 1d, take the last 24 data points
        sampledData = formattedData.slice(-24)
      } else if (range === "30d" && formattedData.length > 7) {
        // For 30d, take every 4th data point to simulate a longer period
        sampledData = formattedData.filter((_, i) => i % 4 === 0)
      }

      setChartData(sampledData)
      calculatePriceChange(sampledData)
    }
  }

  const formatChartData = (data: any) => {
    if (!data || !data.prices || !data.total_volumes) return []

    return data.prices.map((item: [number, number], index: number) => {
      const volumeData = data.total_volumes[index] || [0, 0]
      return {
        timestamp: item[0],
        price: item[1],
        volume: volumeData[1],
      }
    })
  }

  const calculatePriceChange = (data: any[]) => {
    if (!data || data.length < 2) return

    const firstPrice = data[0].price
    const lastPrice = data[data.length - 1].price
    const change = lastPrice - firstPrice
    const changePercent = (change / firstPrice) * 100

    setPriceChange({
      change,
      changePercent,
      isPositive: change >= 0,
    })
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/90 backdrop-blur-sm border border-primary/20 rounded-lg shadow-lg p-4 transition-all duration-200">
          <p className="font-medium text-lg mb-2">{formatDate(label, true)}</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">{t("coin.price")}:</span>
              <span className="text-primary font-bold">{formatNumber(payload[0].value, "currency")}</span>
            </div>
            {payload[1] && showVolume && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">{t("market.volume")}:</span>
                <span className="text-blue-500 font-medium">{formatNumber(payload[1].value, "currency")}</span>
              </div>
            )}

            {/* Show price change from previous point if available */}
            {activeIndex !== null && activeIndex > 0 && chartData[activeIndex - 1] && (
              <div className="pt-2 mt-2 border-t border-border">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground text-sm">Change:</span>
                  <div
                    className={`flex items-center ${
                      payload[0].value >= chartData[activeIndex - 1].price ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {payload[0].value >= chartData[activeIndex - 1].price ? (
                      <ArrowUpRight className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3 w-3" />
                    )}
                    <span className="font-medium">
                      {formatNumber(Math.abs(payload[0].value - chartData[activeIndex - 1].price), "currency")}(
                      {formatNumber(
                        Math.abs(
                          ((payload[0].value - chartData[activeIndex - 1].price) / chartData[activeIndex - 1].price) *
                            100,
                        ) / 100,
                        "percent",
                      )}
                      )
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }
    return null
  }

  const getTimeRangeLabel = (range: TimeRange) => {
    switch (range) {
      case "1d":
        return t("coin.past.24h")
      case "7d":
        return t("coin.past.week")
      case "30d":
        return t("coin.past.month")
      case "90d":
        return t("coin.past.3months")
      case "1y":
        return t("coin.past.year")
      case "max":
        return t("coin.all.time")
      default:
        return ""
    }
  }

  // Get min and max values for better chart scaling
  const getMinMaxPrice = () => {
    if (!chartData || chartData.length === 0) return { min: 0, max: 0 }

    const prices = chartData.map((d) => d.price)
    const min = Math.min(...prices) * 0.95 // Add 5% padding
    const max = Math.max(...prices) * 1.05 // Add 5% padding

    return { min, max }
  }

  const { min: minPrice, max: maxPrice } = getMinMaxPrice()

  // Get average price for reference line
  const getAveragePrice = () => {
    if (!chartData || chartData.length === 0) return 0

    const sum = chartData.reduce((acc, curr) => acc + curr.price, 0)
    return sum / chartData.length
  }

  const averagePrice = getAveragePrice()

  // Fallback data for common coins
  const fallbackData: Record<string, any[]> = {
    bitcoin: Array(30)
      .fill(0)
      .map((_, i) => ({
        timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
        price: 40000 + Math.random() * 5000,
        volume: 20000000000 + Math.random() * 10000000000,
      })),
    ethereum: Array(30)
      .fill(0)
      .map((_, i) => ({
        timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
        price: 2000 + Math.random() * 300,
        volume: 10000000000 + Math.random() * 5000000000,
      })),
  }

  // Generate mock data for any coin
  const generateMockData = () => {
    const basePrice = 100 // Default base price
    const now = Date.now()

    return Array(30)
      .fill(0)
      .map((_, i) => {
        // Create slightly random but trending data
        const randomFactor = 0.95 + Math.random() * 0.1 // Random between 0.95 and 1.05
        const trendFactor = 1 + i / 100 // Small upward trend

        return {
          timestamp: now - (29 - i) * 24 * 60 * 60 * 1000,
          price: basePrice * randomFactor * trendFactor,
          volume: basePrice * 1000000 * (0.8 + Math.random() * 0.4),
        }
      })
  }

  return (
    <Card className="border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-background to-muted/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                {t("coin.price.chart")}
              </span>
            </CardTitle>
            <CardDescription className="mt-1">{t("coin.historical.data")}</CardDescription>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <div
              className={`flex items-center text-sm font-medium ${
                priceChange.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {priceChange.isPositive ? (
                <ArrowUpRight className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4" />
              )}
              <span className="font-bold">{formatNumber(Math.abs(priceChange.change), "currency")}</span>
              <span className="ml-1">({formatNumber(Math.abs(priceChange.changePercent) / 100, "percent")})</span>
            </div>
            <span className="text-xs text-muted-foreground flex items-center mt-1">
              <Clock className="h-3 w-3 mr-1" />
              {getTimeRangeLabel(timeRange)}
            </span>
          </div>
        </div>

        {/* Desktop time range selector */}
        <div className="hidden sm:flex flex-wrap gap-2 mt-6 bg-muted/30 p-3 rounded-lg border border-border/50">
          <Button
            variant={timeRange === "1d" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTimeRangeChange("1d")}
            className={timeRange === "1d" ? "bg-primary" : "border-primary/20 hover:bg-primary/10"}
          >
            1D
          </Button>
          <Button
            variant={timeRange === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTimeRangeChange("7d")}
            className={timeRange === "7d" ? "bg-primary" : "border-primary/20 hover:bg-primary/10"}
          >
            7D
          </Button>
          <Button
            variant={timeRange === "30d" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTimeRangeChange("30d")}
            className={timeRange === "30d" ? "bg-primary" : "border-primary/20 hover:bg-primary/10"}
          >
            30D
          </Button>
          <Button
            variant={timeRange === "90d" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTimeRangeChange("90d")}
            className={timeRange === "90d" ? "bg-primary" : "border-primary/20 hover:bg-primary/10"}
          >
            90D
          </Button>
          <Button
            variant={timeRange === "1y" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTimeRangeChange("1y")}
            className={timeRange === "1y" ? "bg-primary" : "border-primary/20 hover:bg-primary/10"}
          >
            1Y
          </Button>
          <Button
            variant={timeRange === "max" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTimeRangeChange("max")}
            className={timeRange === "max" ? "bg-primary" : "border-primary/20 hover:bg-primary/10"}
          >
            MAX
          </Button>

          <div className="ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowVolume(!showVolume)}
              className={`border-primary/20 ${showVolume ? "bg-primary/10" : ""}`}
            >
              <BarChart2 className={`h-4 w-4 mr-1 ${showVolume ? "text-primary" : "text-muted-foreground"}`} />
              {t("market.volume")}
            </Button>
          </div>
        </div>

        {/* Mobile time range selector */}
        <div className="sm:hidden mt-4">
          <Select value={timeRange} onValueChange={(value) => handleTimeRangeChange(value as TimeRange)}>
            <SelectTrigger className="border-primary/20">
              <SelectValue placeholder={t("coin.historical.data")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">1 {t("coin.past.24h")}</SelectItem>
              <SelectItem value="7d">7 {t("coin.past.week")}</SelectItem>
              <SelectItem value="30d">30 {t("coin.past.month")}</SelectItem>
              <SelectItem value="90d">90 {t("coin.past.3months")}</SelectItem>
              <SelectItem value="1y">1 {t("coin.past.year")}</SelectItem>
              <SelectItem value="max">{t("coin.all.time")}</SelectItem>
            </SelectContent>
          </Select>

          <div className="mt-3 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowVolume(!showVolume)}
              className={`border-primary/20 ${showVolume ? "bg-primary/10" : ""}`}
            >
              <BarChart2 className={`h-4 w-4 mr-1 ${showVolume ? "text-primary" : "text-muted-foreground"}`} />
              {t("market.volume")}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="warning" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
              <p className="text-xs mt-1">{t("app.api.limit.warning")}</p>
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent className="p-0 pt-4">
        {isLoading ? (
          <div className="h-[300px] sm:h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div
            className="h-[300px] sm:h-[400px] px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                onMouseMove={(e) => {
                  if (e.activeTooltipIndex !== undefined) {
                    setActiveIndex(e.activeTooltipIndex)
                  }
                }}
              >
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={priceChange.isPositive ? "hsl(var(--primary))" : "#ef4444"}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={priceChange.isPositive ? "hsl(var(--primary))" : "#ef4444"}
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>

                  {/* Gradient for the brush handle */}
                  <linearGradient id="brushHandle" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.7} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />

                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(value) => formatDate(value, timeRange === "1d")}
                  tick={{ fontSize: 12 }}
                  minTickGap={30}
                  // Show fewer ticks on mobile
                  interval={isMobile ? "preserveStartEnd" : 0}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickLine={{ stroke: "hsl(var(--border))" }}
                />

                <YAxis
                  dataKey="price"
                  domain={[minPrice, maxPrice]}
                  tickFormatter={(value) => formatNumber(value, "currency", 0)}
                  tick={{ fontSize: 12 }}
                  orientation="right"
                  yAxisId="price"
                  // Hide more labels on small screens
                  tickCount={isMobile ? 3 : 5}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickLine={{ stroke: "hsl(var(--border))" }}
                />

                {showVolume && (
                  <YAxis
                    dataKey="volume"
                    domain={[0, "dataMax"]}
                    tickFormatter={(value) => formatNumber(value, "currency", 0)}
                    tick={{ fontSize: 12 }}
                    orientation="left"
                    yAxisId="volume"
                    axisLine={{ stroke: "hsl(var(--border))" }}
                    tickLine={{ stroke: "hsl(var(--border))" }}
                  />
                )}

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1, strokeDasharray: "5 5" }}
                  wrapperStyle={{ outline: "none" }}
                />

                <Legend
                  verticalAlign={isMobile ? "top" : "bottom"}
                  height={isMobile ? 36 : 20}
                  wrapperStyle={{ paddingTop: "10px" }}
                  formatter={(value) => <span className="text-sm font-medium">{value}</span>}
                />

                {/* Average price reference line */}
                <ReferenceLine
                  y={averagePrice}
                  yAxisId="price"
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="3 3"
                  label={{
                    value: "Avg",
                    position: "right",
                    fill: "hsl(var(--muted-foreground))",
                    fontSize: 10,
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={priceChange.isPositive ? "hsl(var(--primary))" : "#ef4444"}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                  name={t("coin.price")}
                  yAxisId="price"
                  animationDuration={1000}
                  activeDot={{
                    r: 6,
                    stroke: priceChange.isPositive ? "hsl(var(--primary))" : "#ef4444",
                    strokeWidth: 2,
                    fill: "hsl(var(--background))",
                  }}
                  dot={false}
                />

                {showVolume && (
                  <Bar
                    dataKey="volume"
                    fill="url(#colorVolume)"
                    name={t("market.volume")}
                    yAxisId="volume"
                    barSize={isMobile ? 5 : 20}
                    animationDuration={1000}
                  />
                )}

                <Brush
                  dataKey="timestamp"
                  height={30}
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--background))"
                  tickFormatter={(value) => formatDate(value, false)}
                  startIndex={chartData.length > 30 ? chartData.length - 30 : 0}
                  endIndex={chartData.length - 1}
                  className="mt-4"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Chart statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-muted/20 mt-4 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">{t("coin.high.24h")}</p>
            <p className="font-medium text-green-500">
              {chartData.length > 0 ? formatNumber(Math.max(...chartData.map((d) => d.price)), "currency") : "—"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">{t("coin.low.24h")}</p>
            <p className="font-medium text-red-500">
              {chartData.length > 0 ? formatNumber(Math.min(...chartData.map((d) => d.price)), "currency") : "—"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Average</p>
            <p className="font-medium">{chartData.length > 0 ? formatNumber(averagePrice, "currency") : "—"}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Volatility</p>
            <p className="font-medium">
              {chartData.length > 0
                ? formatNumber(
                    (((Math.max(...chartData.map((d) => d.price)) - Math.min(...chartData.map((d) => d.price))) /
                      averagePrice) *
                      100) /
                      100,
                    "percent",
                  )
                : "—"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

