import { test } from "../../fixture.js";

test.describe("Asset Aggregation - Gold", () => {
  const URL = process.env.URL || "";
  const EMAIL = process.env.EMAIL || "";
  const PASSWORD = process.env.PASSWORD || "";

  test.beforeEach(async ({ assetPage, navBar, finnomenaPage, page }) => {
    await page.goto(URL);
    await navBar.clickSignIn();
    await finnomenaPage.signIn(EMAIL, PASSWORD);
    await navBar.clickGold();
    await page.waitForTimeout(2000);
    await assetPage.clearData();
  });

  test("TEST-AA-02: Display Networth and Profit in Gold Page", async ({
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectNetWorth();

    await assetPage.clearData(1);
  });

  test("TEST-AA-03: Display Gold Graph in Gold Page", async ({
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectGraph();

    await assetPage.clearData(1);
  });

  test("TEST-AA-04: Display Gold Table in Gold Page", async ({
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectGoldTable();

    await assetPage.clearData(1);
  });

  test("TEST-AA-05: Display Empty Asset Message to inform user when there is no gold asset in Gold Page ", async ({
    assetPage,
  }) => {
    //test step

    //test output
    await assetPage.expectNoData();
  });

  test("TEST-AA-06: Display Gold Calculator in Gold Page", async ({
    assetPage,
  }) => {
    //test step

    //test output
    await assetPage.expectGoldCalculator();
  });

  test("TEST-AA-07: Display Gold Detail Page", async ({
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);

    //test output
    await assetPage.expectDetailPage();
    await assetPage.expectGoldTransactionTable();
    await assetPage.clickCloseModalButton();
    await page.waitForTimeout(1000);

    await assetPage.clearData(1);
  });

  test("TEST-AA-08: Display Empty Transaction Message to inform user when there is no gold transaction in Gold Detail Page", async ({
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);
    await assetPage.clickDeleteTransaction(0);

    //test output
    await assetPage.expectNoData();
    await assetPage.clickCloseModalButton();

    await assetPage.clearData(1);
  });

  test("TEST-AA-09: Display Gold Detail Menu in Gold Table in Gold Page", async ({
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.clickEllipsisButton(0);

    //test output
    await assetPage.expectDetailMenu();

    await assetPage.clickEllipsisButton(0);
    await assetPage.clearData(1);
  });

  test("TEST-AA-10: Display Create Gold Transaction Menu in Gold Table in Gold Page", async ({
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.clickEllipsisButton(0);

    //test output
    await assetPage.expectTransactionMenu();

    await assetPage.clickEllipsisButton(0);
    await assetPage.clearData(1);
  });

  test("TEST-AA-11: Display Buy Gold Transaction Form", async ({
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.clickTransactionPage(0);
    await assetPage.clickTransaction("buy");

    //test output
    await assetPage.expectBuyingGoldForm();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-12: Display Sell Gold Transaction Form", async ({
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.clickTransactionPage(0);
    await assetPage.clickTransaction("sell");

    //test output
    await assetPage.expectSellingGoldForm();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-13: Display Gold Balance Table in Gold Balance Page", async ({
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.clickTransactionPage(0);

    //test output
    await assetPage.expectBalanceTable();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-14: Display Empty Balance Message to inform user when the balance of all transactions are zero in Gold Balance Page", async ({
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.clickTransactionPage(0);
    await assetPage.clickTransaction("sell");

    const sellPrice = "5000";
    const sellQuantity = "2";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillTransactionForm(
      sellDate,
      sellTime,
      sellPrice,
      sellQuantity,
    );
    await assetPage.clickSaveTransactionButton();

    //test output
    await assetPage.expectNoData();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-15: Display Delete Transaction Menu in Gold Detail Page", async ({
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);
    await assetPage.clickModalEllipsisButton(0);

    //test output
    await assetPage.expectDeleteTransactionMenu();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-16: Display Edit Transaction Menu in Gold Detail Page", async ({
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);
    await assetPage.clickModalEllipsisButton(0);

    //test output
    await assetPage.expectEditTransactionMenu();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-17: Display Delete Transaction Menu in Gold Transaction Page", async ({
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.clickEllipsisButton(0);

    //test output
    await assetPage.expectDeleteAssetMenu();

    await assetPage.clickEllipsisButton(0);
    await assetPage.clearData(1);
  });

  test("TEST-AA-56: Click View Asset Detail in Gold Table in Gold Page", async ({
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.clickDetailPage(0);

    //test output
    await assetPage.expectDetailPage();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-57: Click Transact Button in Gold Table in Gold Page", async ({
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
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.clickTransactionPage(0);

    //test output
    await assetPage.expectBalanceTable();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-68: Ensure the correct of Profit Networth Calculation of Gold assets in Gold Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickGoldButton();

    let name = "ทองคำแท่ง";
    let purity = "96.50%";
    let entity = "ส่วนตัว";
    let description = "test1";
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

    name = "ทองคำรูปพรรณ";
    purity = "96.50%";
    entity = "ส่วนตัว";
    description = "test2";
    date = "02/01/2026";
    time = "00:00";
    price = "30000";
    quantity = "2.00";

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
    await assetPage.clickTransactionPage(1);
    await assetPage.clickTransaction("sell");

    const sellPrice = "20000";
    const sellQuantity = "1";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillTransactionForm(
      sellDate,
      sellTime,
      sellPrice,
      sellQuantity,
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickCloseModalButton();

    await page.reload();
    await page.waitForTimeout(2000);

    const test1PricePerUnit: string = (await assetPage.getRecentPricePerUnit(
      0,
    )) as string;
    const test2PricePerUnit: string = (await assetPage.getRecentPricePerUnit(
      1,
    )) as string;

    const netWorth =
      Number(test1PricePerUnit.replace(/,/g, "")) * 2 +
      Number(test2PricePerUnit.replace(/,/g, ""));
    const formattedNetWorth = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(netWorth);
    const unrealized = netWorth - 35000;
    const formattedUnrealized = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized);
    const realized = "+5,000.00";
    const unrealizedPercentage = (unrealized / 35000) * 100;
    let formattedUnrealizedPercentage = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage);
    formattedUnrealizedPercentage = `+${formattedUnrealizedPercentage}%`;
    const realizedPercentage = "+33.33%";

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

  test("TEST-AA-69: Ensure the correct of Loss Networth Calculation of Gold assets in Gold Page", async ({
    navBar,
    assetPage,
    importPage,
    page,
  }) => {
    //test step
    await navBar.clickImport();
    await importPage.clickManualImportButton();
    await importPage.clickGoldButton();

    let name = "ทองคำแท่ง";
    let purity = "96.50%";
    let entity = "ส่วนตัว";
    let description = "test1";
    let date = "01/01/2026";
    let time = "00:00";
    let price = "200000";
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

    name = "ทองคำรูปพรรณ";
    purity = "96.50%";
    entity = "ส่วนตัว";
    description = "test2";
    date = "02/01/2026";
    time = "00:00";
    price = "300000";
    quantity = "2.00";

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
    await assetPage.clickTransactionPage(1);
    await assetPage.clickTransaction("sell");

    const sellPrice = "10000";
    const sellQuantity = "1";
    const sellDate = "03/01/2026";
    const sellTime = "00:00";

    await assetPage.fillTransactionForm(
      sellDate,
      sellTime,
      sellPrice,
      sellQuantity,
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickCloseModalButton();

    await page.reload();
    await page.waitForTimeout(2000);

    const test1PricePerUnit: string = (await assetPage.getRecentPricePerUnit(
      0,
    )) as string;
    const test2PricePerUnit: string = (await assetPage.getRecentPricePerUnit(
      1,
    )) as string;

    const netWorth =
      Number(test1PricePerUnit.replace(/,/g, "")) * 2 +
      Number(test2PricePerUnit.replace(/,/g, ""));
    const formattedNetWorth = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(netWorth);
    const unrealized = netWorth - 350000;
    const formattedUnrealized = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealized);
    const realized = "-140,000.00";
    const unrealizedPercentage = (unrealized / 350000) * 100;
    let formattedUnrealizedPercentage = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(unrealizedPercentage);
    formattedUnrealizedPercentage = `${formattedUnrealizedPercentage}%`;
    const realizedPercentage = "-93.33%";

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
});
