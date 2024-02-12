import { type Page } from '@playwright/test';
import { base_url, locators } from '../../helpers/constants/production_plan';
import { step } from '../../helpers/decorators/allure';
import { expect } from '@playwright/test';

type Locator = string;

export class ProdPage {
  readonly page: Page;
  readonly layout: Locator;
  readonly pp_link: Locator
  constructor(page: Page) {
    this.page = page;
    this.layout = locators.layout
    this.pp_link = locators.pp_link
  }

  @step('Открыть стартовую страницу')
  async open() {
    await this.page.goto(base_url);
  }

  @step('Переход на страницу Производственного плана')
  async navigateToPlan() {
    await this.page.click(this.pp_link);
    const currentUrl = this.page.url();
    const currentTitle = await this.page.title();

    expect(currentUrl).toBe('https://splan-stage.samoletgroup.ru/production-plan');
    expect(currentTitle).toBe('S.Plan');
  }
}