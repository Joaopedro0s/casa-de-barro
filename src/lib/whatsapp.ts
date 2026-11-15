import {
  FULFILLMENT_LABELS,
  PAYMENT_METHOD_LABELS,
  restaurantConfig,
  sanitizeWhatsAppNumber,
} from "@/config/restaurant";
import { calculateCartSummary } from "@/lib/cart";
import { formatCurrency, parseCurrencyInput } from "@/lib/currency";
import type { CartItem, CustomerOrderForm } from "@/types/menu";

export interface BuildWhatsAppOrderOptions {
  items: CartItem[];
  form: CustomerOrderForm;
  configuredDeliveryFee?: number;
  restaurantName?: string;
  whatsappNumber?: string;
}

/**
 * Gera a mensagem formatada do pedido pronta para envio no WhatsApp.
 * Inclui itens, quantidades, subtotal, taxa de entrega (quando houver),
 * total, forma de pagamento, modalidade de entrega/retirada, dados do cliente e observações.
 */
export function buildWhatsAppOrderMessage({
  items,
  form,
  configuredDeliveryFee = restaurantConfig.delivery.fixedFee,
  restaurantName = restaurantConfig.name,
}: Omit<BuildWhatsAppOrderOptions, "whatsappNumber">): string {
  const summary = calculateCartSummary(
    items,
    form.fulfillmentMode,
    configuredDeliveryFee
  );

  const lines: string[] = [
    `*NOVO PEDIDO — ${restaurantName.toUpperCase()}*`,
    "--------------------------------",
    "*ITENS DO PEDIDO:*",
  ];

  for (const entry of items) {
    const lineTotal = Number((entry.item.price * entry.quantity).toFixed(2));
    lines.push(
      `• ${entry.quantity}x ${entry.item.name} — ${formatCurrency(lineTotal)} (${formatCurrency(
        entry.item.price
      )} un.)`
    );
  }

  lines.push("--------------------------------");
  lines.push(`Subtotal dos itens: ${formatCurrency(summary.subtotal)}`);

  if (form.fulfillmentMode === "delivery") {
    lines.push(`Taxa de entrega: ${formatCurrency(summary.deliveryFee)}`);
  } else {
    lines.push("Taxa de entrega: R$ 0,00 (Retirada no balcão)");
  }

  lines.push(`*Total do pedido: ${formatCurrency(summary.total)}*`);
  lines.push("--------------------------------");

  // Modalidade de recebimento
  const fulfillmentTitle = FULFILLMENT_LABELS[form.fulfillmentMode].title;
  lines.push(`*Recebimento:* ${fulfillmentTitle}`);

  if (form.fulfillmentMode === "delivery") {
    lines.push(`*Endereço de entrega:* ${form.deliveryAddress.trim()}`);
    if (form.addressComplement.trim() !== "") {
      lines.push(
        `*Complemento / Referência:* ${form.addressComplement.trim()}`
      );
    }
  } else {
    lines.push(
      `*Local de retirada:* ${restaurantConfig.address.street} (${restaurantConfig.address.city})`
    );
  }

  // Forma de pagamento
  const paymentLabel = PAYMENT_METHOD_LABELS[form.paymentMethod].label;
  lines.push(`*Forma de pagamento:* ${paymentLabel}`);

  if (form.paymentMethod === "cash") {
    const changeValue = parseCurrencyInput(form.cashChangeFor);
    if (changeValue !== null && changeValue >= summary.total) {
      const changeDifference = Number((changeValue - summary.total).toFixed(2));
      lines.push(
        `*Troco para:* ${formatCurrency(changeValue)} (levar ${formatCurrency(
          changeDifference
        )} de troco)`
      );
    } else {
      lines.push("*Troco:* Não precisa de troco");
    }
  }

  lines.push("--------------------------------");
  lines.push("*DADOS DO CLIENTE:*");
  lines.push(`*Nome:* ${form.customerName.trim()}`);
  lines.push(`*Telefone:* ${form.customerPhone.trim()}`);

  if (form.notes.trim() !== "") {
    lines.push("--------------------------------");
    lines.push(`*Observações:* ${form.notes.trim()}`);
  }

  return lines.join("\n");
}

/**
 * Gera a URL completa `https://wa.me/<numero>?text=<mensagem_codificada>`
 * usando encodeURIComponent para garantir compatibilidade com quebras de linha,
 * acentuação, símbolos monetários e caracteres especiais.
 */
export function buildWhatsAppOrderUrl(
  options: BuildWhatsAppOrderOptions
): string {
  const targetPhone = sanitizeWhatsAppNumber(
    options.whatsappNumber ?? restaurantConfig.contact.whatsappNumber
  );
  const message = buildWhatsAppOrderMessage(options);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${targetPhone}?text=${encodedMessage}`;
}

