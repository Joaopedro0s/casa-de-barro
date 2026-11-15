/**
 * Utilitários para formatação e conversão de valores monetários em Real (BRL).
 */

const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Formata um número em moeda brasileira (ex.: 36.9 -> "R$ 36,90").
 * Normaliza espaços não-quebráveis para espaço comum a fim de garantir
 * compatibilidade consistente em mensagens de WhatsApp e testes automatizados.
 */
export function formatCurrency(value: number): string {
  const safeValue = Number.isFinite(value) ? value : 0;
  return brlFormatter.format(safeValue).replace(/\u00a0/g, " ");
}

/**
 * Converte uma string de valor em reais digitada pelo usuário (ex.: "150,00" ou "R$ 100")
 * para número de ponto flutuante, ou retorna null se inválida.
 */
export function parseCurrencyInput(rawInput: string): number | null {
  const cleaned = rawInput
    .replace(/[R$\s]/g, "")
    .trim();

  if (!cleaned) {
    return null;
  }

  // Se possuir vírgula decimal brasileira (ex.: "1.200,50" ou "50,00")
  const normalized = cleaned.includes(",")
    ? cleaned.replace(/\./g, "").replace(",", ".")
    : cleaned;

  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return null;
  }

  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? Number(parsed.toFixed(2)) : null;
}

