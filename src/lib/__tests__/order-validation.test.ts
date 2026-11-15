import { describe, expect, it } from "vitest";
import { menuItems } from "@/config/menu";
import { addCartItem } from "@/lib/cart";
import {
  formatPhoneInput,
  MAX_NOTES_LENGTH,
  validateOrderForm,
} from "@/lib/order-validation";
import type { CustomerOrderForm } from "@/types/menu";

describe("Validação do formulário de pedido e formatação de campos", () => {
  const sampleCart = addCartItem([], menuItems[0], 2); // R$ 73,80

  const validDeliveryForm: CustomerOrderForm = {
    customerName: "Ana Paula Souza",
    customerPhone: "(11) 98765-4321",
    fulfillmentMode: "delivery",
    deliveryAddress: "Rua das Palmeiras, 120 - Pinheiros",
    addressComplement: "Apto 31",
    paymentMethod: "pix",
    cashChangeFor: "",
    notes: "Sem pimenta no melaço, por favor.",
  };

  it("aplica máscara de telefone brasileiro para números fixos e celulares", () => {
    expect(formatPhoneInput("11987654321")).toBe("(11) 98765-4321");
    expect(formatPhoneInput("1134567890")).toBe("(11) 3456-7890");
    expect(formatPhoneInput("")).toBe("");
  });

  it("aprova um pedido de entrega válido com todos os campos obrigatórios preenchidos", () => {
    const result = validateOrderForm(validDeliveryForm, sampleCart, 83.7);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("rejeita pedido quando o carrinho está vazio", () => {
    const result = validateOrderForm(validDeliveryForm, [], 0);
    expect(result.isValid).toBe(false);
    expect(result.errors.cart).toBeDefined();
  });

  it("exige nome válido e telefone com DDD (10 ou 11 dígitos)", () => {
    const invalidCustomer: CustomerOrderForm = {
      ...validDeliveryForm,
      customerName: "Oi",
      customerPhone: "(11) 9876",
    };

    const result = validateOrderForm(invalidCustomer, sampleCart, 83.7);
    expect(result.isValid).toBe(false);
    expect(result.errors.customerName).toBeDefined();
    expect(result.errors.customerPhone).toBeDefined();
  });

  it("exige endereço apenas quando a forma escolhida for entrega e dispensa na retirada", () => {
    const deliveryWithoutAddress: CustomerOrderForm = {
      ...validDeliveryForm,
      fulfillmentMode: "delivery",
      deliveryAddress: "   ",
    };

    const failResult = validateOrderForm(
      deliveryWithoutAddress,
      sampleCart,
      83.7
    );
    expect(failResult.isValid).toBe(false);
    expect(failResult.errors.deliveryAddress).toBeDefined();

    const pickupWithoutAddress: CustomerOrderForm = {
      ...validDeliveryForm,
      fulfillmentMode: "pickup",
      deliveryAddress: "",
    };

    const passResult = validateOrderForm(
      pickupWithoutAddress,
      sampleCart,
      73.8
    );
    expect(passResult.isValid).toBe(true);
    expect(passResult.errors.deliveryAddress).toBeUndefined();
  });

  it("valida o campo de troco quando a forma de pagamento é dinheiro", () => {
    const cashWithInsufficientChange: CustomerOrderForm = {
      ...validDeliveryForm,
      paymentMethod: "cash",
      cashChangeFor: "50,00",
    };

    const insufficientResult = validateOrderForm(
      cashWithInsufficientChange,
      sampleCart,
      83.7
    );
    expect(insufficientResult.isValid).toBe(false);
    expect(insufficientResult.errors.cashChangeFor).toContain("R$ 83,70");

    const cashWithValidChange: CustomerOrderForm = {
      ...validDeliveryForm,
      paymentMethod: "cash",
      cashChangeFor: "100,00",
    };

    const validResult = validateOrderForm(
      cashWithValidChange,
      sampleCart,
      83.7
    );
    expect(validResult.isValid).toBe(true);
  });

  it("rejeita observações que ultrapassam o limite máximo de caracteres", () => {
    const tooLongNotes: CustomerOrderForm = {
      ...validDeliveryForm,
      notes: "a".repeat(MAX_NOTES_LENGTH + 5),
    };

    const result = validateOrderForm(tooLongNotes, sampleCart, 83.7);
    expect(result.isValid).toBe(false);
    expect(result.errors.notes).toBeDefined();
  });
});

