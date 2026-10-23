// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Leer variables de entorno desde un archivo .env (opcional).
 * https://github.com/motdotla/dotenv
 */
import "dotenv/config";
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Estrategia de navegadores:
 *  - Desarrollo diario:      npm test            -> solo Chromium (rápido)
 *  - Antes de una entrega:   npm run test:all    -> Chromium + Firefox + WebKit
 *  - Navegador real (Edge):  descomentar el proyecto "edge" si los usuarios lo usan
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",

  /* Ejecutar los tests de cada archivo en paralelo */
  fullyParallel: true,

  /* En CI, falla si quedó un test.only olvidado en el código */
  forbidOnly: !!process.env.CI,

  /* Reintentos: solo en CI */
  retries: process.env.CI ? 2 : 0,

  /* En CI, un solo worker para resultados más estables */
  workers: process.env.CI ? 1 : undefined,

  /* Carpeta donde se guardan fotos, videos y traces */
  outputDir: "test-results",

  /* Reportes */
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["allure-playwright", { resultsDir: "allure-results" }],
    ["json", { outputFile: "results.json" }],
  ],

  /* Configuración compartida por todos los proyectos */
  use: {
    /* URL base para usar page.goto('/ruta') */
    // baseURL: 'http://localhost:3000',

    /* Foto al final del test, solo si falla (página completa) */
    screenshot: { mode: "only-on-failure", fullPage: true },

    /* Video: se graba, pero solo se guarda si el test falla */
    video: "retain-on-failure",

    /* Trace (paso a paso para depurar): solo al reintentar un test fallido */
    trace: "on-first-retry",
  },

  /* Navegadores */
  projects: [
    /* Principal: Chromium de Playwright (reproducible, misma versión para todos) */
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    /* Motor distinto: Gecko (Firefox) */
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    /* Motor distinto: WebKit (Safari en Mac e iPhone) */
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Opcional: navegadores reales instalados en el equipo */
    // {
    //   name: "edge",
    //   use: { ...devices["Desktop Edge"], channel: "msedge" },
    // },
    // {
    //   name: "chrome",
    //   use: { ...devices["Desktop Chrome"], channel: "chrome" },
    // },

    /* Opcional: pantallas de celular */
    // {
    //   name: "mobile-chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
    // {
    //   name: "mobile-safari",
    //   use: { ...devices["iPhone 12"] },
    // },
  ],

  /* Levantar el servidor local antes de los tests (si tu app corre local) */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
