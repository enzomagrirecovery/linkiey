"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type Locale = "id" | "en";

export const TRANSLATIONS = {
  id: {
    nav: {
      whyUs: "Mengapa Linkiey",
      gallery: "Contoh Desain",
      howItWorks: "Cara Kerja",
      pricing: "Biaya",
      whatsapp: "WhatsApp",
      bookCall: "Klaim Konsep Gratis",
    },
    hero: {
      h1Part1: "Website Bisnis Terima Beres.",
      h1Highlight: "Rp 500rb di Awal.",
      h1Part2: "Rp 200rb/Bln.",
      subtitle:
        "Gratis desain konsep dulu. Sudah termasuk Hosting, SSL, & revisi via WhatsApp.",
      ctaPrimary: "Klaim Konsep Gratis",
      ctaWhatsapp: "Chat WhatsApp",
    },
    marqueeTitle: "Dipercaya bisnis modern di Indonesia",
    gallery: {
      heading: "Dirancang Sesuai Bisnis Anda",
      requestBtn: "Klaim Konsep Ini",
      items: {
        restaurant: {
          tabLabel: "Restoran & Kafe",
          title: "Oma Kitchen & Coffee",
          desc: "Menu digital interaktif, lokasi Google Maps, dan reservasi meja langsung ke WhatsApp.",
        },
        medical: {
          tabLabel: "Klinik & Konsultan",
          title: "Klinik Pratama Vanguard",
          desc: "Profil dokter & tim ahli, jadwal praktik harian, dan pendaftaran pasien via WhatsApp.",
        },
        service: {
          tabLabel: "Jasa & Kontraktor",
          title: "Lumina Arsitektur",
          desc: "Galeri portofolio proyek, halaman layanan SEO lokal, dan tombol estimasi biaya cepat.",
        },
      },
    },
    whyUs: {
      eyebrow: "Mengapa Linkiey",
      heading: "Simpel. Cepat. Terima Beres.",
      sub: "Tanpa biaya tersembunyi.",
      tiles: [
        {
          id: "upfront",
          num: "01",
          title: "Rp 500rb + Rp 200rb/bln",
          sub: "Gratis konsep dulu",
        },
        {
          id: "edits",
          num: "02",
          title: "Gratis Revisi WA",
          sub: "Beres di hari yang sama",
        },
        {
          id: "hosting",
          num: "03",
          title: "Gratis Hosting & SSL",
          sub: "Server cepat & aman",
        },
        {
          id: "speed",
          num: "04",
          title: "Online 3–5 Hari",
          sub: "Konsep dalam 48 jam",
        },
        {
          id: "modern",
          num: "05",
          title: "99+ Google Speed",
          sub: "Ringan di HP & SEO",
        },
        {
          id: "custom",
          num: "06",
          title: "Custom Backend — Sesuai Project",
          sub: "Database, POS & Dashboard Admin",
        },
      ],
    },
    steps: {
      eyebrow: "Cara Kerja • 3 Langkah",
      heading: "Dari konsep ke website aktif.",
      startLink: "Klaim Konsep Gratis",
      items: [
        {
          number: "01",
          title: "Konsep Gratis",
          subtitle: "Siap dalam 48 jam",
          desc: "Lihat desain 1-halaman dulu sebelum bayar.",
          pills: ["Rp 0 di Awal", "48 Jam Siap", "Tanpa Risiko"],
        },
        {
          number: "02",
          title: "Setup Rp 500rb",
          subtitle: "Sekali bayar saat cocok",
          desc: "Kami selesaikan semua halaman & sambungkan domain.",
          pills: ["Domain & SEO", "3–5 Hari Kerja", "Custom: Sesuai Project"],
        },
        {
          number: "03",
          title: "Rp 200rb / Bulan",
          subtitle: "Terima beres selamanya",
          desc: "Sudah termasuk Cloud Hosting, SSL & revisi via WA.",
          pills: ["Gratis Hosting", "SSL Aktif", "Gratis Revisi WA"],
        },
      ],
    },
    pricing: {
      eyebrow: "Harga Simpel",
      heading: "Simple Pricing",
      sub: "Pilih paket terbaik untuk kebutuhan bisnis Anda",
      toggleStandard: "Website Bisnis",
      toggleCustom: "Custom Sistem",
      toggleBadge: "Gratis Konsep",
      standardPlan: {
        name: "Website",
        popularBadge: "Paling Populer",
        upfrontPrice: "Rp 500rb",
        monthlyPrice: "Rp 200rb",
        perMonthSub: "Per bulan • Setup awal Rp 500rb",
        tagline: "Cocok untuk bisnis & UMKM",
        pills: [
          "Gratis konsep 1-halaman",
          "Desain HP & PC responsif",
          "Gratis Cloud Hosting & SSL",
          "Integrasi WA & Google Maps",
          "Gratis revisi via WhatsApp",
        ],
        ctaBook: "Mulai Sekarang",
      },
      customPlan: {
        name: "Custom",
        priceValue: "Sesuai Project",
        priceSub: "Mengikuti cakupan sistem & fitur",
        tagline: "Untuk web app & sistem khusus",
        pills: [
          "Backend & Database kustom",
          "Dashboard Admin / POS",
          "Integrasi Payment Gateway",
          "Login User & Multi-Role",
          "Dukungan Teknis & SLA",
        ],
        ctaBook: "Mulai Sekarang",
      },
    },
    form: {
      eyebrow: "Gratis Konsep 48 Jam",
      heading: "Lihat Desain Anda Sebelum Bayar.",
      sub: "Jadwalkan panggilan 15 menit atau chat langsung di WhatsApp.",
      fastTrackBadge: "Respon Cepat WA",
      fastTrackReply: "< 5 menit",
      fastTrackDesc: "Langsung chat nama usaha Anda di WhatsApp.",
      fastTrackBtn: "Chat di WhatsApp",
      tabCall: "Jadwalkan Call",
      tabWa: "Kirim ke WA",
      nameLabel: "Nama *",
      namePlaceholder: "Budi Santoso",
      whatsappLabel: "No. WhatsApp *",
      whatsappPlaceholder: "0812-3456-7890",
      emailLabel: "Email *",
      emailPlaceholder: "budi@bisnis.id",
      businessLabel: "Nama Usaha *",
      businessPlaceholder: "Klinik Senyum / Kopi Kita",
      planLabel: "Paket",
      planOptionStandard: "Website — Rp 500rb + Rp 200rb/bln",
      planOptionCustom: "Custom Sistem — Sesuai Project",
      slotLabel: "Pilih Jadwal (WIB)",
      slotNote: "Gratis Konsep",
      submitBtn: "Klaim Konsep Gratis",
      submittingBtn: "Mengirim...",
      waOpenBtn: "Kirim ke WhatsApp",
      slots: [
        "Besok • 10:00",
        "Besok • 14:00",
        "Kamis • 11:00",
        "Kamis • 16:00",
        "Jumat • 13:30",
        "Chat WA Saja",
      ],
    },
    footer: {
      rights: "© 2026 Linkiey. Rp 500rb di awal + Rp 200rb/bln.",
    },
  },
  en: {
    nav: {
      whyUs: "Why Linkiey",
      gallery: "Live Concepts",
      howItWorks: "How It Works",
      pricing: "Pricing",
      whatsapp: "WhatsApp",
      bookCall: "Free Concept",
    },
    hero: {
      h1Part1: "Your Business Website, Done.",
      h1Highlight: "Rp 500k Upfront.",
      h1Part2: "Rp 200k/Mo.",
      subtitle:
        "Free 1-page concept first. Includes Hosting, SSL, & WhatsApp edits.",
      ctaPrimary: "Claim Free Concept",
      ctaWhatsapp: "Chat WhatsApp",
    },
    marqueeTitle: "Trusted by modern businesses across Indonesia",
    gallery: {
      heading: "Built for Your Business",
      requestBtn: "Claim This Concept",
      items: {
        restaurant: {
          tabLabel: "Restaurant & Cafe",
          title: "Oma Kitchen & Coffee",
          desc: "Fast digital menus, Google Maps directions, and 1-click table bookings on WhatsApp.",
        },
        medical: {
          tabLabel: "Clinic & Advisory",
          title: "Vanguard Health Clinic",
          desc: "Practitioner profiles, daily schedules, and instant patient or client intake via WhatsApp.",
        },
        service: {
          tabLabel: "Local Services",
          title: "Lumina Architecture",
          desc: "Project portfolio galleries, local Google SEO pages, and fast quote dispatch.",
        },
      },
    },
    whyUs: {
      eyebrow: "Why Linkiey",
      heading: "Simple. Fast. Fully Managed.",
      sub: "Zero hidden fees.",
      tiles: [
        {
          id: "upfront",
          num: "01",
          title: "Rp 500k + Rp 200k/mo",
          sub: "Free concept first",
        },
        {
          id: "edits",
          num: "02",
          title: "Free WA Edits",
          sub: "Same-day updates",
        },
        {
          id: "hosting",
          num: "03",
          title: "Free Hosting & SSL",
          sub: "Fast managed cloud",
        },
        {
          id: "speed",
          num: "04",
          title: "Live in 3–5 Days",
          sub: "48h concept preview",
        },
        {
          id: "modern",
          num: "05",
          title: "99+ Google Speed",
          sub: "Mobile & SEO ready",
        },
        {
          id: "custom",
          num: "06",
          title: "Custom Backend — Sesuai Project",
          sub: "Databases, POS & Admin Dashboards",
        },
      ],
    },
    steps: {
      eyebrow: "How It Works • 3 Steps",
      heading: "From concept to live website.",
      startLink: "Claim Free Concept",
      items: [
        {
          number: "01",
          title: "Free Concept",
          subtitle: "Ready in 48 hours",
          desc: "Preview your 1-page design before paying a Rupiah.",
          pills: ["Rp 0 Upfront", "48h Preview", "Zero Risk"],
        },
        {
          number: "02",
          title: "Rp 500k Setup",
          subtitle: "One-time once approved",
          desc: "We build out your pages & connect your custom domain.",
          pills: ["Domain & SEO", "3–5 Days Build", "Custom: Sesuai Project"],
        },
        {
          number: "03",
          title: "Rp 200k / Month",
          subtitle: "Fully managed forever",
          desc: "Includes fast Cloud Hosting, SSL & WhatsApp edits.",
          pills: ["Free Hosting", "Active SSL", "Free WA Edits"],
        },
      ],
    },
    pricing: {
      eyebrow: "Simple Pricing",
      heading: "Simple Pricing",
      sub: "Choose the best plan for your needs",
      toggleStandard: "Business Website",
      toggleCustom: "Custom Systems",
      toggleBadge: "Free Concept",
      standardPlan: {
        name: "Website",
        popularBadge: "Most Popular",
        upfrontPrice: "Rp 500k",
        monthlyPrice: "Rp 200k",
        perMonthSub: "Per month • Rp 500k upfront setup",
        tagline: "Great for modern businesses",
        pills: [
          "Free 1-page concept",
          "Mobile & desktop design",
          "Free Cloud Hosting & SSL",
          "WhatsApp & Maps sync",
          "Unlimited WhatsApp edits",
        ],
        ctaBook: "Get started",
      },
      customPlan: {
        name: "Custom",
        priceValue: "Sesuai Project",
        priceSub: "Scoped to your backend & features",
        tagline: "For custom web apps & systems",
        pills: [
          "Custom Backend & Database",
          "Admin Dashboard / POS",
          "Payment Gateway sync",
          "User Auth & Multi-Role",
          "Dedicated Engineering SLA",
        ],
        ctaBook: "Get started",
      },
    },
    form: {
      eyebrow: "Free 48h Concept",
      heading: "Preview Your Site Before Paying.",
      sub: "Book a quick 15-min call or chat on WhatsApp.",
      fastTrackBadge: "Fastest via WA",
      fastTrackReply: "< 5 mins",
      fastTrackDesc: "Send your business name directly on WhatsApp.",
      fastTrackBtn: "Chat on WhatsApp",
      tabCall: "Book Call",
      tabWa: "Send via WA",
      nameLabel: "Name *",
      namePlaceholder: "Budi Santoso",
      whatsappLabel: "WhatsApp *",
      whatsappPlaceholder: "+62 812-3456-7890",
      emailLabel: "Email *",
      emailPlaceholder: "budi@business.id",
      businessLabel: "Business Name *",
      businessPlaceholder: "Oma Kitchen / Dental Clinic",
      planLabel: "Plan",
      planOptionStandard: "Website — Rp 500k + Rp 200k/mo",
      planOptionCustom: "Custom System — Sesuai Project",
      slotLabel: "Pick a Slot (WIB)",
      slotNote: "Free Concept",
      submitBtn: "Claim Free Concept",
      submittingBtn: "Sending...",
      waOpenBtn: "Send to WhatsApp",
      slots: [
        "Tomorrow • 10:00",
        "Tomorrow • 14:00",
        "Thu • 11:00",
        "Thu • 16:00",
        "Fri • 13:30",
        "WA Chat Only",
      ],
    },
    footer: {
      rights: "© 2026 Linkiey. Rp 500k upfront + Rp 200k/mo.",
    },
  },
} as const;

interface LanguageContextValue {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  t: (typeof TRANSLATIONS)["id"] | (typeof TRANSLATIONS)["en"];
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "id",
  setLocale: () => {},
  t: TRANSLATIONS.id,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("id");
  const value: LanguageContextValue = {
    locale,
    setLocale,
    t: TRANSLATIONS[locale],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
