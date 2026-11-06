"use client";

interface PlanSelectButtonProps {
  planValue: string;
  label: string;
  featured?: boolean;
}

export function PlanSelectButton({
  planValue,
  label,
  featured = false,
}: PlanSelectButtonProps) {
  const handleClick = () => {
    window.dispatchEvent(
      new CustomEvent("auralis:select-plan", { detail: planValue })
    );
  };

  return (
    <a
      href="#claim-blueprint"
      onClick={handleClick}
      className={
        featured
          ? "w-full py-3.5 rounded-full bg-primary text-on-primary font-medium text-sm text-center hover:opacity-90 transition-opacity shadow-md block"
          : "w-full py-3.5 rounded-full border border-primary text-primary font-medium text-sm text-center hover:bg-primary hover:text-on-primary transition-colors block"
      }
    >
      {label}
    </a>
  );
}
