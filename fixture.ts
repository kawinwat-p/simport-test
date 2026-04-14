import { test as base } from "@playwright/test";
import { Navbar } from "./component-objects/navbar.js";
import { FinnomenaPage } from "./page-objects/finnomena-page.js";

export const test = base.extend<{
  navBar: Navbar;
  finnomenaPage: FinnomenaPage;
}>({
  navBar: async ({ page }, use) => {
    const navbar = new Navbar(page);
    await use(navbar);
  },
  finnomenaPage: async ({ page }, use) => {
    const finnomenaPage = new FinnomenaPage(page);
    await use(finnomenaPage);
  },
});

export { expect } from "@playwright/test";
