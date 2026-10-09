import { test, expect } from "@playwright/test";

test("Registro con datos válidos", async ({ page }) => {
    await page.goto("https://ecommerce-js-test.vercel.app/");
    const linkLogin = page.getByRole('link', { name: 'Register' });
    await linkLogin.click();
    await page.getByRole('textbox', { name: 'Full Name' }).fill('Felipe QA');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('felipe@example.com');
    await page.getByLabel('Password', { exact: true }).fill('Test1234!');
    await page.getByLabel('Confirm Password').fill('Test1234!');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page).not.toHaveURL(/register/);
});

test("Registro con contraseñas distintas", async ({ page }) => {
    await page.goto("https://ecommerce-js-test.vercel.app/");
    const linkLogin = page.getByRole('link', { name: 'Register' });
    await linkLogin.click();
    await page.getByRole('textbox', { name: 'Full Name' }).fill('Felipe QA');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('felipe@example.com');
    await page.getByLabel('Password', { exact: true }).fill('Test1234!');
    await page.getByLabel('Confirm Password').fill('Otra5678!');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await expect(page).toHaveURL(/register/);
});
