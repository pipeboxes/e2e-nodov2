import { test } from "@playwright/test";
import * as allure from "allure-js-commons";
import CrmLoginPage from "../pages/crmLogin";
import LeadsPage from "../pages/leads";

const nombres = ["Leonardo"];

test.describe("CRM - Búsqueda de prospectos", () => {
  let leads;

  test.beforeEach(async ({ page }) => {
    await allure.epic("CRM");
    await allure.feature("Prospectos");

    await new CrmLoginPage(page).login();
    leads = new LeadsPage(page);
    await leads.abrir();
  });

  for (const nombre of nombres) {
    test(
      `Buscar prospecto por nombre: ${nombre}`,
      { tag: "@smoke" },
      async () => {
        await allure.story("Búsqueda por nombre");
        await allure.severity("critical");

        await test.step(`Buscar "${nombre}"`, () => leads.buscar(nombre));
        await test.step("Verificar resultados", () =>
          leads.validarResultados(nombre));
      },
    );
  }
});
