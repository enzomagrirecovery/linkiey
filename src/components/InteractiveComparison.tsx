"use client";

import { useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { BentoGrid, type BentoLayout } from "@/components/BentoGrid";

export function InteractiveComparison() {
  const { t } = useLanguage();
  const tilesData = t.whyUs.tiles;

  // Fixed 6x4 rectangular partition where every tile stays in the exact same
  // grid coordinates on mobile, iPad, and desktop (every tile has width >= 2).
  const layout: BentoLayout = useMemo(
    () => ({
      columns: 6,
      rows: 4,
      seed: 17,
      tiles: [
        {
          id: tilesData[0].id,
          x: 0,
          y: 0,
          width: 4,
          height: 2,
          label: tilesData[0].title,
        },
        {
          id: tilesData[1].id,
          x: 4,
          y: 0,
          width: 2,
          height: 2,
          label: tilesData[1].title,
        },
        {
          id: tilesData[2].id,
          x: 0,
          y: 2,
          width: 2,
          height: 2,
          label: tilesData[2].title,
        },
        {
          id: tilesData[3].id,
          x: 2,
          y: 2,
          width: 2,
          height: 1,
          label: tilesData[3].title,
        },
        {
          id: tilesData[4].id,
          x: 4,
          y: 2,
          width: 2,
          height: 1,
          label: tilesData[4].title,
        },
        {
          id: tilesData[5].id,
          x: 2,
          y: 3,
          width: 4,
          height: 1,
          label: tilesData[5].title,
        },
      ],
    }),
    [tilesData]
  );

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-heading"
      className="max-w-[1320px] mx-auto px-3 sm:px-6 lg:px-8 mb-14 sm:mb-24 lg:mb-[120px] scroll-mt-20 relative"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6 mb-6 sm:mb-9 relative z-10 px-1">
        <div className="max-w-2xl">
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-sky-700 mb-1.5">
            {t.whyUs.eyebrow}
          </p>
          <h2
            id="why-us-heading"
            className="font-h2 text-[22px] sm:text-[34px] lg:text-[42px] text-sky-950 tracking-tight leading-[1.1]"
          >
            {t.whyUs.heading}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-sky-900/75 max-w-sm">
          {t.whyUs.sub}
        </p>
      </div>

      {/* Cojeev 000h Partitioned Bento Grid — Fixed Positions Across All Devices */}
      <BentoGrid
        layout={layout}
        variant="classic"
        renderTile={(_tile, i) => {
          const item = tilesData[i];
          return (
            <>
              <span className="v-bento__number">{item.num}</span>
              <div>
                <div className="v-bento__label">{item.title}</div>
                <div className="v-bento__sub">{item.sub}</div>
              </div>
            </>
          );
        }}
      />
    </section>
  );
}
