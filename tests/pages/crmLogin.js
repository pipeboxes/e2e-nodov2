import { expect } from "@playwright/test";

export default class CrmLoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByRole("textbox", { name: "Email" });
    this.password = page.getByRole("textbox", { name: "Contraseña" });
    this.botonIngresar = page.getByRole("button", { name: "Iniciar sesión" });
  }

  async login(usuario = process.env.CRM_USER, clave = process.env.CRM_PASS) {
    await this.page.goto(`${process.env.CRM_URL}/login`);
    await this.email.fill(usuario);
    await this.password.fill(clave);
    await this.botonIngresar.click();
    await expect(this.page).not.toHaveURL(/\/login/);
  }
}
