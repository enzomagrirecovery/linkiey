"use client";

import React from "react";

interface CardProps {
  number: string;
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple";
  className?: string;
  rotate?: string;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const Card = ({
  number,
  title,
  description,
  colorTheme = "blue",
  className = "",
  rotate = "",
  colors: customColors,
}: CardProps) => {
  const defaultBgColors = {
    orange: "bg-sky-50/95",
    blue: "bg-cyan-50/95",
    purple: "bg-emerald-50/90",
  };
  const defaultTextColors = {
    orange: "text-sky-600",
    blue: "text-cyan-700",
    purple: "text-emerald-600",
  };
  const defaultBorderColors = {
    orange: "border-sky-200/85",
    blue: "border-cyan-200/85",
    purple: "border-emerald-200/85",
  };

  const bgColor = customColors?.bg || defaultBgColors[colorTheme];
  const textColor = customColors?.text || defaultTextColors[colorTheme];
  const borderColor = customColors?.border || defaultBorderColors[colorTheme];

  return (
    <div
      className={`w-[58%] max-w-[290px] sm:w-[250px] md:w-[285px] transition-transform duration-300 hover:z-30 hover:scale-105 ${rotate} ${className}`}
    >
      <div className="bg-white/95 backdrop-blur-xl p-1.5 sm:p-2.5 rounded-[20px] sm:rounded-[25px] shadow-[0_16px_36px_-10px_rgba(12,74,110,0.18)] border border-white">
        <Pin
          className={`w-6 h-6 sm:w-8 sm:h-8 ${textColor} z-20 mb-2 sm:mb-4 mx-auto drop-shadow-sm`}
        />
        <div
          className={`${bgColor} border ${borderColor} rounded-[13px] sm:rounded-[16px] p-3 sm:p-4 h-full flex flex-col relative overflow-hidden`}
        >
          <span
            className={`${textColor} text-2xl sm:text-4xl font-bold mb-1.5 sm:mb-3 leading-none`}
            style={{
              fontFamily:
                '"Comic Sans MS", "Chalkboard SE", cursive, sans-serif',
            }}
          >
            {number}
          </span>
          <h3 className="text-base sm:text-2xl font-semibold text-sky-950 leading-tight mb-1 sm:mb-2">
            {title}
          </h3>
          <p className="text-sky-900/75 text-[11.5px] sm:text-sm leading-snug tracking-tight">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export interface Step {
  title: string;
  description: string;
  colorTheme?: "orange" | "blue" | "purple";
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

export interface StepPosition {
  className?: string;
  rotate?: string;
}

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

// Percentage-based positions so Mobile, iPad, and Desktop all keep the exact
// staggered tilted layout and connect cleanly to the SVG dashed path.
const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  {
    className: "absolute top-[1%] left-[2%] sm:left-[10%] md:left-[14%] z-10",
    rotate: "rotate-[6deg]",
  },
  {
    className: "absolute top-[27%] right-[2%] sm:right-[10%] md:right-[14%] z-20",
    rotate: "-rotate-[6deg]",
  },
  {
    className: "absolute top-[60%] left-[2%] sm:left-[10%] md:left-[14%] z-10",
    rotate: "rotate-[6deg]",
  },
  {
    className: "absolute top-[74%] right-[4%] sm:right-[10%] z-20",
    rotate: "-rotate-[6deg]",
  },
  {
    className: "absolute top-[88%] left-[4%] sm:left-[14%] z-10",
    rotate: "rotate-[6deg]",
  },
];

export default function HowItWorks({
  features,
  className = "",
  stepPositions,
}: HowItWorksProps) {
  const defaultFeatures: Step[] = [
    {
      title: "Konsep Gratis",
      description: "Lihat desain 1-halaman dulu sebelum bayar.",
      colorTheme: "orange",
    },
    {
      title: "Setup Rp 500rb",
      description: "Kami selesaikan semua halaman & sambungkan domain.",
      colorTheme: "blue",
    },
    {
      title: "Rp 200rb / Bulan",
      description: "Sudah termasuk Cloud Hosting, SSL & revisi via WA.",
      colorTheme: "purple",
    },
  ];

  const data = features && features.length > 0 ? features : defaultFeatures;
  const positions = stepPositions || DEFAULT_CARD_POSITIONS;

  const viewBoxHeight = 700;
  const pathD = data.reduce((acc, _, index) => {
    if (index >= data.length - 1) return acc;
    if (index === 0) return "M 280 120 C 520 120, 560 280, 720 280"; // 1 -> 2
    if (index === 1) return acc + " C 840 280, 500 390, 280 500"; // 2 -> 3
    if (index === 2) return acc + " C 280 580, 550 640, 750 640"; // 3 -> 4
    return acc;
  }, "");

  return (
    <div
      className={`rounded-[1.75rem] sm:rounded-[2.5rem] sky-glass-panel py-8 sm:py-14 md:py-16 px-2 sm:px-6 md:px-8 relative overflow-hidden ${className}`}
    >
      <style>{`
        @keyframes dashFlow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -140; }
        }
        .how-it-works-dash {
          animation: dashFlow 3s linear infinite;
        }
      `}</style>

      {/* Horizontal Notebook Lines Visible on Mobile, Tablet & Desktop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.1]"
        style={{
          backgroundImage: "linear-gradient(#0c4a6e 1px, transparent 1px)",
          backgroundSize: "100% 28px",
          marginTop: "4px",
        }}
      />
      <div className="from-[#E5F2FC]/65 pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-1/4 bg-gradient-to-r" />
      <div className="from-[#E5F2FC]/65 pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-1/4 bg-gradient-to-l" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="relative w-full max-w-[1000px] mx-auto block h-[470px] sm:h-[580px] md:h-[680px]">
          {/* Animated Dashed Connector Line — Visible on All Devices (Mobile + Desktop) */}
          {data.length > 1 && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none block z-0"
              viewBox={`0 0 1000 ${viewBoxHeight}`}
              preserveAspectRatio="none"
            >
              <path
                d={pathD}
                stroke="currentColor"
                className="text-sky-700/55 how-it-works-dash"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                fill="none"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          )}

          {data.map((step, index) => {
            const position = positions[index % positions.length];

            return (
              <Card
                key={step.title}
                number={`0${index + 1}`}
                title={step.title}
                description={step.description}
                colorTheme={step.colorTheme || "blue"}
                colors={step.colors}
                rotate={position.rotate}
                className={position.className}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
