import { findMenuItemById } from "@/config/menu";
import { restaurantConfig } from "@/config/restaurant";
import type {
  CartItem,
  CartSummary,
  CustomerOrderForm,
  FulfillmentMode,
  MenuItem,
} from "@/types/menu";

export const MAX_ITEM_QUANTITY = 50;

/**
 * Adiciona um prato ao carrinho ou incrementa sua quantidade se já existir.
 */
export function addCartItem(
  items: CartItem[],
  menuItem: MenuItem,
  quantityToAdd = 1
): CartItem[] {
  const safeIncrement = Math.floor(quantityToAdd);
  if (!Number.isFinite(safeIncrement) || safeIncrement <= 0) {
    return items;
  }

  const existingIndex = items.findIndex(
    (entry) => entry.item.id === menuItem.id
  );

  if (existingIndex === -1) {
    return [
      ...items,
      {
        item: menuItem,
        quantity: Math.min(safeIncrement, MAX_ITEM_QUANTITY),
      },
    ];
  }

  return items.map((entry, index) => {
    if (index !== existingIndex) return entry;
    return {
      ...entry,
      quantity: Math.min(entry.quantity + safeIncrement, MAX_ITEM_QUANTITY),
    };
  });
}

/**
 * Altera a quantidade de um item no carrinho.
 * Caso a nova quantidade seja menor ou igual a zero, o item é removido.
 */
export function updateCartItemQuantity(
  items: CartItem[],
  itemId: string,
  newQuantity: number
): CartItem[] {
  const safeQuantity = Math.floor(newQuantity);
  if (!Number.isFinite(safeQuantity) || safeQuantity <= 0) {
    return removeCartItem(items, itemId);
  }

  return items.map((entry) => {
    if (entry.item.id !== itemId) return entry;
    return {
      ...entry,
      quantity: Math.min(safeQuantity, MAX_ITEM_QUANTITY),
    };
  });
}

/**
 * Remove completamente um item do carrinho pelo seu ID.
 */
export function removeCartItem(items: CartItem[], itemId: string): CartItem[] {
  return items.filter((entry) => entry.item.id !== itemId);
}

/**
 * Esvazia todos os itens do carrinho.
 */
export function clearCart(): CartItem[] {
  return [];
}

/**
 * Calcula o resumo financeiro do carrinho:
 * - Quantidade total de unidades
 * - Subtotal dos itens
 * - Taxa de entrega (aplicada apenas quando fulfillmentMode === "delivery")
 * - Total geral do pedido
 */
export function calculateCartSummary(
  items: CartItem[],
  fulfillmentMode: FulfillmentMode,
  configuredDeliveryFee: number = restaurantConfig.delivery.fixedFee
): CartSummary {
  const safeFee =
    Number.isFinite(configuredDeliveryFee) && configuredDeliveryFee >= 0
      ? Number(configuredDeliveryFee.toFixed(2))
      : 0;

  const totalItems = items.reduce((acc, entry) => acc + entry.quantity, 0);

  const rawSubtotal = items.reduce(
    (acc, entry) => acc + entry.item.price * entry.quantity,
    0
  );
  const subtotal = Number(rawSubtotal.toFixed(2));

  const deliveryFee = fulfillmentMode === "delivery" ? safeFee : 0;

  const total =
    totalItems > 0 ? Number((subtotal + deliveryFee).toFixed(2)) : 0;

  return {
    totalItems,
    subtotal,
    deliveryFee,
    total,
  };
}

interface StoredCartEntry {
  itemId: string;
  quantity: number;
  fallbackItem?: MenuItem;
}

/**
 * Salva o estado atual do carrinho no sessionStorage de forma segura.
 */
export function saveCartToSession(
  items: CartItem[],
  storage: Storage | null = typeof window !== "undefined"
    ? window.sessionStorage
    : null
): void {
  if (!storage) return;
  try {
    const payload: StoredCartEntry[] = items.map((entry) => ({
      itemId: entry.item.id,
      quantity: entry.quantity,
      fallbackItem: entry.item,
    }));
    storage.setItem(
      restaurantConfig.storageKeys.cartSession,
      JSON.stringify(payload)
    );
  } catch {
    // Ignora falhas de quota ou modo privado restrito sem interromper a aplicação
  }
}

