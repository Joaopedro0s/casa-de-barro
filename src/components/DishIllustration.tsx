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

const MOTIF_BACKGROUNDS: Record<
  PlateMotif,
  {
    bg: string;
    border: string;
    text: string;
  }
> = {
  terracotta: {
    bg: "#EFE1D1",
    border: "#9E3B1E",
    text: "#7E2C14",
  },
  olive: {
    bg: "#E6E9DC",
    border: "#3A5332",
    text: "#293C23",
  },
  ochre: {
    bg: "#F2E6D0",
    border: "#B87624",
    text: "#875314",
  },
  clay: {
    bg: "#ECE0D3",
    border: "#7A553E",
    text: "#563A28",
  },
  charcoal: {
    bg: "#E7DFD7",
    border: "#3B2D25",
    text: "#231913",
  },
  copper: {
    bg: "#F1E1D3",
    border: "#A84E24",
    text: "#6E2F12",
  },
};

/**
 * Exibe exclusivamente a fotografia real do prato.
 * Caso o prato esteja marcado com caminho de foto pendente (ex.: `images/pratos/cocada-PENDENTE.jpg`)
 * ou o arquivo fotográfico ainda não exista no servidor, exibe um quadro tipográfico neutro
 * indicando o arquivo pendente (sem gerar ilustrações, ícones ou figuras vetoriais).
 */
export function DishIllustration({
  name,
  imageUrl,
  imageAlt,
  motif,
}: DishIllustrationProps) {
  const [hasError, setHasError] = useState(false);
  const palette = MOTIF_BACKGROUNDS[motif] ?? MOTIF_BACKGROUNDS.terracotta;

  const isPendingPath = Boolean(imageUrl && imageUrl.includes("-PENDENTE"));
  const showRealPhoto = Boolean(imageUrl) && !isPendingPath && !hasError;

  return (
    <div
      className="relative h-44 w-full overflow-hidden border-b border-[#D8C7B4] select-none sm:h-48"
      style={{ backgroundColor: palette.bg }}
    >
      {showRealPhoto ? (
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
          aria-label={imageAlt || `Foto real pendente para ${name}`}
          className="flex h-full w-full flex-col items-center justify-center p-5 text-center"
        >
          <div
            className="w-full max-w-xs rounded-xl border border-dashed px-4 py-3"
            style={{ borderColor: palette.border }}
          >
            <p
              className="text-xs font-bold tracking-wide uppercase"
              style={{ color: palette.text }}
            >
              Foto real pendente
            </p>
            <p className="mt-1 line-clamp-1 text-xs font-medium text-[#231913]">
              {name}
            </p>
            {imageUrl && (
              <code className="mt-1.5 block truncate rounded bg-[#231913]/8 px-2 py-0.5 font-mono text-[11px] text-[#5A4638]">
                {imageUrl}
              </code>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
