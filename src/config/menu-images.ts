/**
 * Mapeamento centralizado de imagens do cardápio indexado pelo ID único de cada prato.
 *
 * CAUSA RAIZ CORRIGIDA:
 * Anteriormente, `src/config/menu.ts` continha URLs genéricas e opacas do Unsplash
 * (`photo-...`) espalhadas e hardcoded diretamente em cada objeto do cardápio, sem
 * validação visual contra os pratos regionais brasileiros (resultando, por exemplo,
 * em fotos de coquetéis na Cocada de Forno, taça de Oreo no Romeu & Julieta,
 * batata frita nos Dadinhos de Tapioca e samosas indianas no Pastel de Carne de Sol).
 *
 * Com este registro centralizado por ID (`MENU_ITEM_IMAGES`):
 * 1. Cada prato busca sua imagem exclusivamente pela chave do seu `id`.
 * 2. Itens sem fotografia real correspondente utilizam placeholders SVG dedicados e
 *    identificados com o nome/ID do prato em `/public/images/pratos/<id>.svg`,
 *    marcados com `isTemporaryPlaceholder: true` e comentário `TODO` até que as
 *    fotos reais do restaurante sejam fornecidas.
 */

export interface MenuDishImageEntry {
  imageUrl: string;
  imageAlt: string;
  isTemporaryPlaceholder: boolean;
}

