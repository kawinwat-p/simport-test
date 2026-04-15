import { expect, type Page } from "@playwright/test";

export class StockPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Actions

  // Assertions
  async expectStockPage() {
    await expect(this.page.getByText("หุ้น (Stock)")).toBeVisible();
  }
}
