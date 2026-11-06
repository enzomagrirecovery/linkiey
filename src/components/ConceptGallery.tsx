"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpRightGlyph, CheckGlyph } from "@/components/Icons";

type ConceptKey = "restaurant" | "medical" | "service";

const CONCEPT_KEYS: ConceptKey[] = ["restaurant", "medical", "service"];

const CONCEPT_IMAGES: Record<ConceptKey, { img: string; alt: string }> = {
  restaurant: {
    img: "/images/concept-restaurant.jpg",
    alt: "Pratinjau website restoran dan kafe modern",
  },
  medical: {
    img: "/images/concept-medical.jpg",
    alt: "Pratinjau website klinik medis dan konsultan",
  },
  service: {
    img: "/images/concept-service.jpg",
    alt: "Pratinjau website kontraktor dan jasa arsitektur",
  },
};

export function ConceptGallery() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const activeKey = CONCEPT_KEYS[activeIndex];
  const current = t.gallery.items[activeKey];
  const media = CONCEPT_IMAGES[activeKey];

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24 lg:mb-[120px] scroll-mt-20"
    >
      {/* Centered Heading (Matches Reference Layout) */}
      <h2
        id="gallery-heading"
        className="font-h2 text-center text-[26px] sm:text-[38px] lg:text-[46px] font-bold text-sky-950 tracking-tight leading-[1.1] mb-8 sm:mb-12"
      >
        {t.gallery.heading}
      </h2>

      {/* 2-Column Split: Left Vertical Step List + Right Showcase Image */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: 3 Interactive Vertical Items with Circle Indicators */}
        <div
          role="tablist"
          aria-label={t.gallery.heading}
          className="md:col-span-5 flex flex-col gap-6 sm:gap-8"
        >
          {CONCEPT_KEYS.map((key, idx) => {
            const item = t.gallery.items[key];
            const isSelected = idx === activeIndex;
            const isPassed = idx < activeIndex;

            return (
              <button
                key={key}
                type="button"
                role="tab"
                id={`tab-${key}`}
                aria-selected={isSelected}
                aria-controls={`panel-${key}`}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`group text-left flex items-start gap-4 sm:gap-5 fluid-transition ${
                  isSelected
                    ? "opacity-100"
                    : "opacity-40 hover:opacity-75"
                }`}
              >
                {/* Left Circle Indicator (Checkmark when active/passed, Number when upcoming) */}
                <span
                  className={`mt-1 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 text-xs sm:text-sm font-semibold fluid-transition ${
                    isSelected
                      ? "bg-sky-950 text-white shadow-[0_8px_20px_-4px_rgba(12,74,110,0.4)] scale-105"
                      : "border border-sky-900/40 text-sky-950 bg-white/40"
                  }`}
                >
                  {isSelected || isPassed ? (
                    <CheckGlyph className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </span>

                {/* Right Text Block */}
                <div className="space-y-1">
                  <h3 className="font-h3 text-lg sm:text-[22px] font-semibold text-sky-950 tracking-tight leading-snug">
                    {item.tabLabel}
                  </h3>
                  <p className="text-xs sm:text-[14px] text-sky-900/80 leading-relaxed max-w-sm">
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Clean Rounded Showcase Image */}
        <div
          role="tabpanel"
          id={`panel-${activeKey}`}
          aria-labelledby={`tab-${activeKey}`}
          className="md:col-span-7"
        >
          <div className="relative h-[260px] sm:h-[360px] lg:h-[410px] w-full rounded-2xl sm:rounded-[1.75rem] overflow-hidden border border-white/90 shadow-[0_28px_70px_-18px_rgba(12,74,110,0.22)] bg-white/80">
            <Image
              src={media.img}
              alt={media.alt}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 680px"
              className="object-cover fluid-transition"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sky-950/60 via-transparent to-transparent pointer-events-none" />

            {/* Subtle Bottom Caption & CTA Overlay */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-5 sm:left-5 sm:right-5 flex items-center justify-between gap-3">
              <span className="text-white font-semibold text-sm sm:text-base drop-shadow-sm">
                {current.title}
              </span>
              <a
                href="#claim-blueprint"
                className="bg-white/95 hover:bg-white text-sky-950 px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md fluid-transition"
              >
                <span>{t.gallery.requestBtn}</span>
                <ArrowUpRightGlyph className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
