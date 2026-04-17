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

  private readonly saveButton: Locator;
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
    this.modal = page.locator(".ant-modal");
    this.closeModalButton = this.modal
      .getByRole("button", { name: "Close" })
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
    await this.stockNameInput.fill(stockName);
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
    await this.fundNameInput.fill(fundName);
    await this.fundNAVInput.fill(fundNAV);
    await this.fundQuantityInput.fill(fundQuantity);
  }

  async clickSaveButton() {
    await this.saveButton.click();
    await this.page.waitForTimeout(2000);
    await this.closeModalButton.click();
  }

  // Assertions
  async expectImportPage() {
    await expect(
      this.page.getByText("เพิ่มทรัพย์สิน (Import Asset)"),
    ).toBeVisible();
  }
}
