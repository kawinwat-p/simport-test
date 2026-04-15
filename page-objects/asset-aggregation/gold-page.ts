import { expect, type Page } from "@playwright/test";

export class GoldPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Actions
  async clearGoldData() {
    const deleteButtons = this.page.locator(
      `//*[local-name()='path' and @fill='#092640']`,
    );
    const count = await deleteButtons.count();
    for (let i = 0; i < count; i++) {
      await deleteButtons.nth(0).click();
      await this.page.getByText("ลบทรัพย์สิน").click();
      await this.page.getByRole("button", { name: "ลบทรัพย์สิน" }).click();
    }
  }

  // Assertions
  async expectGoldPage() {
    await expect(this.page.getByText("ทอง (Gold)")).toBeVisible();
  }

  async expectNetWorth(
    netWorth?: string,
    unrealized?: string,
    realized?: string,
    unrealizedPercentage?: string,
    realizedPercentage?: string,
  ) {
    if (
      netWorth &&
      unrealized &&
      realized &&
      unrealizedPercentage &&
      realizedPercentage
    ) {
      await expect(this.page.getByText(`THB ${netWorth}`)).toBeVisible();
      await expect(
        this.page.getByText(`${unrealized} (${unrealizedPercentage})`),
      ).toBeVisible();
      await expect(
        this.page.getByText(`${realized} (${realizedPercentage})`),
      ).toBeVisible();
    } else {
      await expect(this.page.getByText("THB").first()).toBeVisible();
      await expect(
        this.page.getByText("Unrealized", { exact: true }).first(),
      ).toBeVisible();
      await expect(
        this.page.getByText("Realized", { exact: true }).first(),
      ).toBeVisible();
    }
  }
}
