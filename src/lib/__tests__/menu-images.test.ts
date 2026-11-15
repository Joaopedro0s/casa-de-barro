import { describe, expect, it } from "vitest";
import { menuItems } from "@/config/menu";
import { MENU_ITEM_IMAGES } from "@/config/menu-images";

describe("Integridade do mapeamento centralizado de imagens do cardápio", () => {
  it("associa cada prato a uma entrada exclusiva em MENU_ITEM_IMAGES sem URLs duplicadas", () => {
    const seenUrls = new Set<string>();

    for (const item of menuItems) {
      const mapped = MENU_ITEM_IMAGES[item.id];
      expect(mapped).toBeDefined();
      expect(item.imageUrl).toBe(mapped.imageUrl);
      expect(item.imageAlt.length).toBeGreaterThan(10);

      if (mapped.isTemporaryPlaceholder) {
        expect(item.imageUrl).toBe(`/images/pratos/${item.id}.svg`);
      }

      expect(seenUrls.has(item.imageUrl!)).toBe(false);
      seenUrls.add(item.imageUrl!);
    }
  });
});

