import { expect } from "@playwright/test";

export default class LeadsPage {
  constructor(page) {
    this.page = page;
    this.titulo = page.getByRole("heading", { name: "Prospectos" });
    this.buscador = page.getByRole("textbox", { name: "Buscar" });
    this.botonBuscar = page.getByRole("button", { name: "Buscar" });
    this.nombres = page.locator("tbody tr td:first-child"); // columna NOMBRE
  }

  async abrir() {
    await this.page.goto(`${process.env.CRM_URL}/leads`);
    await expect(this.titulo).toBeVisible();
  }

  async buscar(texto) {
    await this.buscador.fill(texto);
    await this.botonBuscar.click();
  }

  async validarResultados(texto) {
    const noCoinciden = this.nombres.filter({
      hasNotText: new RegExp(texto, "i"),
    });
    await expect(noCoinciden).toHaveCount(0);
    await expect(this.nombres.first()).toContainText(texto, {
      ignoreCase: true,
    });
  }
}
