import { test } from "../../fixture.js";

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
});
