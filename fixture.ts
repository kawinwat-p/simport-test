import { test as base } from "@playwright/test";
import { Navbar } from "./component-objects/navbar.js";
import { FinnomenaPage } from "./page-objects/user-management/finnomena-page.js";
import { AssetPage } from "./page-objects/asset-aggregation/asset-page.js";
import { ImportPage } from "./page-objects/import/import.js";

export const test = base.extend<{
  navBar: Navbar;
  finnomenaPage: FinnomenaPage;
  assetPage: AssetPage;
  importPage: ImportPage;
}>({
  navBar: async ({ page }, use) => {
    const navbar = new Navbar(page);
    await use(navbar);
  },
  finnomenaPage: async ({ page }, use) => {
    const finnomenaPage = new FinnomenaPage(page);
    await use(finnomenaPage);
  },
  assetPage: async ({ page }, use) => {
    const assetPage = new AssetPage(page);
    await use(assetPage);
  },
  importPage: async ({ page }, use) => {
    const importPage = new ImportPage(page);
    await use(importPage);
  },
});

export { expect } from "@playwright/test";
