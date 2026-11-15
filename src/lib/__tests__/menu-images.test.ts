import { describe, expect, it } from "vitest";
import { menuItems } from "@/config/menu";
import { MENU_ITEM_IMAGES } from "@/config/menu-images";

describe("Integridade do mapeamento centralizado de imagens do cardápio", () => {
  it("associa 100% dos pratos ativos a fotografias reais únicas verificadas, sem ilustrações vetoriais (.svg) nem pendências", () => {
    const seenUrls = new Set<string>();

    for (const item of menuItems) {
      const mapped = MENU_ITEM_IMAGES[item.id];
      expect(mapped).toBeDefined();
      expect(item.imageUrl).toBe(mapped.imageUrl);
      expect(item.imageAlt.length).toBeGreaterThan(10);

      // Proíbe ilustrações vetoriais (.svg) e garante que todos os itens ativos têm foto real
      expect(item.imageUrl?.endsWith(".svg")).toBe(false);
      expect(mapped.isPendingRealPhoto).toBeFalsy();
      expect(
        item.imageUrl?.startsWith("https://images.unsplash.com/photo-")
      ).toBe(true);

      expect(seenUrls.has(item.imageUrl!)).toBe(false);
      seenUrls.add(item.imageUrl!);
    }
  });
});
