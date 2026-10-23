import { test, expect} from "@playwright/test";

test.describe("Set de pruebas de descargas", () => {

    test("Validando la descarga de archivos", async ({ page }) => {
        await page.goto("https://e2e-ecommerce-app.vercel.app/descargas");

        const responsableDownload = page.waitForEvent('download');

        
    });

});
