import { expect, type Page } from "@playwright/test";

export class AssetPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Actions

  // Assertions
  async expectAllAssetsPage() {
    await expect(
      this.page.getByText("ทรัพย์สินทั้งหมด (Assets)"),
    ).toBeVisible();
  }
}
