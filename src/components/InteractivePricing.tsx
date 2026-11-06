"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

function CircleCheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="w-4 h-4 shrink-0 text-sky-700"
    >
      <circle
        cx="10"
        cy="10"
        r="7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        className="opacity-55"
      />
      <path
        d="M7 10.2L9.1 12.3L13.2 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InteractivePricing() {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<"standard" | "custom">(
    "standard"
  );

  const handleSelectPlan = (type: "standard" | "custom") => {
    setSelectedType(type);
    const label =
      type === "standard"
        ? t.form.planOptionStandard
        : t.form.planOptionCustom;
    window.dispatchEvent(
      new CustomEvent("auralis:select-plan", { detail: label })
    );
  };

  const std = t.pricing.standardPlan;
  const cst = t.pricing.customPlan;

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative max-w-[1120px] mx-auto px-3 sm:px-6 lg:px-8 mb-16 sm:mb-24 lg:mb-[120px] scroll-mt-20 py-6 sm:py-10"
    >
      {/* Subtle Sky Grid Lines Background (matches reference image aesthetic) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[2.5rem]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(12, 74, 110, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(12, 74, 110, 0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 70% 65% at 50% 35%, #000 35%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 65% at 50% 35%, #000 35%, transparent 100%)",
        }}
      />

      {/* Centered Header + Pill Toggle */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <h2
          id="pricing-heading"
          className="font-h2 text-[28px] sm:text-[42px] lg:text-[48px] text-sky-950 font-semibold tracking-tight leading-[1.08] mb-2.5"
        >
          {t.pricing.heading}
        </h2>
        <p className="text-xs sm:text-sm text-sky-900/70 mb-6">
          {t.pricing.sub}
        </p>

        {/* Pill Switcher */}
        <div
          role="group"
          aria-label="Select plan focus"
          className="inline-flex items-center p-1.5 rounded-full bg-white/75 backdrop-blur-xl border border-white shadow-[0_10px_30px_-10px_rgba(12,74,110,0.12)]"
        >
          <button
            type="button"
            onClick={() => handleSelectPlan("standard")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold fluid-transition flex items-center gap-2 ${
              selectedType === "standard"
                ? "bg-sky-900 text-white shadow-sm"
                : "text-sky-900/75 hover:text-sky-950"
            }`}
          >
            <span>{t.pricing.toggleStandard}</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                selectedType === "standard"
                  ? "bg-white/20 text-sky-100"
                  : "bg-sky-100 text-sky-800"
              }`}
            >
              {t.pricing.toggleBadge}
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleSelectPlan("custom")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold fluid-transition ${
              selectedType === "custom"
                ? "bg-sky-900 text-white shadow-sm"
                : "text-sky-900/75 hover:text-sky-950"
            }`}
          >
            {t.pricing.toggleCustom}
          </button>
        </div>
      </div>

      {/* Two Centered Compact Cards (Exact Reference Layout in Sky Color Scheme) */}
      <div className="max-w-[740px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-stretch">
        {/* Card 1: Custom Plan (Individuals/Left style) */}
        <div
          onMouseEnter={() => handleSelectPlan("custom")}
          onClick={() => handleSelectPlan("custom")}
          className={`cursor-pointer rounded-2xl p-6 sm:p-7 flex flex-col justify-between fluid-card ${
            selectedType === "custom"
              ? "bg-gradient-to-b from-white/95 via-sky-50/95 to-sky-100/90 border-2 border-sky-900 shadow-[0_24px_60px_-15px_rgba(12,74,110,0.2)]"
              : "bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_16px_40px_-16px_rgba(12,74,110,0.1)] hover:bg-white/90"
          }`}
        >
          <div>
            {/* Card Header */}
            <div className="flex items-center justify-between gap-2 mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-sky-950 tracking-tight">
                {cst.name}
              </h3>
            </div>

            {/* Big Price */}
            <div className="mb-6">
              <div className="text-2xl sm:text-[34px] font-bold text-sky-950 tracking-tight leading-none">
                {cst.priceValue}
              </div>
              <p className="text-[11px] sm:text-xs text-sky-900/60 mt-1.5">
                {cst.priceSub}
              </p>
            </div>

            {/* Tagline */}
            <p className="text-xs sm:text-[13px] font-semibold text-sky-950 mb-3.5">
              {cst.tagline}
            </p>

            {/* 5 Clean Bullet Lines */}
            <ul className="space-y-2.5 mb-8">
              {cst.pills.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-xs sm:text-[13px] text-sky-900/80"
                >
                  <CircleCheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#claim-blueprint"
            onClick={() => handleSelectPlan("custom")}
            className={`w-full py-2.5 px-4 rounded-lg text-xs sm:text-[13px] font-semibold flex items-center justify-center gap-2 fluid-transition ${
              selectedType === "custom"
                ? "bg-sky-900 text-white hover:bg-sky-800 shadow-sm"
                : "bg-white text-sky-950 border border-sky-200/90 hover:bg-sky-50"
            }`}
          >
            <span>{cst.ctaBook}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Card 2: Standard Website Plan (Highlighted Right Card with Most Popular Badge) */}
        <div
          onMouseEnter={() => handleSelectPlan("standard")}
          onClick={() => handleSelectPlan("standard")}
          className={`cursor-pointer rounded-2xl p-6 sm:p-7 flex flex-col justify-between fluid-card ${
            selectedType === "standard"
              ? "bg-gradient-to-b from-white/95 via-sky-50/95 to-sky-100/90 border-2 border-sky-900 shadow-[0_24px_60px_-15px_rgba(12,74,110,0.22)]"
              : "bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_16px_40px_-16px_rgba(12,74,110,0.1)] hover:bg-white/90"
          }`}
        >
          <div>
            {/* Card Header with Most Popular Pill */}
            <div className="flex items-center gap-2.5 mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-sky-950 tracking-tight">
                {std.name}
              </h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-sky-900/10 text-sky-950 border border-sky-300/60">
                <span aria-hidden="true">🔥</span>
                <span>{std.popularBadge}</span>
              </span>
            </div>

            {/* Big Price */}
            <div className="mb-6">
              <div className="text-3xl sm:text-[38px] font-bold text-sky-950 tracking-tight leading-none">
                {std.monthlyPrice}
              </div>
              <p className="text-[11px] sm:text-xs text-sky-900/65 mt-1.5 font-medium">
                {std.perMonthSub}
              </p>
            </div>

            {/* Tagline */}
            <p className="text-xs sm:text-[13px] font-semibold text-sky-950 mb-3.5">
              {std.tagline}
            </p>

            {/* 5 Clean Bullet Lines */}
            <ul className="space-y-2.5 mb-8">
              {std.pills.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-xs sm:text-[13px] text-sky-900/80"
                >
                  <CircleCheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#claim-blueprint"
            onClick={() => handleSelectPlan("standard")}
            className="w-full py-2.5 px-4 rounded-lg text-xs sm:text-[13px] font-semibold bg-sky-900 text-white hover:bg-sky-800 flex items-center justify-center gap-2 fluid-transition shadow-sm"
          >
            <span>{std.ctaBook}</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
