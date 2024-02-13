import { type Page } from '@playwright/test';
import { locators, auth_url, stage_url } from '../../helpers/constants/auth';
import { step } from '../../helpers/decorators/allure';

type Locator = string;

export class AuthPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly pplink: Locator
  readonly base_url: String
  readonly showcase: Locator

  constructor(page: Page) {
    this.page = page;
    this.username = locators.username;
    this.password = locators.password;
    this.loginButton = locators.loginButton;
    this.showcase = locators.showcase;
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
    await this.page.waitForSelector(this.showcase);
    
  }

  @step('Получить сессию со стенда')
  async goToStage() {
    await this.page.goto(stage_url);
  }

  async  saveSession(page: Page, filePath: string): Promise<void> {
    const contextState = await page.context().storageState();
    const file = require('fs').promises;
    await file.writeFile(filePath, JSON.stringify(contextState));
}

}