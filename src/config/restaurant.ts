import type { FulfillmentMode, PaymentMethod } from "@/types/menu";

/**
 * Sanitiza um número de telefone/WhatsApp mantendo apenas dígitos numéricos.
 */
export function sanitizeWhatsAppNumber(rawNumber: string | undefined): string {
  const digits = (rawNumber ?? "").replace(/\D/g, "");
  return digits.length >= 10 ? digits : "5512991026455";
}

/**
 * Converte o valor configurado de taxa de entrega para número seguro (>= 0).
 */
export function resolveDeliveryFee(rawFee: string | number | undefined): number {
  if (typeof rawFee === "number" && Number.isFinite(rawFee) && rawFee >= 0) {
    return Number(rawFee.toFixed(2));
  }
  if (typeof rawFee === "string" && rawFee.trim() !== "") {
    const normalized = rawFee.trim().replace(",", ".");
    const parsed = Number.parseFloat(normalized);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return Number(parsed.toFixed(2));
    }
  }
  return 9.9;
}

/**
 * Configuração central do restaurante (Dados Fictícios de Demonstração).
 * Para alterar o número de WhatsApp ou a taxa de entrega sem tocar no código,
 * defina NEXT_PUBLIC_WHATSAPP_NUMBER e NEXT_PUBLIC_DELIVERY_FEE nas variáveis
 * de ambiente (ex.: arquivo .env.local ou painel da Vercel) ou edite os valores padrão abaixo.
 */
export const restaurantConfig = {
  isDemo: true,
  demoNotice:
    "Ambiente de demonstração para portfólio: nome do restaurante, endereço, pratos e valores são fictícios.",
  name: "Casa de Barro",
  subtitle: "Cozinha de Fogo, Panela de Barro & Raiz",
  tagline:
    "Receitas brasileiras de fogão a lenha, assados lentos na brasa e ingredientes de pequenos produtores locais.",
  establishedYear: "2018",
  address: {
    street: "Rua das Jabuticabeiras, 412 — Vila Madalena",
    city: "São Paulo — SP",
    zipCode: "05436-090",
    reference: "Próximo ao Largo da Matriz (Endereço Fictício)",
  },
  contact: {
    /**
     * Número de WhatsApp que receberá o pedido via link wa.me.
     * Prioriza a variável de ambiente NEXT_PUBLIC_WHATSAPP_NUMBER.
     */
    whatsappNumber: sanitizeWhatsAppNumber(
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5512991026455"
    ),
    displayPhone: "+55 (12) 99102-6455",
  },
  delivery: {
    /**
     * Taxa fixa única cobrada quando a modalidade escolhida é "delivery" (Entrega).
     * Na modalidade "pickup" (Retirada no local), a taxa aplicada é sempre R$ 0,00.
     */
    fixedFee: resolveDeliveryFee(process.env.NEXT_PUBLIC_DELIVERY_FEE ?? 9.9),
    estimatedDeliveryTime: "40 a 55 min",
    estimatedPickupTime: "20 a 30 min",
    serviceAreaNote: "Taxa fixa única para toda a região de atendimento.",
  },
  schedule: {
    days: "Terça a Domingo",
    hours: "11h30 às 23h00",
    kitchenStatus: "Fogão a lenha aceso · Aceitando pedidos",
  },
  storageKeys: {
    cartSession: "casa_de_barro_cart_v1",
    customerDraftSession: "casa_de_barro_customer_v1",
  },
} as const;

export const FULFILLMENT_LABELS: Record<
  FulfillmentMode,
  { title: string; description: string }
> = {
  delivery: {
    title: "Entrega no endereço",
    description: "Receba em casa com taxa fixa única de entrega",
  },
  pickup: {
    title: "Retirada no balcão",
    description: "Retire no restaurante sem taxa de entrega",
  },
};

export const PAYMENT_METHOD_LABELS: Record<
  PaymentMethod,
  { label: string; helper: string }
> = {
  pix: {
    label: "PIX",
    helper: "Chave enviada na confirmação pelo WhatsApp",
  },
  card: {
    label: "Cartão (Crédito ou Débito)",
    helper: "Pagamento na maquininha na entrega ou retirada",
  },
  cash: {
    label: "Dinheiro",
    helper: "Informe no campo abaixo se precisar de troco",
  },
};
