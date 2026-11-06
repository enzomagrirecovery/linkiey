"use client";

import { useLanguage } from "@/context/LanguageContext";
import HowItWorks, { type Step } from "@/components/ui/how-it-works";

const THEMES: Array<"orange" | "blue" | "purple"> = [
  "orange",
  "blue",
  "purple",
];

export function InteractiveSteps() {
  const { t } = useLanguage();

  const features: Step[] = t.steps.items.map((item, idx) => ({
    title: item.title,
    description: item.desc,
    colorTheme: THEMES[idx % THEMES.length],
  }));

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="max-w-[1180px] mx-auto px-3 sm:px-6 lg:px-8 mb-14 sm:mb-24 lg:mb-[120px] scroll-mt-20 relative"
    >
      {/* Centered Header */}
      <div className="text-center mb-6 sm:mb-10">
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-sky-700 mb-1.5">
          {t.steps.eyebrow}
        </p>
        <h2
          id="how-it-works-heading"
          className="font-h2 text-[24px] sm:text-[36px] lg:text-[44px] text-sky-950 font-semibold tracking-tight leading-[1.1]"
        >
          {t.steps.heading}
        </h2>
      </div>

      <HowItWorks features={features} />
    </section>
  );
}
