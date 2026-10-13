import test from "@playwright/test";

test.describe("Validación de comportamiento del backend", () => {

    test("Lista de productos vacía", async ({ page }) => {
        await page.route('**/products', async (route, request) => {
            await route.fulfill({ 
                body: JSON.stringify([]),
            });
        });

        await page.goto("https://ecommerce-js-test.vercel.app/");

        await expect(page.getByText("Ningún producto disponible", {exact: true})).toBeVisible();
    });
});
