import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { Github, Twitter, Facebook, Instagram, ExternalLink } from "lucide-react"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-gradient-to-r from-green-400 to-emerald-500 p-1">
                <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center">
                  <span className="text-green-500 font-bold text-xl">C</span>
                </div>
              </div>
              <h3 className="font-semibold text-lg bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                {t("app.name")}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm mb-4">{t("footer.tagline")}</p>
            <p className="text-sm text-muted-foreground flex items-center">
              <ExternalLink className="h-4 w-4 mr-1" />
              {t("footer.data.source")}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">{t("footer.products")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm hover:text-primary transition-colors flex items-center">
                  <span className="h-1 w-1 rounded-full bg-primary mr-2"></span>
                  {t("footer.crypto.market")}
                </Link>
              </li>
              <li>
                <Link href="/exchanges" className="text-sm hover:text-primary transition-colors flex items-center">
                  <span className="h-1 w-1 rounded-full bg-primary mr-2"></span>
                  {t("footer.exchanges")}
                </Link>
              </li>
              <li>
                <Link href="/trending" className="text-sm hover:text-primary transition-colors flex items-center">
                  <span className="h-1 w-1 rounded-full bg-primary mr-2"></span>
                  {t("footer.trending.coins")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">{t("footer.resources")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm hover:text-primary transition-colors flex items-center">
                  <span className="h-1 w-1 rounded-full bg-primary mr-2"></span>
                  {t("footer.about.us")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-primary transition-colors flex items-center">
                  <span className="h-1 w-1 rounded-full bg-primary mr-2"></span>
                  {t("footer.contact")}
                </Link>
              </li>
              <li>
                <a
                  href="https://www.coingecko.com/en/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary transition-colors flex items-center"
                >
                  <span className="h-1 w-1 rounded-full bg-primary mr-2"></span>
                  {t("footer.api.docs")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">{t("footer.connect")}</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors bg-muted/50 p-2 rounded-full hover:bg-primary/10"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors bg-muted/50 p-2 rounded-full hover:bg-primary/10"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors bg-muted/50 p-2 rounded-full hover:bg-primary/10"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors bg-muted/50 p-2 rounded-full hover:bg-primary/10"
                aria-label="Github"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
              <p className="text-xs text-muted-foreground mb-2">{t("footer.newsletter")}</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 bg-background border border-input rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="bg-primary text-primary-foreground px-3 py-2 rounded-r-md text-sm">
                  {t("footer.subscribe")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} {t("app.name")}. {t("footer.rights.reserved")}
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

