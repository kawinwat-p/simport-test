import { expect, type Locator, type Page } from "@playwright/test";

export class ImportPage {
  private readonly page: Page;
  private readonly manualImportButton: Locator;
  private readonly aiImportButton: Locator;
  private readonly stockButton: Locator;
  private readonly goldButton: Locator;
  private readonly fundButton: Locator;

  private readonly entityInput: Locator;
  private readonly descriptionInput: Locator;
  private readonly dateInput: Locator;
  private readonly timeInput: Locator;

  private readonly stockNameInput: Locator;
  private readonly stockPricePerUnitInput: Locator;
  private readonly stockQuantityInput: Locator;

  private readonly goldNameInput: Locator;
  private readonly goldPriceInput: Locator;
  private readonly goldPurityInput: Locator;
  private readonly goldQuantityInput: Locator;

  private readonly fundNameInput: Locator;
  private readonly fundNAVInput: Locator;
  private readonly fundQuantityInput: Locator;

  private readonly aiPricePerUnitInput: Locator;
  private readonly aiQuantityInput: Locator;
  private readonly aiEntityInput: Locator;

  private readonly aiUploader: Locator;

  private readonly saveButton: Locator;
  private readonly addButton: Locator;
  private readonly deleteButton: Locator;
  private readonly importAgainButton: Locator;
  private readonly closeModalButton: Locator;
  private readonly modal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.manualImportButton = page.getByRole("button", {
      name: "container กรอกข้อมูลเอง (Manual Import)",
    });
    this.aiImportButton = page.getByRole("button", {
      name: "file-image สแกนด้วย AI (AI Import)",
    });
    this.stockButton = page.getByRole("button", { name: "stock หุ้น" });
    this.goldButton = page.getByRole("button", { name: "gold ทอง" });
    this.fundButton = page.getByRole("button", { name: "fund กองทุน" });
    this.entityInput = page.getByLabel("ประเภททรัพย์สิน (Entity)");
    this.descriptionInput = page.getByLabel("บันทึกการลงทุน");
    this.dateInput = page.getByLabel("วันที่ทำรายการ");
    this.timeInput = page.getByLabel("เวลาทำรายการ");
    this.stockNameInput = page.getByLabel("ชื่อหุ้น");
    this.stockPricePerUnitInput = page.getByLabel("ราคาต่อหน่วย");
    this.stockQuantityInput = page
      .locator('.ant-form-item:has(label:has-text("จำนวนหน่วยลงทุน")) input')
      .first();
    this.goldNameInput = page.getByLabel("ชื่อทอง");
    this.goldPriceInput = page.getByLabel("ราคารวม");
    this.goldPurityInput = page.getByLabel("ความบริสุทธิ์");
    this.goldQuantityInput = page
      .locator('.ant-form-item:has(label:has-text("จำนวนหน่วย")) input')
      .first();
    this.fundNameInput = page.getByLabel("ชื่อกองทุน");
    this.fundNAVInput = page.getByLabel("NAV");
    this.fundQuantityInput = page
      .locator('.ant-form-item:has(label:has-text("จำนวนหน่วยลงทุน")) input')
      .first();
    this.saveButton = page.getByRole("button", { name: "บันทึก" });
    this.addButton = page.getByRole("button", { name: "plus เพิ่มรายการ" });
    this.deleteButton = page.getByRole("button", { name: "delete" });
    this.modal = page.locator(".ant-modal:visible").last();
    this.closeModalButton = this.modal
      .getByRole("button", { name: "Close" })
      .first();
    this.aiUploader = page.locator(".ant-upload.ant-upload-btn");
    this.importAgainButton = page.getByRole("button", {
      name: "อัปโหลดอีกครั้ง",
    });
    this.aiPricePerUnitInput = page
      .locator('.ant-form-item:has(label:has-text("ราคาต่อหน่วย")) input')
      .first();
    this.aiQuantityInput = page
      .locator('.ant-form-item:has(label:has-text("จำนวนหน่วย")) input')
      .first();
    this.aiEntityInput = page
      .locator('.ant-form-item:has(label:has-text("ประเภททรัพย์สิน")) input')
      .first();
  }

  // Actions
  async clickManualImportButton() {
    await this.manualImportButton.click();
  }

  async clickAIImportButton() {
    await this.aiImportButton.click();
  }

  async clickStockButton() {
    await this.stockButton.click();
  }

  async clickGoldButton() {
    await this.goldButton.click();
  }

  async clickFundButton() {
    await this.fundButton.click();
  }

  async fillStockImportForm(
    entity: string,
    description: string,
    date: string,
    time: string,
    stockName: string,
    stockPricePerUnit: string,
    stockQuantity: string,
  ) {
    await this.entityInput.fill(entity);
    await this.descriptionInput.fill(description);
    await this.dateInput.fill(date);
    await this.timeInput.fill(time);
    await this.stockNameInput.click();
    await this.stockNameInput.fill(stockName);
    await this.page.getByText(stockName, { exact: true }).click();
    await this.stockPricePerUnitInput.fill(stockPricePerUnit);
    await this.stockQuantityInput.fill(stockQuantity);
  }

  async fillGoldImportForm(
    entity: string,
    description: string,
    date: string,
    time: string,
    goldName: string,
    goldPrice: string,
    goldPurity: string,
    goldQuantity: string,
  ) {
    await this.goldNameInput.click();
    await this.page.getByText(goldName, { exact: true }).click();
    await this.goldPurityInput.click();
    await this.page.getByText(goldPurity, { exact: true }).last().click();
    await this.entityInput.fill(entity);
    await this.descriptionInput.fill(description);
    await this.dateInput.fill(date);
    await this.timeInput.fill(time);
    await this.goldPriceInput.fill(goldPrice);
    await this.goldQuantityInput.fill(goldQuantity);
  }

  async fillFundImportForm(
    entity: string,
    description: string,
    date: string,
    time: string,
    fundName: string,
    fundNAV: string,
    fundQuantity: string,
  ) {
    await this.entityInput.fill(entity);
    await this.descriptionInput.fill(description);
    await this.dateInput.fill(date);
    await this.timeInput.fill(time);
    await this.fundNameInput.click();
    await this.fundNameInput.fill(fundName);
    await this.page.getByText(fundName, { exact: true }).click();
    await this.fundNAVInput.fill(fundNAV);
    await this.fundQuantityInput.fill(fundQuantity);
  }

  async clickSaveButton() {
    await this.saveButton.click();
    await this.page.waitForTimeout(2000);
    await this.closeModalButton.click();
  }

  async clickErrorSaveButton() {
    await this.saveButton.click();
    await this.page.waitForTimeout(2000);
  }

  async clickImportAgainButton() {
    await this.importAgainButton.click({ timeout: 500000 });
  }

  async clickAddButton() {
    await this.addButton.click({ timeout: 500000 });
  }

  async clickDeleteButton(order: number) {
    await this.deleteButton.nth(order).click({ timeout: 500000 });
  }

  async uploadFile(path: string) {
    await this.page.setInputFiles('input[type="file"]', path);
  }

  async fillAIImportForm(order: number, entity: string, description: string) {
    await this.aiEntityInput.nth(order).fill(entity, { timeout: 500000 });
    await this.descriptionInput.nth(order).fill(description);
  }

  // Assertions
  async expectImportPage() {
    await expect(
      this.page.getByText("เพิ่มทรัพย์สิน (Import Asset)"),
    ).toBeVisible();
  }

  async expectStockImportForm() {
    await expect(this.entityInput).toBeVisible();
    await expect(this.descriptionInput).toBeVisible();
    await expect(this.dateInput).toBeVisible();
    await expect(this.timeInput).toBeVisible();
    await expect(this.stockNameInput).toBeVisible();
    await expect(this.stockPricePerUnitInput).toBeVisible();
    await expect(this.stockQuantityInput).toBeVisible();
  }

  async expectGoldImportForm() {
    await expect(this.entityInput).toBeVisible();
    await expect(this.descriptionInput).toBeVisible();
    await expect(this.dateInput).toBeVisible();
    await expect(this.timeInput).toBeVisible();
    await expect(this.goldNameInput).toBeVisible();
    await expect(this.goldPurityInput).toBeVisible();
    await expect(this.goldPriceInput).toBeVisible();
    await expect(this.goldQuantityInput).toBeVisible();
  }

  async expectFundImportForm() {
    await expect(this.entityInput).toBeVisible();
    await expect(this.descriptionInput).toBeVisible();
    await expect(this.dateInput).toBeVisible();
    await expect(this.timeInput).toBeVisible();
    await expect(this.fundNameInput).toBeVisible();
    await expect(this.fundNAVInput).toBeVisible();
    await expect(this.fundQuantityInput).toBeVisible();
  }

  async expectAIUploader() {
    await expect(this.aiUploader).toBeVisible();
  }

  async expectAIImportFormPage() {
    await expect(this.addButton).toBeVisible({ timeout: 500000 });
    await expect(this.saveButton).toBeVisible();
    await expect(this.importAgainButton).toBeVisible();
  }

  async expectAIImportForm(
    order: number,
    type: string,
    date?: string,
    time?: string,
    name?: string,
    pricePerUnit?: string,
    quantity?: string,
  ) {
    if (
      date !== undefined &&
      time !== undefined &&
      name !== undefined &&
      pricePerUnit !== undefined &&
      quantity !== undefined
    ) {
      await expect(this.dateInput.nth(order)).toContainText(date);
      await expect(this.timeInput.nth(order)).toContainText(time);
      if (type == "stock") {
        await expect(this.stockNameInput.nth(order)).toContainText(name);
      }
      if (type == "fund") {
        await expect(this.fundNameInput.nth(order)).toContainText(name);
      }
      await expect(this.aiPricePerUnitInput.nth(order)).toContainText(
        pricePerUnit,
      );
      await expect(this.aiQuantityInput.nth(order)).toContainText(quantity);
    } else {
      await expect(this.dateInput.nth(order)).toBeVisible();
      await expect(this.timeInput.nth(order)).toBeVisible();
      if (type == "stock") {
        await expect(this.stockNameInput.nth(order)).toBeVisible();
      }
      if (type == "fund") {
        await expect(this.fundNameInput.nth(order)).toBeVisible();
      }
      await expect(this.aiEntityInput.nth(order)).toBeVisible();
      await expect(this.descriptionInput.nth(order)).toBeVisible();
      await expect(this.aiPricePerUnitInput.nth(order)).toBeVisible();
      await expect(this.aiQuantityInput.nth(order)).toBeVisible();
      await expect(this.deleteButton.nth(order)).toBeVisible();
    }
  }

  async expectImportError() {
    await expect(
      this.page.getByText("เพิ่มทรัพย์สินไม่สำเร็จ").last(),
    ).toBeVisible();
  }
}
