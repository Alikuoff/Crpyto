"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ThemeToggle from "./theme-toggle"
import Search from "./search"
import LanguageSwitcher from "./language-switcher"
import { useLanguage } from "@/lib/language-context"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-background"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="rounded-full bg-gradient-to-r from-green-400 to-emerald-500 p-1 transition-transform duration-300 group-hover:scale-110">
              <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
                <span className="text-green-500 font-bold text-xl">C</span>
              </div>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              {t("app.name")}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary relative group">
              {t("nav.market")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/exchanges" className="text-sm font-medium hover:text-primary relative group">
              {t("nav.exchanges")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary relative group">
              {t("nav.about")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Search />
          </div>

          <LanguageSwitcher />
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l-primary/10">
              <div className="mt-6 mb-8">
                <Search />
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-primary/5 transition-colors"
                >
                  {t("nav.market")}
                </Link>
                <Link
                  href="/exchanges"
                  className="text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-primary/5 transition-colors"
                >
                  {t("nav.exchanges")}
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-medium hover:text-primary p-2 rounded-md hover:bg-primary/5 transition-colors"
                >
                  {t("nav.about")}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

