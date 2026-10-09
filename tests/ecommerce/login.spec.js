import { test, expect } from "@playwright/test";

test.describe("Pruebas de login", () => {
    test("Validación con datos correctos", async ({ page }) => {
        await page.goto("https://ecommerce-js-test.vercel.app/");
    
        const linkLogin = page.getByRole('link', { name: 'Login' });

        await linkLogin.click();

        await page.getByRole('textbox', { name: 'Email Address' }).fill('admin@example.com');

        await page.getByLabel('Password').fill('admin123');

        await page.getByRole('button', { name: 'Sign In' }).click();

        await expect(page).toHaveURL("https://ecommerce-js-test.vercel.app/");
    });
});
