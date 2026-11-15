"use client";

import { useState } from "react";
import type { PlateMotif } from "@/types/menu";

interface DishIllustrationProps {
  name: string;
  imageUrl?: string;
  imageAlt: string;
  motif: PlateMotif;
  featured?: boolean;
}

const MOTIF_PALETTES: Record<
  PlateMotif,
  {
    bg: string;
    rim: string;
    plate: string;
    center: string;
    accent: string;
    label: string;
  }
> = {
  terracotta: {
    bg: "#EFE1D1",
    rim: "#9E3B1E",
    plate: "#DFC3A8",
    center: "#7E2C14",
    accent: "#C8643B",
    label: "Cerâmica de Barro",
  },
  olive: {
    bg: "#E6E9DC",
    rim: "#3A5332",
    plate: "#CFD6C2",
    center: "#293C23",
    accent: "#6A8258",
    label: "Colheita da Horta",
  },
  ochre: {
    bg: "#F2E6D0",
    rim: "#B87624",
    plate: "#E5CFA8",
    center: "#875314",
    accent: "#D4953B",
    label: "Tacho Dourado",
  },
  clay: {
    bg: "#ECE0D3",
    rim: "#7A553E",
    plate: "#D8C2AE",
    center: "#563A28",
    accent: "#A0765B",
    label: "Forno a Lenha",
  },
  charcoal: {
    bg: "#E7DFD7",
    rim: "#3B2D25",
    plate: "#CEC1B4",
    center: "#231913",
    accent: "#8A4326",
    label: "Parrilla & Brasa",
  },
  copper: {
    bg: "#F1E1D3",
    rim: "#A84E24",
    plate: "#E2C4AB",
    center: "#6E2F12",
    accent: "#CC7443",
    label: "Tacho de Cobre",
  },
};

/**
 * Exibe a fotografia do prato com renderização imediata (sem bloqueio por opacity-0 na hidratação SSR)
 * e fallback automático para uma composição geométrica em cerâmica rústica caso a imagem falhe.
 */
export function DishIllustration({
  name,
  imageUrl,
  imageAlt,
  motif,
}: DishIllustrationProps) {
  const [hasError, setHasError] = useState(false);
  const palette = MOTIF_PALETTES[motif] ?? MOTIF_PALETTES.terracotta;

  const showImage = Boolean(imageUrl) && !hasError;

  return (
    <div
      className="relative h-44 w-full overflow-hidden border-b border-[#D8C7B4] select-none sm:h-48"
      style={{ backgroundColor: palette.bg }}
    >
      {showImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={imageAlt || name}
            decoding="async"
            onError={() => setHasError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#231913]/40 via-transparent to-transparent"
          />
        </>
      ) : (
        <div
          role="img"
          aria-label={imageAlt || `Ilustração cerâmica para ${name}`}
          className="flex h-full w-full flex-col items-center justify-center p-4"
        >
          <svg
            viewBox="0 0 160 110"
            className="h-28 w-40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              cx="80"
              cy="55"
              r="46"
              fill={palette.plate}
              stroke={palette.rim}
              strokeWidth="2.5"
            />
            <circle
              cx="80"
              cy="55"
              r="37"
              stroke={palette.rim}
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            <circle
              cx="80"
              cy="55"
              r="24"
              fill={palette.bg}
              stroke={palette.accent}
              strokeWidth="1.75"
            />
            <path
              d="M68 55L80 43L92 55L80 67L68 55Z"
              fill={palette.accent}
              fillOpacity="0.25"
              stroke={palette.center}
              strokeWidth="1.5"
            />
            <circle cx="80" cy="55" r="4" fill={palette.center} />
            <line
              x1="20"
              y1="55"
              x2="28"
              y2="55"
              stroke={palette.rim}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="132"
              y1="55"
              x2="140"
              y2="55"
              stroke={palette.rim}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span
            className="mt-1 text-xs font-medium"
            style={{ color: palette.center }}
          >
            {palette.label}
          </span>
        </div>
      )}
    </div>
  );
}
