import { resolveMenuItemImage } from "@/config/menu-images";
import type { CategoryId, MenuCategory, MenuItem } from "@/types/menu";

/**
 * Categorias do cardápio digital (Dados de Demonstração).
 * Para adicionar ou reordenar categorias, edite esta lista.
 */
export const menuCategories: MenuCategory[] = [
  {
    id: "entradas",
    name: "Entradas da Roça",
    subtitle:
      "Petiscos quentes, pães na brasa e porções artesanais para abrir o apetite",
  },
  {
    id: "brasa-fogo",
    name: "Carnes de Brasa & Fogo",
    subtitle:
      "Cortes selecionados assados lentamente na lenha de frutífera e parrilla",
  },
  {
    id: "panelas-barro",
    name: "Panelas de Barro & Raiz",
    subtitle:
      "Cozidos tradicionais, caçarolas e receitas de tacho servidas fumegantes",
  },
  {
    id: "massas-horta",
    name: "Massas & Da Horta",
    subtitle:
      "Massas frescas feitas na casa e tigelas com colheita orgânica",
  },
  {
    id: "guarnicoes",
    name: "Guarnições da Casa",
    subtitle:
      "Acompanhamentos clássicos de fogão a lenha para completar sua mesa",
  },
  {
    id: "sobremesas",
    name: "Doces de Tacho",
    subtitle:
      "Sobremesas artesanais da fazenda com frutas frescas, coco e cacau",
  },
  {
    id: "bebidas",
    name: "Bebidas & Refrescos",
    subtitle:
      "Sucos prensados na hora, coquetéis de frutas, refrigerantes e chopp artesanal",
  },
];

type RawMenuItem = Omit<MenuItem, "imageUrl" | "imageAlt">;

/**
 * Catálogo de pratos sincronizado 100% com as fotografias reais mapeadas em `src/config/menu-images.ts`.
 * Seguindo a regra de substituição de pratos, os itens sem fotografia correspondente foram
 * substituídos pelos pratos reais retratados nas fotos disponíveis, e a Cocada de Forno
 * foi marcada com caminho pendente (`images/pratos/cocada-PENDENTE.jpg`).
 */
