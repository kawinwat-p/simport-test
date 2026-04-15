import { test as base } from "@playwright/test";
import { Navbar } from "./component-objects/navbar.js";
import { FinnomenaPage } from "./page-objects/user-management/finnomena-page.js";
import { AssetPage } from "./page-objects/asset-aggregation/asset-page.js";
import { GoldPage } from "./page-objects/asset-aggregation/gold-page.js";
import { StockPage } from "./page-objects/asset-aggregation/stock-page.js";
import { FundPage } from "./page-objects/asset-aggregation/fund-page.js";
import { ImportPage } from "./page-objects/import/import.js";

export const test = base.extend<{
  navBar: Navbar;
  finnomenaPage: FinnomenaPage;
  assetPage: AssetPage;
  goldPage: GoldPage;
  stockPage: StockPage;
  fundPage: FundPage;
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
  goldPage: async ({ page }, use) => {
    const goldPage = new GoldPage(page);
    await use(goldPage);
  },
  stockPage: async ({ page }, use) => {
    const stockPage = new StockPage(page);
    await use(stockPage);
  },
  fundPage: async ({ page }, use) => {
    const fundPage = new FundPage(page);
    await use(fundPage);
  },
  importPage: async ({ page }, use) => {
    const importPage = new ImportPage(page);
    await use(importPage);
  },
});

export { expect } from "@playwright/test";
