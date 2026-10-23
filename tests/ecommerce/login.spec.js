import { test, expect } from "@playwright/test";
import LoginPage from "../pages/login";

let loginPage;

test.describe("Prueba de Login e2e", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.irALogin();
  });

  test("Login con credenciales válidas", async () => {
    await loginPage.login({
      email: "admin@example.com",
      password: "admin123",
    });

    await expect(loginPage.linkLogout).toBeVisible();
  });

  test("Login con password incorrecto", async ({ page }) => {
    await loginPage.login({
      email: "admin@example.com",
      password: "claveMala999",
    });

    await expect(page.getByText("Invalid email or password")).toBeVisible();
    await expect(loginPage.linkLogout).not.toBeVisible();
  });

  test("Login con campos vacíos", async () => {
    await loginPage.clicarButtonSignIn();

    // sigue en la página de login: no entró
    await expect(loginPage.buttonSignIn).toBeVisible();
    await expect(loginPage.linkLogout).not.toBeVisible();
  });
});
