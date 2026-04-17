import { expect, type Locator, type Page } from "@playwright/test";

export class Navbar {
  readonly page: Page;

  // Locators
  readonly signInButton: Locator;
  readonly signUpButton: Locator;
  readonly profileMenu: Locator;
  readonly logOutButton: Locator;
  readonly allAssetsMenu: Locator;
  readonly stockMenu: Locator;
  readonly goldMenu: Locator;
  readonly fundMenu: Locator;
  readonly importMenu: Locator;

  constructor(page: Page) {
    this.page = page;

    this.signInButton = page.getByRole("button", { name: "เข้าสู่ระบบ" });
    this.signUpButton = page.getByRole("button", { name: "สมัครสมาชิก" });
    this.profileMenu = page.locator(`#Vector`);
    this.logOutButton = page.getByRole("button", { name: "ออกจากระบบ" });
    this.allAssetsMenu = page.getByText("ทรัพย์สินทั้งหมด", { exact: true }).first();
    this.stockMenu = page.getByText("หุ้น", { exact: true }).first();
    this.goldMenu = page.getByText("ทอง", { exact: true }).first();
    this.fundMenu = page.getByText("กองทุน", { exact: true }).first();
    this.importMenu = page.getByText("เพิ่มทรัพย์สิน", { exact: true }).first();
  }

  // Actions
  async clickProfileMenu() {
    await this.profileMenu.click();
  }

  async logout() {
    await this.clickProfileMenu();
    await this.logOutButton.click();
  }

  async clickSignIn() {
    await this.signInButton.click();
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }

  async clickAllAssets() {
    await this.allAssetsMenu.click();
  }

  async clickStock() {
    await this.stockMenu.click();
  }

  async clickGold() {
    await this.goldMenu.click();
  }

  async clickFund() {
    await this.fundMenu.click();
  }

  async clickImport() {
    await this.importMenu.click();
  }

  // Assertions
  async expectLoggedIn() {
    await expect(this.profileMenu).toBeVisible();
  }

  async expectLoggedOut() {
    await expect(this.signInButton).toBeVisible();
  }

  async expectSignUpButton() {
    await expect(this.signUpButton).toBeVisible();
  }

  async expectSignInButton() {
    await expect(this.signInButton).toBeVisible();
  }

  async expectProfileMenu() {
    await expect(this.profileMenu).toBeVisible();
  }

  async expectAllAssetsMenu() {
    await expect(this.allAssetsMenu).toBeVisible();
  }

  async expectStockMenu() {
    await expect(this.stockMenu).toBeVisible();
  }

  async expectGoldMenu() {
    await expect(this.goldMenu).toBeVisible();
  }

  async expectFundMenu() {
    await expect(this.fundMenu).toBeVisible();
  }

  async expectImportMenu() {
    await expect(this.importMenu).toBeVisible();
  }

  async expectLogOutButton() {
    await expect(this.logOutButton).toBeVisible();
  }
}
