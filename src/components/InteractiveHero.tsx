"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpRightGlyph, WhatsAppGlyph } from "@/components/Icons";

// Tiny base64 sky-blue blur placeholder so the hero canvas is never blank even for 1ms
const SKY_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSIyNSIgdmlld0JveD0iMCAwIDQwIDI1Ij48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iMjUiIGZpbGw9IiNCOERDRkEiLz48Y2lyY2xlIGN4PSIyMCIgY3k9IjE4IiByPSIxNCIgZmlsbD0iI0VFRjhmRiIvPjwvc3ZnPg==";

export function InteractiveHero() {
  const { locale, t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const whatsappUrl =
    locale === "id"
      ? "https://wa.me/6281234567890?text=Halo%20Linkiey!%20Saya%20ingin%20klaim%20Desain%20Konsep%201-Halaman%20Gratis%20(Paket%20Rp%20500rb%20%2B%20Rp%20200rb%2Fbln)."
      : "https://wa.me/6281234567890?text=Hi%20Linkiey!%20I%27d%20love%20to%20claim%20a%20Free%201-Page%20Concept%20Design%20(Rp%20500k%20Upfront%20%2B%20Rp%20200k%2Fmo).";

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (bgRef.current) {
        bgRef.current.style.transform = `scale(1.06) translate3d(${x * -14}px, ${y * -14}px, 0)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (bgRef.current) {
      bgRef.current.style.transform = "scale(1.06) translate3d(0px, 0px, 0)";
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[1760px] 2xl:max-w-[94vw] mx-auto px-3 sm:px-5 lg:px-8 mb-8 sm:mb-14"
    >
      <div className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[calc(100svh-115px)] max-h-[920px] flex flex-col items-center justify-center text-center rounded-[1.5rem] sm:rounded-[2.5rem] 2xl:rounded-[3rem] overflow-hidden border border-white/85 shadow-[0_28px_80px_-20px_rgba(12,74,110,0.18)] p-6 sm:p-10 md:p-14 lg:px-16 lg:py-16">
        {/* Cloud Sky Background */}
        <div
          ref={bgRef}
          aria-hidden="true"
          className="absolute inset-0 fluid-transition will-change-transform"
          style={{ transform: "scale(1.06) translate3d(0px, 0px, 0)" }}
        >
          <Image
            src="/images/sky-bg.jpg"
            alt="Langit biru cerah dengan awan lembut"
            fill
            priority
            fetchPriority="high"
            quality={75}
            placeholder="blur"
            blurDataURL={SKY_BLUR_DATA_URL}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Soft Sky-Mist Gradient Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/25 via-sky-50/45 to-[#E2F0FB]/88"
        />

        {/* Centered Punchy Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-4 sm:gap-6">
          <h1 className="font-h1 text-[clamp(2rem,4.5vw,4.75rem)] text-sky-950 tracking-[-0.035em] leading-[1.05] font-semibold">
            {t.hero.h1Part1}{" "}
            <span className="bg-gradient-to-r from-sky-700 via-cyan-600 to-blue-800 bg-clip-text text-transparent">
              {t.hero.h1Highlight}
            </span>{" "}
            {t.hero.h1Part2}
          </h1>

          <p className="font-body-md text-[clamp(0.9rem,1.2vw,1.25rem)] text-sky-950/80 max-w-xl leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Primary Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3.5 pt-2 w-full sm:w-auto">
            <a
              href="#claim-blueprint"
              className="group bg-sky-900 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium fluid-transition hover:bg-sky-800 shadow-[0_14px_30px_-8px_rgba(12,74,110,0.3)] flex items-center justify-center gap-2 text-xs sm:text-sm xl:text-[15px]"
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowUpRightGlyph className="w-3.5 h-3.5 xl:w-4 xl:h-4 fluid-transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/85 backdrop-blur-xl border border-white text-sky-950 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium fluid-transition hover:bg-white flex items-center justify-center gap-2 text-xs sm:text-sm xl:text-[15px] shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <WhatsAppGlyph className="w-4 h-4 text-emerald-600" />
              <span>{t.hero.ctaWhatsapp}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
