const { test, expect } = require('@playwright/test');
const AuthPage = require('../pages/AuthPage');

test.describe('Login functionality', () => {
  let page;
  let authPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    authPage = new AuthPage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('User should be able to login successfully', async () => {
    await authPage.open();
    await authPage.login('username', 'password');
    const title = await authPage.getTitle();
    expect(title).toBe('Dashboard'); 
  });
});