const rawMenuItems: RawMenuItem[] = [
  // 1. ENTRADAS DA ROÇA
  {
    id: "ent-batata-rustica",
    categoryId: "entradas",
    name: "Batatas Rústicas da Roça Fritas com Páprica Defumada e Flor de Sal",
    description:
      "Batatas selecionadas cortadas em palitos rústicos na casa, fritas até ficarem douradas e crocantes por fora e macias por dentro, finalizadas com páprica defumada e flor de sal.",
    price: 36.9,
    servingSize: "Porção (350g)",
    prepTime: "15 min",
    motif: "ochre",
    tags: ["Vegetariano", "Sem glúten", "Receita da casa"],
    featured: true,
  },
  {
    id: "ent-tulipas-frango",
    categoryId: "entradas",
    name: "Tulipas & Coxinhas da Asa de Frango Caipira com Barbecue de Rapadura",
    description:
      "Cortes selecionados de asinha de frango caipira marinados em especiarias e empanados até ficarem ultra crocantes. Acompanha molho barbecue artesanal de rapadura no centro.",
    price: 42.0,
    servingSize: "Porção com 6 unidades (340g)",
    prepTime: "15 min",
    motif: "terracotta",
    tags: ["Artesanal", "Para compartilhar"],
  },
  {
    id: "ent-pao-fermentacao-natural",
    categoryId: "entradas",
    name: "Cesta de Pães Rústicos de Fermentação Natural Assados na Pedra",
    description:
      "Pães artesanais de campagne e centeio com crosta crocante polvilhada na farinha e sementes de girassol tostadas, assados no forno a lenha e servidos com manteiga da roça.",
    price: 31.5,
    servingSize: "Serve 2 pessoas (280g)",
    prepTime: "12 min",
    motif: "clay",
    tags: ["Vegetariano", "Assado na lenha", "Artesanal"],
  },
  {
    id: "ent-pasteis-triangulares",
    categoryId: "entradas",
    name: "Pastéis Triangulares Crocantes de Carne Condimentada com Molho de Ervas",
    description:
      "Massa artesanal dourada em formato triangular recheada com carne bovina condimentada e especiarias da serra, servida na tábua de madeira com pimenta verde e molho fresco de coentro e hortelã.",
    price: 38.9,
    servingSize: "Porção com 4 unidades (280g)",
    prepTime: "15 min",
    motif: "copper",
    tags: ["Receita da casa", "Para compartilhar"],
  },

  // 2. CARNES DE BRASA & FOGO
  {
    id: "bra-costelinha-suina",
    categoryId: "brasa-fogo",
    name: "Costelinha Suína Assada na Lenha ao Barbecue com Batatas Fritas e Picles",
    description:
      "Rack inteiro de costelinha suína assada lentamente na lenha e pincelada com molho barbecue artesanal da casa. Servida na tábua de madeira com balde de batatas fritas crocantes, tomates maduros e picles de pepino.",
    price: 118.9,
    servingSize: "Serve 2 pessoas (750g)",
    prepTime: "30 min",
    motif: "terracotta",
    tags: ["Assado na lenha", "Para compartilhar", "Receita da casa"],
    featured: true,
  },
  {
    id: "bra-bife-ancho",
    categoryId: "brasa-fogo",
    name: "Bife Ancho Maturado na Parrilla Fatiado na Tábua com Flor de Sal",
    description:
      "Corte alto de bife ancho grelhado na brasa viva até atingir crosta caramelizada e interior suculento ao ponto, fatiado sobre tábua de madeira rústica e finalizado com flor de sal.",
    price: 84.5,
    servingSize: "Individual generoso (400g)",
    prepTime: "25 min",
    motif: "charcoal",
    tags: ["Assado na lenha", "Sem glúten"],
  },
  {
    id: "bra-file-frango-grelhado",
    categoryId: "brasa-fogo",
    name: "Filé de Frango Caipira Grelhado na Brasa com Legumes e Molho de Cogumelos",
    description:
      "Filés altos de peito de frango caipira marcados na grelha de ferro, acompanhados de seleta fresca de ervilhas, milho doce e cenoura na manteiga e molho cremoso de cogumelos frescos.",
    price: 64.9,
    servingSize: "Individual (390g)",
    prepTime: "22 min",
    motif: "ochre",
    tags: ["Assado na lenha", "Sem glúten"],
  },

  // 3. PANELAS DE BARRO & RAIZ
  {
    id: "pan-arroz-camarao-tacho",
    categoryId: "panelas-barro",
    name: "Arroz Caldoso de Camarões Salteados na Panela de Ferro com Coentro",
    description:
      "Arroz cozido no caldo aromático de crustáceos e tomates maduros com camarões rosa salteados no azeite, pimentões doces, coentro fresco picado e gomos de limão siciliano.",
    price: 96.0,
    servingSize: "Serve 2 pessoas (700g)",
    prepTime: "25 min",
    motif: "terracotta",
    tags: ["Sem glúten", "Para compartilhar", "Receita da casa"],
    featured: true,
  },
  {
    id: "pan-guisado-carne-barro",
    categoryId: "panelas-barro",
    name: "Guisado Rústico de Carne Bovina na Panela de Barro ao Caldo de Urucum",
    description:
      "Cubos macios de acém e paleta bovina cozidos lentamente na panela de barro em caldo encorpado de tomates, páprica defumada e urucum, finalizados com gergelim tostado e salsa fresca.",
    price: 108.0,
    servingSize: "Serve 2 pessoas (750g)",
    prepTime: "30 min",
    motif: "copper",
    tags: ["Panela de barro", "Sem glúten", "Para compartilhar"],
  },
  {
    id: "pan-cacarola-frango-barro",
    categoryId: "panelas-barro",
    name: "Caçarola de Frango Caipira Dourado com Tomates Assados e Queijo Curado",
    description:
      "Cubos suculentos de frango caipira salteados na caçarola de cerâmica preta com tomates vermelhos assados, ervas finas, folhas de manjericão fresco, lasca de queijo curado e grissini artesanal.",
    price: 88.9,
    servingSize: "Serve 2 pessoas (650g)",
    prepTime: "25 min",
    motif: "ochre",
    tags: ["Panela de barro", "Para compartilhar"],
  },

  // 4. MASSAS & DA HORTA
  {
    id: "mas-fettuccine-mignon",
    categoryId: "massas-horta",
    name: "Fettuccine Artesanal na Caçarola com Iscas de Mignon e Tomates Secos",
    description:
      "Massa longa fresca tipo fettuccine envolvida em molho cremoso na frigideira de ferro com iscas de filé mignon grelhado, cogumelos salteados, tomates secos e folhas de espinafre.",
    price: 68.9,
    servingSize: "Individual (380g)",
    prepTime: "20 min",
    motif: "olive",
    tags: ["Artesanal", "Receita da casa"],
    featured: true,
  },
  {
    id: "mas-ravioli-canastra",
    categoryId: "massas-horta",
    name: "Ravioli Artesanal de Queijo Canastra na Manteiga de Sálvia e Parmesão",
    description:
      "Massa fresca aberta no rolo com ovos caipiras, recheada com queijo da Serra da Canastra e ricota cremosa, salteada na manteiga dourada com ervas frescas e queijo parmesão ralado na hora.",
    price: 72.0,
    servingSize: "Individual (340g)",
    prepTime: "20 min",
    motif: "olive",
    tags: ["Vegetariano", "Artesanal"],
  },
  {
    id: "mas-tigela-horta-tofu",
    categoryId: "massas-horta",
    name: "Tigela da Horta com Tofu Grelhado na Brasa, Ovos Caipiras e Vegetais",
    description:
      "Cubos dourados de tofu marinado e grelhado, ovos caipiras cozidos, milho crioulo, edamame, tomates cereja doces, pepino crocante, repolho roxo e folhas verdes orgânicas.",
    price: 59.9,
    servingSize: "Individual generoso (420g)",
    prepTime: "18 min",
    motif: "olive",
    tags: ["Vegetariano", "Sem glúten"],
  },

  // 5. GUARNIÇÕES DA CASA
  {
    id: "gua-combinado-roca",
    categoryId: "guarnicoes",
    name: "Combinado da Roça: Bolinhos na Farofa, Iscas na Brasa e Castanhas",
    description:
      "Trio de tigelas de cerâmica com bolinhos dourados sobre farofa crocante, iscas de carne mal passada com cebola roxa e folhas verdes, e carne temperada com castanhas-de-caju tostadas.",
    price: 49.9,
    servingSize: "Para compartilhar (450g)",
    prepTime: "15 min",
    motif: "clay",
    tags: ["Para compartilhar", "Artesanal"],
  },
  {
    id: "gua-arroz-ervas-vagem",
    categoryId: "guarnicoes",
    name: "Arroz de Ervas da Horta com Vagens Verdes Tostadas e Tomates Confitados",
    description:
      "Arroz soltinho finalizado com ervas frescas picadas, acompanhado de vagens verdes salteadas no azeite, tomates cereja amarelos e vermelhos confitados e mix de sementes crocantes.",
    price: 29.9,
    servingSize: "Porção (320g)",
    prepTime: "12 min",
    motif: "terracotta",
    tags: ["Vegetariano", "Sem glúten"],
  },
  {
    id: "gua-arroz-branco-casa",
    categoryId: "guarnicoes",
    name: "Arroz Branco Soltinho da Casa Refogado no Alho Assado",
    description:
      "Arroz agulhinha selecionado cozido na hora com alho dourado no azeite e toque de sal marinho, servido bem quente e soltinho para acompanhar nossas carnes e panelas de barro.",
    price: 21.5,
    servingSize: "Porção (260g)",
    prepTime: "10 min",
    motif: "ochre",
    tags: ["Vegetariano", "Sem glúten"],
  },

  // 6. DOCES DE TACHO
  {
    id: "sob-cocada-forno",
    categoryId: "sobremesas",
    name: "Cocada Cremosa de Forno a Lenha com Sorvete de Tapioca",
    description:
      "Cocada de coco fresco ralada na hora e gratinada em panelinha de barro até dourar, servida morna com bola de sorvete artesanal de tapioca e calda de maracujá do mato.",
    price: 32.9,
    servingSize: "Individual (220g)",
    prepTime: "12 min",
    motif: "copper",
    tags: ["Vegetariano", "Sem glúten", "Assado na lenha"],
    featured: true,
  },
  {
    id: "sob-manjar-morangos",
    categoryId: "sobremesas",
    name: "Manjar Cremoso de Coco & Baunilha no Pote com Calda de Morangos Frescos",
    description:
      "Creme branco aveludado de leite de coco fresco e fava de baunilha servido gelado em potinho de vidro com cobertura artesanal de morangos orgânicos picados e calda da própria fruta.",
    price: 27.9,
    servingSize: "Individual (180g)",
    prepTime: "8 min",
    motif: "ochre",
    tags: ["Vegetariano", "Sem glúten", "Receita da casa"],
  },
  {
    id: "sob-taca-mousse-cacau",
    categoryId: "sobremesas",
    name: "Taça Gelada de Mousse de Cacau com Chantilly, Calda e Biscoito Crocante",
    description:
      "Camadas de mousse aerada de chocolate meio amargo, creme branco leve e farofa crocante de biscoitos de cacau com baunilha, finalizadas com chantilly fresco e calda espessa de chocolate.",
    price: 29.5,
    servingSize: "Individual (220g)",
    prepTime: "10 min",
    motif: "terracotta",
    tags: ["Vegetariano", "Artesanal"],
  },

  // 7. BEBIDAS & REFRESCOS
  {
    id: "beb-limonada-capim-santo",
    categoryId: "bebidas",
    name: "Limonada da Roça com Capim-Santo, Hortelã e Gelo",
    description:
      "Refresco natural de limão-tahiti preparado na hora com rodelas de limão fresco, folhas de hortelã e capim-santo colhidos na horta e bastante gelo.",
    price: 16.9,
    servingSize: "Copo / Embalagem viagem (450ml)",
    motif: "olive",
    tags: ["Vegetariano", "Sem glúten", "Artesanal"],
  },
  {
    id: "beb-suco-citrico-garrafa",
    categoryId: "bebidas",
    name: "Suco Natural Cítrico de Laranja, Maracujá e Limão na Garrafa",
    description:
      "Blend refrescante de suco de laranja doce prensado na hora com polpa fresca de maracujá e toque de limão-siciliano. Servido em garrafa de vidro lacrada sem adição de conservantes.",
    price: 17.9,
    servingSize: "Garrafa de vidro (500ml)",
    motif: "ochre",
    tags: ["Vegetariano", "Sem glúten", "Artesanal"],
  },
  {
    id: "beb-coqueteis-frutas",
    categoryId: "bebidas",
    name: "Coquetel / Caipirinha Artesanal de Frutas Tropicais da Estação",
    description:
      "Coquetel preparado na hora com frutas frescas maceradas (opções: Maracujá com Cereja, Limão com Hortelã ou Pitaya com Frutas Vermelhas), gelo cristal e cachaça artesanal ou versão sem álcool.",
    price: 26.9,
    servingSize: "Copo baixo (320ml)",
    motif: "copper",
    tags: ["Sem glúten", "Artesanal"],
  },
  {
    id: "beb-coca-cola-lata",
    categoryId: "bebidas",
    name: "Coca-Cola Tradicional em Lata Gelada (350ml)",
    description:
      "Refrigerante Coca-Cola tradicional em lata de 350ml servido trincando de gelado.",
    price: 9.5,
    servingSize: "Lata (350ml)",
    motif: "charcoal",
    tags: ["Sem glúten"],
  },
  {
    id: "beb-chopp-artesanal-serra",
    categoryId: "bebidas",
    name: "Chopp Artesanal Pilsen & Session IPA da Serra (500ml)",
    description:
      "Chopp artesanal puro malte de microcervejaria local, dourado e refrescante com colarinho cremoso que harmoniza com carnes de brasa. Venda proibida para menores de 18 anos.",
    price: 24.9,
    servingSize: "Caneca / Growler viagem (500ml)",
    motif: "copper",
    tags: ["Artesanal"],
  },
];

/**
 * Itens do cardápio com suas imagens associadas de forma determinística pelo `id`.
 */
export const menuItems: MenuItem[] = rawMenuItems.map((item) => {
  const imageEntry = resolveMenuItemImage(item.id);
  return {
    ...item,
    imageUrl: imageEntry.imageUrl,
    imageAlt: imageEntry.imageAlt,
  };
});

/**
 * Retorna os itens filtrados por categoria.
 */
export function getMenuItemsByCategory(categoryId: CategoryId): MenuItem[] {
  return menuItems.filter((item) => item.categoryId === categoryId);
}

/**
 * Busca um item do cardápio pelo seu ID.
 */
export function findMenuItemById(id: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === id);
}
