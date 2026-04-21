import { expect, test } from "../../fixture.js";

test.describe("Asset Aggregation - Fund", () => {
  const URL = process.env.URL || "";
  const EMAIL = process.env.EMAIL || "";
  const PASSWORD = process.env.PASSWORD || "";

  test.beforeEach(async ({ assetPage, navBar, finnomenaPage, page }) => {
    await page.goto(URL);
    await navBar.clickSignIn();
    await finnomenaPage.signIn(EMAIL, PASSWORD);
    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clearData();
  });

  test("TEST-AA-31: Display Networth and Profit in Fund Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    const name = "K-ASIA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const nav = "20000";
    const quantity = "2.00";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickFund();
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectNetWorth();

    await assetPage.clearData(1);
  });

  test("TEST-AA-32: Display Fund Graph in Fund Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    const name = "K-ASIA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const nav = "20000";
    const quantity = "2.00";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickFund();
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectGraph();

    await assetPage.clearData(1);
  });

  test("TEST-AA-33: Display Fund Table in Fund Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    const name = "K-ASIA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const nav = "20000";
    const quantity = "2.00";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickFund();
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectFundTable();

    await assetPage.clearData(1);
  });

  test("TEST-AA-34: Display Empty Asset Message to inform user when there is no fund asset in Fund Page", async ({
    assetPage,
  }) => {
    //test step

    //test output
    await assetPage.expectNoData();
  });

  test("TEST-AA-35: Display Fund Detail Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    const name = "K-ASIA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const nav = "20000";
    const quantity = "2.00";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickFund();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);

    //test output
    await assetPage.expectDetailPage();
    await assetPage.expectFundTransactionTable();
    await assetPage.clickCloseModalButton();
    await page.waitForTimeout(1000);

    await assetPage.clearData(1);
  });

  test("TEST-AA-36: Display Empty Transaction Message to inform user when there is no fund transaction in Fund Detail Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    const name = "K-ASIA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const nav = "20000";
    const quantity = "2.00";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickFund();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);
    await assetPage.clickDeleteTransaction(0);

    //test output
    await assetPage.expectNoData();
    await assetPage.clickCloseModalButton();

    await assetPage.clearData(1);
  });

  test("TEST-AA-37: Display Fund Detail Menu in Fund Table in Fund Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    const name = "K-ASIA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const nav = "20000";
    const quantity = "2.00";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickFund();
    await page.waitForTimeout(2000);

    await assetPage.clickEllipsisButton(0);

    //test output
    await assetPage.expectDetailMenu();

    await assetPage.clickEllipsisButton(0);
    await assetPage.clearData(1);
  });

  test("TEST-AA-38: Display Create Fund Transaction Menu in Fund Table in Fund Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    const name = "K-ASIA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const nav = "20000";
    const quantity = "2.00";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickFund();
    await page.waitForTimeout(2000);

    await assetPage.clickEllipsisButton(0);

    //test output
    await assetPage.expectTransactionMenu();

    await assetPage.clickEllipsisButton(0);
    await assetPage.clearData(1);
  });

  test("TEST-AA-39: Display Buy Fund Transaction Form", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    const name = "K-ASIA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const nav = "20000";
    const quantity = "2.00";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickFund();
    await page.waitForTimeout(2000);

    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("buy");

    //test output
    await assetPage.expectBuyingStockFundForm();
    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-40: Display Sell Fund Transaction Form", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    const name = "K-ASIA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const nav = "20000";
    const quantity = "2.00";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickFund();
    await page.waitForTimeout(2000);

    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    //test output
    await assetPage.expectSellingStockFundForm();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-41: Display Delete Transaction Menu in Fund Detail Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    const name = "K-ASIA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const nav = "20000";
    const quantity = "2.00";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickFund();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);
    await assetPage.clickModalEllipsisButton(0);

    //test output
    await assetPage.expectDeleteTransactionMenu();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-42: Display Edit Transaction Menu in Fund Detail Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    const name = "K-ASIA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const nav = "20000";
    const quantity = "2.00";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickFund();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);
    await assetPage.clickModalEllipsisButton(0);

    //test output
    await assetPage.expectEditTransactionMenu();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-43: Display Delete Asset Menu in Fund Detail Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    const name = "K-ASIA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const nav = "20000";
    const quantity = "2.00";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickFund();
    await page.waitForTimeout(2000);

    await assetPage.clickEllipsisButton(0);

    //test output
    await assetPage.expectDeleteAssetMenu();

    await assetPage.clickEllipsisButton(0);
    await assetPage.clearData(1);
  });

  test("TEST-AA-60: Click View Asset Detail in Fund Table in Fund Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    const name = "K-ASIA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const nav = "20000";
    const quantity = "2.00";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickFund();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);

    //test output
    await assetPage.expectDetailPage();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-61: Click Transact Button in Fund Table in Fund Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    const name = "K-ASIA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const nav = "20000";
    const quantity = "2.00";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickFund();
    await page.waitForTimeout(2000);

    await assetPage.clickTransactionPage(0);

    //test output
    await assetPage.expectBuyingStockFundForm();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-118: Ensure the correct of Profit Networth Calculation of Fund assets in Fund Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "10";
    let quantity = "2000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    name = "SCBCHINA";
    entity = "ส่วนตัว";
    description = "test2";
    date = "02/01/2026";
    time = "00:00";
    nav = "5";
    quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(1);
    await assetPage.clickStockFundTransaction("sell");

    const sellNav = "15";
    const sellQuantity = "2000";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellNav,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);

    await page.reload();
    await page.waitForTimeout(2000);

    const test1PricePerUnit: string = (await assetPage.getRecentPricePerUnit(
      0,
      "fund",
    )) as string;
    const test2PricePerUnit: string = (await assetPage.getRecentPricePerUnit(
      1,
      "fund",
    )) as string;

    const netWorth =
      Number(test1PricePerUnit.replace(/,/g, "")) * 2000 +
      Number(test2PricePerUnit.replace(/,/g, "")) * 1000;
    const formattedNetWorth = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(netWorth);
    const unrealized = netWorth - 25000;
    const formattedUnrealized = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized);
    const realized = "+20,000.00";
    const unrealizedPercentage = (unrealized / 25000) * 100;
    let formattedUnrealizedPercentage = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage);
    formattedUnrealizedPercentage = `+${formattedUnrealizedPercentage}%`;
    const realizedPercentage = "+200.00%";

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

  test("TEST-AA-119: Ensure the correct of Loss Networth Calculation of Fund assets in Fund Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "10";
    let quantity = "2000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    name = "SCBCHINA";
    entity = "ส่วนตัว";
    description = "test2";
    date = "02/01/2026";
    time = "00:00";
    nav = "30";
    quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(1);
    await assetPage.clickStockFundTransaction("sell");

    const sellNav = "10";
    const sellQuantity = "2000";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellNav,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);

    await page.reload();
    await page.waitForTimeout(2000);

    const test1PricePerUnit: string = (await assetPage.getRecentPricePerUnit(
      0,
      "fund",
    )) as string;
    const test2PricePerUnit: string = (await assetPage.getRecentPricePerUnit(
      1,
      "fund",
    )) as string;

    const netWorth =
      Number(test1PricePerUnit.replace(/,/g, "")) * 2000 +
      Number(test2PricePerUnit.replace(/,/g, "")) * 1000;
    const formattedNetWorth = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(netWorth);
    const unrealized = netWorth - 50000;
    const formattedUnrealized = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized);
    const realized = "-40,000.00";
    const unrealizedPercentage = (unrealized / 50000) * 100;
    let formattedUnrealizedPercentage = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage);
    formattedUnrealizedPercentage = `${formattedUnrealizedPercentage}%`;
    const realizedPercentage = "-66.67%";

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

  test("TEST-AA-120: Ensure the correct of Zero Networth Calculation of Fund assets in Fund Page", async ({
    navBar,
    assetPage,
    page,
  }) => {
    //test step
    await navBar.clickFund();
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

  test("TEST-AA-123: Ensure the correct of data of Fund Table in Fund Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "10";
    let quantity = "2000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    name = "SCBCHINA";
    entity = "บริษัท";
    description = "test2";
    date = "02/01/2026";
    time = "00:00";
    nav = "5";
    quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(1);
    await assetPage.clickStockFundTransaction("sell");

    const sellNav = "15";
    const sellQuantity = "2000";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellNav,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);

    await page.reload();
    await page.waitForTimeout(2000);

    const pricePerUnit1: string = (await assetPage.getRecentPricePerUnit(
      0,
      "fund",
    )) as string;
    const pricePerUnit2: string = (await assetPage.getRecentPricePerUnit(
      1,
      "fund",
    )) as string;

    const networth1 = Number(pricePerUnit1.replace(/,/g, "")) * 2000;
    const formattedNetWorth1 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(networth1);
    const networth2 = Number(pricePerUnit2.replace(/,/g, "")) * 1000;
    const formattedNetWorth2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(networth2);

    const formattedCost1 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(20000);
    const formattedCost2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(5000);

    const unrealized1 = networth1 - 20000;
    const formattedUnrealized1 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized1);
    const unrealizedPercentage1 = (unrealized1 / 20000) * 100;
    let formattedUnrealizedPercentage1 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage1);

    const unrealized2 = networth2 - 5000;
    const formattedUnrealized2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized2);
    const unrealizedPercentage2 = (unrealized2 / 5000) * 100;
    let formattedUnrealizedPercentage2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage2);

    //test output
    await assetPage.expectFundTable(
      0,
      "ส่วนตัว",
      "K-ASIA",
      "2,000.00",
      pricePerUnit1,
      formattedNetWorth1,
      formattedCost1,
      "10.00",
      `+${formattedUnrealized1}(+${formattedUnrealizedPercentage1}%)`,
      0,
    );

    await assetPage.expectFundTable(
      0,
      "บริษัท",
      "SCBCHINA",
      "1,000.00",
      pricePerUnit2,
      formattedNetWorth2,
      formattedCost2,
      "5.00",
      `+${formattedUnrealized2}(+${formattedUnrealizedPercentage2}%)`,
      1,
    );

    await assetPage.clearData(2);
  });

  test("TEST-AA-124: Ensure the correct of data of Fund Table when there is no transaction in Fund Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "10";
    let quantity = "2000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await assetPage.clickDeleteTransaction(0);
    await assetPage.clickCloseModalButton();

    const pricePerUnit = (await assetPage.getRecentPricePerUnit(
      0,
      "fund",
    )) as string;

    await page.reload();
    await page.waitForTimeout(2000);
    //test output
    await assetPage.expectFundTable(
      0,
      "ส่วนตัว",
      "K ASIA%",
      "0.00",
      pricePerUnit,
      "0.00",
      "0.00",
      "0.00",
      `+0.00(+0.00%)`,
      0,
    );

    await assetPage.clearData(1);
  });

  test("TEST-AA-125: Ensure the usable of Add Assets Button of Fund Table in Fund Page", async ({
    navBar,
    assetPage,
    page,
  }) => {
    //test step
    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickImportButton();

    //test output
    await assetPage.expectModal();
  });

  test("TEST-AA-126: Ensure the correct of data of Fund Transaction Table in Fund Detail Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "5";
    let quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellNav = "15";
    const sellQuantity = "2000";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellNav,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectFundTransactionTable(
      `${sellDate} ${sellTime}`,
      "ขาย",
      "-2,000.00",
      "15.00",
      "-30,000.00",
      "+20,000.00",
      0,
    );

    await assetPage.expectFundTransactionTable(
      `${date} ${time}`,
      "ซื้อ",
      "3,000.00",
      "5.00",
      "15,000.00",
      "-",
      1,
    );

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-127: Ensure show the correct data of total quantity when selling a fund asset", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "5";
    let quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    //test output
    await expect(
      page.getByText("จำนวนหน่วยลงทุน : 3,000.00 หน่วย"),
    ).toBeVisible();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-128: Ensure create Fund Buying Transaction in Fund Transaction Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "5";
    let quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("buy");

    const buyNav = "15";
    const buyQuantity = "2000";
    const buyDate = "03/01/2026";
    const buyTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      buyDate,
      buyTime,
      buyNav,
      buyQuantity,
      "buy",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectFundTransactionTable(
      `${buyDate} ${buyTime}`,
      "ซื้อ",
      "2,000.00",
      "15.00",
      "30,000.00",
      "-",
      0,
    );

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-129: Ensure create Fund Selling Transaction in Fund Transaction Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "5";
    let quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellNav = "15";
    const sellQuantity = "2000";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellNav,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectFundTransactionTable(
      `${sellDate} ${sellTime}`,
      "ขาย",
      "-2,000.00",
      "15.00",
      "-30,000.00",
      "+20,000.00",
      0,
    );

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-130: Prevent Selling Fund Transaction in case the Selling quantity is more then the Balance quantity", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "5";
    let quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellNav = "15";
    const sellQuantity = "5000";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellNav,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();

    //test output
    await expect(
      page.getByText("คุณสามารถขายได้สูงสุด 3,000.00 หน่วย").last(),
    ).toBeVisible();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-131: Prevent Selling Fund Transaction in case Selling Date is before Buying Date ", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "03/01/2026";
    let time = "00:00";
    let nav = "5";
    let quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellNav = "15";
    const sellQuantity = "2000";
    const sellDate = "01/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellNav,
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

  test("TEST-AA-132: Ensure Delete Selling Fund Transaction Successfully", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "5";
    let quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellNav = "15";
    const sellQuantity = "2000";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellNav,
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
    await assetPage.expectFundTransactionTable(
      `${date} ${time}`,
      "ซื้อ",
      "3,000.00",
      "5.00",
      "15,000.00",
      "-",
      0,
    );

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-133: Ensure Delete Buying Fund Transaction Successfully", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "5";
    let quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("buy");

    const buyNav = "15";
    const buyQuantity = "2000";
    const buyDate = "03/01/2026";
    const buyTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      buyDate,
      buyTime,
      buyNav,
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
      "3,000.00",
      "5.00",
      "15,000.00",
      "-",
      0,
    );

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-134: Prevent Delete the First Fund Transaction when the Second Transaction is Selling Transaction", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "5";
    let quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellNav = "15";
    const sellQuantity = "2000";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellNav,
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

  test("TEST-AA-135: Ensure edit fund transaction successfully", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "5";
    let quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellNav = "15";
    const sellQuantity = "2000";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellNav,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    await assetPage.clickEditTransaction(0);

    const editSellNav = "20";
    const editSellQuantity = "1000";
    const editSellDate = "02/01/2026";
    const editSellTime = "00:00";

    await assetPage.fillEditStockFundForm(
      editSellDate,
      editSellTime,
      editSellQuantity,
      editSellNav,
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
      "-1,000.00",
      "20.00",
      "-20,000.00",
      "+15,000.00",
      0,
    );

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-136: Prevent edit selling fund transaction when the input date is before the buying date of first transaction", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "02/01/2026";
    let time = "00:00";
    let nav = "5";
    let quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellNav = "15";
    const sellQuantity = "2000";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellNav,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    await assetPage.clickEditTransaction(0);

    const editSellNav = "20";
    const editSellQuantity = "1000";
    const editSellDate = "01/01/2026";
    const editSellTime = "00:00";

    await assetPage.fillEditStockFundForm(
      editSellDate,
      editSellTime,
      editSellQuantity,
      editSellNav,
    );
    await assetPage.clickSaveEditTransactionButton();
    await page.waitForTimeout(2000);

    //test output
    await expect(page.getByText("ห้ามขายก่อนวันที่ซื้ออ้างอิง")).toBeVisible();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-137: Prevent edit first buying fund transaction when the input date is after the selling date", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "5";
    let quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellNav = "15";
    const sellQuantity = "2000";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellNav,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    await assetPage.clickEditTransaction(1);

    const editBuyNav = "5";
    const editBuyQuantity = "3000";
    const editBuyDate = "04/01/2026";
    const editBuyTime = "00:00";

    await assetPage.fillEditStockFundForm(
      editBuyDate,
      editBuyTime,
      editBuyQuantity,
      editBuyNav,
    );
    await assetPage.clickSaveEditTransactionButton();
    await page.waitForTimeout(2000);

    //test output
    await expect(page.getByText("ห้ามซื้อหลังวันที่ขายถัดไป")).toBeVisible();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-138: Prevent edit buying fund transaction when the input make the balance quantity less than zero", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "5";
    let quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellNav = "15";
    const sellQuantity = "2000";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellNav,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    await assetPage.clickEditTransaction(1);

    const editBuyNav = "5";
    const editBuyQuantity = "1000";
    const editBuyDate = "01/01/2026";
    const editBuyTime = "00:00";

    await assetPage.fillEditStockFundForm(
      editBuyDate,
      editBuyTime,
      editBuyQuantity,
      editBuyNav,
    );
    await assetPage.clickSaveEditTransactionButton();
    await page.waitForTimeout(2000);

    //test output
    await expect(page.getByText("ยอดสะสมจะไม่เพียงพอต่อการขาย")).toBeVisible();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-139: Prevent edit selling fund transaction when the input make the balance quantity less than zero", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "5";
    let quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickStockFundTransaction("sell");

    const sellNav = "15";
    const sellQuantity = "2000";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      sellDate,
      sellTime,
      sellNav,
      sellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    await assetPage.clickEditTransaction(0);

    const editSellNav = "15";
    const editSellQuantity = "4000";
    const editSellDate = "03/01/2026";
    const editSellTime = "00:00";

    await assetPage.fillEditStockFundForm(
      editSellDate,
      editSellTime,
      editSellQuantity,
      editSellNav,
    );
    await assetPage.clickSaveEditTransactionButton();
    await page.waitForTimeout(2000);

    //test output
    await expect(page.getByText("ยอดสะสมจะไม่เพียงพอต่อการขาย")).toBeVisible();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-140: Ensure delete fund asset successfully", async ({
    navBar,
    assetPage,
    importPage,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickFundButton();

    let name = "K-ASIA";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let nav = "5";
    let quantity = "3000";

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await assetPage.clickDeleteAsset(0);

    //test output
    await assetPage.expectNoData();
  });
});
