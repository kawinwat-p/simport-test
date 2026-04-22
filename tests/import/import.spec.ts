import { test } from "../../fixture.js";

test.describe("Import", () => {
  const URL = process.env.URL || "";
  const EMAIL = process.env.EMAIL || "";
  const PASSWORD = process.env.PASSWORD || "";

  test.beforeEach(async ({ navBar, finnomenaPage, assetPage, page }) => {
    await page.goto(URL);
    await navBar.clickSignIn();
    await finnomenaPage.signIn(EMAIL, PASSWORD);
    await navBar.clickAllAssets();
    await page.waitForTimeout(2000);
    await assetPage.clearData();
    await navBar.clickImport();
  });

  test("TEST-IP-01: Display Import Page", async ({ importPage }) => {
    //test step

    //test output
    await importPage.expectImportPage();
  });

  test("TEST-IP-02: Display Stock Import Form", async ({ importPage }) => {
    //test step
    await importPage.clickStockButton();

    //test output
    await importPage.expectStockImportForm();
  });

  test("TEST-IP-03: Display Gold Import Form", async ({ importPage }) => {
    //test step
    await importPage.clickGoldButton();

    //test output
    await importPage.expectGoldImportForm();
  });

  test("TEST-IP-04: Display Fund Import Form", async ({ importPage }) => {
    //test step
    await importPage.clickFundButton();

    //test output
    await importPage.expectFundImportForm();
  });

  test("TEST-IP-05: Display AI Import Uploader", async ({ importPage }) => {
    //test step
    await importPage.clickAIImportButton();

    //test output
    await importPage.expectAIUploader();
  });

  test("TEST-IP-06: Display the form after upload with AI", async ({
    importPage,
  }) => {
    //test step
    await importPage.clickAIImportButton();
    await importPage.clickFundButton();
    await importPage.uploadFile("./tests-image/fund_ocr.png");

    //test output
    await importPage.expectAIImportFormPage();
    await importPage.expectAIImportForm(0, "fund");
  });

  test("TEST-IP-07: Ensure import Gold Asset successfully", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    const pricePerUnit: string = (await assetPage.getRecentPricePerUnit(
      0,
      "gold",
    )) as string;

    const networth = Number(pricePerUnit.replace(/,/g, "")) * 2;
    const formattedNetWorth = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(networth);

    const formattedCost = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

    const unrealized = networth - 20000;
    const formattedUnrealized = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized);
    const unrealizedPercentage = (unrealized / 20000) * 100;
    let formattedUnrealizedPercentage = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage);

    //test output
    await assetPage.expectGoldTable(
      0,
      entity,
      `${name} ${purity}`,
      quantity,
      pricePerUnit,
      formattedNetWorth,
      formattedCost,
      `${unrealized > 0 ? "+" : ""}${formattedUnrealized}(${unrealizedPercentage > 0 ? "+" : ""}${formattedUnrealizedPercentage}%)`,
      0,
    );

    await assetPage.clearData(1);
  });

  test("TEST-IP-08: Prevent import Gold Asset when user already has the asset", async ({
    importPage,
  }) => {
    //test step
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
    await importPage.clickErrorSaveButton();

    //test output
    await importPage.expectImportError();
  });

  test("TEST-IP-09: Ensure import Stock Asset successfully", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await importPage.clickStockButton();

    const name = "NVDA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const pricePerUnit = "200";
    const quantity = "200";

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

    const recentPricePerUnit: string = (await assetPage.getRecentPricePerUnit(
      0,
      "stock",
    )) as string;

    const networth = Number(recentPricePerUnit.replace(/,/g, "")) * 200;
    const formattedNetWorth = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(networth);

    const formattedCost = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(40000);

    const unrealized = networth - 40000;
    const formattedUnrealized = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized);
    const unrealizedPercentage = (unrealized / 40000) * 100;
    let formattedUnrealizedPercentage = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage);

    //test output
    await assetPage.expectStockTable(
      0,
      "ส่วนตัว",
      "NVDA",
      "200.00",
      recentPricePerUnit,
      formattedNetWorth,
      formattedCost,
      "200.00",
      `${unrealized > 0 ? "+" : ""}${formattedUnrealized}(${unrealizedPercentage > 0 ? "+" : ""}${formattedUnrealizedPercentage}%)`,
      0,
    );

    await assetPage.clearData(1);
  });

  test("TEST-IP-10: Prevent import Stock Asset when user already has the asset", async ({
    importPage,
  }) => {
    //test step
    await importPage.clickStockButton();

    const name = "NVDA";
    const entity = "ส่วนตัว";
    const description = "test1";
    const date = "01/01/2026";
    const time = "00:00";
    const pricePerUnit = "200";
    const quantity = "200";

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

    await importPage.fillStockImportForm(
      entity,
      description,
      date,
      time,
      name,
      pricePerUnit,
      quantity,
    );
    await importPage.clickErrorSaveButton();

    //test output
    await importPage.expectImportError();
  });

  test("TEST-IP-11: Ensure import Fund Asset successfully", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
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

    await navBar.clickFund();
    await page.waitForTimeout(2000);

    const pricePerUnit: string = (await assetPage.getRecentPricePerUnit(
      0,
      "fund",
    )) as string;

    const networth = Number(pricePerUnit.replace(/,/g, "")) * 2000;
    const formattedNetWorth = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(networth);

    const formattedCost = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(20000);

    const unrealized = networth - 20000;
    const formattedUnrealized = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized);
    const unrealizedPercentage = (unrealized / 20000) * 100;
    let formattedUnrealizedPercentage = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage);

    //test output
    await assetPage.expectFundTable(
      0,
      "ส่วนตัว",
      "K-ASIA",
      "2,000.00",
      pricePerUnit,
      formattedNetWorth,
      formattedCost,
      "10.00",
      `${unrealized > 0 ? "+" : ""}${formattedUnrealized}(${unrealizedPercentage > 0 ? "+" : ""}${formattedUnrealizedPercentage}%)`,
      0,
    );

    await assetPage.clearData(1);
  });

  test("TEST-IP-12: Prevent import Fund Asset when user already has the asset", async ({
    importPage,
  }) => {
    //test step
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

    await importPage.fillFundImportForm(
      entity,
      description,
      date,
      time,
      name,
      nav,
      quantity,
    );
    await importPage.clickErrorSaveButton();

    //test output
    await importPage.expectImportError();
  });

  test("TEST-IP-13: Ensure the precision of OCR in AI Import", async ({
    importPage,
  }) => {
    //test step
    await importPage.clickAIImportButton();
    await importPage.clickFundButton();
    await importPage.uploadFile("./tests-image/fund_ocr.png");

    //test output
    await importPage.expectAIImportFormPage();
    await importPage.expectAIImportForm(
      0,
      "fund",
      "16/01/2026",
      "00:00",
      "ASP-DEFENSE",
      "11.3393",
      "440.94",
    );

    await importPage.expectAIImportForm(
      1,
      "fund",
      "19/01/2026",
      "00:00",
      "LHGBLOCK-A",
      "13.7297",
      "364.17",
    );
  });

  test("TEST-IP-14: Ensure the functionality of import again button after Import with AI", async ({
    importPage,
  }) => {
    //test step
    await importPage.clickAIImportButton();
    await importPage.clickFundButton();
    await importPage.uploadFile("./tests-image/fund_ocr.png");
    await importPage.clickImportAgainButton();

    //test output
    await importPage.expectAIUploader();
  });

  test("TEST-IP-15: Ensure the functionality of delete preview asset button after Import with AI", async ({
    importPage,
  }) => {
    //test step
    await importPage.clickAIImportButton();
    await importPage.clickFundButton();
    await importPage.uploadFile("./tests-image/fund_ocr.png");
    await importPage.clickDeleteButton(0);

    //test output
    await importPage.expectAIImportForm(
      0,
      "fund",
      "19/01/2026",
      "00:00",
      "LHGBLOCK-A",
      "13.7297",
      "364.17",
    );
  });

  test("TEST-IP-16: Ensure the functionality of Add preview asset after Import with AI", async ({
    importPage,
  }) => {
    //test step
    await importPage.clickAIImportButton();
    await importPage.clickFundButton();
    await importPage.uploadFile("./tests-image/fund_ocr.png");
    await importPage.clickAddButton();

    //test output
    await importPage.expectAIImportForm(2, "fund", "", "", "", "", "");
  });

  test("TEST-IP-17: Ensure import stock asset with AI successfully", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await importPage.clickAIImportButton();
    await importPage.uploadFile("./tests-image/stock_ocr.png");
    await importPage.fillAIImportForm(0, "ส่วนตัว", "test");
    await importPage.fillAIImportForm(1, "ส่วนตัว", "test");
    await importPage.fillAIImportForm(2, "ส่วนตัว", "test");
    await importPage.clickSaveButton();

    await navBar.clickStock();
    await page.waitForTimeout(2000);

    const pricePerUnit1: string = (await assetPage.getRecentPricePerUnit(
      0,
      "stock",
    )) as string;
    const pricePerUnit2: string = (await assetPage.getRecentPricePerUnit(
      1,
      "stock",
    )) as string;
    const pricePerUnit3: string = (await assetPage.getRecentPricePerUnit(
      2,
      "stock",
    )) as string;

    const netWorth1 = Number(pricePerUnit1.replace(/,/g, "")) * 527;
    const formattedNetWorth1 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(netWorth1);

    const netWorth2 = Number(pricePerUnit2.replace(/,/g, "")) * 605;
    const formattedNetWorth2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(netWorth2);

    const netWorth3 = Number(pricePerUnit3.replace(/,/g, "")) * 825;
    const formattedNetWorth3 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(netWorth3);

    const unrealized1 = netWorth1 - 1011.84;
    const formattedUnrealized1 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized1);
    const unrealizedPercentage1 = (unrealized1 / 1011.84) * 100;
    let formattedUnrealizedPercentage1 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage1);

    const unrealized2 = netWorth2 - 39095.1;
    const formattedUnrealized2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized2);
    const unrealizedPercentage2 = (unrealized2 / 39095.1) * 100;
    let formattedUnrealizedPercentage2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage2);

    const unrealized3 = netWorth3 - 98340;
    const formattedUnrealized3 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized3);
    const unrealizedPercentage3 = (unrealized3 / 98340) * 100;
    let formattedUnrealizedPercentage3 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage3);

    //test output
    await assetPage.expectStockTable(
      0,
      "ส่วนตัว",
      "IRPC",
      "527.00",
      pricePerUnit1,
      formattedNetWorth1,
      "1011.84",
      "1.92",
      `${unrealized1 > 0 ? "+" : ""}${formattedUnrealized1} (${unrealizedPercentage1 > 0 ? "+" : ""}${formattedUnrealizedPercentage1}%)`,
      0,
    );

    await assetPage.expectStockTable(
      0,
      "ส่วนตัว",
      "KEX",
      "605.00",
      pricePerUnit2,
      formattedNetWorth2,
      "39095.10",
      "64.62",
      `${unrealized2 > 0 ? "+" : ""}${formattedUnrealized2} (${unrealizedPercentage2 > 0 ? "+" : ""}${formattedUnrealizedPercentage2}%)`,
      1,
    );

    await assetPage.expectStockTable(
      0,
      "ส่วนตัว",
      "SCB",
      "825.00",
      pricePerUnit3,
      formattedNetWorth3,
      "98340.00",
      "119.20",
      `${unrealized3 > 0 ? "+" : ""}${formattedUnrealized3} (${unrealizedPercentage3 > 0 ? "+" : ""}${formattedUnrealizedPercentage3}%)`,
      2,
    );

    await assetPage.clearData(3);
  });

  test("TEST-IP-18: Prevent import stock asset with AI when user already has the import asset", async ({
    importPage,
  }) => {
    //test step
    await importPage.clickAIImportButton();
    await importPage.uploadFile("./tests-image/stock_ocr.png");
    await importPage.fillAIImportForm(0, "ส่วนตัว", "test");
    await importPage.fillAIImportForm(1, "ส่วนตัว", "test");
    await importPage.fillAIImportForm(2, "ส่วนตัว", "test");
    await importPage.clickSaveButton();

    await importPage.clickAIImportButton();
    await importPage.uploadFile("./tests-image/stock_ocr.png");
    await importPage.fillAIImportForm(0, "ส่วนตัว", "test");
    await importPage.fillAIImportForm(1, "ส่วนตัว", "test");
    await importPage.fillAIImportForm(2, "ส่วนตัว", "test");
    await importPage.clickErrorSaveButton();

    //test output
    await importPage.expectImportError();
  });

  test("TEST-IP-19: Ensure import fund asset with AI successfully", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await importPage.clickAIImportButton();
    await importPage.clickFundButton();
    await importPage.uploadFile("./tests-image/fund_ocr.png");
    await importPage.fillAIImportForm(0, "ส่วนตัว", "test");
    await importPage.fillAIImportForm(1, "ส่วนตัว", "test");
    await importPage.clickSaveButton();

    await navBar.clickFund();
    await page.waitForTimeout(2000);

    const pricePerUnit1: string = (await assetPage.getRecentPricePerUnit(
      0,
      "fund",
    )) as string;
    const pricePerUnit2: string = (await assetPage.getRecentPricePerUnit(
      1,
      "fund",
    )) as string;

    const netWorth1 = Number(pricePerUnit1.replace(/,/g, "")) * 440.94;
    const formattedNetWorth1 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(netWorth1);

    const netWorth2 = Number(pricePerUnit2.replace(/,/g, "")) * 364.17;
    const formattedNetWorth2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(netWorth2);

    const unrealized1 = netWorth1 - 4999.95;
    const formattedUnrealized1 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized1);
    const unrealizedPercentage1 = (unrealized1 / 4999.95) * 100;
    let formattedUnrealizedPercentage1 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage1);

    const unrealized2 = netWorth2 - 4999.94;
    const formattedUnrealized2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized2);
    const unrealizedPercentage2 = (unrealized2 / 4999.94) * 100;
    let formattedUnrealizedPercentage2 = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage2);

    //test output
    await assetPage.expectFundTable(
      0,
      "ส่วนตัว",
      "ASP-DEFENSE",
      "440.94",
      pricePerUnit1,
      formattedNetWorth1,
      "4999.95",
      "11.3393",
      `${unrealized1 > 0 ? "+" : ""}${formattedUnrealized1} (${unrealizedPercentage1 > 0 ? "+" : ""}${formattedUnrealizedPercentage1}%)`,
      0,
    );

    await assetPage.expectFundTable(
      0,
      "ส่วนตัว",
      "LHGBLOCK-A",
      "364.17",
      pricePerUnit2,
      formattedNetWorth2,
      "4999.94",
      "13.7297",
      `${unrealized2 > 0 ? "+" : ""}${formattedUnrealized2} (${unrealizedPercentage2 > 0 ? "+" : ""}${formattedUnrealizedPercentage2}%)`,
      1,
    );

    await assetPage.clearData(2);
  });

  test("TEST-IP-20: Prevent import fund asset with AI when user already has the import asset", async ({
    importPage,
  }) => {
    //test step
    await importPage.clickAIImportButton();
    await importPage.clickFundButton();
    await importPage.uploadFile("./tests-image/fund_ocr.png");
    await importPage.fillAIImportForm(0, "ส่วนตัว", "test");
    await importPage.fillAIImportForm(1, "ส่วนตัว", "test");
    await importPage.fillAIImportForm(2, "ส่วนตัว", "test");
    await importPage.clickSaveButton();

    await importPage.clickAIImportButton();
    await importPage.clickFundButton();
    await importPage.uploadFile("./tests-image/fund_ocr.png");
    await importPage.fillAIImportForm(0, "ส่วนตัว", "test");
    await importPage.fillAIImportForm(1, "ส่วนตัว", "test");
    await importPage.fillAIImportForm(2, "ส่วนตัว", "test");
    await importPage.clickErrorSaveButton();

    //test output
    await importPage.expectImportError();
  });
});
