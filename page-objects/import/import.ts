import { expect, type Locator, type Page } from "@playwright/test";

export class ImportPage {
  private readonly page: Page;
  private readonly ManualImportButton: Locator;
  private readonly AIImportButton: Locator;
  private readonly StockButton: Locator;
  private readonly GoldButton: Locator;
  private readonly FundButton: Locator;

  private readonly EntityInput: Locator;
  private readonly DescriptionInput: Locator;
  private readonly DateInput: Locator;
  private readonly TimeInput: Locator;

  private readonly StockNameInput: Locator;
  private readonly StockPricePerUnitInput: Locator;
  private readonly StockQuantityInput: Locator;

  private readonly GoldNameInput: Locator;
  private readonly GoldPriceInput: Locator;
  private readonly GoldPurityInput: Locator;
  private readonly GoldQuantityInput: Locator;

  private readonly FundNameInput: Locator;
  private readonly FundNAVInput: Locator;
  private readonly FundQuantityInput: Locator;

  private readonly SaveButton: Locator;
  private readonly CloseModalButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ManualImportButton = page.getByRole("button", {
      name: "container กรอกข้อมูลเอง (Manual Import)",
    });
    this.AIImportButton = page.getByRole("button", {
      name: "file-image สแกนด้วย AI (AI Import)",
    });
    this.StockButton = page.getByRole("button", { name: "stock หุ้น" });
    this.GoldButton = page.getByRole("button", { name: "gold ทอง" });
    this.FundButton = page.getByRole("button", { name: "fund กองทุน" });
    this.EntityInput = page.getByLabel("ประเภททรัพย์สิน (Entity)");
    this.DescriptionInput = page.getByLabel("บันทึกการลงทุน");
    this.DateInput = page.getByLabel("วันที่ทำรายการ");
    this.TimeInput = page.getByLabel("เวลาทำรายการ");
    this.StockNameInput = page.getByLabel("ชื่อหุ้น");
    this.StockPricePerUnitInput = page.getByLabel("ราคาต่อหน่วย");
    this.StockQuantityInput = page.getByLabel("จำนวนหน่วยลงทุน");
    this.GoldNameInput = page.getByLabel("ชื่อทอง");
    this.GoldPriceInput = page.getByLabel("ราคารวม");
    this.GoldPurityInput = page.getByLabel("ความบริสุทธิ์");
    this.GoldQuantityInput = page
      .locator('.ant-form-item:has(label:has-text("จำนวนหน่วย")) input')
      .first();
    this.FundNameInput = page.getByLabel("ชื่อกองทุน");
    this.FundNAVInput = page.getByLabel("NAV");
    this.FundQuantityInput = page.getByLabel("จำนวนหน่วยลงทุน");
    this.SaveButton = page.getByRole("button", { name: "บันทึก" });
    this.CloseModalButton = page.getByRole("button", { name: "Close" }).first();
  }

  // Actions
  async clickManualImportButton() {
    await this.ManualImportButton.click();
  }

  async clickAIImportButton() {
    await this.AIImportButton.click();
  }

  async clickStockButton() {
    await this.StockButton.click();
  }

  async clickGoldButton() {
    await this.GoldButton.click();
  }

  async clickFundButton() {
    await this.FundButton.click();
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
    await this.EntityInput.fill(entity);
    await this.DescriptionInput.fill(description);
    await this.DateInput.fill(date);
    await this.TimeInput.fill(time);
    await this.StockNameInput.fill(stockName);
    await this.StockPricePerUnitInput.fill(stockPricePerUnit);
    await this.StockQuantityInput.fill(stockQuantity);
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
    await this.GoldNameInput.click();
    await this.page.getByText(goldName, { exact: true }).click();
    await this.GoldPurityInput.click();
    await this.page.getByText(goldPurity, { exact: true }).last().click();
    await this.EntityInput.fill(entity);
    await this.DescriptionInput.fill(description);
    await this.DateInput.fill(date);
    await this.TimeInput.fill(time);
    await this.GoldPriceInput.fill(goldPrice);
    await this.GoldQuantityInput.fill(goldQuantity);
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
    await this.EntityInput.fill(entity);
    await this.DescriptionInput.fill(description);
    await this.DateInput.fill(date);
    await this.TimeInput.fill(time);
    await this.FundNameInput.fill(fundName);
    await this.FundNAVInput.fill(fundNAV);
    await this.FundQuantityInput.fill(fundQuantity);
  }

  async clickSaveButton() {
    await this.SaveButton.click();
    await this.CloseModalButton.click();
  }

  // Assertions
  async expectImportPage() {
    await expect(
      this.page.getByText("เพิ่มทรัพย์สิน (Import Asset)"),
    ).toBeVisible();
  }
}
