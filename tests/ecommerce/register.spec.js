import { test, expect } from "@playwright/test";
import RegistroPage from "../pages/registro";
import * as allure from "allure-js-commons";

let registroPage;

test.describe("Prueba de Registro e2e", () => {
  test.beforeEach(async ({ page }) => {
    // Trazabilidad: módulo y funcionalidad (iguales para todos los tests del archivo)
    await allure.epic("E-commerce");
    await allure.feature("Registro de usuario");

    registroPage = new RegistroPage(page);
    await registroPage.irARegistro();
  });

  test("Registro con datos válidos", { tag: "@smoke" }, async ({ page }) => {
    await allure.story("Registro exitoso");
    await allure.severity("critical");

    await test.step("Enviar formulario con datos válidos", async () => {
      await registroPage.registrar({
        fullName: "Felipe Test",
        email: `qa${Date.now()}@test.com`, // email distinto en cada corrida
        password: "Clave123!",
        confirmPassword: "Clave123!",
      });
    });

    await test.step("Verificar sesión iniciada", async () => {
      await expect(page.getByText("Logout", { exact: true })).toBeVisible();
    });
  });

  test("Registro con password diferente", async ({ page }) => {
    await allure.story("Validación de contraseña");
    await allure.severity("normal");

    await test.step("Enviar formulario con contraseñas distintas", async () => {
      await registroPage.registrar({
        fullName: "Felipe Test",
        email: `qa${Date.now()}@test.com`,
        password: "Clave123!",
        confirmPassword: "OtraClave456!", // no coincide
      });
    });

    await test.step("Verificar error y que no hay sesión", async () => {
      await expect(page.getByText("Passwords do not match")).toBeVisible();
      await expect(page.getByText("Logout", { exact: true })).not.toBeVisible();
    });
  });

  test("Registro con password inválido", async () => {
    await allure.story("Validación de contraseña");
    await allure.severity("normal");

    await test.step("Enviar formulario con contraseña corta", async () => {
      await registroPage.registrar({
        fullName: "Felipe Test",
        email: `qa${Date.now()}@test.com`,
        password: "123", // menos de 6 caracteres
        confirmPassword: "123",
      });
    });

    await test.step("Verificar mensaje de error", async () => {
      await expect(registroPage.mensajeError).toBeVisible();
    });
  });
});
