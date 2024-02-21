import { type Page } from '@playwright/test';
import * as fs from 'fs'
import { base_url, filesDirectory, locators } from '../../helpers/constants/production_plan';
import { step } from '../../helpers/decorators/allure';
import { expect } from '@playwright/test';


type Locator = string;

export class ProdPage {
  readonly page: Page;
  readonly layout: Locator;
  readonly prodplanLink: Locator
  readonly uploadField: Locator
  readonly calculateButton: Locator
  readonly downloadButton: Locator
  readonly modalUploadWindow: Locator
  readonly modalDownloadWindow: Locator

  constructor(page: Page) {
    this.page = page;
    this.uploadField = locators.uploadField
    this.prodplanLink = locators.prodplanLink
    this.calculateButton = locators.calculateButton
    this.downloadButton = locators.downloadButton
    this.modalUploadWindow = locators.modalUploadWindow
    this.modalDownloadWindow = locators.modalDownloadWindow
  }

  @step('Открыть стартовую страницу')
  async open() {
    await this.page.goto(base_url);
    const currentTitle = await this.page.title();
    expect(currentTitle).toBe('S.Plan');
  }

  @step('Перейти на страницу Производственного плана')
  async navigateToProdPlan() {
    await this.page.locator(this.prodplanLink).click()
    const currentUrl = this.page.url();
    expect(currentUrl).toBe(base_url);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

@step('Пользователь загружает файлы')
async loadFiles() {
    const files = fs.readdirSync(filesDirectory).map(file => `${filesDirectory}/${file}`);
      
    let filesUploaded = 0;
    for (let i = 0; i < files.length; i++) {
        const file_path = files[i];
        if (file_path) {
            await this.uploadFile(file_path);
            console.log(`Загружается файл: ${file_path}`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            filesUploaded++;
        } else {
            throw new Error('Недостаточно файлов для загрузки');
        }
    }
    if (filesUploaded < 7) {
        throw new Error('Не все файлы были загружены');
    }
    
}

async uploadFile(file_path: string) { 
  const inputFile = await this.page.$(this.uploadField);
  if (inputFile) {
      await inputFile.setInputFiles(file_path);
      await Promise.all([
          this.page.waitForLoadState('load'),
          this.page.waitForResponse(response => response.status() === 200)
      ]);
   }
}

  @step('Пользователь нажимает кнопку Запустить расчет')
  async clickToCalculate() {
    await this.page.locator(this.calculateButton).click()
    await expect(this.page.locator(this.modalUploadWindow)).toBeVisible({timeout: 10000})
  }

  @step('Пользователь нажимает кнопку Скачать')
  async clickToDownloadFiles() {
    await this.page.waitForSelector(this.modalDownloadWindow);
    await this.page.locator(this.downloadButton).click()
  }

  @step('Открытие главной страницы Производственного плана')
  async openProdPlan() {
    await this.open()
    await this.navigateToProdPlan()
  }

  @step('Загрузка файлов')
  async uploadFiles() {
    await this.loadFiles()
  }

  @step('Запуск расчета Производственного плана')
  async calculateProdPlan() {
    await this.clickToCalculate()
  }

  @step('Скачивание файлов перерасчета')
  async downloadFiles() {
    await this.clickToDownloadFiles()
  }

}
