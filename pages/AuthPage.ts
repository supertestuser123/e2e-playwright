import { expect, type Page } from '@playwright/test';
import { locators, base_url } from '../helpers/constants/auth';

type Locator = string;

export class AuthPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly pplink: Locator
  readonly base_url: String

  constructor(page: Page) {
    this.page = page;
    this.username = locators.username;
    this.password = locators.password;
    this.loginButton = locators.loginButton;
    this.pplink = locators.pplink
  }

  async open() {
    await this.page.goto(base_url);
  }

  async login(username, password) {
    await this.page.fill(this.username, username);
    await this.page.fill(locators.password, password);
    await this.page.click(locators.loginButton);
  }

  async checkTitle() {
    const title = await this.page.title();
    await expect(title).toBe('S.Plan');
  }
}