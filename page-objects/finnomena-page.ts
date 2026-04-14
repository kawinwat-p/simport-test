import type { Locator, Page } from "@playwright/test";

export class FinnomenaPage {
  private readonly page: Page;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly nextButton: Locator;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", { name: "อีเมล" });
    this.passwordInput = page.getByRole("textbox", {
      name: "รหัสผ่านสมาชิก Finnomena",
    });
    this.nextButton = page.getByRole("button", { name: "ต่อไป" });
    this.signInButton = page.getByRole("button", { name: "ลงชื่อเข้าใช้" });
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.nextButton.click();
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
