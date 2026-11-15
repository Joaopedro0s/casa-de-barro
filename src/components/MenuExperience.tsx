"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchX, ShoppingBag, X } from "lucide-react";
import { CategoryNav } from "@/components/CategoryNav";
import { Header } from "@/components/Header";
import { MenuCard } from "@/components/MenuCard";
import { OrderPanel } from "@/components/OrderPanel";
import { menuCategories, menuItems } from "@/config/menu";
import { restaurantConfig } from "@/config/restaurant";
import {
  addCartItem,
  calculateCartSummary,
  clearCart,
  DEFAULT_CUSTOMER_FORM,
  loadCartFromSession,
  loadCustomerFormFromSession,
  removeCartItem,
  saveCartToSession,
  saveCustomerFormToSession,
  updateCartItemQuantity,
} from "@/lib/cart";
import { formatCurrency } from "@/lib/currency";
import type {
  CartItem,
  CategoryId,
  CustomerOrderForm,
  DietaryTag,
  MenuItem,
} from "@/types/menu";

export function MenuExperience() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerForm, setCustomerForm] = useState<CustomerOrderForm>(
    DEFAULT_CUSTOMER_FORM
  );
  const [isHydrated, setIsHydrated] = useState(false);

  const [activeCategory, setActiveCategory] = useState<CategoryId | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<DietaryTag | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Hidratação segura a partir do sessionStorage no cliente
  useEffect(() => {
    const storedCart = loadCartFromSession(window.sessionStorage);
    const storedForm = loadCustomerFormFromSession(window.sessionStorage);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCartItems(storedCart);
    setCustomerForm(storedForm);
    setIsHydrated(true);
  }, []);

  // Persiste alterações do carrinho durante a sessão
  useEffect(() => {
    if (!isHydrated) return;
    saveCartToSession(cartItems, window.sessionStorage);
  }, [cartItems, isHydrated]);

  // Persiste alterações do rascunho de formulário durante a sessão
  useEffect(() => {
    if (!isHydrated) return;
    saveCustomerFormToSession(customerForm, window.sessionStorage);
  }, [customerForm, isHydrated]);

  // Fecha a gaveta mobile ao pressionar Escape
  useEffect(() => {
    if (!isMobileDrawerOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileDrawerOpen]);

  const handleAddItem = (item: MenuItem) => {
    setCartItems((prev) => addCartItem(prev, item, 1));
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    setCartItems((prev) => updateCartItemQuantity(prev, itemId, newQuantity));
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => removeCartItem(prev, itemId));
  };

  const handleClearCart = () => {
    setCartItems(clearCart());
  };

  // Mapeia quantidade de cada prato no carrinho para acesso O(1)
  const quantityById = useMemo(() => {
    const map = new Map<string, number>();
    for (const entry of cartItems) {
      map.set(entry.item.id, entry.quantity);
    }
    return map;
  }, [cartItems]);

  // Filtra itens por categoria, termo de busca e tag
  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return menuItems.filter((item) => {
      if (activeCategory !== "all" && item.categoryId !== activeCategory) {
        return false;
      }

      if (activeTag && !item.tags.includes(activeTag)) {
        return false;
      }

      if (normalizedQuery) {
        const matchesName = item.name.toLowerCase().includes(normalizedQuery);
        const matchesDesc = item.description
          .toLowerCase()
          .includes(normalizedQuery);
        const matchesTag = item.tags.some((t) =>
          t.toLowerCase().includes(normalizedQuery)
        );
        return matchesName || matchesDesc || matchesTag;
      }

      return true;
    });
  }, [activeCategory, activeTag, searchQuery]);

  // Agrupa itens filtrados pelas categorias do cardápio
  const visibleCategories = useMemo(() => {
    return menuCategories
      .map((category) => ({
        category,
        items: filteredItems.filter((item) => item.categoryId === category.id),
      }))
      .filter((group) => group.items.length > 0);
  }, [filteredItems]);

  const summary = useMemo(
    () =>
      calculateCartSummary(
        cartItems,
        customerForm.fulfillmentMode,
        restaurantConfig.delivery.fixedFee
      ),
    [cartItems, customerForm.fulfillmentMode]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F6EFE6] text-[#231913]">
      <Header />

      <CategoryNav
        categories={menuCategories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTag={activeTag}
        onSelectTag={setActiveTag}
        totalMatchingItems={filteredItems.length}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 pb-28 sm:px-6 lg:px-8 lg:pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Coluna Principal: Categorias e Pratos do Cardápio */}
          <div className="space-y-12 lg:col-span-7 xl:col-span-8">
            {visibleCategories.length === 0 ? (
              <div
                role="status"
                className="rounded-2xl border border-[#D8C7B4] bg-[#FAF5EE] p-10 text-center"
              >
                <SearchX
                  className="mx-auto h-10 w-10 text-[#9E3B1E]"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h2 className="font-display mt-3 text-xl font-bold text-[#231913]">
                  Nenhum prato encontrado para essa busca
                </h2>
                <p className="mx-auto mt-1.5 max-w-md text-sm text-[#5A4638]">
                  Não encontramos itens com os filtros atuais. Tente buscar por
                  outro ingrediente ou limpe os filtros para ver o cardápio
                  completo.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                    setActiveTag(null);
                  }}
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#9E3B1E] px-5 py-2.5 text-sm font-semibold text-[#FAF5EE] transition-colors hover:bg-[#7E2C14]"
                >
                  Mostrar todo o cardápio
                </button>
              </div>
            ) : (
              visibleCategories.map(({ category, items }) => (
                <section
                  key={category.id}
                  id={`categoria-${category.id}`}
                  aria-labelledby={`heading-${category.id}`}
                  className="scroll-mt-36"
                >
                  <div className="mb-5 border-b border-[#D8C7B4] pb-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2
                        id={`heading-${category.id}`}
                        className="font-display text-2xl font-bold text-[#231913] sm:text-3xl"
                      >
                        {category.name}
                      </h2>
                      <span className="tabular-nums text-xs font-medium text-[#7A6352]">
                        {items.length}{" "}
                        {items.length === 1
                          ? "opção disponível"
                          : "opções disponíveis"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#5A4638]">
                      {category.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {items.map((item) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        quantityInCart={quantityById.get(item.id) ?? 0}
                        onAdd={handleAddItem}
                        onUpdateQuantity={handleUpdateQuantity}
                      />
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>

          {/* Coluna Lateral (Desktop): Comanda / Carrinho Fixo */}
          <aside
            aria-label="Comanda lateral do pedido"
            className="hidden lg:col-span-5 lg:block lg:sticky lg:top-28 xl:col-span-4"
          >
            <OrderPanel
              items={cartItems}
              isHydrated={isHydrated}
              form={customerForm}
              onUpdateForm={setCustomerForm}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              idPrefix="desktop-order"
            />
          </aside>
        </div>
      </main>

      {/* Barra Fixa Inferior no Celular / Tablet (< lg) */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#C6AF95] bg-[#231913] px-4 py-3 text-[#FAF5EE] lg:hidden">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
          <div>
            <p className="tabular-nums text-xs text-[#DFCEBA]">
              {summary.totalItems === 0
                ? "Sua comanda está vazia"
                : `${summary.totalItems} ${
                    summary.totalItems === 1 ? "item" : "itens"
                  } na comanda`}
            </p>
            <p className="font-display tabular-nums text-lg font-bold text-[#FAF5EE]">
              Total: {formatCurrency(summary.total)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            aria-expanded={isMobileDrawerOpen}
            aria-controls="mobile-order-drawer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#9E3B1E] px-4 py-3 text-sm font-bold text-[#FAF5EE] transition-colors hover:bg-[#7E2C14]"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={2} />
            <span>
              {summary.totalItems === 0 ? "Abrir comanda" : "Conferir e pedir"}
            </span>
          </button>
        </div>
      </div>

      {/* Gaveta / Modal Mobile de Comanda e Finalização */}
      {isMobileDrawerOpen && (
        <div
          id="mobile-order-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Comanda do pedido"
          className="fixed inset-0 z-50 flex flex-col justify-end bg-[#231913]/65 backdrop-blur-xs lg:hidden"
        >
          <div
            className="absolute inset-0"
            onClick={() => setIsMobileDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-t-3xl border-t border-[#C6AF95] bg-[#FAF5EE] p-4 pb-8 sm:p-6">
            <div className="mb-3 flex items-center justify-between border-b border-[#E5D7C6] pb-3">
              <span className="font-display text-base font-bold text-[#231913]">
                Finalizar Pedido pelo WhatsApp
              </span>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                aria-label="Fechar comanda"
                className="inline-flex items-center gap-1 rounded-lg bg-[#ECE0D1] px-3 py-1.5 text-xs font-semibold text-[#231913] hover:bg-[#DFCEBA]"
              >
                <X className="h-4 w-4" strokeWidth={2} />
                Fechar
              </button>
            </div>

            <OrderPanel
              items={cartItems}
              isHydrated={isHydrated}
              form={customerForm}
              onUpdateForm={setCustomerForm}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              idPrefix="mobile-order"
            />
          </div>
        </div>
      )}

      {/* Rodapé Rústico com Aviso de Demonstração */}
      <footer className="border-t border-[#D8C7B4] bg-[#EFE3D3] py-10 text-xs text-[#5A4638]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-base font-bold text-[#231913]">
                {restaurantConfig.name} — {restaurantConfig.subtitle}
              </p>
              <p className="mt-1">
                {restaurantConfig.address.street} ·{" "}
                {restaurantConfig.address.city} · CEP{" "}
                {restaurantConfig.address.zipCode}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="font-semibold text-[#231913]">
                Projeto Demonstrativo para Portfólio
              </p>
              <p className="mt-0.5">{restaurantConfig.demoNotice}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

