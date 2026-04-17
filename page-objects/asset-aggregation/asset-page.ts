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

  constructor(page: Page) {
    this.page = page;
    this.graph = page.locator("canvas");
    this.assetTable = page.locator(".ant-table-cell");
    this.closeModalButton = page.getByRole("button", { name: "Close" }).first();
    this.modal = page.locator(".ant-modal");
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
      await this.clickEllipsisButton(0);
      await this.deleteAssetButton.last().click();
      await this.confirmDeleteAssetButton.click();
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

  async clickTransaction(type: string) {
    if (type === "buy") {
      await this.buyTransactionButton.click();
    } else if (type === "sell") {
      await this.sellTransactionButton.click();
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
    const index = (order + 2) * 8 - 5;
    return data[index];
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
  ) {
    const data = JSON.stringify(await this.assetTable.allTextContents());
    console.log(data);

    if (entity && name && quantity && pricePerUnit && netWorth && cost) {
      expect(data).toContain(entity);
      expect(data).toContain(name);
      expect(data).toContain(quantity);
      expect(data).toContain(pricePerUnit);
      expect(data).toContain(netWorth);
      expect(data).toContain(cost);
      expect(data).toContain(unrealized);
    } else {
      expect(data).toContain("ประเภท");
      expect(data).toContain("รายการทอง");
      expect(data).toContain("จำนวน (บาท)");
      expect(data).toContain("ราคาตลาด (บาท)");
      expect(data).toContain("มูลค่าปัจจุบัน (บาท)");
      expect(data).toContain("ราคาต้นทุน (บาท)");
      expect(data).toContain("กำไร/ขาดทุน (Unrealized)");
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
    await expect(this.page.getByText("No data").last()).toBeVisible();
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
  ) {
    const data = JSON.stringify(await this.assetTable.allTextContents());

    if (
      date &&
      type &&
      quantity &&
      pricePerUnit &&
      totalCost &&
      realized &&
      sellFrom
    ) {
      expect(data).toContain(date);
      expect(data).toContain(type);
      expect(data).toContain(quantity);
      expect(data).toContain(pricePerUnit);
      expect(data).toContain(totalCost);
      expect(data).toContain(realized);
      expect(data).toContain(sellFrom);
    } else {
      expect(data).toContain("วันที่");
      expect(data).toContain("ประเภท");
      expect(data).toContain("จำนวน (บาท)");
      expect(data).toContain("ราคาตลาด (บาท)");
      expect(data).toContain("ราคารวม (บาท)");
      expect(data).toContain("กำไร/ขาดทุน (Realized)");
      expect(data).toContain("ขายจาก");
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
  ) {
    const data = JSON.stringify(await this.assetTable.allTextContents());

    if (date && quantity && cost && netWorth) {
      expect(data).toContain(date);
      expect(data).toContain(quantity);
      expect(data).toContain(cost);
      expect(data).toContain(netWorth);
    } else {
      expect(data).toContain("วันที่");
      expect(data).toContain("จำนวน (บาท)");
      expect(data).toContain("ราคาที่ซื้อ (บาท)");
      expect(data).toContain("มูลค่าปัจจุบัน (บาท)");
      expect(this.modal.getByText("ราคาต่อหน่วยปัจจุบัน")).toBeVisible();
    }
  }
}
