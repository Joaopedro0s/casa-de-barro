import { describe, expect, it } from "vitest";
import { menuItems } from "@/config/menu";
import { restaurantConfig } from "@/config/restaurant";
import {
  addCartItem,
  calculateCartSummary,
  clearCart,
  loadCartFromSession,
  loadCustomerFormFromSession,
  MAX_ITEM_QUANTITY,
  removeCartItem,
  saveCartToSession,
  saveCustomerFormToSession,
  updateCartItemQuantity,
} from "@/lib/cart";
import type { CustomerOrderForm } from "@/types/menu";

describe("Lógica do carrinho de compras e cálculo de totais", () => {
  const dishA = menuItems[0]; // Dadinhos de Tapioca - R$ 36,90
  const dishB = menuItems[4]; // Costela Bovina - R$ 118,90

  it("adiciona novos itens ao carrinho e incrementa a quantidade quando o item já existe", () => {
    let cart = addCartItem([], dishA, 1);
    expect(cart).toHaveLength(1);
    expect(cart[0].item.id).toBe(dishA.id);
    expect(cart[0].quantity).toBe(1);

    cart = addCartItem(cart, dishA, 2);
    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(3);

    cart = addCartItem(cart, dishB, 1);
    expect(cart).toHaveLength(2);
    expect(cart[1].item.id).toBe(dishB.id);
    expect(cart[1].quantity).toBe(1);
  });

  it("ignora adições com quantidade zero ou negativa e respeita o limite máximo por item", () => {
    const initial = addCartItem([], dishA, 2);
    expect(addCartItem(initial, dishA, 0)).toEqual(initial);
    expect(addCartItem(initial, dishA, -3)).toEqual(initial);

    const capped = addCartItem(initial, dishA, 999);
    expect(capped[0].quantity).toBe(MAX_ITEM_QUANTITY);
  });

  it("altera a quantidade de um item e remove-o automaticamente quando a quantidade chega a zero", () => {
    let cart = addCartItem([], dishA, 2);
    cart = addCartItem(cart, dishB, 1);

    cart = updateCartItemQuantity(cart, dishA.id, 5);
    expect(cart.find((c) => c.item.id === dishA.id)?.quantity).toBe(5);

    cart = updateCartItemQuantity(cart, dishA.id, 0);
    expect(cart).toHaveLength(1);
    expect(cart[0].item.id).toBe(dishB.id);
  });

  it("remove um item diretamente pelo ID e limpa todo o carrinho", () => {
    let cart = addCartItem([], dishA, 1);
    cart = addCartItem(cart, dishB, 2);

    cart = removeCartItem(cart, dishA.id);
    expect(cart).toHaveLength(1);
    expect(cart[0].item.id).toBe(dishB.id);

    cart = clearCart();
    expect(cart).toEqual([]);
  });

  it("calcula subtotal, taxa fixa na entrega e isenção de taxa na retirada no balcão", () => {
    let cart = addCartItem([], dishA, 2); // 2 * 36.90 = 73.80
    cart = addCartItem(cart, dishB, 1); // + 118.90 = 192.70

    const deliverySummary = calculateCartSummary(cart, "delivery", 9.9);
    expect(deliverySummary.totalItems).toBe(3);
    expect(deliverySummary.subtotal).toBe(192.7);
    expect(deliverySummary.deliveryFee).toBe(9.9);
    expect(deliverySummary.total).toBe(202.6);

    const pickupSummary = calculateCartSummary(cart, "pickup", 9.9);
    expect(pickupSummary.totalItems).toBe(3);
    expect(pickupSummary.subtotal).toBe(192.7);
    expect(pickupSummary.deliveryFee).toBe(0);
    expect(pickupSummary.total).toBe(192.7);
  });

  it("retorna total zero quando o carrinho está vazio", () => {
    const emptyDelivery = calculateCartSummary([], "delivery", 12.5);
    expect(emptyDelivery.totalItems).toBe(0);
    expect(emptyDelivery.subtotal).toBe(0);
    expect(emptyDelivery.deliveryFee).toBe(12.5);
    expect(emptyDelivery.total).toBe(0);
  });

  it("persiste e recupera o carrinho e os dados do cliente no sessionStorage com proteção contra dados corrompidos", () => {
    const cart = addCartItem(addCartItem([], dishA, 2), dishB, 1);
    saveCartToSession(cart, window.sessionStorage);

    const restoredCart = loadCartFromSession(window.sessionStorage);
    expect(restoredCart).toHaveLength(2);
    expect(restoredCart[0].item.id).toBe(dishA.id);
    expect(restoredCart[0].quantity).toBe(2);
    expect(restoredCart[1].item.id).toBe(dishB.id);
    expect(restoredCart[1].quantity).toBe(1);

    // Simula JSON corrompido no sessionStorage
    window.sessionStorage.setItem(
      restaurantConfig.storageKeys.cartSession,
      "{json-invalido"
    );
    expect(loadCartFromSession(window.sessionStorage)).toEqual([]);

    const customForm: CustomerOrderForm = {
      customerName: "Carlos Eduardo",
      customerPhone: "(11) 98888-7777",
      fulfillmentMode: "pickup",
      deliveryAddress: "",
      addressComplement: "",
      paymentMethod: "cash",
      cashChangeFor: "200,00",
      notes: "Retiro às 19h30",
    };

    saveCustomerFormToSession(customForm, window.sessionStorage);
    const restoredForm = loadCustomerFormFromSession(window.sessionStorage);
    expect(restoredForm).toEqual(customForm);
  });
});

