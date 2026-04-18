import { expect, test } from "../../fixture.js";

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

  test("TEST-AA-70: Ensure the correct of Zero Networth Calculation of Gold assets in Gold Page", async ({
    navBar,
    assetPage,
    page,
  }) => {
    //test step
    await navBar.clickGold();
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

  test("TEST-AA-73: Ensure the correct of data of Gold Table in Gold Page", async ({
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
    )) as string;
    const pricePerUnit2: string = (await assetPage.getRecentPricePerUnit(
      1,
    )) as string;

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
      entity2,
      `${name2} ${purity2}`,
      quantity2,
      pricePerUnit2,
      formattedNetWorth2,
      formattedCost2,
      `+${formattedUnrealized2}(+${formattedUnrealizedPercentage2}%)`,
      1,
    );
  });

  test("TEST-AA-74: Ensure the correct of data of Gold Table when there is no transaction in Gold Page", async ({
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
    await assetPage.clickCloseModalButton();

    const pricePerUnit = (await assetPage.getRecentPricePerUnit(0)) as string;

    //test output
    await assetPage.expectGoldTable(
      entity,
      `${name} ${purity}`,
      "0.00",
      pricePerUnit,
      "0.00",
      "0.00",
      "+0.00(+0.00%)",
      0,
    );
  });

  test("TEST-AA-75: Ensure the usable of Add Assets Button of Gold Table in Gold Page", async ({
    navBar,
    assetPage,
    page,
  }) => {
    //test step
    await navBar.clickGold();
    await page.waitForTimeout(2000);
    await assetPage.clickImportButton();

    //test output
    await assetPage.expectModal();
  });

  test("TEST-AA-76: Ensure convert bullion from gram to baht of Gold Calculator in Gold Page", async ({
    navBar,
    assetPage,
    page,
  }) => {
    //test step
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.fillGoldCalculator("1", false, false);

    //test output
    await assetPage.expectGoldCalculator("0.07");
  });

  test("TEST-AA-77: Ensure convert bullion from baht to gram of Gold Calculator in Gold Page", async ({
    navBar,
    assetPage,
    page,
  }) => {
    //test step
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.fillGoldCalculator("1", true, false);

    //test output
    await assetPage.expectGoldCalculator("15.24");
  });

  test("TEST-AA-78: Ensure convert ornament from gram to baht of Gold Calculator in Gold Page", async ({
    navBar,
    assetPage,
    page,
  }) => {
    //test step
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.fillGoldCalculator("1", false, true);

    //test output
    await assetPage.expectGoldCalculator("0.07");
  });

  test("TEST-AA-79: Ensure convert ornament from baht to gram of Gold Calculator in Gold Page", async ({
    navBar,
    assetPage,
    page,
  }) => {
    //test step
    await navBar.clickGold();
    await page.waitForTimeout(2000);

    await assetPage.fillGoldCalculator("1", true, true);

    //test output
    await assetPage.expectGoldCalculator("15.16");
  });

  test("TEST-AA-80: Ensure the correct of data of Gold Transaction Table in Gold Detail Page", async ({
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
    let price = "30000";
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

    await navBar.clickGold();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickTransaction("sell");

    const sellPrice = "5000";
    const sellQuantity = "1.00";
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
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectGoldTransactionTable(
      `${sellDate} ${sellTime}`,
      "ขาย",
      "-1.00",
      "5,000.00",
      "-5,000.00",
      "-10,000.00",
      "01/01/26(30,000.00)",
      0,
    );

    await assetPage.expectGoldTransactionTable(
      `${date} ${time}`,
      "ซื้อ",
      "2.00",
      "15,000.00",
      "30,000.00",
      "-",
      "-",
      1,
    );

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-81: Ensure create Gold Buying Transaction in Gold Transaction Page", async ({
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
    let price = "30000";
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

    await navBar.clickGold();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickTransaction("buy");

    const buyPrice = "10000";
    const buyQuantity = "1.00";
    const buyDate = "03/01/2026";
    const buyTime = "00:00";

    await assetPage.fillTransactionForm(
      buyDate,
      buyTime,
      buyPrice,
      buyQuantity,
    );
    await assetPage.clickSaveTransactionButton();
    await page.waitForTimeout(2000);
    await assetPage.clickCloseModalButton();
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectGoldTransactionTable(
      `${buyDate} ${buyTime}`,
      "ซื้อ",
      "1.00",
      "10,000.00",
      "10,000.00",
      "-",
      "-",
      0,
    );

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-82: Ensure show the correct data of buying date and cost when selling a gold asset", async ({
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
    let price = "30000";
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

    await navBar.clickGold();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickTransaction("sell");

    //test output
    await expect(
      page.getByText("กำลังขายธุรกรรมของวันที่ 01/01/2026 (15,000.00 บาท)"),
    ).toBeVisible();

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });

  test("TEST-AA-83: Ensure create Gold Selling Transaction in Gold Transaction Page", async ({
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
    let price = "30000";
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

    await navBar.clickGold();
    await page.waitForTimeout(2000);
    await assetPage.clickTransactionPage(0);
    await assetPage.clickTransaction("sell");

    const sellPrice = "5000";
    const sellQuantity = "1.00";
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
    await assetPage.clickDetailPage(0);
    await page.waitForTimeout(2000);

    //test output
    await assetPage.expectGoldTransactionTable(
      `${sellDate} ${sellTime}`,
      "ขาย",
      "-1.00",
      "5,000.00",
      "-5,000.00",
      "-10,000.00",
      "01/01/26(30,000.00)",
      0,
    );

    await assetPage.clickCloseModalButton();
    await assetPage.clearData(1);
  });
});
