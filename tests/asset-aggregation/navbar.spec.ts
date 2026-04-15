import { test } from "../../fixture.js";

test.describe("Asset Aggregation - Navbar", () => {
  const URL = process.env.URL || "";
  const EMAIL = process.env.EMAIL || "";
  const PASSWORD = process.env.PASSWORD || "";

  test("TEST-AA-01: Display Navigation bar", async ({
    navBar,
    finnomenaPage,
    page,
  }) => {
    //test step
    await page.goto(URL);
    await navBar.clickSignIn();
    await finnomenaPage.signIn(EMAIL, PASSWORD);

    //test output
    await navBar.expectAllAssetsMenu();
    await navBar.expectStockMenu();
    await navBar.expectGoldMenu();
    await navBar.expectFundMenu();
    await navBar.expectImportMenu();
  });

  test("TEST-AA-51: Click Assets Button In Navbar", async ({
    navBar,
    finnomenaPage,
    assetPage,
    page,
  }) => {
    //test step
    await page.goto(URL);
    await navBar.clickSignIn();
    await finnomenaPage.signIn(EMAIL, PASSWORD);
    await navBar.clickAllAssets();

    //test output
    await assetPage.expectAllAssetsPage();
  });

  test("TEST-AA-52: Click Stock Button In Navbar", async ({
    navBar,
    finnomenaPage,
    stockPage,
    page,
  }) => {
    //test step
    await page.goto(URL);
    await navBar.clickSignIn();
    await finnomenaPage.signIn(EMAIL, PASSWORD);
    await navBar.clickStock();

    //test output
    await stockPage.expectStockPage();
  });

  test("TEST-AA-53: Click Gold Button In Navbar", async ({
    navBar,
    finnomenaPage,
    goldPage,
    page,
  }) => {
    //test step
    await page.goto(URL);
    await navBar.clickSignIn();
    await finnomenaPage.signIn(EMAIL, PASSWORD);
    await navBar.clickGold();

    //test output
    await goldPage.expectGoldPage();
  });

  test("TEST-AA-54: Click Fund Button In Navbar", async ({
    navBar,
    finnomenaPage,
    fundPage,
    page,
  }) => {
    //test step
    await page.goto(URL);
    await navBar.clickSignIn();
    await finnomenaPage.signIn(EMAIL, PASSWORD);
    await navBar.clickFund();

    //test output
    await fundPage.expectFundPage();
  });

  test("TEST-AA-55: Click Import Button In Navbar", async ({
    navBar,
    finnomenaPage,
    importPage,
    page,
  }) => {
    //test step
    await page.goto(URL);
    await navBar.clickSignIn();
    await finnomenaPage.signIn(EMAIL, PASSWORD);
    await navBar.clickImport();

    //test output
    await importPage.expectImportPage();
  });
});
