"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "uz"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionaries
const translations = {
  en: {
    // Common
    "app.name": "CryptoMarket",
    "app.tagline": "Real-time cryptocurrency data",
    "app.loading": "Loading...",
    "app.error": "An error occurred. Please try again later.",
    "app.back": "Back",
    "app.view.more": "View more",
    "app.search": "Search",
    "app.search.placeholder": "Search coins...",
    "app.no.results": "No results found",

    // Navigation
    "nav.market": "Market",
    "nav.exchanges": "Exchanges",
    "nav.about": "About",

    // Home page
    "home.hero.badge": "Real-time Crypto Data",
    "home.hero.title": "Real-time Cryptocurrency Market Data",
    "home.hero.subtitle": "Track prices, market caps, and more for thousands of cryptocurrencies in real-time.",
    "home.explore.market": "Explore Market",
    "home.top.cryptocurrencies": "Top Cryptocurrencies",
    "home.market.stats": "Market Stats",
    "home.market.cap": "Market Cap",
    "home.volume": "24h Volume",
    "home.btc.dominance": "BTC Dominance",
    "home.trending.coins": "Trending Coins",
    "home.top.by.market.cap": "Top Cryptocurrencies by Market Cap",
    "home.view.all.coins": "View All Coins",
    "home.api.limit.warning":
      "We're experiencing high traffic. Some data might be limited or delayed. Please try again later.",
    "home.trending.unavailable": "Trending coin data is temporarily unavailable. Please check back later.",

    // Market table
    "market.rank": "#",
    "market.name": "Name",
    "market.price": "Price",
    "market.24h.change": "24h %",
    "market.market.cap": "Market Cap",
    "market.volume": "Volume (24h)",
    "market.show": "Show:",
    "market.card.view": "Card View",
    "market.table.view": "Table View",
    "market.view.details": "View Details",
    "market.first": "First",
    "market.previous": "Previous",
    "market.next": "Next",
    "market.last": "Last",
    "market.showing": "Showing",
    "market.of": "of",
    "market.results": "results",
    "market.try.different.search": "Try a different search term.",

    // Coin details
    "coin.price": "Price",
    "coin.market.cap": "Market Cap",
    "coin.24h.volume": "24h Volume",
    "coin.circulating.supply": "Circulating Supply",
    "coin.total.supply": "Total Supply",
    "coin.all.time.high": "All-time High",
    "coin.price.change.24h": "Price Change (24h)",
    "coin.price.change.7d": "Price Change (7d)",
    "coin.price.change.30d": "Price Change (30d)",
    "coin.price.change.1y": "Price Change (1y)",
    "coin.low.24h": "Low (24h)",
    "coin.high.24h": "High (24h)",
    "coin.website": "Website",
    "coin.explorer": "Explorer",
    "coin.not.available": "Not available",
    "coin.price.chart": "Price Chart",
    "coin.information": "Information",
    "coin.about": "About",
    "coin.no.description": "No description available",
    "coin.historical.data": "Historical price data",
    "coin.past.24h": "Past 24 hours",
    "coin.past.week": "Past week",
    "coin.past.month": "Past month",
    "coin.past.3months": "Past 3 months",
    "coin.past.year": "Past year",
    "coin.all.time": "All time",

    // Exchanges
    "exchanges.title": "Cryptocurrency Exchanges",
    "exchanges.subtitle": "Explore the top cryptocurrency exchanges ranked by trading volume and reliability",
    "exchanges.about.title": "About Cryptocurrency Exchanges",
    "exchanges.about.description":
      "Cryptocurrency exchanges are platforms where you can buy, sell, and trade cryptocurrencies.",
    "exchanges.about.text":
      "Exchanges play a crucial role in the cryptocurrency ecosystem by providing liquidity and a marketplace for traders. When choosing an exchange, it's important to consider factors such as trading volume, supported cryptocurrencies, security measures, fees, and user interface. The exchanges listed below are ranked based on trading volume, reliability, and other key metrics.",
    "exchanges.trust.score": "Trust Score",
    "exchanges.country": "Country",
    "exchanges.year.established": "Year Established",
    "exchanges.website": "Website",
    "exchanges.visit": "Visit",

    // Top Cryptocurrencies
    "top.crypto.title": "Top Cryptocurrencies",
    "top.crypto.subtitle":
      "Explore the most valuable cryptocurrencies by market capitalization, volume, and price changes",
    "top.crypto.rankings": "Cryptocurrency Rankings",
    "top.crypto.rankings.description": "Comprehensive data on the top cryptocurrencies in the market",
    "top.crypto.by.market.cap": "By Market Cap",
    "top.crypto.by.volume": "By Volume",
    "top.crypto.top.gainers": "Top Gainers",
    "top.crypto.top.losers": "Top Losers",
    "top.crypto.market.cap.description":
      "Cryptocurrencies ranked by market capitalization (price × circulating supply)",
    "top.crypto.volume.description": "Cryptocurrencies ranked by 24-hour trading volume",
    "top.crypto.gainers.description": "Cryptocurrencies with the highest 24-hour price increases",
    "top.crypto.losers.description": "Cryptocurrencies with the largest 24-hour price decreases",
    "top.crypto.understanding": "Understanding Cryptocurrency Rankings",
    "top.crypto.market.cap.title": "Market Capitalization",
    "top.crypto.market.cap.text":
      "Market capitalization is the total value of a cryptocurrency. It's calculated by multiplying the price of a coin by its circulating supply. Market cap is often used to rank the relative size of a cryptocurrency.",
    "top.crypto.volume.title": "Trading Volume",
    "top.crypto.volume.text":
      "Trading volume represents the total value of all trades for a specific cryptocurrency over the past 24 hours. High trading volume indicates high liquidity, which typically means you can buy and sell that cryptocurrency more easily.",
    "top.crypto.price.change.title": "Price Change",
    "top.crypto.price.change.text":
      "Price change percentage shows how much the price of a cryptocurrency has increased or decreased over a specific time period. This metric helps identify trending cryptocurrencies and market momentum.",
    "top.crypto.circulating.supply.title": "Circulating Supply",
    "top.crypto.circulating.supply.text":
      "Circulating supply refers to the number of coins or tokens that are publicly available and circulating in the market. This is an important factor in determining a cryptocurrency's market capitalization.",

    // Footer
    "footer.tagline": "Track real-time cryptocurrency prices, market caps, and more.",
    "footer.data.source": "Data provided by CoinGecko API",
    "footer.products": "Products",
    "footer.crypto.market": "Crypto Market",
    "footer.exchanges": "Exchanges",
    "footer.trending.coins": "Trending Coins",
    "footer.resources": "Resources",
    "footer.about.us": "About Us",
    "footer.contact": "Contact",
    "footer.api.docs": "API Documentation",
    "footer.connect": "Connect",
    "footer.rights.reserved": "All rights reserved.",
    "footer.newsletter": "Subscribe to our newsletter",
    "footer.subscribe": "Subscribe",

    // Language
    language: "Language",
    "language.english": "English",
    "language.uzbek": "Uzbek",

    // About page
    "about.title": "About CryptoMarket",
    "about.subtitle": "Your trusted source for real-time cryptocurrency data and market insights",
    "about.tabs.about": "About Us",
    "about.tabs.data": "Data Sources",
    "about.tabs.features": "Features",
    "about.tabs.faq": "FAQ",

    "about.mission.title": "Our Mission",
    "about.mission.subtitle": "Providing transparent and accessible cryptocurrency information for everyone",
    "about.mission.paragraph1":
      "CryptoMarket was founded with a simple mission: to make cryptocurrency data accessible, understandable, and actionable for everyone. Whether you're a seasoned trader, a curious newcomer, or somewhere in between, we believe that reliable information is the foundation of good decision-making in the crypto space.",
    "about.mission.paragraph2":
      "Our platform aggregates real-time data from trusted sources to provide you with accurate market information, price trends, and insights. We're committed to transparency, reliability, and user education in an industry that's constantly evolving.",

    "about.values.transparency.title": "Transparency",
    "about.values.transparency.text":
      "We clearly disclose our data sources and methodologies, ensuring you always know where your information comes from.",
    "about.values.accessibility.title": "Accessibility",
    "about.values.accessibility.text":
      "Our platform is designed to be intuitive and accessible for users of all experience levels.",
    "about.values.education.title": "Education",
    "about.values.education.text":
      "We're committed to helping users understand the cryptocurrency market through clear information and resources.",

    "about.data.title": "Our Data Sources",
    "about.data.subtitle": "Reliable and up-to-date cryptocurrency information",
    "about.data.paragraph1":
      "CryptoMarket sources its data from the CoinGecko API, one of the most comprehensive and reliable cryptocurrency data providers in the industry. CoinGecko aggregates information from hundreds of exchanges and thousands of markets to ensure accurate and up-to-date data.",
    "about.data.paragraph2":
      "Our platform processes and presents this data in an easy-to-understand format, allowing you to track prices, market caps, trading volumes, and other key metrics for thousands of cryptocurrencies.",

    "about.data.coingecko.title": "CoinGecko API",
    "about.data.coingecko.description": "CoinGecko provides comprehensive cryptocurrency data including:",
    "about.data.coingecko.feature1": "Real-time price data from multiple exchanges",
    "about.data.coingecko.feature2": "Historical price charts and market data",
    "about.data.coingecko.feature3": "Trading volumes and market capitalization",
    "about.data.coingecko.feature4": "Cryptocurrency metadata and project information",
    "about.data.coingecko.feature5": "Exchange rankings and trading pair data",
    "about.data.coingecko.learn.more": "Learn more about CoinGecko API",
    "about.data.disclaimer":
      "Note: While we strive to provide the most accurate information possible, cryptocurrency markets are highly volatile, and data may occasionally be delayed or incomplete due to API limitations or market conditions.",

    "about.features.title": "Platform Features",
    "about.features.subtitle": "Discover what CryptoMarket has to offer",

    "about.features.market.title": "Real-time Market Data",
    "about.features.market.description":
      "Track cryptocurrency prices, market caps, and trading volumes in real-time with automatic updates.",
    "about.features.market.feature1": "Price updates for thousands of cryptocurrencies",
    "about.features.market.feature2": "24-hour price change indicators",
    "about.features.market.feature3": "Market capitalization rankings",

    "about.features.charts.title": "Interactive Price Charts",
    "about.features.charts.description":
      "Visualize price trends with our interactive charts featuring multiple time ranges and indicators.",
    "about.features.charts.feature1": "Historical price data visualization",
    "about.features.charts.feature2": "Trading volume indicators",
    "about.features.charts.feature3": "Multiple time range options (1D, 7D, 30D, etc.)",

    "about.features.details.title": "Cryptocurrency Details",
    "about.features.details.description":
      "Access comprehensive information about each cryptocurrency, including project details and market metrics.",
    "about.features.details.feature1": "Project descriptions and official links",
    "about.features.details.feature2": "Supply information (circulating, total, max)",
    "about.features.details.feature3": "All-time high/low price data",

    "about.features.exchanges.title": "Exchange Information",
    "about.features.exchanges.description":
      "Compare cryptocurrency exchanges based on trading volume, trust score, and other metrics.",
    "about.features.exchanges.feature1": "Exchange rankings and trust scores",
    "about.features.exchanges.feature2": "Trading volume data",
    "about.features.exchanges.feature3": "Exchange details and website links",

    "about.features.trending.title": "Trending Cryptocurrencies",
    "about.features.trending.description":
      "Stay updated on the most popular and trending cryptocurrencies in the market.",
    "about.features.trending.feature1": "Most searched cryptocurrencies",
    "about.features.trending.feature2": "Trending coins based on market activity",
    "about.features.trending.feature3": "Quick access to trending coin details",

    "about.features.responsive.title": "Responsive Design",
    "about.features.responsive.description":
      "Access CryptoMarket from any device with our fully responsive and mobile-friendly design.",
    "about.features.responsive.feature1": "Optimized for desktop, tablet, and mobile",
    "about.features.responsive.feature2": "Dark and light theme support",
    "about.features.responsive.feature3": "Accessible user interface",

    "about.faq.title": "Frequently Asked Questions",
    "about.faq.subtitle": "Common questions about CryptoMarket and cryptocurrency data",
    "about.faq.q1": "How often is the data updated?",
    "about.faq.a1":
      "Our cryptocurrency data is updated regularly, with most market information refreshing every few minutes. Due to API rate limits, some data may be cached for up to 5 minutes to ensure optimal performance.",
    "about.faq.q2": "Is CryptoMarket free to use?",
    "about.faq.a2":
      "Yes, CryptoMarket is completely free to use. We provide access to cryptocurrency data and market information without requiring any subscription or payment.",
    "about.faq.q3": "Why do I see different prices for the same cryptocurrency on different platforms?",
    "about.faq.a3":
      "Cryptocurrency prices can vary between different exchanges due to factors like trading volume, liquidity, and regional differences. CryptoMarket aggregates data from multiple sources to provide a comprehensive view of the market, but slight variations may occur compared to specific exchanges.",
    "about.faq.q4": "Can I use CryptoMarket data for my own projects?",
    "about.faq.a4":
      "CryptoMarket is designed for personal use and information purposes. If you're looking to use cryptocurrency data for commercial applications or your own projects, we recommend accessing the CoinGecko API directly with appropriate attribution and in accordance with their terms of service.",
    "about.faq.q5": "Why are some features limited or showing cached data?",
    "about.faq.a5":
      "CryptoMarket uses the free tier of the CoinGecko API, which has certain rate limits. To provide the best possible experience while respecting these limits, we may occasionally show cached data or limit certain features that would require excessive API calls.",
    "about.faq.q6": "Is CryptoMarket affiliated with CoinGecko?",
    "about.faq.a6":
      "No, CryptoMarket is not officially affiliated with CoinGecko. We use their public API as our data source and provide proper attribution. CryptoMarket is an independent platform created to make cryptocurrency data more accessible and user-friendly.",

    "about.contact.title": "Contact Us",
    "about.contact.subtitle": "Have questions, feedback, or suggestions? We'd love to hear from you!",
    "about.contact.form": "Contact Form",
    "about.contact.email": "Email Us",
  },
  uz: {
    // Common
    "app.name": "KriptoMarket",
    "app.tagline": "Real vaqtdagi kriptovalyuta ma'lumotlari",
    "app.loading": "Yuklanmoqda...",
    "app.error": "Xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.",
    "app.back": "Orqaga",
    "app.view.more": "Ko'proq ko'rish",
    "app.search": "Qidirish",
    "app.search.placeholder": "Kriptovalyutalarni qidirish...",
    "app.no.results": "Natija topilmadi",

    // Navigation
    "nav.market": "Bozor",
    "nav.exchanges": "Birjalar",
    "nav.about": "Biz haqimizda",

    // Home page
    "home.hero.badge": "Real vaqtdagi kripto ma'lumotlar",
    "home.hero.title": "Real vaqtdagi kriptovalyuta bozori ma'lumotlari",
    "home.hero.subtitle":
      "Minglab kriptovalyutalarning narxlari, bozor kapitalizatsiyasi va boshqa ma'lumotlarni real vaqtda kuzating.",
    "home.explore.market": "Bozorni o'rganish",
    "home.top.cryptocurrencies": "Top kriptovalyutalar",
    "home.market.stats": "Bozor statistikasi",
    "home.market.cap": "Bozor kapitalizatsiyasi",
    "home.volume": "24 soatlik hajm",
    "home.btc.dominance": "BTC ustunligi",
    "home.trending.coins": "Trend kriptovalyutalar",
    "home.top.by.market.cap": "Bozor kapitalizatsiyasi bo'yicha top kriptovalyutalar",
    "home.view.all.coins": "Barcha kriptovalyutalarni ko'rish",
    "home.api.limit.warning":
      "Hozirda yuqori trafik kuzatilmoqda. Ba'zi ma'lumotlar cheklangan yoki kechiktirilgan bo'lishi mumkin. Iltimos, keyinroq qayta urinib ko'ring.",
    "home.trending.unavailable":
      "Trend kriptovalyuta ma'lumotlari vaqtincha mavjud emas. Iltimos, keyinroq qayta tekshiring.",

    // Market table
    "market.rank": "#",
    "market.name": "Nomi",
    "market.price": "Narxi",
    "market.24h.change": "24s %",
    "market.market.cap": "Bozor kapitalizatsiyasi",
    "market.volume": "Hajm (24s)",
    "market.show": "Ko'rsatish:",
    "market.card.view": "Karta ko'rinishi",
    "market.table.view": "Jadval ko'rinishi",
    "market.view.details": "Batafsil ma'lumot",
    "market.first": "Birinchi",
    "market.previous": "Oldingi",
    "market.next": "Keyingi",
    "market.last": "Oxirgi",
    "market.showing": "Ko'rsatilmoqda",
    "market.of": "dan",
    "market.results": "natijalar",
    "market.try.different.search": "Boshqa qidiruv so'zini kiriting.",

    // Coin details
    "coin.price": "Narxi",
    "coin.market.cap": "Bozor kapitalizatsiyasi",
    "coin.24h.volume": "24s hajmi",
    "coin.circulating.supply": "Aylanmadagi taklif",
    "coin.total.supply": "Umumiy taklif",
    "coin.all.time.high": "Eng yuqori narx",
    "coin.price.change.24h": "Narx o'zgarishi (24s)",
    "coin.price.change.7d": "Narx o'zgarishi (7k)",
    "coin.price.change.30d": "Narx o'zgarishi (30k)",
    "coin.price.change.1y": "Narx o'zgarishi (1y)",
    "coin.low.24h": "Eng past (24s)",
    "coin.high.24h": "Eng yuqori (24s)",
    "coin.website": "Veb-sayt",
    "coin.explorer": "Eksplorer",
    "coin.not.available": "Mavjud emas",
    "coin.price.chart": "Narx grafigi",
    "coin.information": "Ma'lumot",
    "coin.about": "Haqida",
    "coin.no.description": "Tavsif mavjud emas",
    "coin.historical.data": "Tarixiy narx ma'lumotlari",
    "coin.past.24h": "O'tgan 24 soat",
    "coin.past.week": "O'tgan hafta",
    "coin.past.month": "O'tgan oy",
    "coin.past.3months": "O'tgan 3 oy",
    "coin.past.year": "O'tgan yil",
    "coin.all.time": "Barcha vaqt",

    // Exchanges
    "exchanges.title": "Kriptovalyuta birjalari",
    "exchanges.subtitle": "Savdo hajmi va ishonchliligi bo'yicha eng yaxshi kriptovalyuta birjalarini o'rganing",
    "exchanges.about.title": "Kriptovalyuta birjalari haqida",
    "exchanges.about.description":
      "Kriptovalyuta birjalari - bu kriptovalyutalarni sotib olish, sotish va almashtirish mumkin bo'lgan platformalar.",
    "exchanges.about.text":
      "Birjalar kriptovalyuta ekotizimida likvidlik va savdogarlar uchun bozor yaratib berish orqali muhim rol o'ynaydi. Birjani tanlashda savdo hajmi, qo'llab-quvvatlanadigan kriptovalyutalar, xavfsizlik choralari, to'lovlar va foydalanuvchi interfeysi kabi omillarni hisobga olish muhimdir. Quyida keltirilgan birjalar savdo hajmi, ishonchlilik va boshqa muhim ko'rsatkichlar asosida reytingga ega.",
    "exchanges.trust.score": "Ishonch reytingi",
    "exchanges.country": "Mamlakat",
    "exchanges.year.established": "Tashkil etilgan yil",
    "exchanges.website": "Veb-sayt",
    "exchanges.visit": "Tashrif buyurish",

    // Top Cryptocurrencies
    "top.crypto.title": "Top kriptovalyutalar",
    "top.crypto.subtitle":
      "Bozor kapitalizatsiyasi, hajmi va narx o'zgarishlari bo'yicha eng qimmatli kriptovalyutalarni o'rganing",
    "top.crypto.rankings": "Kriptovalyuta reytinglari",
    "top.crypto.rankings.description": "Bozordagi eng yaxshi kriptovalyutalar haqida batafsil ma'lumot",
    "top.crypto.by.market.cap": "Bozor kapitalizatsiyasi bo'yicha",
    "top.crypto.by.volume": "Hajm bo'yicha",
    "top.crypto.top.gainers": "Top o'suvchilar",
    "top.crypto.top.losers": "Top tushuvchilar",
    "top.crypto.market.cap.description":
      "Kriptovalyutalar bozor kapitalizatsiyasi bo'yicha tartiblangan (narx × aylanmadagi taklif)",
    "top.crypto.volume.description": "Kriptovalyutalar 24 soatlik savdo hajmi bo'yicha tartiblangan",
    "top.crypto.gainers.description": "Eng yuqori 24 soatlik narx o'sishiga ega kriptovalyutalar",
    "top.crypto.losers.description": "Eng katta 24 soatlik narx pasayishiga ega kriptovalyutalar",
    "top.crypto.understanding": "Kriptovalyuta reytinglarini tushunish",
    "top.crypto.market.cap.title": "Bozor kapitalizatsiyasi",
    "top.crypto.market.cap.text":
      "Bozor kapitalizatsiyasi kriptovalyutaning umumiy qiymatini anglatadi. U kriptovalyuta narxini aylanmadagi taklifga ko'paytirish orqali hisoblanadi. Bozor kapitalizatsiyasi ko'pincha kriptovalyutaning nisbiy hajmini baholash uchun ishlatiladi.",
    "top.crypto.volume.title": "Savdo hajmi",
    "top.crypto.volume.text":
      "Savdo hajmi o'tgan 24 soat ichida ma'lum bir kriptovalyuta bo'yicha barcha savdolarning umumiy qiymatini anglatadi. Yuqori savdo hajmi yuqori likvidlikni ko'rsatadi, bu esa odatda siz ushbu kriptovalyutani osonroq sotib olish va sotish imkoniyatiga ega ekanligingizni anglatadi.",
    "top.crypto.price.change.title": "Narx o'zgarishi",
    "top.crypto.price.change.text":
      "Narx o'zgarishi foizi kriptovalyuta narxi ma'lum vaqt davomida qanchalik oshgani yoki kamayganini ko'rsatadi. Bu ko'rsatkich trend kriptovalyutalarni va bozor dinamikasini aniqlashga yordam beradi.",
    "top.crypto.circulating.supply.title": "Aylanmadagi taklif",
    "top.crypto.circulating.supply.text":
      "Aylanmadagi taklif bozorda ommaviy ravishda mavjud va aylanmada bo'lgan tangalar yoki tokenlar sonini anglatadi. Bu kriptovalyutaning bozor kapitalizatsiyasini aniqlashda muhim omil hisoblanadi.",

    // Footer
    "footer.tagline": "Real vaqtda kriptovalyuta narxlari, bozor kapitalizatsiyasi va boshqalarni kuzating.",
    "footer.data.source": "Ma'lumotlar CoinGecko API tomonidan taqdim etilgan",
    "footer.products": "Mahsulotlar",
    "footer.crypto.market": "Kripto bozor",
    "footer.exchanges": "Birjalar",
    "footer.trending.coins": "Trend kriptovalyutalar",
    "footer.resources": "Resurslar",
    "footer.about.us": "Biz haqimizda",
    "footer.contact": "Aloqa",
    "footer.api.docs": "API hujjatlari",
    "footer.connect": "Bog'lanish",
    "footer.rights.reserved": "Barcha huquqlar himoyalangan.",
    "footer.newsletter": "Yangiliklar tasmamizga obuna bo'ling",
    "footer.subscribe": "Obuna bo'lish",

    // Language
    language: "Til",
    "language.english": "Ingliz",
    "language.uzbek": "O'zbek",

    // About page
    "about.title": "KriptoMarket haqida",
    "about.subtitle": "Real vaqtdagi kriptovalyuta ma'lumotlari va bozor tahlillari uchun ishonchli manba",
    "about.tabs.about": "Biz haqimizda",
    "about.tabs.data": "Ma'lumot manbalari",
    "about.tabs.features": "Imkoniyatlar",
    "about.tabs.faq": "Ko'p so'raladigan savollar",

    "about.mission.title": "Bizning vazifamiz",
    "about.mission.subtitle": "Barcha uchun shaffof va qulay kriptovalyuta ma'lumotlarini taqdim etish",
    "about.mission.paragraph1":
      "KriptoMarket oddiy vazifa bilan tashkil etilgan: kriptovalyuta ma'lumotlarini hamma uchun tushunarli, qulay va foydali qilish. Siz tajribali savdogar, yangi qiziquvchi yoki o'rtada bo'lsangiz ham, biz ishonchli ma'lumotlar kripto sohasida to'g'ri qarorlar qabul qilish uchun asos ekanligiga ishonamiz.",
    "about.mission.paragraph2":
      "Platformamiz ishonchli manbalardan real vaqtdagi ma'lumotlarni to'plab, sizga aniq bozor ma'lumotlari, narx tendensiyalari va tahlillarni taqdim etadi. Biz doimo rivojlanayotgan sohada shaffoflik, ishonchlilik va foydalanuvchilarni o'qitishga sodiqmiz.",

    "about.values.transparency.title": "Shaffoflik",
    "about.values.transparency.text":
      "Biz ma'lumot manbalarimiz va metodologiyamizni aniq ko'rsatamiz, shuning uchun ma'lumotlaringiz qayerdan kelganini doimo bilasiz.",
    "about.values.accessibility.title": "Qulaylik",
    "about.values.accessibility.text":
      "Platformamiz barcha tajriba darajasidagi foydalanuvchilar uchun intuitiv va qulay bo'lishi uchun ishlab chiqilgan.",
    "about.values.education.title": "Ta'lim",
    "about.values.education.text":
      "Biz foydalanuvchilarga aniq ma'lumotlar va resurslar orqali kriptovalyuta bozorini tushunishga yordam berishga intilamiz.",

    "about.data.title": "Ma'lumot manbalarimiz",
    "about.data.subtitle": "Ishonchli va yangilangan kriptovalyuta ma'lumotlari",
    "about.data.paragraph1":
      "KriptoMarket o'z ma'lumotlarini CoinGecko API-dan oladi, bu sohadagi eng keng qamrovli va ishonchli kriptovalyuta ma'lumotlari provayderlaridan biri. CoinGecko yuzlab birjalar va minglab bozorlardan ma'lumotlarni to'plab, aniq va yangilangan ma'lumotlarni ta'minlaydi.",
    "about.data.paragraph2":
      "Platformamiz bu ma'lumotlarni qayta ishlab, tushunarli formatda taqdim etadi, bu esa sizga minglab kriptovalyutalarning narxlari, bozor kapitalizatsiyasi, savdo hajmlari va boshqa muhim ko'rsatkichlarni kuzatish imkonini beradi.",

    "about.data.coingecko.title": "CoinGecko API",
    "about.data.coingecko.description":
      "CoinGecko quyidagilarni o'z ichiga olgan keng qamrovli kriptovalyuta ma'lumotlarini taqdim etadi:",
    "about.data.coingecko.feature1": "Ko'p birjalardan real vaqtdagi narx ma'lumotlari",
    "about.data.coingecko.feature2": "Tarixiy narx grafiklariva bozor ma'lumotlari",
    "about.data.coingecko.feature3": "Savdo hajmlari va bozor kapitalizatsiyasi",
    "about.data.coingecko.feature4": "Kriptovalyuta metama'lumotlari va loyiha ma'lumotlari",
    "about.data.coingecko.feature5": "Birja reytinglari va savdo juftliklari ma'lumotlari",
    "about.data.coingecko.learn.more": "CoinGecko API haqida ko'proq ma'lumot",
    "about.data.disclaimer":
      "Eslatma: Biz iloji boricha eng aniq ma'lumotlarni taqdim etishga harakat qilsak-da, kriptovalyuta bozorlari juda o'zgaruvchan, va ma'lumotlar API cheklovlari yoki bozor sharoitlari tufayli ba'zan kechikishi yoki to'liq bo'lmasligi mumkin.",

    "about.features.title": "Platforma imkoniyatlari",
    "about.features.subtitle": "KriptoMarket nimalarni taklif qilishini kashf eting",

    "about.features.market.title": "Real vaqtdagi bozor ma'lumotlari",
    "about.features.market.description":
      "Kriptovalyuta narxlari, bozor kapitalizatsiyasi va savdo hajmlarini avtomatik yangilanishlar bilan real vaqtda kuzating.",
    "about.features.market.feature1": "Minglab kriptovalyutalar uchun narx yangilanishlari",
    "about.features.market.feature2": "24 soatlik narx o'zgarishi ko'rsatkichlari",
    "about.features.market.feature3": "Bozor kapitalizatsiyasi reytinglari",

    "about.features.market.feature3": "Bozor kapitalizatsiyasi reytinglari",

    "about.features.charts.title": "Interaktiv narx grafiklar",
    "about.features.charts.description":
      "Bir nechta vaqt oraliqlarini va ko'rsatkichlarni o'z ichiga olgan interaktiv grafiklar bilan narx tendensiyalarini vizualizatsiya qiling.",
    "about.features.charts.feature1": "Tarixiy narx ma'lumotlarini vizualizatsiya qilish",
    "about.features.charts.feature2": "Savdo hajmi ko'rsatkichlari",
    "about.features.charts.feature3": "Ko'p vaqt oraliq variantlari (1K, 7K, 30K va boshqalar)",

    "about.features.details.title": "Kriptovalyuta tafsilotlari",
    "about.features.details.description":
      "Har bir kriptovalyuta haqida loyiha tafsilotlari va bozor ko'rsatkichlarini o'z ichiga olgan keng qamrovli ma'lumotlarga kirish.",
    "about.features.details.feature1": "Loyiha tavsifi va rasmiy havolalar",
    "about.features.details.feature2": "Taklif ma'lumotlari (aylanmadagi, umumiy, maksimal)",
    "about.features.details.feature3": "Barcha vaqtlar davomidagi eng yuqori/past narx ma'lumotlari",

    "about.features.exchanges.title": "Birja ma'lumotlari",
    "about.features.exchanges.description":
      "Kriptovalyuta birjalarini savdo hajmi, ishonch reytingi va boshqa ko'rsatkichlar asosida taqqoslang.",
    "about.features.exchanges.feature1": "Birja reytinglari va ishonch ko'rsatkichlari",
    "about.features.exchanges.feature2": "Savdo hajmi ma'lumotlari",
    "about.features.exchanges.feature3": "Birja tafsilotlari va veb-sayt havolalari",

    "about.features.trending.title": "Trend kriptovalyutalar",
    "about.features.trending.description": "Bozordagi eng mashhur va trend kriptovalyutalar haqida yangilanib turing.",
    "about.features.trending.feature1": "Eng ko'p qidirilgan kriptovalyutalar",
    "about.features.trending.feature2": "Bozor faoliyatiga asoslangan trend tangalar",
    "about.features.trending.feature3": "Trend tanga tafsilotlariga tezkor kirish",

    "about.features.responsive.title": "Moslashuvchan dizayn",
    "about.features.responsive.description":
      "KriptoMarketga har qanday qurilmadan to'liq moslashuvchan va mobil qurilmalarga mos dizayn bilan kiring.",
    "about.features.responsive.feature1": "Kompyuter, planshet va mobil qurilmalar uchun optimallashtirilgan",
    "about.features.responsive.feature2": "Qorong'i va yorug' mavzu qo'llab-quvvatlash",
    "about.features.responsive.feature3": "Qulay foydalanuvchi interfeysi",

    "about.faq.title": "Ko'p so'raladigan savollar",
    "about.faq.subtitle": "KriptoMarket va kriptovalyuta ma'lumotlari haqida umumiy savollar",
    "about.faq.q1": "Ma'lumotlar qanchalik tez-tez yangilanadi?",
    "about.faq.a1":
      "Kriptovalyuta ma'lumotlarimiz muntazam ravishda yangilanadi, ko'pgina bozor ma'lumotlari har bir necha daqiqada yangilanadi. API cheklovlari tufayli, ba'zi ma'lumotlar optimal ishlashni ta'minlash uchun 5 daqiqagacha keshlanishi mumkin.",
    "about.faq.q2": "KriptoMarketdan foydalanish bepulmi?",
    "about.faq.a2":
      "Ha, KriptoMarket butunlay bepul foydalanish mumkin. Biz hech qanday obuna yoki to'lovsiz kriptovalyuta ma'lumotlari va bozor ma'lumotlariga kirishni ta'minlaymiz.",
    "about.faq.q3": "Nima uchun men turli platformalarda bir xil kriptovalyuta uchun turli narxlarni ko'raman?",
    "about.faq.a3":
      "Kriptovalyuta narxlari turli birjalarda savdo hajmi, likvidlik va mintaqaviy farqlar kabi omillar tufayli farq qilishi mumkin. KriptoMarket bozorning keng qamrovli ko'rinishini taqdim etish uchun ko'plab manbalardan ma'lumotlarni to'playdi, ammo ma'lum birjalarga nisbatan ozgina farqlar bo'lishi mumkin.",
    "about.faq.q4": "KriptoMarket ma'lumotlaridan o'z loyihalarim uchun foydalana olamanmi?",
    "about.faq.a4":
      "KriptoMarket shaxsiy foydalanish va ma'lumot maqsadlari uchun mo'ljallangan. Agar siz kriptovalyuta ma'lumotlaridan tijorat ilovalarida yoki o'z loyihalaringizda foydalanmoqchi bo'lsangiz, biz CoinGecko API-ga to'g'ridan-to'g'ri tegishli atribut bilan va ularning xizmat shartlariga muvofiq kirishni tavsiya qilamiz.",
    "about.faq.q5": "Nima uchun ba'zi funksiyalar cheklangan yoki keshlangan ma'lumotlarni ko'rsatmoqda?",
    "about.faq.a5":
      "KriptoMarket CoinGecko API-ning bepul darajasidan foydalanadi, bu ma'lum cheklovlarga ega. Ushbu cheklovlarga rioya qilgan holda eng yaxshi tajribani ta'minlash uchun, biz ba'zan keshlangan ma'lumotlarni ko'rsatishimiz yoki haddan tashqari API chaqiruvlarini talab qiladigan ma'lum funksiyalarni cheklashimiz mumkin.",
    "about.faq.q6": "KriptoMarket CoinGecko bilan bog'liqmi?",
    "about.faq.a6":
      "Yo'q, KriptoMarket CoinGecko bilan rasmiy bog'liq emas. Biz ularning ommaviy API-sidan ma'lumot manbai sifatida foydalanamiz va tegishli atributni taqdim etamiz. KriptoMarket kriptovalyuta ma'lumotlarini yanada qulay va foydalanuvchilarga do'stona qilish uchun yaratilgan mustaqil platforma.",

    "about.contact.title": "Biz bilan bog'laning",
    "about.contact.subtitle":
      "Savollaringiz, fikr-mulohazalaringiz yoki takliflaringiz bormi? Sizdan eshitishni xohlaymiz!",
    "about.contact.form": "Aloqa formasi",
    "about.contact.email": "Bizga email yuboring",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "uz")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

