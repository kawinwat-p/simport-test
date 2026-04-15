import { expect, test } from "../../fixture.js";

test.describe("User Management", () => {
  const URL = process.env.URL || "";
  const EMAIL = process.env.EMAIL || "";
  const PASSWORD = process.env.PASSWORD || "";

  const REGISTER_EMAIL = process.env.REGISTER_EMAIL || "";
  const REGISTER_PASSWORD = process.env.REGISTER_PASSWORD || "";

  test("TEST-UM-01: Display Sign up button", async ({ navBar, page }) => {
    //test step
    await page.goto(URL);

    //test output
    await navBar.expectSignUpButton();
  });

  test("TEST-UM-02: Display Sign in button", async ({ navBar, page }) => {
    //test step
    await page.goto(URL);

    //test output
    await navBar.expectSignInButton();
  });

  test("TEST-UM-03: Display Logout dropdown", async ({
    navBar,
    finnomenaPage,
    page,
  }) => {
    //test step
    await page.goto(URL);
    await navBar.clickSignIn();
    await finnomenaPage.signIn(EMAIL, PASSWORD);
    await navBar.clickProfileMenu();

    //test output
    await navBar.expectLogOutButton();
  });

  test("TEST-UM-04: Display Login Error Page", async ({ page }) => {
    //test step
    await page.goto(`${URL}/assets`);
    await page.waitForTimeout(2000);

    //test output
    await expect(page.getByText("เข้าสู่ระบบไม่สำเร็จ")).toBeVisible();
  });

  test("TEST-UM-05: Display Cookie Permission", async ({ page }) => {
    //test step
    await page.goto(URL);

    //test output
    await expect(
      page.getByRole("button", { name: "ยอมรับคุกกี้" }),
    ).toBeVisible();
  });

  test("TEST-UM-06: Display 404 Error page", async ({ page }) => {
    //test step
    await page.goto(`${URL}/test`);

    //test output
    await expect(page.getByText("404")).toBeVisible();
  });

  test("TEST-UM-07: Click Sign up button", async ({
    navBar,
    finnomenaPage,
    page,
  }) => {
    //test step
    await page.goto(URL);
    await navBar.clickSignUp();

    //test output
    await finnomenaPage.ExpectSignUpPage();
  });

  test("TEST-UM-08: Click Sign in button", async ({
    navBar,
    finnomenaPage,
    page,
  }) => {
    //test step
    await page.goto(URL);
    await navBar.clickSignIn();

    //test output
    await finnomenaPage.ExpectSignInPage();
  });

  test("TEST-UM-09: Sign up with Finnomena OAuth", async ({
    navBar,
    finnomenaPage,
    page,
  }) => {
    //test step
    await page.goto(URL);
    await navBar.clickSignUp();
    await finnomenaPage.signUp(
      REGISTER_EMAIL,
      REGISTER_PASSWORD,
      REGISTER_PASSWORD,
    );

    //test output
    await navBar.expectLoggedIn();
  });

  test("TEST-UM-10: Sign in with Finnomena OAuth", async ({
    navBar,
    finnomenaPage,
    page,
  }) => {
    //test step
    await page.goto(URL);
    await navBar.clickSignIn();
    await finnomenaPage.signIn(EMAIL, PASSWORD);

    //test output
    await navBar.expectLoggedIn();
  });

  test("TEST-UM-11: Logout", async ({ navBar, finnomenaPage, page }) => {
    //test step
    await page.goto(URL);
    await navBar.clickSignIn();
    await finnomenaPage.signIn(EMAIL, PASSWORD);
    await navBar.logout();

    //test output
    await navBar.expectSignInButton();
  });

  test("TEST-UM-12: Refresh token automatically", async ({
    navBar,
    finnomenaPage,
    assetPage,
    page,
  }) => {
    //test step
    await page.goto(URL);
    await navBar.clickSignIn();
    await finnomenaPage.signIn(EMAIL, PASSWORD);

    const context = page.context();
    const cookies = await context.cookies();
    const filteredCookie = cookies.filter(
      (c) => c.name !== "simport_access_cookie",
    );
    await context.clearCookies();
    await context.addCookies(filteredCookie);

    await page.goto(`${URL}/assets`);

    //test output
    await assetPage.expectAllAssetsPage();
  });

  test("TEST-UM-13: Perform Unauthorized action", async ({ page }) => {
    //test step
    await page.goto(`${URL}/assets`);
    await page.waitForTimeout(2000);

    //test output
    await expect(page.getByText("เข้าสู่ระบบไม่สำเร็จ")).toBeVisible();
  });
});
