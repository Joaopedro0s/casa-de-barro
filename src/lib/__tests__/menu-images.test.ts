import { describe, expect, it } from "vitest";
import { menuItems } from "@/config/menu";
import { MENU_ITEM_IMAGES } from "@/config/menu-images";

describe("Integridade do mapeamento centralizado de imagens do cardápio", () => {
  it("associa cada prato a uma foto real única ou caminho pendente (-PENDENTE.jpg), sem ilustrações vetoriais (.svg)", () => {
    const seenUrls = new Set<string>();

    for (const item of menuItems) {
      const mapped = MENU_ITEM_IMAGES[item.id];
      expect(mapped).toBeDefined();
      expect(item.imageUrl).toBe(mapped.imageUrl);
      expect(item.imageAlt.length).toBeGreaterThan(10);

      // Proíbe ilustrações vetoriais (.svg) como foto de prato
      expect(item.imageUrl?.endsWith(".svg")).toBe(false);

      if (mapped.isPendingRealPhoto) {
        expect(item.imageUrl).toContain("-PENDENTE.jpg");
      } else {
        expect(item.imageUrl?.startsWith("https://images.unsplash.com/photo-")).toBe(
          true
        );
      }

      expect(seenUrls.has(item.imageUrl!)).toBe(false);
      seenUrls.add(item.imageUrl!);
    }
  });
});
