"use client";

import { ArrowLeft, ShoppingBag, X } from "lucide-react";
import { OrderPanel } from "@/components/OrderPanel";
import type { CartItem, CustomerOrderForm } from "@/types/menu";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  isHydrated: boolean;
  form: CustomerOrderForm;
  onUpdateForm: (
    updater: (prev: CustomerOrderForm) => CustomerOrderForm
  ) => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

/**
 * Área dedicada ao Carrinho / Comanda do Pedido (Slide-over Drawer responsivo).
 * Separa completamente a comanda da listagem de pratos para não competir
 * visualmente com o cardápio, funcionando em desktop e celular.
 */
export function CartDrawer({
  isOpen,
  onClose,
  items,
  isHydrated,
  form,
  onUpdateForm,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalUnits = items.reduce((acc, entry) => acc + entry.quantity, 0);

  return (
    <div
      id="dedicated-cart-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Carrinho e Comanda do Pedido"
      className="fixed inset-0 z-50 flex justify-end bg-[#231913]/65 backdrop-blur-xs"
    >
      {/* Área de clique externa para fechar o carrinho e voltar ao cardápio */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Painel dedicado do carrinho (lateral no desktop, tela cheia/gaveta no celular) */}
      <aside
        aria-label="Área exclusiva da comanda do pedido"
        className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-[#C6AF95] bg-[#F6EFE6] shadow-2xl"
      >
        {/* Barra superior da área do carrinho */}
        <div className="flex items-center justify-between gap-3 border-b border-[#D8C7B4] bg-[#EFE3D3] px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl border border-[#C6AF95] bg-[#FAF5EE] px-3 py-2 text-xs font-semibold text-[#231913] transition-colors hover:bg-[#E5D7C6]"
          >
            <ArrowLeft className="h-4 w-4 text-[#9E3B1E]" strokeWidth={2} />
            <span>Voltar ao cardápio</span>
          </button>

          <div className="flex items-center gap-2 text-right">
            <ShoppingBag
              className="h-4 w-4 text-[#9E3B1E]"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span className="tabular-nums text-xs font-semibold text-[#5A4638]">
              {totalUnits === 0
                ? "Carrinho vazio"
                : `${totalUnits} ${
                    totalUnits === 1 ? "item no carrinho" : "itens no carrinho"
                  }`}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar carrinho"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#C6AF95] bg-[#FAF5EE] text-[#231913] transition-colors hover:bg-[#E5D7C6]"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        {/* Conteúdo rolável com a Comanda do Pedido completa */}
        <div className="flex-1 overflow-y-auto p-4 pb-10 sm:p-6">
          <OrderPanel
            items={items}
            isHydrated={isHydrated}
            form={form}
            onUpdateForm={onUpdateForm}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
            onClearCart={onClearCart}
            idPrefix="cart-order"
          />
        </div>
      </aside>
    </div>
  );
}

