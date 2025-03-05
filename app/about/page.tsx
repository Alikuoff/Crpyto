"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Info, Database, Shield, Zap, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export default function AboutPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("about")
  const [isMobile, setIsMobile] = useState(false)

  // Detect if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial value
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("about.title")}</h1>
          <p className="text-xl text-muted-foreground">{t("about.subtitle")}</p>
        </div>

        {/* Mobile dropdown */}
        {isMobile ? (
          <div className="mb-6">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("about.tabs.about")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="about">{t("about.tabs.about")}</SelectItem>
                <SelectItem value="data">{t("about.tabs.data")}</SelectItem>
                <SelectItem value="features">{t("about.tabs.features")}</SelectItem>
                <SelectItem value="faq">{t("about.tabs.faq")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          /* Desktop tabs */
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">{t("about.tabs.about")}</TabsTrigger>
              <TabsTrigger value="data">{t("about.tabs.data")}</TabsTrigger>
              <TabsTrigger value="features">{t("about.tabs.features")}</TabsTrigger>
              <TabsTrigger value="faq">{t("about.tabs.faq")}</TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {/* Content for both mobile and desktop */}
        <div className="mt-6">
          {activeTab === "about" && (
            <Card>
              <CardHeader>
                <CardTitle>{t("about.mission.title")}</CardTitle>
                <CardDescription>{t("about.mission.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3">
                    <div className="rounded-full bg-primary/10 p-8 mx-auto w-fit">
                      <Info className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="mb-4">{t("about.mission.paragraph1")}</p>
                    <p>{t("about.mission.paragraph2")}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-card p-6 rounded-lg border">
                    <Shield className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-lg font-medium mb-2">{t("about.values.transparency.title")}</h3>
                    <p className="text-muted-foreground">{t("about.values.transparency.text")}</p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <Zap className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-lg font-medium mb-2">{t("about.values.accessibility.title")}</h3>
                    <p className="text-muted-foreground">{t("about.values.accessibility.text")}</p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <Globe className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-lg font-medium mb-2">{t("about.values.education.title")}</h3>
                    <p className="text-muted-foreground">{t("about.values.education.text")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "data" && (
            <Card>
              <CardHeader>
                <CardTitle>{t("about.data.title")}</CardTitle>
                <CardDescription>{t("about.data.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3">
                    <div className="rounded-full bg-primary/10 p-8 mx-auto w-fit">
                      <Database className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="mb-4">{t("about.data.paragraph1")}</p>
                    <p>{t("about.data.paragraph2")}</p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-card rounded-lg border">
                  <div className="flex items-center mb-4">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="CoinGecko Logo"
                      width={40}
                      height={40}
                      className="mr-3"
                    />
                    <h3 className="text-xl font-medium">{t("about.data.coingecko.title")}</h3>
                  </div>
                  <p className="mb-4 text-muted-foreground">{t("about.data.coingecko.description")}</p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>{t("about.data.coingecko.feature1")}</li>
                    <li>{t("about.data.coingecko.feature2")}</li>
                    <li>{t("about.data.coingecko.feature3")}</li>
                    <li>{t("about.data.coingecko.feature4")}</li>
                    <li>{t("about.data.coingecko.feature5")}</li>
                  </ul>
                  <div className="mt-4">
                    <a
                      href="https://www.coingecko.com/en/api"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      {t("about.data.coingecko.learn.more")}
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>

                <p className="mt-4 text-sm text-muted-foreground">{t("about.data.disclaimer")}</p>
              </CardContent>
            </Card>
          )}

          {activeTab === "features" && (
            <Card>
              <CardHeader>
                <CardTitle>{t("about.features.title")}</CardTitle>
                <CardDescription>{t("about.features.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-3">{t("about.features.market.title")}</h3>
                    <p className="text-muted-foreground mb-4">{t("about.features.market.description")}</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>{t("about.features.market.feature1")}</li>
                      <li>{t("about.features.market.feature2")}</li>
                      <li>{t("about.features.market.feature3")}</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-3">{t("about.features.charts.title")}</h3>
                    <p className="text-muted-foreground mb-4">{t("about.features.charts.description")}</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>{t("about.features.charts.feature1")}</li>
                      <li>{t("about.features.charts.feature2")}</li>
                      <li>{t("about.features.charts.feature3")}</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-3">{t("about.features.details.title")}</h3>
                    <p className="text-muted-foreground mb-4">{t("about.features.details.description")}</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>{t("about.features.details.feature1")}</li>
                      <li>{t("about.features.details.feature2")}</li>
                      <li>{t("about.features.details.feature3")}</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-3">{t("about.features.exchanges.title")}</h3>
                    <p className="text-muted-foreground mb-4">{t("about.features.exchanges.description")}</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>{t("about.features.exchanges.feature1")}</li>
                      <li>{t("about.features.exchanges.feature2")}</li>
                      <li>{t("about.features.exchanges.feature3")}</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-3">{t("about.features.trending.title")}</h3>
                    <p className="text-muted-foreground mb-4">{t("about.features.trending.description")}</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>{t("about.features.trending.feature1")}</li>
                      <li>{t("about.features.trending.feature2")}</li>
                      <li>{t("about.features.trending.feature3")}</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-3">{t("about.features.responsive.title")}</h3>
                    <p className="text-muted-foreground mb-4">{t("about.features.responsive.description")}</p>
                    <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                      <li>{t("about.features.responsive.feature1")}</li>
                      <li>{t("about.features.responsive.feature2")}</li>
                      <li>{t("about.features.responsive.feature3")}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "faq" && (
            <Card>
              <CardHeader>
                <CardTitle>{t("about.faq.title")}</CardTitle>
                <CardDescription>{t("about.faq.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium mb-2">{t("about.faq.q1")}</h3>
                    <p className="text-muted-foreground">{t("about.faq.a1")}</p>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium mb-2">{t("about.faq.q2")}</h3>
                    <p className="text-muted-foreground">{t("about.faq.a2")}</p>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium mb-2">{t("about.faq.q3")}</h3>
                    <p className="text-muted-foreground">{t("about.faq.a3")}</p>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium mb-2">{t("about.faq.q4")}</h3>
                    <p className="text-muted-foreground">{t("about.faq.a4")}</p>
                  </div>

                  <div className="border-b pb-4">
                    <h3 className="text-lg font-medium mb-2">{t("about.faq.q5")}</h3>
                    <p className="text-muted-foreground">{t("about.faq.a5")}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">{t("about.faq.q6")}</h3>
                    <p className="text-muted-foreground">{t("about.faq.a6")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="text-center mt-12 p-8 bg-primary/5 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">{t("about.contact.title")}</h2>
          <p className="text-muted-foreground mb-6">{t("about.contact.subtitle")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              {t("about.contact.form")}
            </Link>
            <a
              href="mailto:info@cryptomarket.example.com"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              {t("about.contact.email")}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

