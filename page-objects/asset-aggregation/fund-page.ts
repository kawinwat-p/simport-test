import { expect, type Page } from "@playwright/test";

export class FundPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Actions

  // Assertions
  async expectFundPage() {
    await expect(this.page.getByText("กองทุน (Fund)")).toBeVisible();
  }
}
