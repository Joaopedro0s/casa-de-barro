import { formatCurrency, parseCurrencyInput } from "@/lib/currency";
import type {
  CartItem,
  CustomerOrderForm,
  OrderValidationErrors,
} from "@/types/menu";

export const MAX_NOTES_LENGTH = 300;

/**
 * Aplica máscara de telefone brasileiro (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.
 */
export function formatPhoneInput(rawValue: string): string {
  const digits = rawValue.replace(/\D/g, "").slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Extrai apenas os dígitos numéricos de um telefone.
 */
export function extractPhoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

export interface ValidationResult {
  isValid: boolean;
  errors: OrderValidationErrors;
}

/**
 * Valida todos os pontos de entrada do formulário de pedido e do carrinho.
 * O endereço é obrigatório exclusivamente quando fulfillmentMode === "delivery".
 */
export function validateOrderForm(
  form: CustomerOrderForm,
  cartItems: CartItem[],
  orderTotal: number
): ValidationResult {
  const errors: OrderValidationErrors = {};

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    errors.cart =
      "Sua comanda está vazia. Adicione pelo menos um item do cardápio para enviar o pedido.";
  }

  const trimmedName = form.customerName.trim();
  if (!trimmedName) {
    errors.customerName = "Informe seu nome para identificarmos o pedido.";
  } else if (trimmedName.length < 3) {
    errors.customerName =
      "Digite seu nome com pelo menos 3 caracteres.";
  }

  const phoneDigits = extractPhoneDigits(form.customerPhone);
  if (!phoneDigits) {
    errors.customerPhone =
      "Informe seu telefone com DDD para contato sobre o pedido.";
  } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    errors.customerPhone =
      "Digite um telefone válido com DDD (10 ou 11 dígitos, ex.: (11) 98765-4321).";
  }

  if (
    form.fulfillmentMode !== "delivery" &&
    form.fulfillmentMode !== "pickup"
  ) {
    errors.fulfillmentMode = "Selecione Entrega ou Retirada no balcão.";
  }

  if (form.fulfillmentMode === "delivery") {
    const trimmedAddress = form.deliveryAddress.trim();
    if (!trimmedAddress) {
      errors.deliveryAddress =
        "Informe o endereço completo (rua, número e bairro) para a entrega.";
    } else if (trimmedAddress.length < 8) {
      errors.deliveryAddress =
        "Complete o endereço com nome da rua e número para localizarmos você.";
    }
  }

  if (
    form.paymentMethod !== "pix" &&
    form.paymentMethod !== "card" &&
    form.paymentMethod !== "cash"
  ) {
    errors.paymentMethod =
      "Escolha uma forma de pagamento (PIX, Cartão ou Dinheiro).";
  }

  if (form.paymentMethod === "cash" && form.cashChangeFor.trim() !== "") {
    const parsedChange = parseCurrencyInput(form.cashChangeFor);
    if (parsedChange === null) {
      errors.cashChangeFor =
        "Informe um valor numérico válido para o troco (ex.: 150,00).";
    } else if (orderTotal > 0 && parsedChange < orderTotal) {
      errors.cashChangeFor = `O valor para troco deve ser igual ou maior que o total do pedido (${formatCurrency(
        orderTotal
      )}).`;
    }
  }

  if (form.notes.trim().length > MAX_NOTES_LENGTH) {
    errors.notes = `As observações devem ter no máximo ${MAX_NOTES_LENGTH} caracteres.`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

