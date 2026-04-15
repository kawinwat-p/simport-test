import { test } from "../../fixture.js";

test.describe("Asset Aggregation - Gold", () => {
  const URL = process.env.URL || "";
  const EMAIL = process.env.EMAIL || "";
  const PASSWORD = process.env.PASSWORD || "";

  test.afterEach(async ({ goldPage }) => {
    await goldPage.clearGoldData();
  });

  test("TEST-AA-02: Display Networth and Profit in Gold Page", async ({
    navBar,
    finnomenaPage,
    goldPage,
    importPage,
    page,
  }) => {
    //test step
    await page.goto(URL);
    await navBar.clickSignIn();
    await finnomenaPage.signIn(EMAIL, PASSWORD);
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
    await page.goto(`${URL}/assets/gold`);
    await page.waitForTimeout(2000);

    //test output
    await goldPage.expectNetWorth();
  });
});
