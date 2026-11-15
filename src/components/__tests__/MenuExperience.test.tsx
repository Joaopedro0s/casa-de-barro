import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MenuExperience } from "@/components/MenuExperience";

describe("Integração da interface do Cardápio Digital e fluxo de pedido", () => {
  it("renderiza o aviso de demonstração, calcula totais com entrega/retirada e valida o envio para o WhatsApp", async () => {
    const user = userEvent.setup();
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    render(<MenuExperience />);

    // Verifica aviso de dados fictícios de demonstração
    expect(
      screen.getByRole("note", { name: /aviso de projeto de demonstração/i })
    ).toBeTruthy();

    // Adiciona um item do cardápio (Dadinhos de Tapioca - R$ 36,90)
    const addDadinhoBtn = screen.getByRole("button", {
      name: /adicionar dadinhos de tapioca com queijo coalho e melaço picante ao pedido/i,
    });
    await user.click(addDadinhoBtn);

    // Na comanda desktop, o total com entrega (36,90 + 9,90 = R$ 46,80) deve aparecer
    const desktopTotal = screen.getByTestId("desktop-order-total-value");
    expect(desktopTotal.textContent).toContain("R$ 46,80");

    // Muda para Retirada no balcão na comanda lateral e confere se a taxa sai (R$ 36,90)
    const desktopComanda = screen.getByRole("complementary", {
      name: /comanda lateral do pedido/i,
    });

    const pickupButton = within(desktopComanda).getByRole("button", {
      name: /retirada no balcão/i,
    });
    await user.click(pickupButton);
    expect(desktopTotal.textContent).toContain("R$ 36,90");

    // Volta para Entrega no endereço (R$ 46,80)
    const deliveryButton = within(desktopComanda).getByRole("button", {
      name: /entrega no endereço/i,
    });
    await user.click(deliveryButton);
    expect(desktopTotal.textContent).toContain("R$ 46,80");

    // Tenta enviar sem preencher dados obrigatórios -> exibe alertas de validação
    const submitBtn = within(desktopComanda).getByRole("button", {
      name: /enviar pedido pelo whatsapp/i,
    });
    await user.click(submitBtn);

    expect(
      within(desktopComanda).getAllByText(
        /informe seu nome para identificarmos o pedido/i
      ).length
    ).toBeGreaterThan(0);
    expect(
      within(desktopComanda).getAllByText(
        /informe o endereço completo \(rua, número e bairro\) para a entrega/i
      ).length
    ).toBeGreaterThan(0);
    expect(openSpy).not.toHaveBeenCalled();

    // Preenche os dados obrigatórios e envia
    await user.type(
      within(desktopComanda).getByLabelText(/nome completo/i),
      "Rafael Mendes"
    );
    await user.type(
      within(desktopComanda).getByLabelText(/telefone \/ whatsapp com ddd/i),
      "11987654321"
    );
    await user.type(
      within(desktopComanda).getByLabelText(/endereço de entrega/i),
      "Rua dos Pinheiros, 850 - Pinheiros"
    );

    await user.click(submitBtn);

    expect(openSpy).toHaveBeenCalledTimes(1);
    const openedUrl = openSpy.mock.calls[0][0] as string;
    expect(openedUrl).toContain("https://wa.me/");
    expect(decodeURIComponent(openedUrl)).toContain("Rafael Mendes");
    expect(decodeURIComponent(openedUrl)).toContain("R$ 46,80");

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
