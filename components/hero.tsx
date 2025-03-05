import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { ArrowRight, TrendingUp, BarChart3 } from "lucide-react"

export default function Hero() {
  const { t } = useLanguage()

  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0"></div>
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl opacity-30"></div>

      {/* Animated dots pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-primary animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-3 h-3 rounded-full bg-blue-500 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-5 h-5 rounded-full bg-green-400 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-emerald-500 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-block px-4 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {t("home.hero.badge")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
              {t("home.hero.title")}
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">{t("home.hero.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/market">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all group"
                >
                  {t("home.explore.market")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/coins">
                <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5">
                  {t("home.top.cryptocurrencies")}
                </Button>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center justify-center md:justify-start">
                <TrendingUp className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">10,000+ Coins</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <BarChart3 className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm">Real-time Data</span>
              </div>
              <div className="hidden sm:flex items-center justify-center md:justify-start">
                <div className="h-5 w-5 rounded-full bg-green-500 mr-2 flex items-center justify-center">
                  <span className="text-white text-xs">$</span>
                </div>
                <span className="text-sm">Market Insights</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="absolute -top-10 -left-10 w-full h-full bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl blur-3xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-card to-background rounded-2xl shadow-xl p-6 border border-primary/10 transform hover:scale-[1.01] transition-all duration-300">
              <div className="absolute -top-3 -right-3 bg-primary text-white text-xs px-2 py-1 rounded-full">Live</div>
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Cryptocurrency dashboard"
                width={500}
                height={400}
                className="object-contain rounded-lg"
              />

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="bg-background rounded-lg p-3 border border-border">
                  <div className="text-xs text-muted-foreground">Bitcoin</div>
                  <div className="text-sm font-bold">$48,652.23</div>
                  <div className="text-xs text-green-500">+2.4%</div>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border">
                  <div className="text-xs text-muted-foreground">Ethereum</div>
                  <div className="text-sm font-bold">$3,125.67</div>
                  <div className="text-xs text-green-500">+1.8%</div>
                </div>
                <div className="bg-background rounded-lg p-3 border border-border">
                  <div className="text-xs text-muted-foreground">Solana</div>
                  <div className="text-sm font-bold">$102.45</div>
                  <div className="text-xs text-red-500">-0.7%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