/**
 * Recupera o estado do carrinho a partir do sessionStorage com validação defensiva.
 */
export function loadCartFromSession(
  storage: Storage | null = typeof window !== "undefined"
    ? window.sessionStorage
    : null
): CartItem[] {
  if (!storage) return [];
  try {
    const raw = storage.getItem(restaurantConfig.storageKeys.cartSession);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const restored: CartItem[] = [];

    for (const entry of parsed) {
      if (!entry || typeof entry !== "object") continue;
      const candidate = entry as Partial<StoredCartEntry>;
      if (
        typeof candidate.itemId !== "string" ||
        typeof candidate.quantity !== "number" ||
        !Number.isFinite(candidate.quantity) ||
        candidate.quantity <= 0
      ) {
        continue;
      }

      const catalogItem =
        findMenuItemById(candidate.itemId) ?? candidate.fallbackItem;

      if (
        catalogItem &&
        typeof catalogItem.id === "string" &&
        typeof catalogItem.name === "string" &&
        typeof catalogItem.price === "number"
      ) {
        restored.push({
          item: catalogItem,
          quantity: Math.min(Math.floor(candidate.quantity), MAX_ITEM_QUANTITY),
        });
      }
    }

    return restored;
  } catch {
    return [];
  }
}

export const DEFAULT_CUSTOMER_FORM: CustomerOrderForm = {
  customerName: "",
  customerPhone: "",
  fulfillmentMode: "delivery",
  deliveryAddress: "",
  addressComplement: "",
  paymentMethod: "pix",
  cashChangeFor: "",
  notes: "",
};

/**
 * Salva o rascunho dos dados do pedido no sessionStorage durante a sessão.
 */
export function saveCustomerFormToSession(
  form: CustomerOrderForm,
  storage: Storage | null = typeof window !== "undefined"
    ? window.sessionStorage
    : null
): void {
  if (!storage) return;
  try {
    storage.setItem(
      restaurantConfig.storageKeys.customerDraftSession,
      JSON.stringify(form)
    );
  } catch {
    // Falha silenciosa caso storage esteja indisponível
  }
}

/**
 * Carrega o rascunho do formulário do cliente salvo na sessão.
 */
export function loadCustomerFormFromSession(
  storage: Storage | null = typeof window !== "undefined"
    ? window.sessionStorage
    : null
): CustomerOrderForm {
  if (!storage) return DEFAULT_CUSTOMER_FORM;
  try {
    const raw = storage.getItem(
      restaurantConfig.storageKeys.customerDraftSession
    );
    if (!raw) return DEFAULT_CUSTOMER_FORM;

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return DEFAULT_CUSTOMER_FORM;

    const record = parsed as Partial<CustomerOrderForm>;

    const fulfillmentMode: FulfillmentMode =
      record.fulfillmentMode === "pickup" ? "pickup" : "delivery";

    const paymentMethod =
      record.paymentMethod === "card" ||
      record.paymentMethod === "cash" ||
      record.paymentMethod === "pix"
        ? record.paymentMethod
        : "pix";

    return {
      customerName:
        typeof record.customerName === "string" ? record.customerName : "",
      customerPhone:
        typeof record.customerPhone === "string" ? record.customerPhone : "",
      fulfillmentMode,
      deliveryAddress:
        typeof record.deliveryAddress === "string"
          ? record.deliveryAddress
          : "",
      addressComplement:
        typeof record.addressComplement === "string"
          ? record.addressComplement
          : "",
      paymentMethod,
      cashChangeFor:
        typeof record.cashChangeFor === "string" ? record.cashChangeFor : "",
      notes: typeof record.notes === "string" ? record.notes : "",
    };
  } catch {
    return DEFAULT_CUSTOMER_FORM;
  }
}

