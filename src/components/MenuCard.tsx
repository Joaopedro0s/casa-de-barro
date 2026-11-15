"use client";

import { Clock, Minus, Plus, Sparkles } from "lucide-react";
import { DishIllustration } from "@/components/DishIllustration";
import { formatCurrency } from "@/lib/currency";
import type { MenuItem } from "@/types/menu";

interface MenuCardProps {
  item: MenuItem;
  quantityInCart: number;
  onAdd: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
}

export function MenuCard({
  item,
  quantityInCart,
  onAdd,
  onUpdateQuantity,
}: MenuCardProps) {
  return (
    <article
      className={`group flex flex-col justify-between overflow-hidden rounded-2xl border bg-[#FAF5EE] transition-colors ${
        quantityInCart > 0
          ? "border-[#9E3B1E]"
          : "border-[#D8C7B4] hover:border-[#B89F84]"
      }`}
    >
      <div>
        <div className="relative">
          <DishIllustration
            name={item.name}
            imageUrl={item.imageUrl}
            imageAlt={item.imageAlt}
            motif={item.motif}
            featured={item.featured}
          />

          {/* Selo de destaque da cozinha ou quantidade já na comanda */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
            {item.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#231913]/90 px-2.5 py-1 text-[11px] font-medium text-[#FAF5EE]">
                <Sparkles
                  className="h-3 w-3 text-[#E5A965]"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                Especialidade da Casa
              </span>
            )}
          </div>

          {quantityInCart > 0 && (
            <span
              aria-label={`${quantityInCart} na comanda`}
              className="tabular-nums absolute top-3 right-3 inline-flex items-center rounded-full bg-[#9E3B1E] px-2.5 py-1 text-xs font-semibold text-[#FAF5EE]"
            >
              {quantityInCart}x no pedido
            </span>
          )}
        </div>

        <div className="p-4 sm:p-5">
          {/* Tags de preparo e restrições */}
          {item.tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-[#ECE0D1] px-2 py-0.5 text-[11px] font-medium text-[#5A4638]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="font-display text-lg font-bold leading-snug text-[#231913] sm:text-xl">
            {item.name}
          </h3>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#7A6352]">
            <span>{item.servingSize}</span>
            {item.prepTime && (
              <span className="inline-flex items-center gap-1 tabular-nums">
                <Clock
                  className="h-3 w-3 text-[#9E3B1E]"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                Preparo: {item.prepTime}
              </span>
            )}
          </div>

          <p className="mt-2.5 text-sm leading-relaxed text-[#5A4638]">
            {item.description}
          </p>
        </div>
      </div>

      {/* Rodapé do cartão com preço e controles de adição/quantidade */}
      <div className="flex items-center justify-between gap-3 border-t border-[#E6D8C7] bg-[#F5ECE0]/60 px-4 py-3.5 sm:px-5">
        <div>
          <span className="block text-[11px] text-[#7A6352]">Valor</span>
          <span className="font-display tabular-nums text-xl font-bold text-[#231913]">
            {formatCurrency(item.price)}
          </span>
        </div>

        {quantityInCart === 0 ? (
          <button
            type="button"
            onClick={() => onAdd(item)}
            aria-label={`Adicionar ${item.name} ao pedido`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#9E3B1E] px-4 py-2.5 text-sm font-semibold text-[#FAF5EE] transition-colors hover:bg-[#7E2C14] active:bg-[#66220E]"
          >
            <Plus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Adicionar
          </button>
        ) : (
          <div
            role="group"
            aria-label={`Quantidade de ${item.name}`}
            className="inline-flex items-center rounded-xl border border-[#9E3B1E] bg-[#FAF5EE] p-1"
          >
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, quantityInCart - 1)}
              aria-label={`Diminuir quantidade de ${item.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#7E2C14] transition-colors hover:bg-[#ECE0D1]"
            >
              <Minus className="h-4 w-4" strokeWidth={2} />
            </button>
            <span
              aria-live="polite"
              className="tabular-nums min-w-[2rem] text-center text-sm font-bold text-[#231913]"
            >
              {quantityInCart}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, quantityInCart + 1)}
              aria-label={`Aumentar quantidade de ${item.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#9E3B1E] text-[#FAF5EE] transition-colors hover:bg-[#7E2C14]"
            >
              <Plus className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

