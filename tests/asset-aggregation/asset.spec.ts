import { expect, test } from "../../fixture.js";

test.describe("Asset Aggregation - Assets", () => {
  const URL = process.env.URL || "";
  const EMAIL = process.env.EMAIL || "";
  const PASSWORD = process.env.PASSWORD || "";

  test.beforeEach(async ({ assetPage, navBar, finnomenaPage, page }) => {
    await page.goto(URL);
    await navBar.clickSignIn();
    await finnomenaPage.signIn(EMAIL, PASSWORD);
    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);
    await assetPage.clearData();
  });

  test("TEST-AA-44: Display Networth and Profit in Assets Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickGoldButton();

    const name = "ทองคำแท่ง";
    const purity = "96.50%";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const price = "20000";
    const quantity = "2.00";

    await importPage.fillGoldImportForm(
      entity,
      description,
      date,
      time,
      name,
      price,
      purity,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectNetWorth();

    await assetPage.clearData(1);
  });

  test("TEST-AA-45: Display All Assets Table in Assets Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const stockName = "NVDA";
    const stockEntity = "ส่วนตัว";
    const stockDescription = "test1";
    const stockDate = "01/01/2026";
    const stockTime = "00:00";
    const stockPricePerUnit = "100";
    const stockQuantity = "10";

    await importPage.fillStockImportForm(
      stockEntity,
      stockDescription,
      stockDate,
      stockTime,
      stockName,
      stockPricePerUnit,
      stockQuantity,
    );
    await importPage.clickSaveButton();

    await importPage.clickGoldButton();

    const goldName = "ทองคำแท่ง";
    const goldPurity = "96.50%";
    const goldEntity = "ส่วนตัว";
    const goldDescription = "test1";
    const goldDate = "01/01/2026";
    const goldTime = "00:00";
    const goldPrice = "20000";
    const goldQuantity = "2.00";

    await importPage.fillGoldImportForm(
      goldEntity,
      goldDescription,
      goldDate,
      goldTime,
      goldName,
      goldPrice,
      goldPurity,
      goldQuantity,
    );
    await importPage.clickSaveButton();

    await importPage.clickFundButton();

    const name = "K-ASIA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const nav = "10";
    const quantity = "2000";

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

    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectStockTable(0);
    await assetPage.expectGoldTable(18);
    await assetPage.expectFundTable(34);

    await assetPage.clearData(3);
  });

  test("TEST-AA-46: Display Empty Asset Message to inform user when there is no asset in each table in Assets Page", async ({
    assetPage,
  }) => {
    //test step

    //test output
    await assetPage.expectNoData();
  });

  test("TEST-AA-47: Display Action Dropdown in Gold Table in Assets Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickGoldButton();

    const goldName = "ทองคำแท่ง";
    const goldPurity = "96.50%";
    const goldEntity = "ส่วนตัว";
    const goldDescription = "test1";
    const goldDate = "01/01/2026";
    const goldTime = "00:00";
    const goldPrice = "20000";
    const goldQuantity = "2.00";

    await importPage.fillGoldImportForm(
      goldEntity,
      goldDescription,
      goldDate,
      goldTime,
      goldName,
      goldPrice,
      goldPurity,
      goldQuantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);
    await assetPage.clickEllipsisButton(0);

    //test output
    await assetPage.expectDetailMenu();
    await assetPage.expectTransactionMenu();
    await assetPage.expectDeleteAssetMenu();

    await assetPage.clickEllipsisButton(0);
    await assetPage.clearData(1);
  });

  test("TEST-AA-48: Display Action Dropdown in Stock Table in Assets Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const stockName = "NVDA";
    const stockEntity = "ส่วนตัว";
    const stockDescription = "test1";
    const stockDate = "01/01/2026";
    const stockTime = "00:00";
    const stockPricePerUnit = "100";
    const stockQuantity = "10";

    await importPage.fillStockImportForm(
      stockEntity,
      stockDescription,
      stockDate,
      stockTime,
      stockName,
      stockPricePerUnit,
      stockQuantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);
    await assetPage.clickEllipsisButton(0);

    //test output
    await assetPage.expectDetailMenu();
    await assetPage.expectTransactionMenu();
    await assetPage.expectDeleteAssetMenu();

    await assetPage.clickEllipsisButton(0);
    await assetPage.clearData(1);
  });

  test("TEST-AA-49: Display Action Dropdown in Fund Table in Assets Page", async ({
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
    const nav = "10";
    const quantity = "2000";

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
    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);
    await assetPage.clickEllipsisButton(0);

    //test output
    await assetPage.expectDetailMenu();
    await assetPage.expectTransactionMenu();
    await assetPage.expectDeleteAssetMenu();

    await assetPage.clickEllipsisButton(0);
    await assetPage.clearData(1);
  });

  test("TEST-AA-50: Display Asset Graph in Asset Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    const stockName = "NVDA";
    const stockEntity = "ส่วนตัว";
    const stockDescription = "test1";
    const stockDate = "01/01/2026";
    const stockTime = "00:00";
    const stockPricePerUnit = "100";
    const stockQuantity = "10";

    await importPage.fillStockImportForm(
      stockEntity,
      stockDescription,
      stockDate,
      stockTime,
      stockName,
      stockPricePerUnit,
      stockQuantity,
    );
    await importPage.clickSaveButton();

    await importPage.clickGoldButton();

    const goldName = "ทองคำแท่ง";
    const goldPurity = "96.50%";
    const goldEntity = "ส่วนตัว";
    const goldDescription = "test1";
    const goldDate = "01/01/2026";
    const goldTime = "00:00";
    const goldPrice = "20000";
    const goldQuantity = "2.00";

    await importPage.fillGoldImportForm(
      goldEntity,
      goldDescription,
      goldDate,
      goldTime,
      goldName,
      goldPrice,
      goldPurity,
      goldQuantity,
    );
    await importPage.clickSaveButton();

    await importPage.clickFundButton();

    const name = "K-ASIA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const nav = "10";
    const quantity = "2000";

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

    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectGraph();

    await assetPage.clearData(3);
  });

  test("TEST-AA-62: Click View Asset Detail in Gold Table in Assets Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickGoldButton();

    const name = "ทองคำแท่ง";
    const purity = "96.50%";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const price = "20000";
    const quantity = "2.00";

    await importPage.fillGoldImportForm(
      entity,
      description,
      date,
      time,
      name,
      price,
      purity,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);

    //test output
    await assetPage.expectDetailPage();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-63: Click Transact Button in Gold Table in Assets Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickGoldButton();

    const name = "ทองคำแท่ง";
    const purity = "96.50%";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const price = "20000";
    const quantity = "2.00";

    await importPage.fillGoldImportForm(
      entity,
      description,
      date,
      time,
      name,
      price,
      purity,
      quantity,
    );
    await importPage.clickSaveButton();
    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);

    await assetPage.clickTransactionPage(0);

    //test output
    await assetPage.expectBalanceTable();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-64: Click View Asset Detail in Stock Table in Assets Page", async ({
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
    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);

    //test output
    await assetPage.expectDetailPage();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-65: Click Transact Button in Stock Table in Assets Page", async ({
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
    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);

    await assetPage.clickTransactionPage(0);

    //test output
    await assetPage.expectBuyingStockFundForm();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-66: Click View Asset Detail in Fund Table in Assets Page", async ({
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
    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);

    //test output
    await assetPage.expectDetailPage();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-67: Click Transact Button in Fund Table in Assets Page", async ({
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
    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);

    await assetPage.clickTransactionPage(0);

    //test output
    await assetPage.expectBuyingStockFundForm();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-141: Ensure the correct of Profit Networth Calculation of All Assets in Assets Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let stockName = "NVDA";
    let stockEntity = "ส่วนตัว";
    let stockDescription = "test1";
    let stockDate = "01/01/2026";
    let stockTime = "00:00";
    let stockPricePerUnit = "200";
    let stockQuantity = "200";

    await importPage.fillStockImportForm(
      stockEntity,
      stockDescription,
      stockDate,
      stockTime,
      stockName,
      stockPricePerUnit,
      stockQuantity,
    );
    await importPage.clickSaveButton();

    stockName = "SCB";
    stockEntity = "ส่วนตัว";
    stockDescription = "test2";
    stockDate = "02/01/2026";
    stockTime = "00:00";
    stockPricePerUnit = "150";
    stockQuantity = "200";

    await importPage.fillStockImportForm(
      stockEntity,
      stockDescription,
      stockDate,
      stockTime,
      stockName,
      stockPricePerUnit,
      stockQuantity,
    );
    await importPage.clickSaveButton();

    await importPage.clickGoldButton();

    let goldName = "ทองคำแท่ง";
    let goldPurity = "96.50%";
    let goldEntity = "ส่วนตัว";
    let goldDescription = "test1";
    let goldDate = "01/01/2026";
    let goldTime = "00:00";
    let goldPrice = "20000";
    let goldQuantity = "2.00";

    await importPage.fillGoldImportForm(
      goldEntity,
      goldDescription,
      goldDate,
      goldTime,
      goldName,
      goldPrice,
      goldPurity,
      goldQuantity,
    );
    await importPage.clickSaveButton();

    goldName = "ทองคำรูปพรรณ";
    goldPurity = "96.50%";
    goldEntity = "ส่วนตัว";
    goldDescription = "test2";
    goldDate = "02/01/2026";
    goldTime = "00:00";
    goldPrice = "30000";
    goldQuantity = "2.00";

    await importPage.fillGoldImportForm(
      goldEntity,
      goldDescription,
      goldDate,
      goldTime,
      goldName,
      goldPrice,
      goldPurity,
      goldQuantity,
    );
    await importPage.clickSaveButton();

    await importPage.clickFundButton();

    let fundName = "K-ASIA";
    let fundEntity = "ส่วนตัว";
    let fundDescription = "test1";
    let fundDate = "01/01/2026";
    let fundTime = "00:00";
    let fundNav = "10";
    let fundQuantity = "2000";

    await importPage.fillFundImportForm(
      fundEntity,
      fundDescription,
      fundDate,
      fundTime,
      fundName,
      fundNav,
      fundQuantity,
    );
    await importPage.clickSaveButton();

    fundName = "SCBCHINA";
    fundEntity = "ส่วนตัว";
    fundDescription = "test2";
    fundDate = "02/01/2026";
    fundTime = "00:00";
    fundNav = "5";
    fundQuantity = "3000";

    await importPage.fillFundImportForm(
      fundEntity,
      fundDescription,
      fundDate,
      fundTime,
      fundName,
      fundNav,
      fundQuantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickGold();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(1);
    await assetPage.clickGoldTransaction("sell");

    const goldSellPrice = "20000";
    const goldSellQuantity = "1";
    const goldSellDate = "03/01/2026";
    const goldSellTime = "00:00";

    await assetPage.fillGoldTransactionForm(
      goldSellDate,
      goldSellTime,
      goldSellPrice,
      goldSellQuantity,
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickCloseModalButton();

    await page.reload();
    await page.waitForTimeout(2000);

    const goldTest1PricePerUnit: string =
      (await assetPage.getRecentPricePerUnit(0, "gold")) as string;
    const goldTest2PricePerUnit: string =
      (await assetPage.getRecentPricePerUnit(1, "gold")) as string;

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(1);
    await assetPage.clickStockFundTransaction("sell");

    const stockSellPricePerUnit = "200";
    const stockSellQuantity = "100";
    const stockSellDate = "03/01/2026";
    const stockSellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      stockSellDate,
      stockSellTime,
      stockSellPricePerUnit,
      stockSellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);

    await page.reload();
    await page.waitForTimeout(2000);

    const stockTest1PricePerUnit: string =
      (await assetPage.getRecentPricePerUnit(0, "stock")) as string;
    const stockTest2PricePerUnit: string =
      (await assetPage.getRecentPricePerUnit(1, "stock")) as string;

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(1);
    await assetPage.clickStockFundTransaction("sell");

    const fundSellNav = "15";
    const fundSellQuantity = "2000";
    const fundSellDate = "03/01/2026";
    const fundSellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      fundSellDate,
      fundSellTime,
      fundSellNav,
      fundSellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);

    await page.reload();
    await page.waitForTimeout(2000);

    const fundTest1PricePerUnit: string =
      (await assetPage.getRecentPricePerUnit(0, "fund")) as string;
    const fundTest2PricePerUnit: string =
      (await assetPage.getRecentPricePerUnit(1, "fund")) as string;

    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);

    const netWorth =
      Number(goldTest1PricePerUnit.replace(/,/g, "")) * 2 +
      Number(goldTest2PricePerUnit.replace(/,/g, "")) +
      Number(stockTest1PricePerUnit.replace(/,/g, "")) * 200 +
      Number(stockTest2PricePerUnit.replace(/,/g, "")) * 100 +
      Number(fundTest1PricePerUnit.replace(/,/g, "")) * 2000 +
      Number(fundTest2PricePerUnit.replace(/,/g, "")) * 1000;
    const formattedNetWorth = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(netWorth);
    const unrealized = netWorth - 115000;
    const formattedUnrealized = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized);
    const realized = "+30,000.00";
    const unrealizedPercentage = (unrealized / 115000) * 100;
    let formattedUnrealizedPercentage = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage);
    formattedUnrealizedPercentage = `+${formattedUnrealizedPercentage}%`;
    const realizedPercentage = "+75.00%";

    //test output
    await assetPage.expectNetWorth(
      formattedNetWorth,
      formattedUnrealized,
      realized,
      formattedUnrealizedPercentage,
      realizedPercentage,
    );

    await assetPage.clearData(6);
  });

  test("TEST-AA-142: Ensure the correct of Loss Networth Calculation of All assets in Assets Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickStockButton();

    let stockName = "NVDA";
    let stockEntity = "ส่วนตัว";
    let stockDescription = "test1";
    let stockDate = "01/01/2026";
    let stockTime = "00:00";
    let stockPricePerUnit = "2000";
    let stockQuantity = "200";

    await importPage.fillStockImportForm(
      stockEntity,
      stockDescription,
      stockDate,
      stockTime,
      stockName,
      stockPricePerUnit,
      stockQuantity,
    );
    await importPage.clickSaveButton();

    stockName = "SCB";
    stockEntity = "ส่วนตัว";
    stockDescription = "test2";
    stockDate = "02/01/2026";
    stockTime = "00:00";
    stockPricePerUnit = "1500";
    stockQuantity = "200";

    await importPage.fillStockImportForm(
      stockEntity,
      stockDescription,
      stockDate,
      stockTime,
      stockName,
      stockPricePerUnit,
      stockQuantity,
    );
    await importPage.clickSaveButton();

    await importPage.clickGoldButton();

    let goldName = "ทองคำแท่ง";
    let goldPurity = "96.50%";
    let goldEntity = "ส่วนตัว";
    let goldDescription = "test1";
    let goldDate = "01/01/2026";
    let goldTime = "00:00";
    let goldPrice = "200000";
    let goldQuantity = "2.00";

    await importPage.fillGoldImportForm(
      goldEntity,
      goldDescription,
      goldDate,
      goldTime,
      goldName,
      goldPrice,
      goldPurity,
      goldQuantity,
    );
    await importPage.clickSaveButton();

    goldName = "ทองคำรูปพรรณ";
    goldPurity = "96.50%";
    goldEntity = "ส่วนตัว";
    goldDescription = "test2";
    goldDate = "02/01/2026";
    goldTime = "00:00";
    goldPrice = "300000";
    goldQuantity = "2.00";

    await importPage.fillGoldImportForm(
      goldEntity,
      goldDescription,
      goldDate,
      goldTime,
      goldName,
      goldPrice,
      goldPurity,
      goldQuantity,
    );
    await importPage.clickSaveButton();

    await importPage.clickFundButton();

    let fundName = "K-ASIA";
    let fundEntity = "ส่วนตัว";
    let fundDescription = "test1";
    let fundDate = "01/01/2026";
    let fundTime = "00:00";
    let fundNav = "10";
    let fundQuantity = "2000";

    await importPage.fillFundImportForm(
      fundEntity,
      fundDescription,
      fundDate,
      fundTime,
      fundName,
      fundNav,
      fundQuantity,
    );
    await importPage.clickSaveButton();

    fundName = "SCBCHINA";
    fundEntity = "ส่วนตัว";
    fundDescription = "test2";
    fundDate = "02/01/2026";
    fundTime = "00:00";
    fundNav = "30";
    fundQuantity = "3000";

    await importPage.fillFundImportForm(
      fundEntity,
      fundDescription,
      fundDate,
      fundTime,
      fundName,
      fundNav,
      fundQuantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickGold();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(1);
    await assetPage.clickGoldTransaction("sell");

    const goldSellPrice = "10000";
    const goldSellQuantity = "1";
    const goldSellDate = "03/01/2026";
    const goldSellTime = "00:00";

    await assetPage.fillGoldTransactionForm(
      goldSellDate,
      goldSellTime,
      goldSellPrice,
      goldSellQuantity,
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickCloseModalButton();

    await page.reload();
    await page.waitForTimeout(2000);

    const goldTest1PricePerUnit: string =
      (await assetPage.getRecentPricePerUnit(0, "gold")) as string;
    const goldTest2PricePerUnit: string =
      (await assetPage.getRecentPricePerUnit(1, "gold")) as string;

    await navBar.clickStock();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(1);
    await assetPage.clickStockFundTransaction("sell");

    const stockSellPricePerUnit = "200";
    const stockSellQuantity = "100";
    const stockSellDate = "03/01/2026";
    const stockSellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      stockSellDate,
      stockSellTime,
      stockSellPricePerUnit,
      stockSellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);

    await page.reload();
    await page.waitForTimeout(2000);

    const stockTest1PricePerUnit: string =
      (await assetPage.getRecentPricePerUnit(0, "stock")) as string;
    const stockTest2PricePerUnit: string =
      (await assetPage.getRecentPricePerUnit(1, "stock")) as string;

    await navBar.clickFund();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(1);
    await assetPage.clickStockFundTransaction("sell");

    const fundSellNav = "10";
    const fundSellQuantity = "2000";
    const fundSellDate = "03/01/2026";
    const fundSellTime = "00:00";

    await assetPage.fillStockFundTransactionForm(
      fundSellDate,
      fundSellTime,
      fundSellNav,
      fundSellQuantity,
      "sell",
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);

    await page.reload();
    await page.waitForTimeout(2000);

    const fundTest1PricePerUnit: string =
      (await assetPage.getRecentPricePerUnit(0, "fund")) as string;
    const fundTest2PricePerUnit: string =
      (await assetPage.getRecentPricePerUnit(1, "fund")) as string;

    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);

    const netWorth =
      Number(goldTest1PricePerUnit.replace(/,/g, "")) * 2 +
      Number(goldTest2PricePerUnit.replace(/,/g, "")) +
      Number(stockTest1PricePerUnit.replace(/,/g, "")) * 200 +
      Number(stockTest2PricePerUnit.replace(/,/g, "")) * 100 +
      Number(fundTest1PricePerUnit.replace(/,/g, "")) * 2000 +
      Number(fundTest2PricePerUnit.replace(/,/g, "")) * 1000;
    const formattedNetWorth = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(netWorth);
    const unrealized = netWorth - 950000;
    const formattedUnrealized = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized);
    const realized = "-310,000.00";
    const unrealizedPercentage = (unrealized / 950000) * 100;
    let formattedUnrealizedPercentage = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage);
    formattedUnrealizedPercentage = `+${formattedUnrealizedPercentage}%`;
    const realizedPercentage = "-86.11%";

    //test output
    await assetPage.expectNetWorth(
      formattedNetWorth,
      formattedUnrealized,
      realized,
      formattedUnrealizedPercentage,
      realizedPercentage,
    );

    await assetPage.clearData(6);
  });

  test("TEST-AA-143: Ensure the correct of Zero Networth Calculation of All assets in Assets Page", async ({
    navBar,
    assetPage,
    page,
  }) => {
    //test step
    await navBar.clickAllAssets();
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

  test("TEST-AA-144: Ensure the correct of data of Gold Table in Assets Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickGoldButton();

    const name1 = "ทองคำแท่ง";
    const purity1 = "96.50%";
    const entity1 = "ส่วนตัว";
    const description1 = "test1";
    const date1 = "01/01/2026";
    const time1 = "00:00";
    const price1 = "20000";
    const quantity1 = "2.00";

    await importPage.fillGoldImportForm(
      entity1,
      description1,
      date1,
      time1,
      name1,
      price1,
      purity1,
      quantity1,
    );
    await importPage.clickSaveButton();

    const name2 = "ทองคำรูปพรรณ";
    const purity2 = "96.50%";
    const entity2 = "ส่วนตัว";
    const description2 = "test2";
    const date2 = "02/01/2026";
    const time2 = "00:00";
    const price2 = "100000";
    const quantity2 = "2.00";

    await importPage.fillGoldImportForm(
      entity2,
      description2,
      date2,
      time2,
      name2,
      price2,
      purity2,
      quantity2,
    );
    await importPage.clickSaveButton();

    await navBar.clickGold();
    await page.waitForTimeout(2000);

    const pricePerUnit1: string = (await assetPage.getRecentPricePerUnit(
      0,
      "gold",
    )) as string;
    const pricePerUnit2: string = (await assetPage.getRecentPricePerUnit(
      1,
      "gold",
    )) as string;

    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);

    const networth1 = Number(pricePerUnit1.replace(/,/g, "")) * 2;
    const formattedNetWorth1 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(networth1);
    const networth2 = Number(pricePerUnit2.replace(/,/g, "")) * 2;
    const formattedNetWorth2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(networth2);

    const formattedCost1 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price1);
    const formattedCost2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price2);

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

    const unrealized2 = networth2 - 100000;
    const formattedUnrealized2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized2);
    const unrealizedPercentage2 = (unrealized2 / 100000) * 100;
    let formattedUnrealizedPercentage2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage2);

    //test output
    await assetPage.expectGoldTable(
      10,
      entity1,
      `${name1} ${purity1}`,
      quantity1,
      pricePerUnit1,
      formattedNetWorth1,
      formattedCost1,
      `+${formattedUnrealized1}(+${formattedUnrealizedPercentage1}%)`,
      0,
    );

    await assetPage.expectGoldTable(
      10,
      entity2,
      `${name2} ${purity2}`,
      quantity2,
      pricePerUnit2,
      formattedNetWorth2,
      formattedCost2,
      `+${formattedUnrealized2}(+${formattedUnrealizedPercentage2}%)`,
      1,
    );

    await assetPage.clearData(2);
  });

  test("TEST-AA-145: Ensure the correct of data of Stock Table in Assets Page", async ({
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

    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);

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

  test("TEST-AA-146: Ensure the correct of data of Fund Table in Assets Page", async ({
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

    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);

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
      19,
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
      19,
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

  test("TEST-AA-147: Ensure the usable of Add Assets Button of Gold Table in Assets Page", async ({
    navBar,
    assetPage,
    page,
  }) => {
    //test step
    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);
    await assetPage.clickImportButton(1);

    //test output
    await assetPage.expectModal();
  });

  test("TEST-AA-148: Ensure the usable of Add Assets Button of Stock Table in Assets Page", async ({
    navBar,
    assetPage,
    page,
  }) => {
    //test step
    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);
    await assetPage.clickImportButton(0);

    //test output
    await assetPage.expectModal();
  });

  test("TEST-AA-149: Ensure the usable of Add Assets Button of Fund Table in Assets Page", async ({
    navBar,
    assetPage,
    page,
  }) => {
    //test step
    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);
    await assetPage.clickImportButton(2);

    //test output
    await assetPage.expectModal();
  });

  test("TEST-AA-150: Ensure delete gold asset successfully in Assets Page", async ({
    navBar,
    assetPage,
    importPage,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickGoldButton();

    let name = "ทองคำแท่ง";
    let purity = "96.50%";
    let entity = "ส่วนตัว";
    let description = "test";
    let date = "01/01/2026";
    let time = "00:00";
    let price = "20000";
    let quantity = "2.00";

    await importPage.fillGoldImportForm(
      entity,
      description,
      date,
      time,
      name,
      price,
      purity,
      quantity,
    );
    await importPage.clickSaveButton();

    await navBar.clickAllAssets();
    await assetPage.clickDeleteAsset(0);

    //test output
    await assetPage.expectNoData();
  });

  test("TEST-AA-151: Ensure delete stock asset successfully in Assets Page", async ({
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

    await navBar.clickAllAssets();
    await assetPage.clickDeleteAsset(0);

    //test output
    await assetPage.expectNoData();
  });

  test("TEST-AA-152: Ensure delete fund asset successfully in Assets Page", async ({
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

    await navBar.clickAllAssets();
    await assetPage.clickDeleteAsset(0);

    //test output
    await assetPage.expectNoData();
  });
});
