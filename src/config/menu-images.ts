/**
 * Mapeamento centralizado de fotografias reais do cardápio indexado pelo ID único de cada prato.
 *
 * CAUSA RAIZ CORRIGIDA:
 * 1. Centralização do vínculo `id -> foto real` em `MENU_ITEM_IMAGES`, eliminando URLs
 *    hardcoded espalhadas nos objetos do cardápio.
 * 2. Aplicação da regra de substituição de pratos: os itens cujas receitas originais não
 *    correspondiam às fotografias reais disponíveis no projeto foram substituídos (em nome,
 *    descrição, ID e texto alternativo) pelos pratos reais retratados nas respectivas fotos.
 * 3. A foto de coquetéis (`photo-1551024709-8f23befc6f87`) que estava associada por engano
 *    à Cocada foi movida para a categoria de Bebidas (`beb-coqueteis-frutas`), e a vaga na
 *    seção de sobremesas foi preenchida pelo prato `sob-bolo-creme-framboesa` (Fatia de Bolo
 *    Artesanal de Nata com Framboesas Frescas e Pistache), com foto real verificada.
 */

export interface MenuDishImageEntry {
  imageUrl: string;
  imageAlt: string;
  isPendingRealPhoto?: boolean;
}

export const MENU_ITEM_IMAGES: Record<string, MenuDishImageEntry> = {
  // 1. ENTRADAS DA ROÇA
  "ent-batata-rustica": {
    imageUrl:
      "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Porção de batatas rústicas fritas douradas servidas com páprica e ervas",
  },
  "ent-tulipas-frango": {
    imageUrl:
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Coxinhas e tulipas da asa de frango empanadas crocantes acompanhadas de molho barbecue",
  },
  "ent-pao-fermentacao-natural": {
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Pães rústicos de fermentação natural com crosta dourada e sementes",
  },
  "ent-pasteis-triangulares": {
    imageUrl:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Pastéis triangulares crocantes servidos na tábua de madeira com pimenta verde e molho de ervas",
  },

  // 2. CARNES DE BRASA & FOGO
  "bra-costelinha-suina": {
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Costelinha suína assada com molho barbecue na tábua, batatas fritas, tomates e picles",
  },
  "bra-bife-ancho": {
    imageUrl:
      "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Bife ancho grelhado na parrilla e fatiado sobre tábua de madeira rústica",
  },
  "bra-file-frango-grelhado": {
    imageUrl:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Filés de peito de frango grelhados na brasa com legumes da horta e molho cremoso de cogumelos",
  },

  // 3. PANELAS DE BARRO & RAIZ
  "pan-arroz-camarao-tacho": {
    imageUrl:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Arroz caldoso de camarão servido na panela de ferro com coentro fresco e gomos de limão",
  },
  "pan-guisado-carne-barro": {
    imageUrl:
      "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Guisado rústico de carne bovina em cubos cozido na panela de barro com caldo de urucum e gergelim",
  },
  "pan-cacarola-frango-barro": {
    imageUrl:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Caçarola de barro com cubos de frango dourados, tomates, manjericão fresco e lasca de queijo curado",
  },

  // 4. MASSAS & DA HORTA
  "mas-fettuccine-mignon": {
    imageUrl:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Fettuccine artesanal salteado na frigideira com iscas de filé mignon, tomates secos e espinafre",
  },
  "mas-ravioli-canastra": {
    imageUrl:
      "https://images.unsplash.com/photo-1587740908075-9e245070dfaa?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Ravioli artesanal de queijo finalizado na manteiga de sálvia e parmesão ralado",
  },
  "mas-tigela-horta-tofu": {
    imageUrl:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Tigela vegetariana com tofu grelhado, ovos cozidos, milho, tomate cereja, pepino e repolho roxo",
  },

  // 5. GUARNIÇÕES DA CASA
  "gua-combinado-roca": {
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Trio de porções rústicas com iscas de carne aceboladas, castanhas de caju e bolinhos dourados na farofa",
  },
  "gua-arroz-ervas-vagem": {
    imageUrl:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Prato de arroz com ervas frescas, vagens verdes tostadas, tomates cereja e mix de sementes",
  },
  "gua-arroz-branco-casa": {
    imageUrl:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Tigela de arroz branco soltinho cozido na casa com alho e cebola",
  },

  // 6. DOCES DE TACHO
  "sob-bolo-creme-framboesa": {
    imageUrl:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Fatia de bolo artesanal em camadas com creme branco de nata, geleia de frutas vermelhas, pistaches e framboesas frescas no topo",
  },
  "sob-manjar-morangos": {
    imageUrl:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Manjar cremoso de coco e baunilha servido em potinhos de vidro com calda de morangos frescos",
  },
  "sob-taca-mousse-cacau": {
    imageUrl:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Taça de mousse de chocolate artesanal com chantilly, calda de cacau e biscoitos crocantes",
  },

  // 7. BEBIDAS & REFRESCOS
  "beb-limonada-capim-santo": {
    imageUrl:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Copo de limonada da roça com rodelas de limão, folhas de hortelã, capim-santo e gelo",
  },
  "beb-suco-citrico-garrafa": {
    imageUrl:
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Garrafa de vidro com suco natural cítrico de laranja, limão e maracujá",
  },
  "beb-coqueteis-frutas": {
    imageUrl:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=520&q=72",
    imageAlt:
      "Coquetéis artesanais de frutas tropicais com limão, hortelã e maracujá",
  },
  "beb-coca-cola-lata": {
    imageUrl:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=520&q=72",
    imageAlt: "Latas de Coca-Cola tradicional geladas com gelo (350ml)",
  },
  "beb-chopp-artesanal-serra": {
    imageUrl:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=520&q=72",
    imageAlt: "Caneca de vidro com chopp artesanal dourado colarinho cremoso",
  },
};

/**
 * Resolve a fotografia correspondente ao ID de um item do cardápio.
 */
export function resolveMenuItemImage(itemId: string): MenuDishImageEntry {
  return (
    MENU_ITEM_IMAGES[itemId] ?? {
      // TODO: Fornecer foto real para o item adicionado
      imageUrl: `images/pratos/${itemId}-PENDENTE.jpg`,
      imageAlt: `Foto real pendente para o prato ${itemId}`,
      isPendingRealPhoto: true,
    }
  );
}
