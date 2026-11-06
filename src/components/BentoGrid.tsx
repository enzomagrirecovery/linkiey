"use client";

import * as React from "react";

export type BentoTile = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
};

export type BentoLayout = {
  columns: number;
  rows: number;
  tiles: BentoTile[];
  seed: number;
};

export type BentoVariant = "classic" | "interlock";
export type BentoTemplate = "Editorial" | "Dashboard" | "Gallery" | "Showcase";

const bentoTemplates: BentoTemplate[] = [
  "Editorial",
  "Dashboard",
  "Gallery",
  "Showcase",
];

const defaults = [
  "Make room for ideas",
  "In progress",
  "A little perspective",
  "Things worth keeping",
  "Next chapter",
  "Stay curious",
].map((label, i) => ({ id: `tile-${i + 1}`, label }));

function validateBento(layout: BentoLayout): string | null {
  if (
    ![layout.columns, layout.rows].every(
      (n) => Number.isInteger(n) && n >= 2 && n <= 8
    ) ||
    !Number.isSafeInteger(layout.seed)
  )
    return "Use 2–8 whole rows and columns, with an integer seed.";
  const cells = new Set<string>(),
    ids = new Set<string>();
  for (const tile of layout.tiles) {
    if (!tile.id || ids.has(tile.id) || typeof tile.label !== "string")
      return "Every tile needs a unique identity and text label.";
    ids.add(tile.id);
    if (
      ![tile.x, tile.y, tile.width, tile.height].every(Number.isInteger) ||
      tile.x < 0 ||
      tile.y < 0 ||
      tile.width < 1 ||
      tile.height < 1 ||
      tile.x + tile.width > layout.columns ||
      tile.y + tile.height > layout.rows
    )
      return "Tiles must stay inside the grid and occupy at least one cell.";
    for (let y = tile.y; y < tile.y + tile.height; y++)
      for (let x = tile.x; x < tile.x + tile.width; x++) {
        const cell = `${x},${y}`;
        if (cells.has(cell)) return "Tiles cannot overlap.";
        cells.add(cell);
      }
  }
  return cells.size === layout.columns * layout.rows
    ? null
    : "Tiles must cover the whole grid.";
}

