"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  WhatsAppGlyph,
  CalendarSlotGlyph,
  MenuBarsGlyph,
  CrossGlyph,
} from "@/components/Icons";

const WHATSAPP_URL_ID =
  "https://wa.me/6281234567890?text=Halo%20Linkiey!%20Saya%20ingin%20klaim%20Desain%20Konsep%201-Halaman%20Gratis%20(Paket%20Rp%20500rb%20%2B%20Rp%20200rb%2Fbln).";
const WHATSAPP_URL_EN =
  "https://wa.me/6281234567890?text=Hi%20Linkiey!%20I%27d%20love%20to%20claim%20a%20Free%201-Page%20Concept%20Design%20(Rp%20500k%20Upfront%20%2B%20Rp%20200k%2Fmo).";

export function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const whatsappUrl = locale === "id" ? WHATSAPP_URL_ID : WHATSAPP_URL_EN;

  const navLinks = [
    { href: "#why-us", label: t.nav.whyUs },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#how-it-works", label: t.nav.howItWorks },
    { href: "#pricing", label: t.nav.pricing },
  ];

  return (
    <>
      <header className="fixed top-2.5 sm:top-4 left-0 right-0 z-50 px-3 sm:px-5 lg:px-8 pointer-events-none">
        <nav
          aria-label="Primary Navigation"
          className="max-w-[1760px] 2xl:max-w-[94vw] mx-auto sky-glass-panel rounded-full px-3.5 sm:px-6 flex justify-between items-center h-[52px] sm:h-[62px] pointer-events-auto fluid-transition"
        >
          <div className="flex items-center gap-6 lg:gap-10">
            <a
              className="font-bold tracking-tighter text-sky-950 text-[16px] sm:text-[18px] font-h1 flex items-center gap-2"
              href="#"
            >
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full bg-sky-600 inline-block shadow-[0_0_8px_rgba(2,132,199,0.6)]"
              />
              Linkiey
            </a>
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  className="text-sm font-medium tracking-tight text-sky-900/75 hover:text-sky-950 fluid-transition"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Controls: Clean ID / EN Switcher + WhatsApp + Book Call */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <div
              role="group"
              aria-label="Pilih Bahasa / Select Language"
              className="inline-flex items-center bg-sky-100/80 p-0.5 sm:p-1 rounded-full border border-sky-200/80"
            >
              <button
                type="button"
                onClick={() => setLocale("id")}
                className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider fluid-transition ${
                  locale === "id"
                    ? "bg-sky-900 text-white shadow-sm"
                    : "text-sky-800/70 hover:text-sky-950"
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider fluid-transition ${
                  locale === "en"
                    ? "bg-sky-900 text-white shadow-sm"
                    : "text-sky-800/70 hover:text-sky-950"
                }`}
              >
                EN
              </button>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-xs md:text-sm font-medium text-sky-950 bg-white/90 border border-white hover:border-emerald-500/50 px-3.5 py-1.5 sm:py-2 rounded-full fluid-transition shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{t.nav.whatsapp}</span>
            </a>

            <a
              className="hidden md:inline-flex bg-sky-900 text-white px-4 lg:px-5 py-2 rounded-full font-medium fluid-transition hover:bg-sky-800 text-xs lg:text-[13px] whitespace-nowrap shadow-sm items-center gap-2"
              href="#claim-blueprint"
            >
              <span>{t.nav.bookCall}</span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-1.5 sm:p-2 rounded-full border border-white bg-white/85 text-sky-950 hover:bg-white fluid-transition"
            >
              {mobileOpen ? (
                <CrossGlyph className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <MenuBarsGlyph className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Pill Drawer */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 mx-auto max-w-[1320px] rounded-2xl border border-white bg-white/95 backdrop-blur-2xl px-4 pt-3 pb-4 space-y-2.5 shadow-xl pointer-events-auto">
            <div className="flex flex-col space-y-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-sm font-medium text-sky-950 hover:bg-sky-50 fluid-transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="pt-2 border-t border-sky-100 grid grid-cols-2 gap-2">
              <a
                href="#claim-blueprint"
                onClick={() => setMobileOpen(false)}
                className="w-full bg-sky-900 text-white py-2.5 px-3 rounded-full font-medium text-center text-xs shadow-sm flex items-center justify-center gap-1.5"
              >
                <CalendarSlotGlyph className="w-3.5 h-3.5 text-sky-300" />
                <span>{t.nav.bookCall}</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 text-white py-2.5 px-3 rounded-full font-medium text-center text-xs shadow-sm flex items-center justify-center gap-1.5"
              >
                <WhatsAppGlyph className="w-3.5 h-3.5" />
                <span>{t.nav.whatsapp}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Compact Floating Quick-Action Dock (Bottom Right) */}
      <div className="fixed bottom-3.5 right-3.5 sm:bottom-5 sm:right-5 z-40 flex items-center gap-1.5 sky-glass-panel p-1 rounded-full">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold fluid-transition"
        >
          <WhatsAppGlyph className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
        <a
          href="#claim-blueprint"
          className="flex items-center gap-1.5 bg-sky-900 hover:bg-sky-800 text-white px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-semibold fluid-transition"
        >
          <span>{locale === "id" ? "Klaim Konsep" : "Free Concept"}</span>
        </a>
      </div>
    </>
  );
}
