"use client";

import { Search, X } from "lucide-react";
import type { CategoryId, DietaryTag, MenuCategory } from "@/types/menu";

interface CategoryNavProps {
  categories: MenuCategory[];
  activeCategory: CategoryId | "all";
  onSelectCategory: (category: CategoryId | "all") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTag: DietaryTag | null;
  onSelectTag: (tag: DietaryTag | null) => void;
  totalMatchingItems: number;
}

const QUICK_TAGS: DietaryTag[] = [
  "Assado na lenha",
  "Panela de barro",
  "Para compartilhar",
  "Vegetariano",
  "Sem glúten",
];

export function CategoryNav({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  activeTag,
  onSelectTag,
  totalMatchingItems,
}: CategoryNavProps) {
  const hasActiveFilters =
    activeCategory !== "all" ||
    searchQuery.trim() !== "" ||
    activeTag !== null;

  return (
    <section
      aria-label="Filtros e navegação do cardápio"
      className="sticky top-0 z-20 border-b border-[#D8C7B4] bg-[#F6EFE6]/95 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Campo de busca de pratos ou ingredientes */}
          <div className="relative flex-1 md:max-w-md">
            <label htmlFor="menu-search-input" className="sr-only">
              Buscar prato ou ingrediente
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#7A6352]"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <input
              id="menu-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar prato, corte ou ingrediente (ex.: costela, queijo, moqueca)..."
              className="w-full rounded-xl border border-[#C6AF95] bg-[#FAF5EE] py-2.5 pr-9 pl-10 text-sm text-[#231913] placeholder:text-[#7A6352] focus:border-[#9E3B1E] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Limpar busca"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-lg p-1 text-[#5A4638] hover:bg-[#ECE0D1] hover:text-[#231913]"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            )}
          </div>

          {/* Selos rápidos de preparo / restrição */}
          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0"
            role="group"
            aria-label="Filtrar por estilo de preparo"
          >
            {QUICK_TAGS.map((tag) => {
              const isSelected = activeTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onSelectTag(isSelected ? null : tag)}
                  aria-pressed={isSelected}
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    isSelected
                      ? "border-[#3A5332] bg-[#3A5332] text-[#FAF5EE]"
                      : "border-[#D8C7B4] bg-[#FAF5EE] text-[#5A4638] hover:border-[#9E3B1E] hover:text-[#231913]"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Abas horizontais de categorias */}
        <nav
          aria-label="Categorias do cardápio"
          className="mt-3 flex items-center justify-between gap-3 border-t border-[#E5D7C6] pt-2.5"
        >
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => onSelectCategory("all")}
              aria-pressed={activeCategory === "all"}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                activeCategory === "all"
                  ? "bg-[#9E3B1E] text-[#FAF5EE]"
                  : "bg-[#ECE0D1] text-[#5A4638] hover:bg-[#DFCEBA] hover:text-[#231913]"
              }`}
            >
              Todas as categorias
            </button>
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  aria-pressed={isSelected}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                    isSelected
                      ? "bg-[#9E3B1E] text-[#FAF5EE]"
                      : "bg-[#ECE0D1] text-[#5A4638] hover:bg-[#DFCEBA] hover:text-[#231913]"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                onSelectCategory("all");
                onSearchChange("");
                onSelectTag(null);
              }}
              className="shrink-0 text-xs font-semibold text-[#9E3B1E] underline underline-offset-4 hover:text-[#7E2C14]"
            >
              Limpar filtros ({totalMatchingItems})
            </button>
          )}
        </nav>
      </div>
    </section>
  );
}

