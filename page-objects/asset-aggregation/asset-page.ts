import { expect, type Locator, type Page } from "@playwright/test";

export class AssetPage {
  private readonly page: Page;
  private readonly graph: Locator;
  private readonly assetTable: Locator;
  private readonly closeModalButton: Locator;
  private readonly modal: Locator;
  private readonly ellipsisButtons: Locator;
  private readonly modalEllipsisButtons: Locator;
  private readonly deleteAssetButton: Locator;
  private readonly confirmDeleteAssetButton: Locator;
  private readonly assetDetailButton: Locator;
  private readonly transactionButton: Locator;
  private readonly editTransactionButton: Locator;
  private readonly deleteTransactionButton: Locator;
  private readonly confirmDeleteTransactionButton: Locator;
  private readonly buyTransactionButton: Locator;
  private readonly sellTransactionButton: Locator;
  private readonly dateInput: Locator;
  private readonly priceInput: Locator;
  private readonly quantityInput: Locator;
  private readonly timeInput: Locator;
  private readonly saveTransactionButton: Locator;
  private readonly importButton: Locator;
  private readonly calculatorQuantityInput: Locator;
  private readonly calculatorUnitSelect: Locator;
  private readonly calculatorOrnamentButton: Locator;
  private readonly transactionTable: Locator;
  private readonly editDateTimeInput: Locator;
  private readonly editQuantityInput: Locator;
  private readonly editCostInput: Locator;
  private readonly saveEditTransactionButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.graph = page.locator("canvas");
    this.assetTable = page.locator(".ant-table-cell");
    this.closeModalButton = page.getByRole("button", { name: "Close" }).first();
    this.modal = page.locator(".ant-modal:visible").last();
    this.ellipsisButtons = page.locator(
      `//*[local-name()='path' and @fill='#092640']`,
    );
    this.modalEllipsisButtons = this.modal.locator(
      `//*[local-name()='path' and @fill='#092640']`,
    );
    this.deleteAssetButton = page.getByText("ลบทรัพย์สิน");
    this.confirmDeleteAssetButton = page.getByRole("button", {
      name: "ลบทรัพย์สิน",
    });
    this.assetDetailButton = page.getByText("ข้อมูลทรัพย์สิน");
    this.transactionButton = page.getByText("ทำธุรกรรม");
    this.editTransactionButton = page.getByText("แก้ไขรายการ");
    this.deleteTransactionButton = page.getByText("ลบรายการ");
    this.confirmDeleteTransactionButton = page.getByRole("button", {
      name: "ลบรายการ",
    });
    this.buyTransactionButton = page.getByRole("button", { name: "plus ซื้อ" });
    this.sellTransactionButton = page.getByRole("button", { name: "tag ขาย" });
    this.dateInput = this.modal.locator("#date");
    this.timeInput = this.modal.locator("#time");
    this.priceInput = this.modal.locator("#total_price");
    this.quantityInput = this.modal.locator("#amount");
    this.saveTransactionButton = this.modal.getByRole("button", {
      name: "บันทึก",
    });
    this.importButton = page.getByRole("columnheader", { name: "plus-circle" });
    this.calculatorQuantityInput = page.locator(`input[type="text"]`);
    this.calculatorUnitSelect = page.locator(".ant-select-selector").last();
    this.calculatorOrnamentButton = page
      .locator("input.ant-radio-input")
      .last();
    this.transactionTable = this.modal.locator(".ant-table-cell");
    this.editDateTimeInput = this.modal.getByRole("textbox", {
      name: "Select date",
    });
    this.editQuantityInput = this.modal.getByRole("spinbutton", {
      name: "บาท",
    });
    this.editCostInput = this.modal.getByRole("spinbutton").last();
    this.saveEditTransactionButton = this.modal.getByRole("button", {
      name: "check",
    });
  }

  // Actions
  async clickEllipsisButton(order: number) {
    await this.ellipsisButtons.nth(order).click();
  }

  async clickModalEllipsisButton(order: number) {
    await this.modalEllipsisButtons.nth(order).click();
  }

  async clearData(count?: number) {
    if (!count) {
      count = await this.ellipsisButtons.count();
    }

    for (let i = 0; i < count; i++) {
      await this.clickDeleteAsset(0);
    }
  }

  async clickDetailPage(order: number) {
    await this.clickEllipsisButton(order);
    await this.assetDetailButton.last().click();
  }

  async clickCloseModalButton() {
    await this.closeModalButton.click();
  }

  async clickDeleteTransaction(order: number) {
    await this.clickModalEllipsisButton(order);
    await this.deleteTransactionButton.last().click();
    await this.confirmDeleteTransactionButton.click();
  }

  async clickEditTransaction(order: number) {
    await this.clickModalEllipsisButton(order);
    await this.editTransactionButton.last().click();
  }

  async clickTransactionPage(order: number) {
    await this.clickEllipsisButton(order);
    await this.transactionButton.last().click();
  }

  async clickDeleteAsset(order: number) {
    await this.clickEllipsisButton(order);
    await this.deleteAssetButton.last().click();
    await this.confirmDeleteAssetButton.click();
  }

  async clickTransaction(type: string, order?: number) {
    if (type === "buy") {
      await this.buyTransactionButton.click();
    } else if (type === "sell") {
      if (!order) order = 0;
      await this.sellTransactionButton.nth(order).click();
    }
  }

  async fillTransactionForm(
    date: string,
    time: string,
    price: string,
    quantity: string,
  ) {
    await this.dateInput.fill(date, { force: true });
    await this.timeInput.fill(time, { force: true });
    await this.priceInput.fill(price);
    await this.quantityInput.fill(quantity);
  }

  async clickSaveTransactionButton() {
    await this.saveTransactionButton.click();
  }

  async getRecentPricePerUnit(order: number) {
    const data = await this.assetTable.allTextContents();
    const index = order * 8 + 11;
    return data[index];
  }

  async clickImportButton() {
    await this.importButton.click();
  }

  async fillGoldCalculator(
    quantity: string,
    isBaht: boolean,
    isOrnament: boolean,
  ) {
    if (isBaht) {
      await this.calculatorUnitSelect.click();
      await this.page.getByRole("option", { name: "บาท" }).click();
    }
    if (isOrnament) {
      await this.calculatorOrnamentButton.check();
    }
    await this.calculatorQuantityInput.fill(quantity);
  }

  async fillEditGoldForm(
    date: string,
    time: string,
    quantity: string,
    price: string,
  ) {
    await this.editDateTimeInput.click();
    await this.editDateTimeInput.press("Control+A"); // select all
    await this.editDateTimeInput.type(date + " " + time);
    await this.editDateTimeInput.press("Enter");
    await this.editQuantityInput.fill(quantity);
    await this.editCostInput.fill(price);
  }

  async clickSaveEditTransactionButton() {
    await this.saveEditTransactionButton.click();
  }

  // Assertions
  async expectGoldPage() {
    await expect(this.page.getByText("ทอง (Gold)")).toBeVisible();
  }

  async expectAllAssetsPage() {
    await expect(
      this.page.getByText("ทรัพย์สินทั้งหมด (Assets)"),
    ).toBeVisible();
  }

  async expectFundPage() {
    await expect(this.page.getByText("กองทุน (Fund)")).toBeVisible();
  }

  async expectStockPage() {
    await expect(this.page.getByText("หุ้น (Stock)")).toBeVisible();
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
        this.page.getByText(`${unrealized} (${unrealizedPercentage})`).first(),
      ).toBeVisible();
      await expect(
        this.page.getByText(`${realized} (${realizedPercentage})`).last(),
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

  async expectGraph() {
    await expect(this.graph).toBeVisible();
  }

  async expectGoldTable(
    entity?: string,
    name?: string,
    quantity?: string,
    pricePerUnit?: string,
    netWorth?: string,
    cost?: string,
    unrealized?: string,
    order?: number,
  ) {
    const data = await this.assetTable.allTextContents();
    if (
      entity &&
      name &&
      quantity &&
      pricePerUnit &&
      netWorth &&
      cost &&
      unrealized &&
      order !== undefined
    ) {
      const baseIndex = order * 8;
      expect(data[baseIndex + 8]).toEqual(entity);
      expect(data[baseIndex + 9]).toEqual(name);
      expect(data[baseIndex + 10]).toEqual(quantity);
      expect(data[baseIndex + 11]).toEqual(pricePerUnit);
      expect(data[baseIndex + 12]).toEqual(netWorth);
      expect(data[baseIndex + 13]).toEqual(cost);
      expect(data[baseIndex + 14]).toEqual(unrealized);
    } else {
      expect(data[0]).toEqual("ประเภท");
      expect(data[1]).toEqual("รายการทอง");
      expect(data[2]).toEqual("จำนวน (บาท)");
      expect(data[3]).toEqual("ราคาตลาด (บาท)");
      expect(data[4]).toEqual("มูลค่าปัจจุบัน (บาท)");
      expect(data[5]).toEqual("ราคาต้นทุน (บาท)");
      expect(data[6]).toEqual("กำไร/ขาดทุน (Unrealized)");
    }
  }

  async expectStockTable(
    entity?: string,
    name?: string,
    quantity?: string,
    pricePerUnit?: string,
    netWorth?: string,
    cost?: string,
    averageCost?: string,
    unrealized?: string,
  ) {
    const data = JSON.stringify(await this.assetTable.allTextContents());

    if (
      entity &&
      name &&
      quantity &&
      pricePerUnit &&
      netWorth &&
      cost &&
      averageCost
    ) {
      expect(data).toContain(entity);
      expect(data).toContain(name);
      expect(data).toContain(quantity);
      expect(data).toContain(pricePerUnit);
      expect(data).toContain(netWorth);
      expect(data).toContain(cost);
      expect(data).toContain(averageCost);
      expect(data).toContain(unrealized);
    } else {
      expect(data).toContain("ประเภท");
      expect(data).toContain("รายการหุ้น");
      expect(data).toContain("จำนวน (หน่วย)");
      expect(data).toContain("ราคาตลาด (บาท)");
      expect(data).toContain("มูลค่าปัจจุบัน (บาท)");
      expect(data).toContain("ราคาต้นทุน (บาท)");
      expect(data).toContain("ต้นทุนเฉลี่ย (บาท)");
      expect(data).toContain("กำไร/ขาดทุน (Unrealized)");
    }
  }

  async expectNoData() {
    await expect(this.page.getByText("ไม่พบข้อมูล").last()).toBeVisible();
  }

  async expectGoldCalculator(quantity?: string) {
    if (quantity) {
      await expect(this.page.getByText(`${quantity}`)).toBeVisible();
    } else {
      await expect(
        this.page.getByText("อัตราการแลกเปลี่ยนทางตลาด"),
      ).toBeVisible();
    }
  }

  async expectDetailPage(
    netWorth?: string,
    unrealized?: string,
    realized?: string,
    unrealizedPercentage?: string,
    realizedPercentage?: string,
    entity?: string,
    name?: string,
    description?: string,
  ) {
    if (
      netWorth &&
      unrealized &&
      realized &&
      unrealizedPercentage &&
      realizedPercentage &&
      entity &&
      name &&
      description
    ) {
      await this.expectNetWorth(
        netWorth,
        unrealized,
        realized,
        unrealizedPercentage,
        realizedPercentage,
      );
      await expect(this.page.getByText(entity)).toBeVisible();
      await expect(this.page.getByText(name)).toBeVisible();
      await expect(this.page.getByText(description)).toBeVisible();
    } else {
      await this.expectNetWorth();
      await expect(this.page.getByText("บันทึกการลงทุน")).toBeVisible();
    }
  }

  async expectGoldTransactionTable(
    date?: string,
    type?: string,
    quantity?: string,
    pricePerUnit?: string,
    totalCost?: string,
    realized?: string,
    sellFrom?: string,
    order?: number,
  ) {
    const data = await this.transactionTable.allTextContents();

    if (
      date &&
      type &&
      quantity &&
      pricePerUnit &&
      totalCost &&
      realized &&
      sellFrom &&
      order !== undefined
    ) {
      const baseIndex = order * 8;
      expect(data[baseIndex + 8]).toEqual(date);
      expect(data[baseIndex + 9]).toEqual(type);
      expect(data[baseIndex + 10]).toEqual(quantity);
      expect(data[baseIndex + 11]).toEqual(pricePerUnit);
      expect(data[baseIndex + 12]).toEqual(totalCost);
      expect(data[baseIndex + 13]).toEqual(realized);
      expect(data[baseIndex + 14]).toEqual(sellFrom);
    } else {
      expect(data[0]).toContain("วันที่");
      expect(data[1]).toContain("ประเภท");
      expect(data[2]).toContain("จำนวน (บาท)");
      expect(data[3]).toContain("ราคาตลาด (บาท)");
      expect(data[4]).toContain("ราคารวม (บาท)");
      expect(data[5]).toContain("กำไร/ขาดทุน (Realized)");
      expect(data[6]).toContain("ขายจาก");
    }
  }

  async expectDetailMenu() {
    await expect(this.assetDetailButton).toBeVisible();
  }

  async expectTransactionMenu() {
    await expect(this.transactionButton).toBeVisible();
  }

  async expectDeleteAssetMenu() {
    await expect(this.deleteAssetButton).toBeVisible();
  }

  async expectEditTransactionMenu() {
    await expect(this.editTransactionButton).toBeVisible();
  }

  async expectDeleteTransactionMenu() {
    await expect(this.deleteTransactionButton).toBeVisible();
  }

  async expectSellingGoldForm() {
    await expect(this.dateInput).toBeVisible();
    await expect(this.timeInput).toBeVisible();
    await expect(this.priceInput).toBeVisible();
    await expect(this.quantityInput).toBeVisible();
    await expect(this.saveTransactionButton).toBeVisible();
  }

  async expectBuyingGoldForm() {
    await expect(this.dateInput).toBeVisible();
    await expect(this.timeInput).toBeVisible();
    await expect(this.priceInput).toBeVisible();
    await expect(this.quantityInput).toBeVisible();
    await expect(this.saveTransactionButton).toBeVisible();
  }

  async expectBalanceTable(
    date?: string,
    quantity?: string,
    cost?: string,
    netWorth?: string,
    pricePerUnit?: string,
    order?: number,
  ) {
    const data = await this.transactionTable.allTextContents();

    if (
      date &&
      quantity &&
      cost &&
      netWorth &&
      pricePerUnit &&
      order !== undefined
    ) {
      const baseIndex = order * 5;
      expect(data[baseIndex + 5]).toContain(date);
      expect(data[baseIndex + 6]).toContain(quantity);
      expect(data[baseIndex + 7]).toContain(cost);
      expect(data[baseIndex + 8]).toContain(netWorth);
      expect(this.modal.getByText(pricePerUnit).first()).toBeVisible();
    } else {
      expect(data[0]).toContain("วันที่");
      expect(data[1]).toContain("จำนวน (บาท)");
      expect(data[2]).toContain("ราคาที่ซื้อ (บาท)");
      expect(data[3]).toContain("มูลค่าปัจจุบัน (บาท)");
      expect(
        this.modal.getByText("ราคาต่อหน่วยปัจจุบัน").first(),
      ).toBeVisible();
    }
  }

  async expectModal() {
    await expect(this.modal).toBeVisible();
  }
}
