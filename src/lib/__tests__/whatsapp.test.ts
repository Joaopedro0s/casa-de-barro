import { describe, expect, it } from "vitest";
import { menuItems } from "@/config/menu";
import { addCartItem } from "@/lib/cart";
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppOrderUrl,
} from "@/lib/whatsapp";
import type { CustomerOrderForm } from "@/types/menu";

describe("Geração da mensagem formatada e do link wa.me do WhatsApp", () => {
  const dish1 = menuItems[0]; // Dadinhos de Tapioca - R$ 36,90
  const dish2 = menuItems[7]; // Baião de Dois Imperial - R$ 96,00

  let cart = addCartItem([], dish1, 2); // 73.80
  cart = addCartItem(cart, dish2, 1); // + 96.00 = 169.80

  const deliveryForm: CustomerOrderForm = {
    customerName: "Mariana Costa",
    customerPhone: "(11) 99123-4567",
    fulfillmentMode: "delivery",
    deliveryAddress: "Rua Harmonia, 400 - Vila Madalena",
    addressComplement: "Casa 2",
    paymentMethod: "cash",
    cashChangeFor: "200,00",
    notes: "Favor enviar guardanapos extras.",
  };

  it("inclui itens, quantidades, subtotal, taxa de entrega, total, troco e dados do cliente na entrega", () => {
    const message = buildWhatsAppOrderMessage({
      items: cart,
      form: deliveryForm,
      configuredDeliveryFee: 9.9,
      restaurantName: "Casa de Barro",
    });

    expect(message).toContain("*NOVO PEDIDO — CASA DE BARRO*");
    expect(message).toContain(
      "• 2x Dadinhos de Tapioca com Queijo Coalho e Melaço Picante — R$ 73,80 (R$ 36,90 un.)"
    );
    expect(message).toContain(
      "• 1x Baião de Dois Imperial na Panela de Barro com Carne de Sol — R$ 96,00 (R$ 96,00 un.)"
    );
    expect(message).toContain("Subtotal dos itens: R$ 169,80");
    expect(message).toContain("Taxa de entrega: R$ 9,90");
    expect(message).toContain("*Total do pedido: R$ 179,70*");
    expect(message).toContain("*Recebimento:* Entrega no endereço");
    expect(message).toContain(
      "*Endereço de entrega:* Rua Harmonia, 400 - Vila Madalena"
    );
    expect(message).toContain("*Complemento / Referência:* Casa 2");
    expect(message).toContain("*Forma de pagamento:* Dinheiro");
    expect(message).toContain(
      "*Troco para:* R$ 200,00 (levar R$ 20,30 de troco)"
    );
    expect(message).toContain("*Nome:* Mariana Costa");
    expect(message).toContain("*Telefone:* (11) 99123-4567");
    expect(message).toContain("*Observações:* Favor enviar guardanapos extras.");
  });

  it("gera mensagem de retirada no balcão sem cobrança de taxa de entrega", () => {
    const pickupForm: CustomerOrderForm = {
      ...deliveryForm,
      fulfillmentMode: "pickup",
      deliveryAddress: "",
      addressComplement: "",
      paymentMethod: "pix",
      cashChangeFor: "",
    };

    const message = buildWhatsAppOrderMessage({
      items: cart,
      form: pickupForm,
      configuredDeliveryFee: 9.9,
    });

    expect(message).toContain("Subtotal dos itens: R$ 169,80");
    expect(message).toContain("Taxa de entrega: R$ 0,00 (Retirada no balcão)");
    expect(message).toContain("*Total do pedido: R$ 169,80*");
    expect(message).toContain("*Recebimento:* Retirada no balcão");
    expect(message).toContain("*Forma de pagamento:* PIX");
    expect(message).not.toContain("*Endereço de entrega:*");
  });

  it("gera link wa.me com número sanitizado e mensagem corretamente codificada (URL encoding)", () => {
    const url = buildWhatsAppOrderUrl({
      items: cart,
      form: deliveryForm,
      configuredDeliveryFee: 9.9,
      whatsappNumber: "+55 (11) 98888-1111",
    });

    expect(url.startsWith("https://wa.me/5511988881111?text=")).toBe(true);

    const encodedQuery = url.replace("https://wa.me/5511988881111?text=", "");
    const decodedText = decodeURIComponent(encodedQuery);

    expect(decodedText).toContain("*Total do pedido: R$ 179,70*");
    expect(decodedText).toContain("Mariana Costa");
    expect(decodedText).toContain("Rua Harmonia, 400 - Vila Madalena");
  });
});

