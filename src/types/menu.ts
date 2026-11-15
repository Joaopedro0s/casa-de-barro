/**
 * Tipos centrais do Cardápio Digital e do fluxo de pedidos via WhatsApp.
 */

export type CategoryId =
  | "entradas"
  | "brasa-fogo"
  | "panelas-barro"
  | "massas-horta"
  | "guarnicoes"
  | "sobremesas"
  | "bebidas";

export type DietaryTag =
  | "Assado na lenha"
  | "Panela de barro"
  | "Sem glúten"
  | "Vegetariano"
  | "Para compartilhar"
  | "Receita da casa"
  | "Artesanal";

export type PlateMotif =
  | "terracotta"
  | "olive"
  | "ochre"
  | "clay"
  | "charcoal"
  | "copper";

export interface MenuCategory {
  id: CategoryId;
  name: string;
  subtitle: string;
}

export interface MenuItem {
  id: string;
  categoryId: CategoryId;
  name: string;
  description: string;
  price: number;
  servingSize: string;
  prepTime?: string;
  imageUrl?: string;
  imageAlt: string;
  motif: PlateMotif;
  tags: DietaryTag[];
  featured?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type FulfillmentMode = "delivery" | "pickup";

export type PaymentMethod = "pix" | "card" | "cash";

export interface CustomerOrderForm {
  customerName: string;
  customerPhone: string;
  fulfillmentMode: FulfillmentMode;
  deliveryAddress: string;
  addressComplement: string;
  paymentMethod: PaymentMethod;
  cashChangeFor: string;
  notes: string;
}

export type OrderFormField =
  | "cart"
  | "customerName"
  | "customerPhone"
  | "fulfillmentMode"
  | "deliveryAddress"
  | "paymentMethod"
  | "cashChangeFor"
  | "notes";

export type OrderValidationErrors = Partial<Record<OrderFormField, string>>;

export interface CartSummary {
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

