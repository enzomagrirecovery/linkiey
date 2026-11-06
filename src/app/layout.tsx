import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#EDF5FC",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://linkiey.com"),
  title: {
    default:
      "Linkiey — Jasa Pembuatan Website Rp 500rb di Awal & Rp 200rb/Bulan",
    template: "%s | Linkiey Indonesia",
  },
  description:
    "Jasa pembuatan website profesional di Indonesia oleh Linkiey. Klaim desain konsep gratis dulu—cukup Rp 500rb biaya setup awal dan Rp 200rb/bulan sudah termasuk cloud hosting cepat, SSL gratis, & revisi konten.",
  keywords: [
    "linkiey",
    "jasa pembuatan website",
    "website langganan bulanan",
    "jasa website murah profesional",
    "jasa desain web indonesia",
    "pembuatan website perusahaan",
    "jasa pembuatan web app custom",
    "website klinik",
    "website restoran",
    "website umkm",
  ],
  alternates: {
    canonical: "https://linkiey.com",
    languages: {
      "id-ID": "https://linkiey.com",
      "en-US": "https://linkiey.com?lang=en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title:
      "Linkiey — Website Bisnis Profesional. Rp 500rb di Awal + Rp 200rb/Bulan.",
    description:
      "Kami buatkan pratinjau konsep gratis dulu. Lengkap dengan cloud hosting cepat, SSL, dan bantuan update konten selamanya.",
    url: "https://linkiey.com",
    siteName: "Linkiey",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linkiey — Website Bisnis Rp 500rb di Awal + Rp 200rb/Bulan",
    description:
      "Klaim desain konsep 1-halaman gratis untuk bisnis Anda dalam 48 jam.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Linkiey",
  url: "https://linkiey.com",
  areaServed: {
    "@type": "Country",
    name: "Indonesia",
  },
  availableLanguage: ["Indonesian", "English"],
  priceRange: "Rp 500.000 setup + Rp 200.000 / bulan",
  description:
    "Layanan pembuatan dan pengelolaan website profesional dengan biaya setup Rp 500.000 dan langganan Rp 200.000/bulan, termasuk hosting premium, SSL, dan revisi via WhatsApp.",
  offers: [
    {
      "@type": "Offer",
      name: "Paket Website Bisnis Lengkap (Setup Rp 500rb + Rp 200rb/bulan)",
      price: "200000",
      priceCurrency: "IDR",
      description:
        "Biaya setup awal Rp 500.000 dan biaya bulanan Rp 200.000 setelahnya. Termasuk Hosting Cepat, SSL Gratis, & Update Konten.",
    },
    {
      "@type": "Offer",
      name: "Custom Web App, Backend & Database",
      description:
        "Pengembangan sistem kustom, backend, API, dan database dengan harga sesuai project.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geist.variable} light scroll-smooth`}>
      <head>
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-body-md text-body-md overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
