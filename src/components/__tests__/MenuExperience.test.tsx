import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MenuExperience } from "@/components/MenuExperience";

describe("Integração da interface do Cardápio Digital e Carrinho Dedicado", () => {
  it("atualiza o contador do carrinho no cabeçalho, abre a área dedicada do carrinho sob demanda e envia o pedido via WhatsApp", async () => {
    const user = userEvent.setup();
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    render(<MenuExperience />);

    // 1. Verifica aviso de dados fictícios de demonstração
    expect(
      screen.getByRole("note", { name: /aviso de projeto de demonstração/i })
    ).toBeTruthy();

    // 2. Verifica que o contador no cabeçalho inicia em 0 e que a comanda não compete com o cardápio inicialmente
    const headerCartCount = screen.getByTestId("header-cart-count");
    expect(headerCartCount.textContent).toBe("0");
    expect(
      screen.queryByRole("dialog", { name: /carrinho e comanda do pedido/i })
    ).toBeNull();

    // 3. Adiciona um item do cardápio (Dadinhos de Tapioca - R$ 36,90)
    const addDadinhoBtn = screen.getByRole("button", {
      name: /adicionar dadinhos de tapioca com queijo coalho e melaço picante ao pedido/i,
    });
    await user.click(addDadinhoBtn);

    // O contador do cabeçalho atualiza imediatamente sem precisar abrir o carrinho
    expect(headerCartCount.textContent).toBe("1");
    const headerCartButton = screen.getByTestId("header-cart-button");
    expect(headerCartButton.textContent).toContain("R$ 46,80");

    // 4. Abre a área dedicada do carrinho clicando no indicador do cabeçalho
    await user.click(headerCartButton);

    const cartDialog = screen.getByRole("dialog", {
      name: /carrinho e comanda do pedido/i,
    });
    expect(cartDialog).toBeTruthy();

    const cartTotal = within(cartDialog).getByTestId("cart-order-total-value");
    expect(cartTotal.textContent).toContain("R$ 46,80");

    // 5. Muda para Retirada no balcão dentro do carrinho e confere se a taxa sai (R$ 36,90)
    const pickupButton = within(cartDialog).getByRole("button", {
      name: /retirada no balcão/i,
    });
    await user.click(pickupButton);
    expect(cartTotal.textContent).toContain("R$ 36,90");

    // Volta para Entrega no endereço (R$ 46,80)
    const deliveryButton = within(cartDialog).getByRole("button", {
      name: /entrega no endereço/i,
    });
    await user.click(deliveryButton);
    expect(cartTotal.textContent).toContain("R$ 46,80");

    // 6. Tenta enviar sem preencher dados obrigatórios -> exibe alertas de validação
    const submitBtn = within(cartDialog).getByRole("button", {
      name: /enviar pedido pelo whatsapp/i,
    });
    await user.click(submitBtn);

    expect(
      within(cartDialog).getAllByText(
        /informe seu nome para identificarmos o pedido/i
      ).length
    ).toBeGreaterThan(0);
    expect(
      within(cartDialog).getAllByText(
        /informe o endereço completo \(rua, número e bairro\) para a entrega/i
      ).length
    ).toBeGreaterThan(0);
    expect(openSpy).not.toHaveBeenCalled();

    // 7. Preenche os dados obrigatórios e envia pelo WhatsApp
    await user.type(
      within(cartDialog).getByLabelText(/nome completo/i),
      "Rafael Mendes"
    );
    await user.type(
      within(cartDialog).getByLabelText(/telefone \/ whatsapp com ddd/i),
      "11987654321"
    );
    await user.type(
      within(cartDialog).getByLabelText(/endereço de entrega/i),
      "Rua dos Pinheiros, 850 - Pinheiros"
    );

    await user.click(submitBtn);

    expect(openSpy).toHaveBeenCalledTimes(1);
    const openedUrl = openSpy.mock.calls[0][0] as string;
    expect(openedUrl).toContain("https://wa.me/5512991026455?text=");
    expect(decodeURIComponent(openedUrl)).toContain("Rafael Mendes");
    expect(decodeURIComponent(openedUrl)).toContain("R$ 46,80");

    // 8. Fecha o carrinho clicando em "Voltar ao cardápio"
    const backBtn = within(cartDialog).getByRole("button", {
      name: /voltar ao cardápio/i,
    });
    await user.click(backBtn);
    expect(
      screen.queryByRole("dialog", { name: /carrinho e comanda do pedido/i })
    ).toBeNull();

    openSpy.mockRestore();
  });

  it("filtra pratos pela busca e exibe estado vazio com botão de redefinição quando não há resultados", async () => {
    const user = userEvent.setup();
    render(<MenuExperience />);

    const searchInput = screen.getByRole("searchbox", {
      name: /buscar prato ou ingrediente/i,
    });

    await user.type(searchInput, "ingrediente-inexistente-xyz");

    expect(
      screen.getByText(/nenhum prato encontrado para essa busca/i)
    ).toBeTruthy();

    const resetButton = screen.getByRole("button", {
      name: /mostrar todo o cardápio/i,
    });
    await user.click(resetButton);

    expect(
      screen.getByRole("heading", { name: /entradas da roça/i })
    ).toBeTruthy();
  });
});
