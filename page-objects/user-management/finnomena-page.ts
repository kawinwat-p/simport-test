import { expect, type Locator, type Page } from "@playwright/test";

export class FinnomenaPage {
  private readonly page: Page;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly registerPasswordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly nextButton: Locator;
  private readonly signInButton: Locator;
  private readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole("textbox", { name: "อีเมล" });
    this.passwordInput = page.getByRole("textbox", {
      name: "รหัสผ่านสมาชิก Finnomena",
    });
    this.registerPasswordInput = page.getByRole("textbox", {
      name: "รหัสผ่าน",
      exact: true,
    });
    this.confirmPasswordInput = page.getByRole("textbox", {
      name: "รหัสผ่านอีกครั้ง",
      exact: true,
    });
    this.nextButton = page.getByRole("button", { name: "ต่อไป" });
    this.signInButton = page
      .getByRole("button", { name: "ลงชื่อเข้าใช้" })
      .first();
    this.signUpButton = page
      .getByRole("button", { name: "สมัครสมาชิก" })
      .first();
  }

  //Actions
  async signIn(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.nextButton.click();
    await this.passwordInput.fill(password);
    await this.signInButton.click();

    await this.page.waitForTimeout(2000);
  }

  async signUp(
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<void> {
    await this.emailInput.fill(email);
    await this.registerPasswordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.signUpButton.click();

    await this.page.waitForTimeout(2000);
  }

  //Assertions
  async ExpectSignUpPage(): Promise<void> {
    await expect(this.page.getByText("สมัครสมาชิก").first()).toBeVisible();
  }

  async ExpectSignInPage(): Promise<void> {
    await expect(this.page.getByText("ลงชื่อเข้าใช้").first()).toBeVisible();
  }
}
