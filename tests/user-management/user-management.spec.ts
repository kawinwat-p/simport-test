import { expect, test } from "../../fixture.js";

test.describe("User Management", () => {
  const URL = process.env.URL || "";
  const EMAIL = process.env.EMAIL || "";
  const PASSWORD = process.env.PASSWORD || "";

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
    await page.goto(`${URL}/assets/gold`);

    //test output
    await expect(page.getByText("เข้าสู่ระบบไม่สำเร็จ")).toBeVisible();
  });

  test("should allow user to log in and log out", async ({
    navBar,
    finnomenaPage,
    page,
  }) => {
    // Navigate to the home page
    await page.goto(URL);

    // Click the Sign In button
    await navBar.clickSignIn();

    // Enter email and password
    await finnomenaPage.signIn(EMAIL, PASSWORD);

    // Assert that the user is logged in
    await navBar.expectLoggedIn();

    // Click the "ออกจากระบบ" button
    await navBar.logout();

    // Assert that the user is logged out
    await navBar.expectLoggedOut();
  });
});
