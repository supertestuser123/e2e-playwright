import { type Page } from '@playwright/test';
import * as fs from 'fs'
import { base_url, filesDirectory, locators } from '../../helpers/constants/production_plan';
import { step } from '../../helpers/decorators/allure';
import { expect } from '@playwright/test';


type Locator = string;

export class ProdPage {
  readonly page: Page;
  readonly layout: Locator;
  readonly prodplan_link: Locator
  readonly uploadField: Locator

  constructor(page: Page) {
    this.page = page;
    this.uploadField = locators.uploadField
    this.prodplan_link = locators.prodplan_link
  }

  @step('Открыть стартовую страницу')
  async open() {
    await this.page.goto(base_url);
    const currentUrl = this.page.url();
    const currentTitle = await this.page.title();
    expect(currentTitle).toBe('S.Plan');
  }

  @step('Перейти на страницу Производственного плана')
  async navigateToProdPlan() {
    await this.page.locator(this.prodplan_link).click()
  }

  @step('Пользователь загружает файлы')
  async loadFiles() {
      const files = fs.readdirSync(filesDirectory).map(file => `${filesDirectory}/${file}`);
  
      for (const file_path of files) {
          await this.uploadFile(file_path);
          await new Promise(resolve => setTimeout(resolve, 2000));
      }
  }
  
  async uploadFile(file_path: string) {
      const inputFile = await this.page.$(this.uploadField);
      if (inputFile) {
          await inputFile.setInputFiles(file_path);
          await this.page.waitForLoadState('networkidle');
      }
    
}}
