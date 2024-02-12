import { type Page } from '@playwright/test';
import { locators, auth_url } from '../../helpers/constants/auth';
import { step } from '../../helpers/decorators/allure';

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
  }

  @step('Открыть страницу авторизации')
  async open() {
    await this.page.goto(auth_url);
  }

  @step('Заполнить логин')
  async fillUsername(username) {
    await this.page.fill(this.username, username);
    
  }

  @step('Заполнить пароль')
  async fillPassword(password) {
    await this.page.fill(this.password, password);
    
  }

  @step('Нажать на кнопку Войти')
  async clickButton() {
    await this.page.click(locators.loginButton);
    
  }

  @step('Полностью заполнить форму $0 : $1')
  async submitForm(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickButton();
  }

  async  saveSession(page: Page, filePath: string): Promise<void> {
    const contextState = await page.context().storageState();
    const file = require('fs').promises;
    await file.writeFile(filePath, JSON.stringify(contextState));
}

}