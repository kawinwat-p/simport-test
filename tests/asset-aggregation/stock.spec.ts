import { expect, test } from "../../fixture.js";

test.describe("Asset Aggregation - Stock", () => {
  const URL = process.env.URL || "";
  const EMAIL = process.env.EMAIL || "";
  const PASSWORD = process.env.PASSWORD || "";

  test.beforeEach(async ({ assetPage, navBar, finnomenaPage, page }) => {
    await page.goto(URL);
    await navBar.clickSignIn();
    await finnomenaPage.signIn(EMAIL, PASSWORD);
    await navBar.clickStock();
    await assetPage.clearData();
  });

  test("TEST-AA-18: Display Networth and Profit in Stock Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const name = "NVDA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const pricePerUnit = "100";
    const quantity = "10";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickStock();
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectNetWorth();

    await assetPage.clearData(1);
  });

  test("TEST-AA-19: Display Stock Graph in Stock Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const name = "NVDA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const pricePerUnit = "100";
    const quantity = "10";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickStock();
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectGraph();

    await assetPage.clearData(1);
  });

  test("TEST-AA-20: Display Stock Table in Stock Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const name = "NVDA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const pricePerUnit = "100";
    const quantity = "10";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickStock();
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectStockTable();

    await assetPage.clearData(1);
  });

  test("TEST-AA-21: Display Empty Asset Message to inform user when there is no stock asset in Stock Page ", async ({
    assetPage,
  }) => {
    //test step

    //test output
    await assetPage.expectNoData();
  });

  test("TEST-AA-22: Display Stock Detail Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const name = "NVDA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const pricePerUnit = "100";
    const quantity = "10";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickStock();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);

    //test output
    await assetPage.expectDetailPage();
    await assetPage.expectStockTransactionTable();
    await assetPage.clickCloseModalButton();
    await page.waitForTimeout(1000);

    await assetPage.clearData(1);
  });

  test("TEST-AA-23: Display Empty Transaction Message to inform user when there is no stock transaction in Stock Detail Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const name = "NVDA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const pricePerUnit = "100";
    const quantity = "10";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickStock();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);
    await assetPage.clickDeleteTransaction(0);

    //test output
    await assetPage.expectNoData();
    await assetPage.clickCloseModalButton();

    await assetPage.clearData(1);
  });

  test("TEST-AA-24: Display Stock Detail Menu in Stock Table in Stock Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const name = "NVDA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const pricePerUnit = "100";
    const quantity = "10";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickStock();
    await page.waitForTimeout(2000);

    await assetPage.clickEllipsisButton(0);

    //test output
    await assetPage.expectDetailMenu();

    await assetPage.clickEllipsisButton(0);
    await assetPage.clearData(1);
  });

  test("TEST-AA-25: Display Create Stock Transaction Menu in Stock Table in Stock Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const name = "NVDA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const pricePerUnit = "100";
    const quantity = "10";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickStock();
    await page.waitForTimeout(2000);

    await assetPage.clickEllipsisButton(0);

    //test output
    await assetPage.expectTransactionMenu();

    await assetPage.clickEllipsisButton(0);
    await assetPage.clearData(1);
  });

  test("TEST-AA-26: Display Buy Stock Transaction Form", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const name = "NVDA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const pricePerUnit = "100";
    const quantity = "10";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickStock();
    await page.waitForTimeout(2000);

    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("buy");

    //test output
    await assetPage.expectBuyingStockFundForm();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-27: Display Sell Stock Transaction Form", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const name = "NVDA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const pricePerUnit = "100";
    const quantity = "10";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickStock();
    await page.waitForTimeout(2000);

    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    //test output
    await assetPage.expectSellingStockFundForm();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-28: Display Delete Transaction Menu in Stock Detail Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const name = "NVDA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const pricePerUnit = "100";
    const quantity = "10";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickStock();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);
    await assetPage.clickModalEllipsisButton(0);

    //test output
    await assetPage.expectDeleteTransactionMenu();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-29: Display Edit Transaction Menu in Stock Detail Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const name = "NVDA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const pricePerUnit = "100";
    const quantity = "10";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickStock();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);
    await assetPage.clickModalEllipsisButton(0);

    //test output
    await assetPage.expectEditTransactionMenu();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-30: Display Delete Asset Menu in Stock Table in Stock Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const name = "NVDA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const pricePerUnit = "100";
    const quantity = "10";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickStock();
    await page.waitForTimeout(2000);

    await assetPage.clickEllipsisButton(0);

    //test output
    await assetPage.expectDeleteAssetMenu();

    await assetPage.clickEllipsisButton(0);
    await assetPage.clearData(1);
  });

  test("TEST-AA-58: Click View Asset Detail in Stock Table in Stock Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const name = "NVDA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const pricePerUnit = "100";
    const quantity = "10";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickStock();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);

    //test output
    await assetPage.expectDetailPage();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-59: Click Transact Button in Stock Table in Stock Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const name = "NVDA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const pricePerUnit = "100";
    const quantity = "10";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickStock();
    await page.waitForTimeout(2000);

    await assetPage.clickTransactionPage(0);

    //test output
    await assetPage.expectBuyingStockFundForm();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-96: Ensure the correct of Profit Networth Calculation of Stock assets in Stock Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "200";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    name = "SCB";
    entity = "ส่วนตัว";
    description = "test2";
    date = "02/01/2026";
    time = "00:00";
    pricePerUnit = "150";
    quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(1);
    await assetPage.clickStockFundTransaction("sell");

    const sellPricePerUnit = "200";
    const sellQuantity = "100";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellPricePerUnit,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);

    await page.reload();
    await page.waitForTimeout(2000);

    const test1PricePerUnit: string = (await assetPage.getRecentPricePerUnit(
      0,
      "stock",
    )) as string;
    const test2PricePerUnit: string = (await assetPage.getRecentPricePerUnit(
      1,
      "stock",
    )) as string;

    const netWorth =
      Number(test1PricePerUnit.replace(/,/g, "")) * 200 +
      Number(test2PricePerUnit.replace(/,/g, "")) * 100;
    const formattedNetWorth = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(netWorth);
    const unrealized = netWorth - 55000;
    const formattedUnrealized = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized);
    const realized = "+5,000.00";
    const unrealizedPercentage = (unrealized / 55000) * 100;
    let formattedUnrealizedPercentage = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage);
    formattedUnrealizedPercentage = `${formattedUnrealizedPercentage}%`;
    const realizedPercentage = "+66.67%";

    //test output
    await assetPage.expectNetWorth(
      formattedNetWorth,
      formattedUnrealized,
      realized,
      formattedUnrealizedPercentage,
      realizedPercentage,
    );

    await assetPage.clearData(2);
  });

  test("TEST-AA-97: Ensure the correct of Loss Networth Calculation of Stock assets in Stock Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "2000";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    name = "SCB";
    entity = "ส่วนตัว";
    description = "test2";
    date = "02/01/2026";
    time = "00:00";
    pricePerUnit = "1500";
    quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(1);
    await assetPage.clickStockFundTransaction("sell");

    const sellPricePerUnit = "200";
    const sellQuantity = "100";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellPricePerUnit,
      sellQuantity,
      "sell",
    );

    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);

    await page.reload();
    await page.waitForTimeout(2000);

    const test1PricePerUnit: string = (await assetPage.getRecentPricePerUnit(
      0,
      "stock",
    )) as string;
    const test2PricePerUnit: string = (await assetPage.getRecentPricePerUnit(
      1,
      "stock",
    )) as string;

    const netWorth =
      Number(test1PricePerUnit.replace(/,/g, "")) * 200 +
      Number(test2PricePerUnit.replace(/,/g, "")) * 100;
    const formattedNetWorth = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(netWorth);
    const unrealized = netWorth - 550000;
    const formattedUnrealized = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized);
    const realized = "-130,000.00";
    const unrealizedPercentage = (unrealized / 550000) * 100;
    let formattedUnrealizedPercentage = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage);
    formattedUnrealizedPercentage = `${formattedUnrealizedPercentage}%`;
    const realizedPercentage = "-86.67%";

    //test output
    await assetPage.expectNetWorth(
      formattedNetWorth,
      formattedUnrealized,
      realized,
      formattedUnrealizedPercentage,
      realizedPercentage,
    );

    await assetPage.clearData(2);
  });

  test("TEST-AA-98: Ensure the correct of Zero Networth Calculation of Stock assets in Stock Page", async ({
    navBar,
    assetPage,
    page,
  }) => {
    //test step
    await navBar.clickStock();
    await page.waitForTimeout(2000);

    const networth = "0.00";
    const unrealized = "+0.00";
    const realized = "+0.00";
    const unrealizedPercentage = "+0.00%";
    const realizedPercentage = "+0.00%";

    //test output
    await assetPage.expectNetWorth(
      networth,
      unrealized,
      realized,
      unrealizedPercentage,
      realizedPercentage,
    );
  });

  test("TEST-AA-100: Ensure the correct of data of Stock Table in Stock Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "200";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    name = "SCB";
    entity = "บริษัท";
    description = "test2";
    date = "02/01/2026";
    time = "00:00";
    pricePerUnit = "150";
    quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(1);
    await assetPage.clickStockFundTransaction("sell");

    const sellPricePerUnit = "200";
    const sellQuantity = "100";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellPricePerUnit,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);

    await page.reload();
    await page.waitForTimeout(2000);

    const pricePerUnit1: string = (await assetPage.getRecentPricePerUnit(
      0,
      "stock",
    )) as string;
    const pricePerUnit2: string = (await assetPage.getRecentPricePerUnit(
      1,
      "stock",
    )) as string;

    const networth1 = Number(pricePerUnit1.replace(/,/g, "")) * 200;
    const formattedNetWorth1 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(networth1);
    const networth2 = Number(pricePerUnit2.replace(/,/g, "")) * 100;
    const formattedNetWorth2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(networth2);

    const formattedCost1 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(40000);
    const formattedCost2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(15000);

    const unrealized1 = networth1 - 40000;
    const formattedUnrealized1 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized1);
    const unrealizedPercentage1 = (unrealized1 / 40000) * 100;
    let formattedUnrealizedPercentage1 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage1);

    const unrealized2 = networth2 - 15000;
    const formattedUnrealized2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized2);
    const unrealizedPercentage2 = (unrealized2 / 15000) * 100;
    let formattedUnrealizedPercentage2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage2);

    //test output
    await assetPage.expectStockTable(
      0,
      "ส่วนตัว",
      "NVDA",
      "200.00",
      pricePerUnit1,
      formattedNetWorth1,
      formattedCost1,
      "200.00",
      `+${formattedUnrealized1}(+${formattedUnrealizedPercentage1}%)`,
      0,
    );

    await assetPage.expectStockTable(
      0,
      "บริษัท",
      "SCB",
      "100.00",
      pricePerUnit2,
      formattedNetWorth2,
      formattedCost2,
      "150.00",
      `+${formattedUnrealized2}(+${formattedUnrealizedPercentage2}%)`,
      1,
    );

    await assetPage.clearData(2);
  });

  test("TEST-AA-101: Ensure the correct of data of Stock Table when there is no transaction in Stock Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "200";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await assetPage.clickDeleteTransaction(0);
    await assetPage.clickCloseModalButton();

    const pricePerUnit1 = (await assetPage.getRecentPricePerUnit(
      0,
      "stock",
    )) as string;

    await page.reload();
    await page.waitForTimeout(2000);
    //test output
    await assetPage.expectStockTable(
      0,
      "ส่วนตัว",
      "NVDA",
      "0.00",
      pricePerUnit1,
      "0.00",
      "0.00",
      "0.00",
      `+0.00(+0.00%)`,
      0,
    );

    await assetPage.clearData(1);
  });

  test("TEST-AA-102: Ensure the usable of Add Assets Button of Stock Table in Stock Page", async ({
    navBar,
    assetPage,
    page,
  }) => {
    //test step
    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickImportButton();

    //test output
    await assetPage.expectModal();
  });

  test("TEST-AA-103: Ensure the correct of data of Stock Transaction Table in Stock Detail Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "150";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellPricePerUnit = "200";
    const sellQuantity = "100";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellPricePerUnit,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectStockTransactionTable(
      `${sellDate} ${sellTime}`,
      "ขาย",
      "-100.00",
      "200.00",
      "-20,000.00",
      "+5,000.00",
      0,
    );

    await assetPage.expectStockTransactionTable(
      `${date} ${time}`,
      "ซื้อ",
      "200.00",
      "150.00",
      "30,000.00",
      "-",
      1,
    );

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-104: Ensure show the correct data of total quantity when selling a stock asset", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "150";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    //test output
    await expect(
      page.getByText("จำนวนหน่วยลงทุน : 200.00 หน่วย"),
    ).toBeVisible();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-105: Ensure create Stock Buying Transaction in Stock Transaction Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "150";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("buy");

    const buyPricePerUnit = "200";
    const buyQuantity = "100";
    const buyDate = "03/01/2026";
    const buyTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      buyDate,
      buyTime,
      buyPricePerUnit,
      buyQuantity,
      "buy",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectStockTransactionTable(
      `${buyDate} ${buyTime}`,
      "ซื้อ",
      "100.00",
      "200.00",
      "20,000.00",
      "-",
      0,
    );

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-106: Ensure create Stock Selling Transaction in Stock Transaction Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "150";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellPricePerUnit = "200";
    const sellQuantity = "100";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellPricePerUnit,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectStockTransactionTable(
      `${sellDate} ${sellTime}`,
      "ขาย",
      "-100.00",
      "200.00",
      "-20,000.00",
      "+5,000.00",
      0,
    );

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-107: Prevent Selling Stock Transaction in case the Selling quantity is more then the Balance quantity", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "150";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellPricePerUnit = "150";
    const sellQuantity = "300";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellPricePerUnit,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();

    //test output
    await expect(
      page.getByText("คุณสามารถขายได้สูงสุด 200.00 หน่วย").last(),
    ).toBeVisible();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-108: Prevent Selling Stock Transaction in case Selling Date is before Buying Date", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "03/01/2026";
    let time = "00:00";
    let pricePerUnit = "150";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellPricePerUnit = "200";
    const sellQuantity = "100";
    const sellDate = "01/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellPricePerUnit,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);

    //test output
    await expect(
      page.getByText("ห้ามขายก่อนวันที่ซื้อวันแรก").last(),
    ).toBeVisible();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-109: Ensure Delete Selling Stock Transaction Successfully", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "150";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellPricePerUnit = "200";
    const sellQuantity = "100";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellPricePerUnit,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    await assetPage.clickDeleteTransaction(0);
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectStockTransactionTable(
      `${date} ${time}`,
      "ซื้อ",
      "200.00",
      "150.00",
      "30,000.00",
      "-",
      0,
    );

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-110: Ensure Delete Buying Stock Transaction Successfully", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "150";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("buy");

    const buyPricePerUnit = "200";
    const buyQuantity = "100";
    const buyDate = "03/01/2026";
    const buyTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      buyDate,
      buyTime,
      buyPricePerUnit,
      buyQuantity,
      "buy",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    await assetPage.clickDeleteTransaction(0);
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectFundTransactionTable(
      `${date} ${time}`,
      "ซื้อ",
      "200.00",
      "150.00",
      "30,000.00",
      "-",
      0,
    );

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-111: Prevent Delete the First Stock Transaction when the Second Transaction is Selling Transaction", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "150";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellPricePerUnit = "200";
    const sellQuantity = "100";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellPricePerUnit,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    await assetPage.clickDeleteTransaction(1);
    await page.waitForTimeout(2000);

    //test output
    await expect(
      page.getByText(
        "ไม่สามารถลบรายการซื้อนี้ได้ เนื่องจากจำนวนหน่วยไม่เพียงพอต่อรายการขายที่ตามมา",
      ),
    ).toBeVisible();

    await assetPage.clickCancelButton();
    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-112: Ensure edit stock transaction successfully", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "150";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellPricePerUnit = "200";
    const sellQuantity = "100";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellPricePerUnit,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    await assetPage.clickEditTransaction(0);

    const editSellPricePerUnit = "300";
    const editSellQuantity = "50";
    const editSellDate = "02/01/2026";
    const editSellTime = "00:00";

    await assetPage.fillEditStockFundForm(
      editSellDate,
      editSellTime,
      editSellQuantity,
      editSellPricePerUnit,
    );
    await assetPage.clickSaveEditTransactionButton();
    await page.waitForTimeout(2000);

    await assetPage.clickCloseModalButton();
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectFundTransactionTable(
      `${editSellDate} ${editSellTime}`,
      "ขาย",
      "-50.00",
      "300.00",
      "-15,000.00",
      "+7,500.00",
      0,
    );

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-113: Prevent edit selling stock transaction when the input date is before the buying date of first transaction", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "02/01/2026";
    let time = "00:00";
    let pricePerUnit = "150";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellPricePerUnit = "200";
    const sellQuantity = "100";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellPricePerUnit,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    await assetPage.clickEditTransaction(0);

    const editSellPricePerUnit = "200";
    const editSellQuantity = "100";
    const editSellDate = "01/01/2026";
    const editSellTime = "00:00";

    await assetPage.fillEditStockFundForm(
      editSellDate,
      editSellTime,
      editSellQuantity,
      editSellPricePerUnit,
    );
    await assetPage.clickSaveEditTransactionButton();
    await page.waitForTimeout(2000);

    //test output
    await expect(page.getByText("ห้ามขายก่อนวันที่ซื้ออ้างอิง")).toBeVisible();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-114: Prevent edit first buying stock transaction when the input date is after the selling date", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "150";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellPricePerUnit = "200";
    const sellQuantity = "100";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellPricePerUnit,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    await assetPage.clickEditTransaction(1);

    const editBuyPricePerUnit = "150";
    const editBuyQuantity = "200";
    const editBuyDate = "04/01/2026";
    const editBuyTime = "00:00";

    await assetPage.fillEditStockFundForm(
      editBuyDate,
      editBuyTime,
      editBuyQuantity,
      editBuyPricePerUnit,
    );
    await assetPage.clickSaveEditTransactionButton();
    await page.waitForTimeout(2000);

    //test output
    await expect(page.getByText("ห้ามซื้อหลังวันที่ขายถัดไป")).toBeVisible();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-115: Prevent edit buying stock transaction when the input make the balance quantity less than zero", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "150";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellPricePerUnit = "200";
    const sellQuantity = "100";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellPricePerUnit,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    await assetPage.clickEditTransaction(1);

    const editBuyPricePerUnit = "150";
    const editBuyQuantity = "50";
    const editBuyDate = "02/01/2026";
    const editBuyTime = "00:00";

    await assetPage.fillEditStockFundForm(
      editBuyDate,
      editBuyTime,
      editBuyQuantity,
      editBuyPricePerUnit,
    );
    await assetPage.clickSaveEditTransactionButton();
    await page.waitForTimeout(2000);

    //test output
    await expect(page.getByText("ยอดสะสมจะไม่เพียงพอต่อการขาย")).toBeVisible();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-116: Prevent edit selling stock transaction when the input make the balance quantity less than zero", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "150";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellPricePerUnit = "200";
    const sellQuantity = "100";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellPricePerUnit,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    await assetPage.clickEditTransaction(0);

    const editSellPricePerUnit = "200";
    const editSellQuantity = "300";
    const editSellDate = "02/01/2026";
    const editSellTime = "00:00";

    await assetPage.fillEditStockFundForm(
      editSellDate,
      editSellTime,
      editSellQuantity,
      editSellPricePerUnit,
    );
    await assetPage.clickSaveEditTransactionButton();
    await page.waitForTimeout(2000);

    //test output
    await expect(page.getByText("ยอดสะสมจะไม่เพียงพอต่อการขาย")).toBeVisible();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-117: Ensure delete stock asset successfully", async ({
    navBar,
    assetPage,
    importPage,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let name = "NVDA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let pricePerUnit = "150";
    let quantity = "200";

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await assetPage.clickDeleteAsset(0);

    //test output
    await assetPage.expectNoData();
  });
});
