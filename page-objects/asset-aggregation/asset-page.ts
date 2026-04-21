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
  private readonly goldBuyTransactionButton: Locator;
  private readonly goldSellTransactionButton: Locator;
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
  private readonly editGoldQuantityInput: Locator;
  private readonly editGoldCostInput: Locator;
  private readonly editStockFundQuantityInput: Locator;
  private readonly editStockFundPricePerUnitInput: Locator;
  private readonly saveEditTransactionButton: Locator;
  private readonly stockFundBuyTransactionButton: Locator;
  private readonly stockFundSellTransactionButton: Locator;
  private readonly stockFundDateInput: Locator;
  private readonly stockFundTimeInput: Locator;
  private readonly stockFundPricePerUnitInput: Locator;
  private readonly stockFundQuantityInput: Locator;
  private readonly cancelButton: Locator;

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
    this.goldBuyTransactionButton = page.getByRole("button", {
      name: "plus ซื้อ",
    });
    this.goldSellTransactionButton = page.getByRole("button", {
      name: "tag ขาย",
    });
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
    this.editGoldQuantityInput = this.modal.getByRole("spinbutton", {
      name: "บาท",
    });
    this.editGoldCostInput = this.modal.getByRole("spinbutton").last();
    this.saveEditTransactionButton = this.modal.getByRole("button", {
      name: "check",
    });
    this.stockFundBuyTransactionButton = this.modal.getByText("ซื้อ");
    this.stockFundSellTransactionButton = this.modal.getByText("ขาย");
    this.stockFundDateInput = this.modal.getByRole("textbox", {
      name: "Select date",
    });
    this.stockFundTimeInput = this.modal.getByRole("textbox", {
      name: "Select time",
    });
    this.stockFundPricePerUnitInput = this.modal.locator(
      ".ant-input-number-input",
    );
    this.stockFundQuantityInput = this.modal.locator(".ant-input-number-input");
    this.cancelButton = this.modal.getByRole("button", { name: "ยกเลิก" });
    this.editStockFundQuantityInput = this.modal.getByRole("spinbutton", {
      name: "หน่วย",
    });
    this.editStockFundPricePerUnitInput = this.modal
      .getByRole("spinbutton")
      .last();
  }

  // Actions
  async clickEllipsisButton(order: number) {
    await expect(this.ellipsisButtons.nth(order)).toBeVisible();
    await this.ellipsisButtons.nth(order).click();
  }

  async clickModalEllipsisButton(order: number) {
    await this.modalEllipsisButtons.nth(order).click();
  }

  async clearData(count?: number) {
    if (!count) {
      await this.page.waitForTimeout(5000);
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
    await expect(this.confirmDeleteTransactionButton).not.toHaveClass(
      /ant-btn-loading/,
    );
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
    await expect(this.confirmDeleteAssetButton).not.toHaveClass(
      /ant-btn-loading/,
    );
    await this.confirmDeleteAssetButton.click();
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }

  async clickGoldTransaction(type: string, order?: number) {
    if (type === "buy") {
      await this.goldBuyTransactionButton.click();
    } else if (type === "sell") {
      if (!order) order = 0;
      await this.goldSellTransactionButton.nth(order).click();
    }
  }

  async clickStockFundTransaction(type: string) {
    if (type === "buy") {
      await this.stockFundBuyTransactionButton.click();
    } else if (type === "sell") {
      await this.stockFundSellTransactionButton.click();
    }
  }

  async fillGoldTransactionForm(
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

  async fillStockFundTransactionForm(
    date: string,
    time: string,
    pricePerUnit: string,
    quantity: string,
    type: string,
  ) {
    await this.stockFundDateInput.fill(date, { force: true });
    await this.stockFundTimeInput.fill(time, { force: true });
    if (type === "buy") {
      await this.stockFundPricePerUnitInput.nth(0).fill(pricePerUnit);
      await this.stockFundQuantityInput.nth(1).fill(quantity);
    }
    if (type === "sell") {
      await this.stockFundPricePerUnitInput.nth(2).fill(pricePerUnit);
      await this.stockFundQuantityInput.nth(3).fill(quantity);
    }
  }

  async clickSaveTransactionButton() {
    await this.saveTransactionButton.click();
  }

  async getRecentPricePerUnit(order: number, type: string, skip?: number) {
    let dataIndex = order * 8 + 11;
    if (type === "gold") {
      dataIndex = order * 8 + 11;
    } else {
      dataIndex = order * 9 + 12;
    }
    if (!skip) skip = 0;
    const data = await this.assetTable.allTextContents();
    return data[dataIndex + skip];
  }

  async clickImportButton(order?: number) {
    if (!order) order = 0;
    await this.importButton.nth(order).click();
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
    await this.editGoldQuantityInput.fill(quantity);
    await this.editGoldCostInput.fill(price);
  }

  async fillEditStockFundForm(
    date: string,
    time: string,
    quantity: string,
    nav: string,
  ) {
    await this.editDateTimeInput.click();
    await this.editDateTimeInput.press("Control+A"); // select all
    await this.editDateTimeInput.type(date + " " + time);
    await this.editDateTimeInput.press("Enter");
    await this.editStockFundQuantityInput.fill(quantity);
    await this.editStockFundPricePerUnitInput.fill(nav);
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
      this.page.getByText("ทรัพย์สินทั้งหมด (All Assets)"),
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
    skip?: number,
    entity?: string,
    name?: string,
    quantity?: string,
    pricePerUnit?: string,
    netWorth?: string,
    cost?: string,
    unrealized?: string,
    order?: number,
  ) {
    if (!skip) skip = 0;
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
      const baseIndex = order * 8 + skip;
      expect(data[baseIndex + 8]).toEqual(entity);
      expect(data[baseIndex + 9]).toEqual(name);
      expect(data[baseIndex + 10]).toEqual(quantity);
      expect(data[baseIndex + 11]).toEqual(pricePerUnit);
      expect(data[baseIndex + 12]).toEqual(netWorth);
      expect(data[baseIndex + 13]).toEqual(cost);
      expect(data[baseIndex + 14]).toEqual(unrealized);
    } else {
      expect(data[0 + skip]).toEqual("ประเภท");
      expect(data[1 + skip]).toEqual("รายการทอง");
      expect(data[2 + skip]).toEqual("จำนวน (บาท)");
      expect(data[3 + skip]).toEqual("ราคาตลาด (บาท)");
      expect(data[4 + skip]).toEqual("มูลค่าปัจจุบัน (บาท)");
      expect(data[5 + skip]).toEqual("ราคาต้นทุน (บาท)");
      expect(data[6 + skip]).toEqual("กำไร/ขาดทุน (Unrealized)");
    }
  }

  async expectStockTable(
    skip?: number,
    entity?: string,
    name?: string,
    quantity?: string,
    pricePerUnit?: string,
    netWorth?: string,
    cost?: string,
    averageCost?: string,
    unrealized?: string,
    order?: number,
  ) {
    if (!skip) skip = 0;
    const data = await this.assetTable.allTextContents();

    if (
      entity &&
      name &&
      quantity &&
      pricePerUnit &&
      netWorth &&
      cost &&
      averageCost &&
      unrealized &&
      order !== undefined
    ) {
      const baseIndex = order * 9 + skip;
      expect(data[baseIndex + 9]).toEqual(entity);
      expect(data[baseIndex + 10]).toEqual(name);
      expect(data[baseIndex + 11]).toEqual(quantity);
      expect(data[baseIndex + 12]).toEqual(pricePerUnit);
      expect(data[baseIndex + 13]).toEqual(netWorth);
      expect(data[baseIndex + 14]).toEqual(cost);
      expect(data[baseIndex + 15]).toEqual(averageCost);
      expect(data[baseIndex + 16]).toEqual(unrealized);
    } else {
      expect(data[0 + skip]).toEqual("ประเภท");
      expect(data[1 + skip]).toEqual("รายการหุ้น");
      expect(data[2 + skip]).toEqual("จำนวน (หน่วย)");
      expect(data[3 + skip]).toEqual("ราคาตลาด (บาท)");
      expect(data[4 + skip]).toEqual("มูลค่าปัจจุบัน (บาท)");
      expect(data[5 + skip]).toEqual("ราคาต้นทุน (บาท)");
      expect(data[6 + skip]).toEqual("ต้นทุนเฉลี่ย (บาท)");
      expect(data[7 + skip]).toEqual("กำไร/ขาดทุน (Unrealized)");
    }
  }

  async expectFundTable(
    skip?: number,
    entity?: string,
    name?: string,
    quantity?: string,
    pricePerUnit?: string,
    netWorth?: string,
    cost?: string,
    averageCost?: string,
    unrealized?: string,
    order?: number,
  ) {
    if (!skip) skip = 0;
    const data = await this.assetTable.allTextContents();

    if (
      entity &&
      name &&
      quantity &&
      pricePerUnit &&
      netWorth &&
      cost &&
      averageCost &&
      unrealized &&
      order !== undefined
    ) {
      const baseIndex = order * 9 + skip;
      expect(data[baseIndex + 9]).toEqual(entity);
      expect(data[baseIndex + 10]).toEqual(name);
      expect(data[baseIndex + 11]).toEqual(quantity);
      expect(data[baseIndex + 12]).toEqual(pricePerUnit);
      expect(data[baseIndex + 13]).toEqual(netWorth);
      expect(data[baseIndex + 14]).toEqual(cost);
      expect(data[baseIndex + 15]).toEqual(averageCost);
      expect(data[baseIndex + 16]).toEqual(unrealized);
    } else {
      expect(data[0 + skip]).toEqual("ประเภท");
      expect(data[1 + skip]).toEqual("รายการกองทุน");
      expect(data[2 + skip]).toEqual("จำนวน (หน่วย)");
      expect(data[3 + skip]).toEqual("NAV (บาท)");
      expect(data[4 + skip]).toEqual("มูลค่าปัจจุบัน (บาท)");
      expect(data[5 + skip]).toEqual("ราคาต้นทุน (บาท)");
      expect(data[6 + skip]).toEqual("มูลค่าเฉลี่ยต่อหน่วยลงทุน (บาท)");
      expect(data[7 + skip]).toEqual("กำไร/ขาดทุน (Unrealized)");
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

  async expectFundTransactionTable(
    date?: string,
    type?: string,
    quantity?: string,
    pricePerUnit?: string,
    totalCost?: string,
    realized?: string,
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
      order !== undefined
    ) {
      const baseIndex = order * 7;
      expect(data[baseIndex + 7]).toEqual(date);
      expect(data[baseIndex + 8]).toEqual(type);
      expect(data[baseIndex + 9]).toEqual(quantity);
      expect(data[baseIndex + 10]).toEqual(pricePerUnit);
      expect(data[baseIndex + 11]).toEqual(totalCost);
      expect(data[baseIndex + 12]).toEqual(realized);
    } else {
      expect(data[0]).toContain("วันที่");
      expect(data[1]).toContain("ประเภท");
      expect(data[2]).toContain("จำนวน (หน่วย)");
      expect(data[3]).toContain("NAV (บาท)");
      expect(data[4]).toContain("ราคารวม (บาท)");
      expect(data[5]).toContain("กำไร/ขาดทุน (Realized)");
    }
  }

  async expectStockTransactionTable(
    date?: string,
    type?: string,
    quantity?: string,
    pricePerUnit?: string,
    totalCost?: string,
    realized?: string,
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
      order !== undefined
    ) {
      const baseIndex = order * 7;
      expect(data[baseIndex + 7]).toEqual(date);
      expect(data[baseIndex + 8]).toEqual(type);
      expect(data[baseIndex + 9]).toEqual(quantity);
      expect(data[baseIndex + 10]).toEqual(pricePerUnit);
      expect(data[baseIndex + 11]).toEqual(totalCost);
      expect(data[baseIndex + 12]).toEqual(realized);
    } else {
      expect(data[0]).toContain("วันที่");
      expect(data[1]).toContain("ประเภท");
      expect(data[2]).toContain("จำนวน (หน่วย)");
      expect(data[3]).toContain("ราคาตลาด (บาท)");
      expect(data[4]).toContain("ราคารวม (บาท)");
      expect(data[5]).toContain("กำไร/ขาดทุน (Realized)");
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

  async expectSellingStockFundForm() {
    await expect(this.stockFundDateInput).toBeVisible();
    await expect(this.stockFundTimeInput).toBeVisible();
    await expect(this.stockFundPricePerUnitInput.nth(2)).toBeVisible();
    await expect(this.stockFundQuantityInput.nth(3)).toBeVisible();
    await expect(this.saveTransactionButton).toBeVisible();
  }

  async expectBuyingGoldForm() {
    await expect(this.dateInput).toBeVisible();
    await expect(this.timeInput).toBeVisible();
    await expect(this.priceInput).toBeVisible();
    await expect(this.quantityInput).toBeVisible();
    await expect(this.saveTransactionButton).toBeVisible();
  }

  async expectBuyingStockFundForm() {
    await expect(this.stockFundDateInput).toBeVisible();
    await expect(this.stockFundTimeInput).toBeVisible();
    await expect(this.stockFundPricePerUnitInput.nth(0)).toBeVisible();
    await expect(this.stockFundQuantityInput.nth(1)).toBeVisible();
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
