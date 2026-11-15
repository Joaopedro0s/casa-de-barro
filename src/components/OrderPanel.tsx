"use client";

import { useState } from "react";
import {
  AlertCircle,
  Banknote,
  Check,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  QrCode,
  ShoppingBag,
  Store,
  Trash2,
  Truck,
} from "lucide-react";
import {
  FULFILLMENT_LABELS,
  PAYMENT_METHOD_LABELS,
  restaurantConfig,
} from "@/config/restaurant";
import { calculateCartSummary } from "@/lib/cart";
import { formatCurrency } from "@/lib/currency";
import {
  formatPhoneInput,
  MAX_NOTES_LENGTH,
  validateOrderForm,
} from "@/lib/order-validation";
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppOrderUrl,
} from "@/lib/whatsapp";
import type {
  CartItem,
  CustomerOrderForm,
  FulfillmentMode,
  OrderFormField,
  OrderValidationErrors,
  PaymentMethod,
} from "@/types/menu";

interface OrderPanelProps {
  items: CartItem[];
  isHydrated: boolean;
  form: CustomerOrderForm;
  onUpdateForm: (updater: (prev: CustomerOrderForm) => CustomerOrderForm) => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  idPrefix?: string;
}

export function OrderPanel({
  items,
  isHydrated,
  form,
  onUpdateForm,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  idPrefix = "order",
}: OrderPanelProps) {
  const [errors, setErrors] = useState<OrderValidationErrors>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [showMessagePreview, setShowMessagePreview] = useState(false);
  const [copiedPreview, setCopiedPreview] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState<
    string | null
  >(null);

  const summary = calculateCartSummary(
    items,
    form.fulfillmentMode,
    restaurantConfig.delivery.fixedFee
  );

  const clearFieldError = (field: OrderFormField) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setGeneratedWhatsAppUrl(null);
  };

  const handleFieldChange = <K extends keyof CustomerOrderForm>(
    key: K,
    value: CustomerOrderForm[K],
    errorField?: OrderFormField
  ) => {
    onUpdateForm((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (errorField) {
      clearFieldError(errorField);
    }
  };

  const handleFulfillmentChange = (mode: FulfillmentMode) => {
    onUpdateForm((prev) => ({
      ...prev,
      fulfillmentMode: mode,
    }));
    clearFieldError("fulfillmentMode");
    if (mode === "pickup") {
      clearFieldError("deliveryAddress");
    }
  };

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    onUpdateForm((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
    clearFieldError("paymentMethod");
    if (method !== "cash") {
      clearFieldError("cashChangeFor");
    }
  };

  const formattedMessage = buildWhatsAppOrderMessage({
    items,
    form,
  });

  const handleCopyMessage = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(formattedMessage);
        setCopiedPreview(true);
        setTimeout(() => setCopiedPreview(false), 2500);
      }
    } catch {
      // Ignora erro caso clipboard não esteja disponível no navegador
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasAttemptedSubmit(true);

    const validation = validateOrderForm(form, items, summary.total);
    setErrors(validation.errors);

    if (!validation.isValid) {
      setGeneratedWhatsAppUrl(null);
      return;
    }

    const whatsappUrl = buildWhatsAppOrderUrl({
      items,
      form,
    });

    setGeneratedWhatsAppUrl(whatsappUrl);

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!isHydrated) {
    return (
      <div
        aria-busy="true"
        aria-label="Carregando comanda do pedido"
        className="rounded-2xl border border-[#D8C7B4] bg-[#FAF5EE] p-5"
      >
        <div className="h-6 w-44 animate-pulse rounded-md bg-[#E6D8C7]" />
        <div className="mt-4 space-y-3">
          <div className="h-16 animate-pulse rounded-xl bg-[#EFE3D3]" />
          <div className="h-16 animate-pulse rounded-xl bg-[#EFE3D3]" />
          <div className="h-28 animate-pulse rounded-xl bg-[#EFE3D3]" />
        </div>
      </div>
    );
  }

  const activeErrorList = Object.values(errors).filter(Boolean);

  return (
    <section
      aria-label="Comanda e finalização do pedido"
      className="rounded-2xl border border-[#C6AF95] bg-[#FAF5EE] p-4 sm:p-6"
    >
      {/* Cabeçalho da Comanda */}
      <div className="flex items-center justify-between gap-2 border-b border-[#D8C7B4] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#9E3B1E]/12 text-[#9E3B1E]">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-[#231913]">
              Comanda do Pedido
            </h2>
            <p className="tabular-nums text-xs text-[#7A6352]">
              {summary.totalItems === 0
                ? "Nenhum prato selecionado"
                : `${summary.totalItems} ${
                    summary.totalItems === 1
                      ? "item selecionado"
                      : "itens selecionados"
                  }`}
            </p>
          </div>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={() => {
              onClearCart();
              setGeneratedWhatsAppUrl(null);
            }}
            className="text-xs font-semibold text-[#9E3B1E] underline underline-offset-4 hover:text-[#7E2C14]"
          >
            Limpar comanda
          </button>
        )}
      </div>

      {/* Lista de itens do carrinho ou estado vazio */}
      {items.length === 0 ? (
        <div className="my-5 rounded-xl border border-dashed border-[#C6AF95] bg-[#F5ECE0]/70 p-6 text-center">
          <ShoppingBag
            className="mx-auto h-8 w-8 text-[#9E3B1E]/70"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <p className="font-display mt-2.5 text-base font-semibold text-[#231913]">
            Sua comanda está vazia
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#5A4638]">
            Toque em &ldquo;Adicionar&rdquo; nos pratos do cardápio para montar
            seu pedido e enviar direto pelo WhatsApp.
          </p>
          {errors.cart && (
            <p
              role="alert"
              className="mt-3 rounded-lg bg-[#9E3B1E]/10 px-3 py-2 text-xs font-medium text-[#8C2711]"
            >
              {errors.cart}
            </p>
          )}
        </div>
      ) : (
        <ul
          aria-label="Itens adicionados ao pedido"
          className="my-4 divide-y divide-[#E5D7C6] border-b border-[#D8C7B4]"
        >
          {items.map(({ item, quantity }) => {
            const lineSubtotal = Number((item.price * quantity).toFixed(2));
            return (
              <li
                key={item.id}
                className="flex items-start justify-between gap-3 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-semibold leading-snug text-[#231913]">
                    {item.name}
                  </p>
                  <p className="tabular-nums mt-0.5 text-xs text-[#7A6352]">
                    {formatCurrency(item.price)} un. · Subtotal:{" "}
                    <strong className="font-semibold text-[#231913]">
                      {formatCurrency(lineSubtotal)}
                    </strong>
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <div className="inline-flex items-center rounded-lg border border-[#C6AF95] bg-[#F6EFE6] p-0.5">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                      aria-label={`Diminuir quantidade de ${item.name} na comanda`}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-[#5A4638] hover:bg-[#E5D7C6] hover:text-[#231913]"
                    >
                      <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                    <span className="tabular-nums min-w-[1.75rem] text-center text-xs font-bold text-[#231913]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                      aria-label={`Aumentar quantidade de ${item.name} na comanda`}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-[#5A4638] hover:bg-[#E5D7C6] hover:text-[#231913]"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Remover ${item.name} do pedido`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#7A6352] transition-colors hover:bg-[#9E3B1E]/10 hover:text-[#9E3B1E]"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Formulário de Entrega, Pagamento e Dados do Cliente */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* 1. Escolha da forma de entrega ou retirada */}
        <fieldset>
          <legend className="font-display text-sm font-bold text-[#231913]">
            Como deseja receber seu pedido?
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleFulfillmentChange("delivery")}
              aria-pressed={form.fulfillmentMode === "delivery"}
              className={`flex flex-col items-start rounded-xl border p-3 text-left transition-colors ${
                form.fulfillmentMode === "delivery"
                  ? "border-[#9E3B1E] bg-[#9E3B1E]/10 text-[#231913]"
                  : "border-[#D8C7B4] bg-[#F6EFE6] text-[#5A4638] hover:border-[#B89F84]"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <Truck
                  className={`h-4 w-4 ${
                    form.fulfillmentMode === "delivery"
                      ? "text-[#9E3B1E]"
                      : "text-[#7A6352]"
                  }`}
                  strokeWidth={1.75}
                />
                <span className="tabular-nums rounded-md bg-[#FAF5EE] px-2 py-0.5 text-[11px] font-semibold text-[#7E2C14]">
                  + {formatCurrency(restaurantConfig.delivery.fixedFee)}
                </span>
              </div>
              <span className="mt-1.5 text-xs font-bold text-[#231913]">
                {FULFILLMENT_LABELS.delivery.title}
              </span>
              <span className="mt-0.5 text-[11px] leading-tight text-[#5A4638]">
                {restaurantConfig.delivery.estimatedDeliveryTime}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleFulfillmentChange("pickup")}
              aria-pressed={form.fulfillmentMode === "pickup"}
              className={`flex flex-col items-start rounded-xl border p-3 text-left transition-colors ${
                form.fulfillmentMode === "pickup"
                  ? "border-[#3A5332] bg-[#3A5332]/12 text-[#231913]"
                  : "border-[#D8C7B4] bg-[#F6EFE6] text-[#5A4638] hover:border-[#B89F84]"
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <Store
                  className={`h-4 w-4 ${
                    form.fulfillmentMode === "pickup"
                      ? "text-[#3A5332]"
                      : "text-[#7A6352]"
                  }`}
                  strokeWidth={1.75}
                />
                <span className="rounded-md bg-[#E4EBDD] px-2 py-0.5 text-[11px] font-semibold text-[#2A3F23]">
                  Sem taxa
                </span>
              </div>
              <span className="mt-1.5 text-xs font-bold text-[#231913]">
                {FULFILLMENT_LABELS.pickup.title}
              </span>
              <span className="mt-0.5 text-[11px] leading-tight text-[#5A4638]">
                {restaurantConfig.delivery.estimatedPickupTime}
              </span>
            </button>
          </div>
        </fieldset>

        {/* Resumo de valores (Subtotal + Taxa de entrega + Total) */}
        <div
          aria-label="Resumo de valores do pedido"
          className="space-y-1.5 rounded-xl border border-[#D8C7B4] bg-[#F3E8D8] p-3.5 text-sm"
        >
          <div className="flex items-center justify-between text-[#5A4638]">
            <span>Subtotal dos itens</span>
            <span className="tabular-nums font-medium text-[#231913]">
              {formatCurrency(summary.subtotal)}
            </span>
          </div>

          <div className="flex items-center justify-between text-[#5A4638]">
            <span>
              {form.fulfillmentMode === "delivery"
                ? "Taxa fixa de entrega"
                : "Retirada no balcão"}
            </span>
            <span
              className={`tabular-nums font-medium ${
                form.fulfillmentMode === "pickup"
                  ? "text-[#2A3F23]"
                  : "text-[#231913]"
              }`}
            >
              {form.fulfillmentMode === "delivery"
                ? formatCurrency(summary.deliveryFee)
                : "Grátis (R$ 0,00)"}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-[#D8C7B4] pt-2 text-base font-bold text-[#231913]">
            <span>Total do pedido</span>
            <span
              data-testid={`${idPrefix}-total-value`}
              className="font-display tabular-nums text-lg text-[#9E3B1E]"
            >
              {formatCurrency(summary.total)}
            </span>
          </div>
        </div>

        {/* 2. Dados do Cliente */}
        <div className="space-y-3">
          <h3 className="font-display text-sm font-bold text-[#231913]">
            Seus dados para identificação
          </h3>

          <div>
            <label
              htmlFor={`${idPrefix}-customer-name`}
              className="block text-xs font-semibold text-[#231913]"
            >
              Nome completo *
            </label>
            <input
              id={`${idPrefix}-customer-name`}
              name="customerName"
              type="text"
              autoComplete="name"
              value={form.customerName}
              onChange={(e) =>
                handleFieldChange(
                  "customerName",
                  e.target.value,
                  "customerName"
                )
              }
              placeholder="Ex.: Mariana Oliveira"
              aria-invalid={Boolean(errors.customerName)}
              aria-describedby={
                errors.customerName
                  ? `${idPrefix}-customer-name-error`
                  : undefined
              }
              className={`mt-1 w-full rounded-xl border bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#231913] placeholder:text-[#8C7665] focus:outline-none ${
                errors.customerName
                  ? "border-[#9E3B1E] ring-1 ring-[#9E3B1E]"
                  : "border-[#C6AF95] focus:border-[#9E3B1E]"
              }`}
            />
            {errors.customerName && (
              <p
                id={`${idPrefix}-customer-name-error`}
                role="alert"
                className="mt-1 text-xs font-medium text-[#8C2711]"
              >
                {errors.customerName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}-customer-phone`}
              className="block text-xs font-semibold text-[#231913]"
            >
              Telefone / WhatsApp com DDD *
            </label>
            <input
              id={`${idPrefix}-customer-phone`}
              name="customerPhone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={form.customerPhone}
              onChange={(e) =>
                handleFieldChange(
                  "customerPhone",
                  formatPhoneInput(e.target.value),
                  "customerPhone"
                )
              }
              placeholder="(11) 98765-4321"
              aria-invalid={Boolean(errors.customerPhone)}
              aria-describedby={
                errors.customerPhone
                  ? `${idPrefix}-customer-phone-error`
                  : undefined
              }
              className={`tabular-nums mt-1 w-full rounded-xl border bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#231913] placeholder:text-[#8C7665] focus:outline-none ${
                errors.customerPhone
                  ? "border-[#9E3B1E] ring-1 ring-[#9E3B1E]"
                  : "border-[#C6AF95] focus:border-[#9E3B1E]"
              }`}
            />
            {errors.customerPhone && (
              <p
                id={`${idPrefix}-customer-phone-error`}
                role="alert"
                className="mt-1 text-xs font-medium text-[#8C2711]"
              >
                {errors.customerPhone}
              </p>
            )}
          </div>
        </div>

        {/* 3. Endereço de entrega (obrigatório apenas quando Entrega for selecionada) */}
        {form.fulfillmentMode === "delivery" ? (
          <div className="space-y-3 rounded-xl border border-[#D8C7B4] bg-[#F6EFE6] p-3.5">
            <div>
              <label
                htmlFor={`${idPrefix}-delivery-address`}
                className="block text-xs font-semibold text-[#231913]"
              >
                Endereço de entrega (Rua, número e bairro) *
              </label>
              <input
                id={`${idPrefix}-delivery-address`}
                name="deliveryAddress"
                type="text"
                autoComplete="street-address"
                value={form.deliveryAddress}
                onChange={(e) =>
                  handleFieldChange(
                    "deliveryAddress",
                    e.target.value,
                    "deliveryAddress"
                  )
                }
                placeholder="Ex.: Rua Harmonia, 250 — Vila Madalena"
                aria-invalid={Boolean(errors.deliveryAddress)}
                aria-describedby={
                  errors.deliveryAddress
                    ? `${idPrefix}-delivery-address-error`
                    : undefined
                }
                className={`mt-1 w-full rounded-xl border bg-[#FFFFFF] px-3.5 py-2.5 text-sm text-[#231913] placeholder:text-[#8C7665] focus:outline-none ${
                  errors.deliveryAddress
                    ? "border-[#9E3B1E] ring-1 ring-[#9E3B1E]"
                    : "border-[#C6AF95] focus:border-[#9E3B1E]"
                }`}
              />
              {errors.deliveryAddress && (
                <p
                  id={`${idPrefix}-delivery-address-error`}
                  role="alert"
                  className="mt-1 text-xs font-medium text-[#8C2711]"
                >
                  {errors.deliveryAddress}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`${idPrefix}-address-complement`}
                className="block text-xs font-semibold text-[#231913]"
              >
                Complemento / Ponto de referência (opcional)
              </label>
              <input
                id={`${idPrefix}-address-complement`}
                name="addressComplement"
                type="text"
                value={form.addressComplement}
                onChange={(e) =>
                  handleFieldChange("addressComplement", e.target.value)
                }
                placeholder="Ex.: Apto 42, Bloco B · Portão de madeira"
                className="mt-1 w-full rounded-xl border border-[#C6AF95] bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#231913] placeholder:text-[#8C7665] focus:border-[#9E3B1E] focus:outline-none"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2.5 rounded-xl border border-[#3A5332]/30 bg-[#E4EBDD]/70 p-3.5 text-xs text-[#231913]">
            <MapPin
              className="mt-0.5 h-4 w-4 shrink-0 text-[#3A5332]"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold">
                Retirada no balcão (sem taxa de entrega)
              </p>
              <p className="mt-0.5 text-[#3A4A35]">
                {restaurantConfig.address.street} —{" "}
                {restaurantConfig.address.city}
              </p>
            </div>
          </div>
        )}

        {/* 4. Forma de pagamento */}
        <fieldset>
          <legend className="font-display text-sm font-bold text-[#231913]">
            Forma de pagamento *
          </legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(
              [
                { id: "pix", label: "PIX", Icon: QrCode },
                { id: "card", label: "Cartão", Icon: CreditCard },
                { id: "cash", label: "Dinheiro", Icon: Banknote },
              ] as const
            ).map(({ id, label, Icon }) => {
              const isSelected = form.paymentMethod === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handlePaymentMethodChange(id)}
                  aria-pressed={isSelected}
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl border px-2.5 py-2.5 text-xs font-semibold transition-colors ${
                    isSelected
                      ? "border-[#9E3B1E] bg-[#9E3B1E] text-[#FAF5EE]"
                      : "border-[#D8C7B4] bg-[#F6EFE6] text-[#5A4638] hover:border-[#B89F84] hover:text-[#231913]"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-1.5 text-[11px] text-[#7A6352]">
            {PAYMENT_METHOD_LABELS[form.paymentMethod].helper}
          </p>

          {form.paymentMethod === "cash" && (
            <div className="mt-2.5">
              <label
                htmlFor={`${idPrefix}-cash-change`}
                className="block text-xs font-semibold text-[#231913]"
              >
                Precisa de troco para quanto? (deixe em branco se não precisar)
              </label>
              <input
                id={`${idPrefix}-cash-change`}
                name="cashChangeFor"
                type="text"
                inputMode="decimal"
                value={form.cashChangeFor}
                onChange={(e) =>
                  handleFieldChange(
                    "cashChangeFor",
                    e.target.value,
                    "cashChangeFor"
                  )
                }
                placeholder="Ex.: 150,00"
                aria-invalid={Boolean(errors.cashChangeFor)}
                aria-describedby={
                  errors.cashChangeFor
                    ? `${idPrefix}-cash-change-error`
                    : undefined
                }
                className={`tabular-nums mt-1 w-full rounded-xl border bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#231913] placeholder:text-[#8C7665] focus:outline-none ${
                  errors.cashChangeFor
                    ? "border-[#9E3B1E] ring-1 ring-[#9E3B1E]"
                    : "border-[#C6AF95] focus:border-[#9E3B1E]"
                }`}
              />
              {errors.cashChangeFor && (
                <p
                  id={`${idPrefix}-cash-change-error`}
                  role="alert"
                  className="mt-1 text-xs font-medium text-[#8C2711]"
                >
                  {errors.cashChangeFor}
                </p>
              )}
            </div>
          )}
        </fieldset>

        {/* 5. Observações do pedido */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor={`${idPrefix}-order-notes`}
              className="block text-xs font-semibold text-[#231913]"
            >
              Observações do pedido (opcional)
            </label>
            <span className="tabular-nums text-[11px] text-[#7A6352]">
              {form.notes.length}/{MAX_NOTES_LENGTH}
            </span>
          </div>
          <textarea
            id={`${idPrefix}-order-notes`}
            name="notes"
            rows={2}
            value={form.notes}
            onChange={(e) =>
              handleFieldChange("notes", e.target.value, "notes")
            }
            placeholder="Ex.: Carne ao ponto para mal passada, sem coentro, interfone 12..."
            aria-invalid={Boolean(errors.notes)}
            className="mt-1 w-full resize-none rounded-xl border border-[#C6AF95] bg-[#FFFFFF] px-3.5 py-2 text-sm text-[#231913] placeholder:text-[#8C7665] focus:border-[#9E3B1E] focus:outline-none"
          />
          {errors.notes && (
            <p role="alert" className="mt-1 text-xs font-medium text-[#8C2711]">
              {errors.notes}
            </p>
          )}
        </div>

        {/* Pré-visualização da mensagem formatada para o WhatsApp */}
        {items.length > 0 && (
          <div className="rounded-xl border border-[#D8C7B4] bg-[#F6EFE6] p-3">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setShowMessagePreview((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A4638] hover:text-[#231913]"
              >
                {showMessagePreview ? (
                  <>
                    <EyeOff className="h-3.5 w-3.5" strokeWidth={1.75} />
                    Ocultar prévia da mensagem
                  </>
                ) : (
                  <>
                    <Eye className="h-3.5 w-3.5" strokeWidth={1.75} />
                    Ver prévia da mensagem do WhatsApp
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1 rounded-lg border border-[#C6AF95] bg-[#FAF5EE] px-2.5 py-1 text-[11px] font-semibold text-[#231913] hover:bg-[#ECE0D1]"
              >
                {copiedPreview ? (
                  <>
                    <Check
                      className="h-3 w-3 text-[#3A5332]"
                      strokeWidth={2}
                    />
                    Copiada!
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" strokeWidth={1.75} />
                    Copiar texto
                  </>
                )}
              </button>
            </div>

            {showMessagePreview && (
              <pre
                aria-label="Texto formatado do pedido para WhatsApp"
                className="mt-2.5 max-h-52 overflow-y-auto rounded-lg border border-[#D8C7B4] bg-[#FAF5EE] p-3 font-sans text-xs whitespace-pre-wrap text-[#231913]"
              >
                {formattedMessage}
              </pre>
            )}
          </div>
        )}

        {/* Alerta consolidado caso o usuário tente enviar com campos pendentes */}
        {hasAttemptedSubmit && activeErrorList.length > 0 && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-xl border border-[#9E3B1E]/40 bg-[#9E3B1E]/10 p-3 text-xs text-[#7E2C14]"
          >
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0 text-[#9E3B1E]"
              strokeWidth={2}
              aria-hidden="true"
            />
            <div>
              <p className="font-bold">
                Confira os campos destacados antes de enviar:
              </p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                {activeErrorList.map((errText, idx) => (
                  <li key={idx}>{errText}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Botão principal de envio para o WhatsApp */}
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3A5332] px-5 py-3.5 text-sm font-bold text-[#FAF5EE] transition-colors hover:bg-[#2C4026] active:bg-[#21311C]"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={2} />
          <span>
            Enviar pedido pelo WhatsApp · {formatCurrency(summary.total)}
          </span>
        </button>

        {/* Link direto de confirmação caso o bloqueador de pop-ups impeça abertura automática */}
        {generatedWhatsAppUrl && (
          <div
            role="status"
            className="rounded-xl border border-[#3A5332]/40 bg-[#E4EBDD] p-3 text-center text-xs text-[#231913]"
          >
            <p className="font-semibold text-[#2A3F23]">
              Pedido formatado com sucesso!
            </p>
            <p className="mt-1 text-[#3A4A35]">
              Caso o WhatsApp não tenha aberto automaticamente, toque no link
              abaixo:
            </p>
            <a
              href={generatedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-[#3A5332] px-3.5 py-2 text-xs font-bold text-[#FAF5EE] hover:bg-[#2C4026]"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} />
              Abrir conversa no WhatsApp
            </a>
          </div>
        )}
      </form>
    </section>
  );
}

