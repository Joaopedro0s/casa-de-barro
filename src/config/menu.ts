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
      "Cozidos tradicionais, moquecas e receitas de tacho servidas fumegantes",
  },
  {
    id: "massas-horta",
    name: "Massas & Da Horta",
    subtitle:
      "Massas frescas feitas na casa e pratos vegetarianos com colheita orgânica",
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
      "Sobremesas brasileiras feitas no tacho de cobre com queijos e frutas da estação",
  },
  {
    id: "bebidas",
    name: "Bebidas & Refrescos",
    subtitle:
      "Sucos prensados na hora, infusões com ervas frescas, refrigerantes e cervejas",
  },
];

type RawMenuItem = Omit<MenuItem, "imageUrl" | "imageAlt">;

/**
 * Catálogo base de pratos sem URLs hardcoded.
 * A associação de imagem (`imageUrl` e `imageAlt`) é resolvida de forma centralizada
 * pelo `id` único do prato através de `resolveMenuItemImage` em `src/config/menu-images.ts`.
 */
const rawMenuItems: RawMenuItem[] = [
  // 1. ENTRADAS DA ROÇA
  {
    id: "ent-dadinho-tapioca",
    categoryId: "entradas",
    name: "Dadinhos de Tapioca com Queijo Coalho e Melaço Picante",
    description:
      "Cubos dourados de tapioca granulada com queijo coalho artesanal do Seridó, acompanhados de melaço de cana infusionado com pimenta dedo-de-moça.",
    price: 36.9,
    servingSize: "Porção com 10 unidades (320g)",
    prepTime: "15 min",
    motif: "ochre",
    tags: ["Vegetariano", "Sem glúten", "Receita da casa"],
    featured: true,
  },
  {
    id: "ent-bolinho-costela",
    categoryId: "entradas",
    name: "Croquetas de Costela Defumada na Lenha de Macieira",
    description:
      "Massa cremosa de mandioca amarela recheada com costela bovina desfiada após 8 horas de defumação, empanada na farinha panko rústica. Acompanha maionese de alho assado.",
    price: 42.0,
    servingSize: "Porção com 6 unidades (300g)",
    prepTime: "15 min",
    motif: "terracotta",
    tags: ["Assado na lenha", "Artesanal"],
  },
  {
    id: "ent-pao-brasa",
    categoryId: "entradas",
    name: "Pão de Fermentação Natural na Brasa com Manteiga de Garrafa",
    description:
      "Fatias altas de pão rústico de campagne tostadas na grelha de ferro, finalizadas com manteiga de garrafa batida com ervas da horta, cabeça de alho confitada e flor de sal.",
    price: 31.5,
    servingSize: "Serve 2 pessoas (260g)",
    prepTime: "12 min",
    motif: "clay",
    tags: ["Vegetariano", "Assado na lenha", "Artesanal"],
  },
  {
    id: "ent-pastel-carne-sol",
    categoryId: "entradas",
    name: "Pastel de Feira de Carne de Sol com Requeijão de Corte",
    description:
      "Massa fina e crocante recheada com carne de sol desfiada na manteiga do sertão, cebola roxa caramelizada no mascavo e requeijão moreno derretido. Acompanha vinagrete de coentro.",
    price: 38.9,
    servingSize: "Porção com 6 unidades (280g)",
    prepTime: "15 min",
    motif: "copper",
    tags: ["Receita da casa", "Para compartilhar"],
  },

  // 2. CARNES DE BRASA & FOGO
  {
    id: "bra-costela-bafo",
    categoryId: "brasa-fogo",
    name: "Costela Bovina Assada 12h na Lenha com Mandioca na Manteiga",
    description:
      "Costela minga selecionada, assada lentamente em fogo de chão até soltar do osso. Acompanha mandioca cozida desmanchando na manteiga de garrafa, farofa crocante de cebola queimada e chimichurri de ervas frescas.",
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
    name: "Bife Ancho na Parrilla com Risoto de Abóbora Cabotiá",
    description:
      "Corte alto de bife ancho grelhado na brasa viva ao ponto da sua preferência, servido sobre risoto cremoso de abóbora cabotiá tostada no forno a lenha, queijo meia-cura e sálvia crocante.",
    price: 84.5,
    servingSize: "Individual (420g)",
    prepTime: "25 min",
    motif: "charcoal",
    tags: ["Assado na lenha", "Sem glúten"],
  },
  {
    id: "bra-sobrecoxa-caipira",
    categoryId: "brasa-fogo",
    name: "Sobrecoxa de Frango Caipira Desossada na Brasa com Polenta Crioula",
    description:
      "Sobrecoxa marinada em cítricos, alho e alecrim fresco, grelhada na brasa com pele crocante. Servida sobre polenta cremosa de milho crioulo moído na pedra e molho de tomates tostados.",
    price: 64.9,
    servingSize: "Individual (390g)",
    prepTime: "22 min",
    motif: "ochre",
    tags: ["Assado na lenha", "Sem glúten"],
  },

  // 3. PANELAS DE BARRO & RAIZ
  {
    id: "pan-baiao-imperial",
    categoryId: "panelas-barro",
    name: "Baião de Dois Imperial na Panela de Barro com Carne de Sol",
    description:
      "Arroz vermelho e feijão-de-corda cozidos juntos no caldo da própria carne, envoltos em nata fresca, queijo coalho tostado e coentro, cobertos por tiras suculentas de carne de sol acebolada e banana-da-terra grelhada.",
    price: 96.0,
    servingSize: "Serve 2 pessoas (700g)",
    prepTime: "25 min",
    motif: "terracotta",
    tags: ["Panela de barro", "Para compartilhar", "Receita da casa"],
    featured: true,
  },
  {
    id: "pan-moqueca-peixe",
    categoryId: "panelas-barro",
    name: "Moqueca Capixaba & Baiana de Pescada Amarela na Panela de Barro",
    description:
      "Postas altas de pescada amarela fresca cozidas na panela de barro de Goiabeiras com tomates maduros, pimentões doces, leite de coco natural e toque de azeite de dendê. Acompanha arroz branco soltinho, pirão de peixe e farofa de dendê.",
    price: 124.0,
    servingSize: "Serve 2 pessoas (850g)",
    prepTime: "30 min",
    motif: "copper",
    tags: ["Panela de barro", "Sem glúten", "Para compartilhar"],
  },
  {
    id: "pan-galinhada-tacho",
    categoryId: "panelas-barro",
    name: "Galinhada da Serra no Tacho de Ferro com Quiabo Tostado",
    description:
      "Arroz caldoso cozido no tacho de ferro com frango caipira dourado no açafrão-da-terra, milho verde fresco, lascas suaves de pequi, quiabo grelhado sem baba e cheiro-verde colhido na hora.",
    price: 88.9,
    servingSize: "Serve 2 pessoas (680g)",
    prepTime: "25 min",
    motif: "ochre",
    tags: ["Panela de barro", "Sem glúten", "Para compartilhar"],
  },

  // 4. MASSAS & DA HORTA
  {
    id: "mas-nhoque-mandioquinha",
    categoryId: "massas-horta",
    name: "Nhoque de Mandioquinha Dourado com Ragu de Cogumelos da Serra",
    description:
      "Nhoque artesanal leve de mandioquinha-salsa selado na manteiga de sálvia, coberto por ragu rústico de cogumelos Paris, Portobello e Shimeji salteados no vinho tinto com lascas de queijo Canastra curado.",
    price: 68.9,
    servingSize: "Individual (360g)",
    prepTime: "20 min",
    motif: "olive",
    tags: ["Vegetariano", "Artesanal", "Receita da casa"],
    featured: true,
  },
  {
    id: "mas-ravioli-canastra",
    categoryId: "massas-horta",
    name: "Ravioli Artesanal de Queijo Canastra ao Molho de Tomates Assados",
    description:
      "Massa fresca aberta no rolo com ovos caipiras, recheada com queijo da Serra da Canastra e ricota cremosa, servida com molho rústico de tomates italianos assados na lenha e manjericão roxo.",
    price: 72.0,
    servingSize: "Individual (340g)",
    prepTime: "20 min",
    motif: "olive",
    tags: ["Vegetariano", "Assado na lenha", "Artesanal"],
  },
  {
    id: "mas-moqueca-banana",
    categoryId: "massas-horta",
    name: "Moqueca Vegetariana de Banana-da-Terra e Palmito Pupunha",
    description:
      "Banana-da-terra madura grelhada, rodelas macias de palmito pupunha fresco e castanha-de-caju tostada cozidos na panela de barro com leite de coco, coentro e pimenta-de-cheiro. Acompanha arroz de coco e farofa crocante.",
    price: 79.9,
    servingSize: "Individual generoso (460g)",
    prepTime: "22 min",
    motif: "olive",
    tags: ["Vegetariano", "Sem glúten", "Panela de barro"],
  },

  // 5. GUARNIÇÕES DA CASA
  {
    id: "gua-farofa-castanhas",
    categoryId: "guarnicoes",
    name: "Farofa Crocante na Manteiga de Garrafa com Castanhas Brasileiras",
    description:
      "Farinha de mandioca artesanal de Bragança tostada lentamente na manteiga de garrafa com castanha-do-pará, castanha-de-caju e cebola crocante.",
    price: 22.9,
    servingSize: "Porção (200g)",
    prepTime: "10 min",
    motif: "clay",
    tags: ["Vegetariano", "Artesanal"],
  },
  {
    id: "gua-feijao-tropeiro",
    categoryId: "guarnicoes",
    name: "Feijão Tropeiro Mineiro Completo",
    description:
      "Feijão roxinho cozido al dente salteado com bacon defumado na casa, linguiça artesanal, ovos caipiras, torresmo crocante, couve-manteiga rasgada fininha e farinha de mandioca.",
    price: 29.9,
    servingSize: "Porção (300g)",
    prepTime: "12 min",
    motif: "terracotta",
    tags: ["Receita da casa", "Sem glúten"],
  },
  {
    id: "gua-arroz-biro",
    categoryId: "guarnicoes",
    name: "Arroz Biro-Biro da Casa na Panela de Ferro",
    description:
      "Arroz branco soltinho envolvido com ovos mexidos macios, cebola dourada, salsinha fresca e batata palha artesanal cortada na faca.",
    price: 26.5,
    servingSize: "Porção (280g)",
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
    id: "sob-pudim-rapadura",
    categoryId: "sobremesas",
    name: "Pudim de Leite da Fazenda com Caramelo de Rapadura e Cumaru",
    description:
      "Pudim lisinho assado em banho-maria lento, coberto por calda brilhante de rapadura negra perfumada com fava de cumaru (a baunilha da Amazônia) e flor de sal.",
    price: 27.9,
    servingSize: "Individual (180g)",
    prepTime: "8 min",
    motif: "ochre",
    tags: ["Vegetariano", "Sem glúten", "Receita da casa"],
  },
  {
    id: "sob-romeu-julieta",
    categoryId: "sobremesas",
    name: "Romeu & Julieta Quente na Brasa com Goiabada Cascão de Tacho",
    description:
      "Fatia alta de queijo Minas meia-cura tostada na chapa de ferro, servida com goiabada cascão cremosa derretida com toque de cachaça envelhecida em amburana.",
    price: 29.5,
    servingSize: "Individual (200g)",
    prepTime: "10 min",
    motif: "terracotta",
    tags: ["Vegetariano", "Sem glúten", "Artesanal"],
  },

  // 7. BEBIDAS & REFRESCOS
  {
    id: "beb-limonada-capim-santo",
    categoryId: "bebidas",
    name: "Limonada da Roça com Capim-Santo e Gengibre",
    description:
      "Suco fresco de limão-cravo e limão-tahiti batido na hora com folhas de capim-santo da horta, toque de gengibre e melado claro. Engarrafada para viagem.",
    price: 16.9,
    servingSize: "Garrafa lacrada (500ml)",
    motif: "olive",
    tags: ["Vegetariano", "Sem glúten", "Artesanal"],
  },
  {
    id: "beb-suco-caju",
    categoryId: "bebidas",
    name: "Suco Natural de Caju Integral com Hortelã",
    description:
      "Polpa integral de caju nordestino batida com água mineral gelada e folhas frescas de hortelã. Sem conservantes.",
    price: 17.9,
    servingSize: "Garrafa lacrada (500ml)",
    motif: "ochre",
    tags: ["Vegetariano", "Sem glúten", "Artesanal"],
  },
  {
    id: "beb-agua-refrigerante",
    categoryId: "bebidas",
    name: "Refrigerante Lata / Água Tônica Artesanal",
    description:
      "Opções geladas em lata de 350ml (Coca-Cola Normal, Coca-Cola Zero, Guaraná Antarctica ou Água Tônica). Informe sua preferência nas observações do pedido.",
    price: 9.5,
    servingSize: "Lata (350ml)",
    motif: "charcoal",
    tags: ["Sem glúten"],
  },
  {
    id: "beb-cerveja-ipa-serra",
    categoryId: "bebidas",
    name: "Cerveja Artesanal Session IPA da Serra (600ml)",
    description:
      "Cerveja artesanal puro malte de microcervejaria local, notas cítricas de maracujá e amargor equilibrado que harmoniza com carnes de brasa. Venda proibida para menores de 18 anos.",
    price: 28.9,
    servingSize: "Garrafa (600ml)",
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
