"use client";

import Image from "next/image";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { InteractiveHero } from "@/components/InteractiveHero";
import { ConceptGallery } from "@/components/ConceptGallery";
import { InteractiveComparison } from "@/components/InteractiveComparison";
import { InteractiveSteps } from "@/components/InteractiveSteps";
import { InteractivePricing } from "@/components/InteractivePricing";
import { BlueprintForm } from "@/components/BlueprintForm";

const MARQUEE_BRANDS = [
  { name: "OMA KITCHEN", category: "F&B" },
  { name: "VANGUARD HEALTH", category: "KLINIK" },
  { name: "APEX ADVISORY", category: "PAJAK & AKUNTAN" },
  { name: "LUMINA BUILD", category: "ARSITEKTUR" },
  { name: "SOLVAY STUDIO", category: "ESTETIKA" },
  { name: "MERCER & CO", category: "FIRMA HUKUM" },
  { name: "KINETIX LOGISTICS", category: "KORPORAT" },
];

function LandingCanvas() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#D6ECFA] via-[#E5F2FC] to-[#D8EEFB] overflow-x-hidden">
      {/* Continuous Ambient Sky-Cloud Light Stream Across Entire Page */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <div className="w-[500px] h-[500px] bg-white/55 blur-3xl rounded-full absolute -top-24 left-1/4" />
        <div className="w-[600px] h-[600px] bg-sky-300/25 blur-3xl rounded-full absolute top-1/3 -right-40" />
        <div className="w-[550px] h-[550px] bg-white/50 blur-3xl rounded-full absolute bottom-1/4 -left-40" />
      </div>

      {/* FLOATING WATER-DROPLET PILL NAVBAR + ID/EN SWITCHER + WHATSAPP DOCK */}
      <Navbar />

      {/* MAIN FLUID CONTENT STREAM */}
      <main className="relative z-10 flex-grow pt-[68px] sm:pt-[86px] pb-10">
        {/* INTERACTIVE CLOUD SKY HERO SECTION */}
        <InteractiveHero />

        {/* EDITORIAL TYPOGRAPHIC TRUST STREAM */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center mt-4 sm:mt-6 mb-2">
          <h2 className="font-label-caps text-[10px] sm:text-[11px] text-sky-900/60 uppercase tracking-widest">
            {t.marqueeTitle}
          </h2>
        </section>
        <section
          aria-label="Partner brand showcase"
          className="w-full overflow-hidden mt-0 mb-12 sm:mb-20 py-3"
        >
          <div className="flex whitespace-nowrap overflow-hidden group">
            {[0, 1].map((dupIndex) => (
              <div
                key={dupIndex}
                aria-hidden={dupIndex === 1}
                className="flex items-center gap-10 sm:gap-16 animate-marquee group-hover:[animation-play-state:paused] pr-10 sm:pr-16"
              >
                {MARQUEE_BRANDS.map(({ name, category }) => (
                  <div
                    key={name}
                    className="flex items-center gap-2.5 text-sky-900/50 fluid-transition hover:text-sky-950"
                  >
                    <span className="font-bold text-sm sm:text-base tracking-tight">
                      {name}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/75 border border-sky-200/70 text-sky-800/70">
                      {category}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE LIVE WORK GALLERY / CONCEPT PREVIEWS */}
        <ConceptGallery />

        {/* INTERACTIVE PROBLEM GRID ("THE WHY US") */}
        <InteractiveComparison />

        {/* INTERACTIVE HOW IT WORKS (3 SIMPLE STEPS) */}
        <InteractiveSteps />

        {/* SINGLE PLAN (RP 500K + RP 200K/MO) + CUSTOM BACKEND PLAN (SESUAI PROJECT) */}
        <InteractivePricing />

        {/* CLOUD SKY LEAD CAPTURE / BOOK CALL OR WHATSAPP SECTION */}
        <BlueprintForm />
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full border-t border-white/80 bg-white/55 backdrop-blur-xl mt-auto py-8 sm:py-10">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
            <span className="font-bold tracking-tighter text-sky-950 font-h3 text-base sm:text-[18px] flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Linkiey Logo"
                width={26}
                height={26}
                className="w-6 h-6 rounded-md object-cover shadow-sm border border-sky-200/70"
              />
              <span>Linkiey</span>
            </span>
            <span className="text-[11px] sm:text-xs text-sky-900/65 font-body-md">
              {t.footer.rights}
            </span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <a
              className="text-xs sm:text-sm text-sky-900/75 hover:text-sky-950 fluid-transition"
              href="#why-us"
            >
              {t.nav.whyUs}
            </a>
            <a
              className="text-xs sm:text-sm text-sky-900/75 hover:text-sky-950 fluid-transition"
              href="#pricing"
            >
              {t.nav.pricing}
            </a>
            <a
              className="text-xs sm:text-sm text-sky-900/75 hover:text-sky-950 fluid-transition"
              href="#gallery"
            >
              {t.nav.gallery}
            </a>
            <a
              className="text-xs sm:text-sm text-sky-900/75 hover:text-sky-950 fluid-transition"
              href="#claim-blueprint"
            >
              {t.nav.bookCall}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <LandingCanvas />
    </LanguageProvider>
  );
}