function random(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export function generateBento(
  columns = 6,
  rows = 4,
  seed = 17,
  content: Pick<BentoTile, "id" | "label">[] = defaults,
  template: BentoTemplate = "Editorial"
): BentoLayout {
  if (
    ![columns, rows].every((n) => Number.isInteger(n) && n >= 2 && n <= 8) ||
    !Number.isSafeInteger(seed)
  )
    throw new Error("Use 2–8 whole rows and columns.");
  if (!content.length || content.length > columns * rows)
    throw new Error(
      "This grid cannot retain every tile. Increase its dimensions."
    );
  const next = random(seed + bentoTemplates.indexOf(template) * 7919);
  const rectangles = [{ x: 0, y: 0, width: columns, height: rows }];
  while (rectangles.length < content.length) {
    const candidates = rectangles
      .map((tile, index) => ({
        tile,
        index,
        score:
          tile.width *
          tile.height *
          (template === "Gallery" ? 1 : 0.65 + next() * 0.7),
      }))
      .filter(({ tile }) => tile.width > 1 || tile.height > 1)
      .sort((a, b) => b.score - a.score);
    const { tile, index } = candidates[0];
    const vertical =
      tile.height === 1 ||
      (tile.width > 1 &&
        (template === "Dashboard"
          ? tile.width >= tile.height
          : next() < tile.width / (tile.width + tile.height)));
    const length = vertical ? tile.width : tile.height;
    const cut =
      template === "Gallery"
        ? Math.floor(length / 2)
        : 1 + Math.floor(next() * (length - 1));
    rectangles.splice(
      index,
      1,
      ...(vertical
        ? [
            { ...tile, width: cut },
            { ...tile, x: tile.x + cut, width: tile.width - cut },
          ]
        : [
            { ...tile, height: cut },
            { ...tile, y: tile.y + cut, height: tile.height - cut },
          ])
    );
  }
  rectangles.sort((a, b) => a.y - b.y || a.x - b.x);
  const layout = {
    columns,
    rows,
    seed,
    tiles: rectangles.map((tile, i) => ({
      ...tile,
      id: content[i].id,
      label: content[i].label,
    })),
  };
  const error = validateBento(layout);
  if (error) throw new Error(error);
  return layout;
}

type Point = [number, number];

function bentoEdge(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  seed: number,
  outer: boolean
): [Point, Point, Point, Point] {
  if (x1 > x2 || y1 > y2) {
    const points = bentoEdge(x2, y2, x1, y1, seed, outer);
    return [points[3], points[2], points[1], points[0]];
  }
  const dx = x2 - x1,
    dy = y2 - y1,
    amplitude = outer
      ? 0
      : (random(
          seed + x1 * 73856093 + y1 * 19349663 + (dx ? 83492791 : 0)
        )() -
          0.5) *
        0.42;
  return [
    [x1, y1],
    [x1 + dx / 3 + dy * amplitude, y1 + dy / 3 + dx * amplitude],
    [x1 + (dx * 2) / 3 + dy * amplitude, y1 + (dy * 2) / 3 + dx * amplitude],
    [x2, y2],
  ];
}

function bentoTilePath(tile: BentoTile, layout: BentoLayout): string {
  const { x, y, width: w, height: h } = tile;
  let path = `M ${x} ${y}`;
  const append = (a: number, b: number, c: number, d: number) => {
    const p = bentoEdge(
      a,
      b,
      c,
      d,
      layout.seed,
      (a === c && (a === 0 || a === layout.columns)) ||
        (b === d && (b === 0 || b === layout.rows))
    );
    path += ` C ${p[1].join(" ")} ${p[2].join(" ")} ${p[3].join(" ")}`;
  };
  for (let i = 0; i < w; i++) append(x + i, y, x + i + 1, y);
  for (let i = 0; i < h; i++) append(x + w, y + i, x + w, y + i + 1);
  for (let i = w; i > 0; i--) append(x + i, y + h, x + i - 1, y + h);
  for (let i = h; i > 0; i--) append(x, y + i, x, y + i - 1);
  return path + " Z";
}

export type BentoGridProps = React.ComponentProps<"div"> & {
  layout: BentoLayout;
  variant?: BentoVariant;
  renderTile?: (tile: BentoTile, index: number) => React.ReactNode;
};

export function BentoGrid({
  layout,
  variant = "classic",
  renderTile,
  className = "",
  style,
  ...props
}: BentoGridProps) {
  const error = validateBento(layout);
  if (error) {
    return (
      <div {...props} role="alert" className={className} style={style}>
        {error}
      </div>
    );
  }

  return (
    <>
      <CojeevSkyBentoStyles />
      <div
        {...props}
        data-slot="bento-grid"
        data-variant={variant}
        className={`v-bento ${className}`.trim()}
        style={
          {
            "--bento-columns": layout.columns,
            "--bento-rows": layout.rows,
            ...style,
          } as React.CSSProperties
        }
      >
        {variant === "interlock" && (
          <svg
            className="v-bento__paint"
            viewBox={`0 0 ${layout.columns} ${layout.rows}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <g>
              {layout.tiles.map((tile, i) => (
                <path
                  key={`${tile.x},${tile.y}`}
                  className={`v-bento__color-${i % 6}`}
                  d={bentoTilePath(tile, layout)}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>
          </svg>
        )}
        {layout.tiles.map((tile, i) => (
          <div
            key={tile.id}
            data-bento-tile={tile.id}
            className={`v-bento__tile v-bento__color-${i % 6} fluid-card`}
            style={{
              gridColumn: `${tile.x + 1} / span ${tile.width}`,
              gridRow: `${tile.y + 1} / span ${tile.height}`,
            }}
          >
            {renderTile ? (
              renderTile(tile, i)
            ) : (
              <>
                <span className="v-bento__number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="v-bento__label">{tile.label}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

const COJEEV_SKY_CSS = `
.v-bento {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: repeat(var(--bento-columns), minmax(0, 1fr));
  grid-template-rows: repeat(var(--bento-rows), minmax(clamp(76px, 11vw, 124px), 1fr));
  gap: clamp(8px, 1.4vw, 14px);
  width: 100%;
  min-width: 0;
  container-type: inline-size;
}
.v-bento__tile {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: clamp(6px, 1vw, 12px);
  padding: clamp(11px, 2vw, 24px);
  min-width: 0;
  overflow-wrap: anywhere;
  border-radius: clamp(14px, 2vw, 24px);
  background: var(--bento-fill);
  border: 1px solid var(--bento-border, rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 18px 45px -16px rgba(12, 74, 110, 0.11);
  color: #0C233B;
}
.v-bento__number {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: clamp(9px, 1.1cqi, 12px);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.58;
  line-height: 1;
}
.v-bento__label {
  max-width: 24ch;
  font-weight: 650;
  font-size: clamp(11.5px, 2cqi, 21px);
  line-height: 1.18;
  letter-spacing: -0.025em;
  text-wrap: balance;
}
.v-bento__sub {
  font-size: clamp(9.5px, 1.25cqi, 13px);
  line-height: 1.3;
  opacity: 0.72;
  margin-top: 3px;
}
/* Sky-themed Cojeev Tonal Palette */
.v-bento__color-0 {
  --bento-fill: linear-gradient(145deg, rgba(255, 255, 255, 0.94), rgba(224, 242, 254, 0.88));
  --bento-border: rgba(125, 211, 252, 0.75);
}
.v-bento__color-1 {
  --bento-fill: linear-gradient(145deg, rgba(186, 230, 253, 0.72), rgba(240, 249, 255, 0.88));
  --bento-border: rgba(255, 255, 255, 0.92);
}
.v-bento__color-2 {
  --bento-fill: linear-gradient(145deg, rgba(255, 255, 255, 0.88), rgba(236, 253, 245, 0.8));
  --bento-border: rgba(167, 243, 208, 0.75);
}
.v-bento__color-3 {
  --bento-fill: linear-gradient(145deg, rgba(240, 249, 255, 0.92), rgba(224, 242, 254, 0.78));
  --bento-border: rgba(255, 255, 255, 0.95);
}
.v-bento__color-4 {
  --bento-fill: linear-gradient(145deg, rgba(12, 74, 110, 0.94), rgba(7, 89, 133, 0.96));
  --bento-border: rgba(56, 189, 248, 0.45);
  color: #F0F9FF;
}
.v-bento__color-5 {
  --bento-fill: linear-gradient(145deg, rgba(255, 255, 255, 0.88), rgba(224, 242, 254, 0.82));
  --bento-border: rgba(255, 255, 255, 0.92);
}
.v-bento__paint {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
  z-index: -1;
}
.v-bento__paint path {
  fill: rgba(255, 255, 255, 0.78);
  stroke: #DDEFFB;
  stroke-width: 8;
  stroke-linejoin: round;
}
.v-bento[data-variant="interlock"] {
  gap: 0;
}
.v-bento[data-variant="interlock"] > .v-bento__tile {
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: clamp(12px, 2.2vw, 26px);
}
`;

function CojeevSkyBentoStyles() {
  return (
    <style href="cojeev-sky-bento-grid" precedence="default">
      {COJEEV_SKY_CSS}
    </style>
  );
}