export const MENU_ITEM_IMAGES: Record<string, MenuDishImageEntry> = {
  // 1. ENTRADAS DA ROÇA
  "ent-dadinho-tapioca": {
    // TODO: Substituir placeholder temporário pela foto real de Dadinhos de Tapioca com Queijo Coalho e Melaço Picante
    imageUrl: "/images/pratos/ent-dadinho-tapioca.svg",
    imageAlt:
      "Placeholder temporário: Porção de dadinhos dourados de tapioca com molho de melaço em cerâmica rústica",
    isTemporaryPlaceholder: true,
  },
  "ent-bolinho-costela": {
    // TODO: Substituir placeholder temporário pela foto real de Croquetas de Costela Defumada com maionese de alho
    imageUrl: "/images/pratos/ent-bolinho-costela.svg",
    imageAlt:
      "Placeholder temporário: Croquetas douradas de costela defumada servidas com maionese artesanal",
    isTemporaryPlaceholder: true,
  },
  "ent-pao-brasa": {
    // TODO: Substituir placeholder temporário pela foto real de Fatias de Pão na Brasa com Manteiga de Garrafa e Alho Assado
    imageUrl: "/images/pratos/ent-pao-brasa.svg",
    imageAlt:
      "Placeholder temporário: Fatias de pão artesanal tostado na brasa com alho assado e ervas",
    isTemporaryPlaceholder: true,
  },
  "ent-pastel-carne-sol": {
    // TODO: Substituir placeholder temporário pela foto real de Pastel de Feira de Carne de Sol com Requeijão de Corte
    imageUrl: "/images/pratos/ent-pastel-carne-sol.svg",
    imageAlt:
      "Placeholder temporário: Pastéis artesanais dourados servidos com vinagrete fresco",
    isTemporaryPlaceholder: true,
  },

  // 2. CARNES DE BRASA & FOGO
  "bra-costela-bafo": {
    // TODO: Substituir placeholder temporário pela foto real de Costela Bovina Assada 12h com Mandioca na Manteiga e Farofa
    imageUrl: "/images/pratos/bra-costela-bafo.svg",
    imageAlt:
      "Placeholder temporário: Costela bovina assada lentamente servida com mandioca cremosa e ervas",
    isTemporaryPlaceholder: true,
  },
  "bra-bife-ancho": {
    // Foto verificada: corte alto de carne bovina grelhada na parrilla fatiada na tábua
    imageUrl:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Bife ancho grelhado na brasa fatiado sobre tábua rústica",
    isTemporaryPlaceholder: false,
  },
  "bra-sobrecoxa-caipira": {
    // TODO: Substituir placeholder temporário pela foto real de Sobrecoxa de Frango Caipira Desossada na Brasa sobre Polenta Crioula
    imageUrl: "/images/pratos/bra-sobrecoxa-caipira.svg",
    imageAlt:
      "Placeholder temporário: Sobrecoxa de frango dourada na brasa sobre polenta cremosa",
    isTemporaryPlaceholder: true,
  },

  // 3. PANELAS DE BARRO & RAIZ
  "pan-baiao-imperial": {
    // TODO: Substituir placeholder temporário pela foto real de Baião de Dois Imperial na Panela de Barro com Carne de Sol e Queijo Coalho
    imageUrl: "/images/pratos/pan-baiao-imperial.svg",
    imageAlt:
      "Placeholder temporário: Baião de dois cremoso servido em panela de barro com queijo coalho",
    isTemporaryPlaceholder: true,
  },
  "pan-moqueca-peixe": {
    // TODO: Substituir placeholder temporário pela foto real de Moqueca de Pescada Amarela na Panela de Barro
    imageUrl: "/images/pratos/pan-moqueca-peixe.svg",
    imageAlt:
      "Placeholder temporário: Moqueca de peixe fumegante em panela de barro tradicional",
    isTemporaryPlaceholder: true,
  },
  "pan-galinhada-tacho": {
    // TODO: Substituir placeholder temporário pela foto real de Galinhada da Serra no Tacho de Ferro com Quiabo Tostado
    imageUrl: "/images/pratos/pan-galinhada-tacho.svg",
    imageAlt:
      "Placeholder temporário: Galinhada tradicional com açafrão-da-terra e quiabo tostado no tacho",
    isTemporaryPlaceholder: true,
  },

  // 4. MASSAS & DA HORTA
  "mas-nhoque-mandioquinha": {
    // TODO: Substituir placeholder temporário pela foto real de Nhoque de Mandioquinha Dourado com Ragu de Cogumelos (Vegetariano)
    imageUrl: "/images/pratos/mas-nhoque-mandioquinha.svg",
    imageAlt:
      "Placeholder temporário: Prato de nhoque artesanal dourado com cogumelos frescos e sálvia",
    isTemporaryPlaceholder: true,
  },
  "mas-ravioli-canastra": {
    // TODO: Substituir placeholder temporário pela foto real de Ravioli de Queijo Canastra ao Molho Vermelho de Tomates Assados
    imageUrl: "/images/pratos/mas-ravioli-canastra.svg",
    imageAlt:
      "Placeholder temporário: Ravioli artesanal ao molho rústico de tomates assados e manjericão",
    isTemporaryPlaceholder: true,
  },
  "mas-moqueca-banana": {
    // TODO: Substituir placeholder temporário pela foto real de Moqueca Vegetariana de Banana-da-Terra e Palmito Pupunha na Panela de Barro
    imageUrl: "/images/pratos/mas-moqueca-banana.svg",
    imageAlt:
      "Placeholder temporário: Moqueca vegetariana de banana-da-terra e palmito pupunha na panela de barro",
    isTemporaryPlaceholder: true,
  },

  // 5. GUARNIÇÕES DA CASA
  "gua-farofa-castanhas": {
    // TODO: Substituir placeholder temporário pela foto real de Farofa Crocante na Manteiga de Garrafa com Castanhas Brasileiras
    imageUrl: "/images/pratos/gua-farofa-castanhas.svg",
    imageAlt:
      "Placeholder temporário: Tigela de barro com farofa dourada de castanhas brasileiras",
    isTemporaryPlaceholder: true,
  },
  "gua-feijao-tropeiro": {
    // TODO: Substituir placeholder temporário pela foto real de Feijão Tropeiro Mineiro Completo com Couve, Ovos e Torresmo
    imageUrl: "/images/pratos/gua-feijao-tropeiro.svg",
    imageAlt:
      "Placeholder temporário: Porção de feijão tropeiro mineiro com couve fresca e torresmo",
    isTemporaryPlaceholder: true,
  },
  "gua-arroz-biro": {
    // TODO: Substituir placeholder temporário pela foto real de Arroz Biro-Biro com Ovos Mexidos e Batata Palha Artesanal
    imageUrl: "/images/pratos/gua-arroz-biro.svg",
    imageAlt:
      "Placeholder temporário: Arroz biro-biro com ovos mexidos e batata palha artesanal",
    isTemporaryPlaceholder: true,
  },

  // 6. DOCES DE TACHO
  "sob-cocada-forno": {
    // TODO: Substituir placeholder temporário pela foto real de Cocada Cremosa de Forno a Lenha com Sorvete de Tapioca
    imageUrl: "/images/pratos/sob-cocada-forno.svg",
    imageAlt:
      "Placeholder temporário: Cocada cremosa gratinada em panelinha de barro com bola de sorvete de tapioca",
    isTemporaryPlaceholder: true,
  },
  "sob-pudim-rapadura": {
    // TODO: Substituir placeholder temporário pela foto real de Pudim de Leite da Fazenda com Caramelo de Rapadura
    imageUrl: "/images/pratos/sob-pudim-rapadura.svg",
    imageAlt:
      "Placeholder temporário: Pudim de leite artesanal com calda escura de rapadura",
    isTemporaryPlaceholder: true,
  },
  "sob-romeu-julieta": {
    // TODO: Substituir placeholder temporário pela foto real de Romeu & Julieta Quente na Brasa com Goiabada Cascão de Tacho
    imageUrl: "/images/pratos/sob-romeu-julieta.svg",
    imageAlt:
      "Placeholder temporário: Queijo Minas grelhado na chapa com calda espessa de goiabada cascão",
    isTemporaryPlaceholder: true,
  },

  // 7. BEBIDAS & REFRESCOS
  "beb-limonada-capim-santo": {
    // Foto verificada: refresco de limão com folhas de ervas frescas e gelo
    imageUrl:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=520&q=72",
    imageAlt: "Refresco artesanal de limão com capim-santo fresco e gelo",
    isTemporaryPlaceholder: false,
  },
  "beb-suco-caju": {
    // TODO: Substituir placeholder temporário pela foto real de Garrafa de Suco Natural de Caju Integral com Hortelã
    imageUrl: "/images/pratos/beb-suco-caju.svg",
    imageAlt:
      "Placeholder temporário: Garrafa lacrada de suco natural de caju com folhas de hortelã",
    isTemporaryPlaceholder: true,
  },
  "beb-agua-refrigerante": {
    // TODO: Item genérico agrupando múltiplas bebidas (Coca-Cola Normal/Zero, Guaraná Antarctica e Água Tônica). Definir foto composta das latas ou desmembrar os itens.
    imageUrl: "/images/pratos/beb-agua-refrigerante.svg",
    imageAlt:
      "Placeholder temporário: Opções de refrigerante em lata e água tônica artesanal (350ml)",
    isTemporaryPlaceholder: true,
  },
  "beb-cerveja-ipa-serra": {
    // Foto verificada: cerveja artesanal âmbar/dourada servida gelada
    imageUrl:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=520&q=72",
    imageAlt: "Cerveja artesanal Session IPA da Serra servida gelada",
    isTemporaryPlaceholder: false,
  },
};

/**
 * Resolve a imagem e o texto alternativo correspondentes ao ID de um item do cardápio.
 */
export function resolveMenuItemImage(itemId: string): MenuDishImageEntry {
  return (
    MENU_ITEM_IMAGES[itemId] ?? {
      imageUrl: undefined as unknown as string,
      imageAlt: `Ilustração cerâmica do prato ${itemId}`,
      isTemporaryPlaceholder: true,
    }
  );
}

