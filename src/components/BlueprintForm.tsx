"use client";

import { useActionState, useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  submitBlueprintRequest,
  type BlueprintSubmissionState,
} from "@/app/actions";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowUpRightGlyph,
  CalendarSlotGlyph,
  WhatsAppGlyph,
  CheckGlyph,
} from "@/components/Icons";

const initialState: BlueprintSubmissionState = {
  success: false,
  message: "",
};

const LABEL_CLASSES =
  "block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-sky-900/75 mb-1.5";
const INPUT_CLASSES =
  "w-full h-10 sm:h-11 rounded-xl border border-sky-200/80 bg-white/95 px-3.5 text-xs sm:text-sm text-sky-950 placeholder:text-sky-900/40 focus:border-sky-700 focus:ring-2 focus:ring-sky-500/20 focus:outline-none fluid-transition";

export function BlueprintForm() {
  const { locale, t } = useLanguage();
  const [state, formAction, isPending] = useActionState(
    submitBlueprintRequest,
    initialState
  );

  const [mode, setMode] = useState<"call" | "whatsapp">("call");
  const [selectedSlotIdx, setSelectedSlotIdx] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<string>(
    t.form.planOptionStandard
  );

  const [nameInput, setNameInput] = useState<string>("");
  const [whatsappInput, setWhatsappInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [businessInput, setBusinessInput] = useState<string>("");
  const [renderedAt, setRenderedAt] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  useEffect(() => {
    setSelectedPlan(t.form.planOptionStandard);
  }, [locale, t.form.planOptionStandard]);

  useEffect(() => {
    const handlePlanSelect = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedPlan(customEvent.detail);
      }
    };
    window.addEventListener("auralis:select-plan", handlePlanSelect);
    return () => {
      window.removeEventListener("auralis:select-plan", handlePlanSelect);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (bgRef.current) {
        bgRef.current.style.transform = `scale(1.06) translate3d(${x * -14}px, ${y * -14}px, 0)`;
      }
      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${x * 6}px, ${y * 6}px, 0)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (bgRef.current) {
      bgRef.current.style.transform = "scale(1.06) translate3d(0px, 0px, 0)";
    }
    if (cardRef.current) {
      cardRef.current.style.transform = "translate3d(0px, 0px, 0)";
    }
  };

  const activeSlotLabel = t.form.slots[selectedSlotIdx] ?? t.form.slots[0];

  const whatsappDirectUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
    locale === "id"
      ? `Halo Linkiey! Saya ${nameInput || ""} ingin klaim Konsep Gratis${
          businessInput ? ` untuk ${businessInput}` : ""
        } (${selectedPlan} • Jadwal: ${activeSlotLabel}).`
      : `Hi Linkiey! I'm ${nameInput || ""} and I'd like to claim my Free Concept${
          businessInput ? ` for ${businessInput}` : ""
        } (${selectedPlan} • Slot: ${activeSlotLabel}).`
  )}`;

  return (
    <section
      id="claim-blueprint"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-labelledby="blueprint-heading"
      className="max-w-[1320px] mx-auto px-3 sm:px-6 lg:px-8 mb-16 sm:mb-24 scroll-mt-20"
    >
      <div className="relative rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden border border-white/85 shadow-[0_32px_90px_-20px_rgba(12,74,110,0.2)] p-5 sm:p-9 md:p-12 lg:p-14">
        {/* Parallax Cloud Sky Image Background */}
        <div
          ref={bgRef}
          aria-hidden="true"
          className="absolute inset-0 fluid-transition will-change-transform"
          style={{ transform: "scale(1.06) translate3d(0px, 0px, 0)" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=1800&auto=format&fit=crop"
            alt="Latar belakang langit biru cerah dan awan putih"
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Light, Airy Sky-Mist Overlay (Matches Top Hero) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-white/40 via-sky-50/55 to-[#E2F0FB]/90 pointer-events-none"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 items-center">
          {/* Left Editorial Column on Bright Sky Backdrop */}
          <div className="lg:col-span-5 text-sky-950 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/75 backdrop-blur-xl border border-white px-3.5 py-1 rounded-full text-[11px] font-medium text-sky-900 mb-4 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>{t.form.eyebrow}</span>
              </div>

              <h2
                id="blueprint-heading"
                className="font-h2 text-[24px] sm:text-[34px] lg:text-[40px] text-sky-950 tracking-tight leading-[1.1] mb-3.5"
              >
                {t.form.heading}
              </h2>

              <p className="font-body-md text-xs sm:text-[15px] text-sky-950/75 leading-relaxed mb-6">
                {t.form.sub}
              </p>
            </div>

            {/* Direct WhatsApp Fast-Track Card */}
            <div className="sky-glass-card rounded-2xl sm:rounded-[1.75rem] p-4 sm:p-5 fluid-card">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-sky-900">
                    {t.form.fastTrackBadge}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold">
                  {t.form.fastTrackReply}
                </span>
              </div>
              <p className="text-xs text-sky-900/75 mb-3.5">
                {t.form.fastTrackDesc}
              </p>
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 sm:h-11 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 rounded-full text-xs sm:text-sm fluid-transition flex items-center justify-center gap-2 shadow-sm"
              >
                <WhatsAppGlyph className="w-4 h-4" />
                <span>{t.form.fastTrackBtn}</span>
                <ArrowUpRightGlyph className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Uniformed Sky-Glass Form Card */}
          <div className="lg:col-span-7">
            <div
              ref={cardRef}
              className="sky-glass-panel rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-7 fluid-transition will-change-transform"
            >
              {/* Uniform Channel Switcher */}
              <div className="grid grid-cols-2 bg-sky-100/70 p-1 rounded-xl border border-sky-200/70 mb-5">
                <button
                  type="button"
                  onClick={() => setMode("call")}
                  className={`h-9 sm:h-10 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 fluid-transition ${
                    mode === "call"
                      ? "bg-sky-900 text-white shadow-sm"
                      : "text-sky-900/70 hover:text-sky-950"
                  }`}
                >
                  <CalendarSlotGlyph className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{t.form.tabCall}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("whatsapp")}
                  className={`h-9 sm:h-10 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 fluid-transition ${
                    mode === "whatsapp"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-sky-900/70 hover:text-sky-950"
                  }`}
                >
                  <WhatsAppGlyph className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{t.form.tabWa}</span>
                </button>
              </div>

              {/* UNIFORM 2x2 FORM GRID */}
              <form action={formAction} className="space-y-3.5 sm:space-y-4">
                <input
                  type="text"
                  name="company_website_trap"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="slot" value={activeSlotLabel} />
                <input
                  type="hidden"
                  name="form_rendered_at"
                  value={renderedAt}
                />

                {/* Row 1: Full Name + WhatsApp Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="blueprint-name" className={LABEL_CLASSES}>
                      {t.form.nameLabel}
                    </label>
                    <input
                      id="blueprint-name"
                      name="name"
                      required
                      maxLength={80}
                      autoComplete="name"
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder={t.form.namePlaceholder}
                      className={INPUT_CLASSES}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="blueprint-whatsapp"
                      className={LABEL_CLASSES}
                    >
                      {t.form.whatsappLabel}
                    </label>
                    <input
                      id="blueprint-whatsapp"
                      name="whatsapp"
                      required
                      maxLength={24}
                      autoComplete="tel"
                      type="tel"
                      value={whatsappInput}
                      onChange={(e) => setWhatsappInput(e.target.value)}
                      placeholder={t.form.whatsappPlaceholder}
                      className={INPUT_CLASSES}
                    />
                  </div>
                </div>

                {/* Row 2: Work Email + Business Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="blueprint-email" className={LABEL_CLASSES}>
                      {t.form.emailLabel}
                    </label>
                    <input
                      id="blueprint-email"
                      name="email"
                      required
                      maxLength={120}
                      autoComplete="email"
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder={t.form.emailPlaceholder}
                      className={INPUT_CLASSES}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="blueprint-business"
                      className={LABEL_CLASSES}
                    >
                      {t.form.businessLabel}
                    </label>
                    <input
                      id="blueprint-business"
                      name="business"
                      required
                      maxLength={100}
                      autoComplete="organization"
                      type="text"
                      value={businessInput}
                      onChange={(e) => setBusinessInput(e.target.value)}
                      placeholder={t.form.businessPlaceholder}
                      className={INPUT_CLASSES}
                    />
                  </div>
                </div>

                {/* Row 3: Full-Width Uniform Service Type Selector */}
                <div>
                  <label htmlFor="plan-select" className={LABEL_CLASSES}>
                    {t.form.planLabel}
                  </label>
                  <select
                    id="plan-select"
                    name="plan"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className={INPUT_CLASSES}
                  >
                    <option value={t.form.planOptionStandard}>
                      {t.form.planOptionStandard}
                    </option>
                    <option value={t.form.planOptionCustom}>
                      {t.form.planOptionCustom}
                    </option>
                  </select>
                </div>

                {/* Row 4: Uniform 6-Button Discovery Slot Grid */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-sky-900/75">
                      {t.form.slotLabel}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-medium text-emerald-700">
                      {t.form.slotNote}
                    </span>
                  </div>
                  <div
                    role="radiogroup"
                    aria-label={t.form.slotLabel}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-2"
                  >
                    {t.form.slots.map((slot, idx) => {
                      const active = selectedSlotIdx === idx;
                      return (
                        <button
                          key={slot}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => setSelectedSlotIdx(idx)}
                          className={`h-9 sm:h-10 px-2.5 rounded-xl border text-[11px] sm:text-xs font-medium text-center fluid-transition flex items-center justify-center gap-1 ${
                            active
                              ? "border-sky-800 bg-sky-900 text-white shadow-sm"
                              : "border-sky-200/80 bg-white/95 text-sky-900 hover:border-sky-400"
                          }`}
                        >
                          {active && (
                            <CheckGlyph className="w-3 h-3 text-sky-300 shrink-0" />
                          )}
                          <span className="truncate">{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Primary Submit Action */}
                {mode === "call" ? (
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-11 sm:h-12 bg-sky-900 text-white rounded-full font-semibold text-xs sm:text-sm hover:bg-sky-800 disabled:opacity-60 fluid-transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>
                      {isPending ? t.form.submittingBtn : t.form.submitBtn}
                    </span>
                    <ArrowUpRightGlyph className="w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-11 sm:h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-semibold text-xs sm:text-sm fluid-transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <WhatsAppGlyph className="w-4 h-4" />
                    <span>{t.form.waOpenBtn}</span>
                    <ArrowUpRightGlyph className="w-4 h-4" />
                  </a>
                )}

                {state.message && (
                  <p
                    role="status"
                    className={`text-center text-xs sm:text-sm font-medium rounded-xl py-2.5 px-3 border ${
                      state.success
                        ? "text-emerald-900 bg-emerald-500/15 border-emerald-500/30"
                        : "text-error bg-error-container/40 border-error/20"
                    }`}
                  >
                    {state.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
