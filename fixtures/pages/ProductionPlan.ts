import { type Page } from '@playwright/test';
import * as fs from 'fs'
import { base_url, GoodFilesDirectory, ErrorFilesDirectory, locators, refreshFileName } from '../../helpers/constants/production_plan';
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
  readonly downloadPreviousPlanButton: Locator
  readonly dropdown: Locator
  readonly blackListFile: Locator
  readonly blackListDownloadButton: Locator
  readonly blackListRefreshButton: Locator
  readonly blackListRefreshToastSuccess: Locator
  readonly notAllFilesToastFail: Locator
  readonly errorModalWindow: Locator
  readonly errorOKButton: Locator
  readonly errorNetworkWindow: Locator
  readonly errorNetworkTryAgainButton: Locator
  

  

  constructor(page: Page) {
    this.page = page;
    this.uploadField = locators.uploadField
    this.prodplanLink = locators.prodplanLink
    this.calculateButton = locators.calculateButton
    this.downloadButton = locators.downloadButton
    this.modalUploadWindow = locators.modalUploadWindow
    this.modalDownloadWindow = locators.modalDownloadWindow
    this.downloadPreviousPlanButton = locators.downloadPreviousPlanButton
    this.dropdown = locators.dropdown
    this.blackListFile = locators.blackListFile
    this.blackListDownloadButton = locators.blackListDownloadButton
    this.blackListRefreshButton = locators.blackListRefreshButton
    this.blackListRefreshToastSuccess = locators.blackListRefreshToastSuccess
    this.notAllFilesToastFail = locators.notAllFilesToastFail
    this.errorModalWindow = locators.errorModalWindow
    this.errorOKButton = locators.errorOKButton
    this.errorNetworkWindow = locators.errorNetworkWindow
    this.errorNetworkTryAgainButton = locators.errorNetworkTryAgainButton

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

  @step('Загрузка НЕ ВСЕХ файлов')
  async uploadNotAllFiles() {
    await this.loadNotAllFiles()
  }

  @step('Загрузка ошибочных файлов')
  async uploadErrorFiles() {
    await this.loadErrorFiles()
  }

  @step('Запуск расчета Производственного плана')
  async calculateProdPlan() {
    await this.clickToCalculate()
  }

  @step('Скачивание файлов перерасчета')
  async downloadFiles() {
    await expect(this.page.locator(this.modalUploadWindow)).toBeVisible({timeout: 10000})
    await this.clickToDownloadFiles()
    
  } 

  @step('Пользователь теряет интернет-соединение')
  async errorNetwork() {
    await expect(this.page.locator(this.modalUploadWindow)).toBeVisible({timeout: 10000})
    await this.page.context().setOffline(true);
    await expect(this.page.locator(this.errorNetworkWindow)).toBeVisible({timeout: 10000})
    await this.page.context().setOffline(false);
    await this.page.locator(this.errorNetworkTryAgainButton).click()
    await expect(this.page.locator(this.modalUploadWindow)).toBeVisible({timeout: 10000})
  }

  @step('Пользователь скачивает файл Стоп-лист')
  async downloadBlackListFile() {
    await this.clickToDropdown()
    await this.hoverToFile()
    await this.downloadBlackList()
  }

  @step('Пользователь получает красный тост с текстом "Не все файлы загружены"')
  async checkNotAllFilesToast() {
    await this.page.waitForSelector(this.notAllFilesToastFail);
    await expect(this.page.locator(this.notAllFilesToastFail)).toBeVisible({timeout: 10000})
    
  }

  @step('Пользователь получает модальное окно с ошибкой"')
  async getErrorModalWindow() {
    await expect(this.page.locator(this.errorModalWindow)).toBeVisible({timeout: 10000})
    await expect(this.page.locator(this.errorOKButton)).toBeVisible({timeout: 10000})
    await this.page.locator(this.errorOKButton).click()
  }

  @step('Пользователь обновление файла Стоп-лист')
  async refreshBlackListFile() {
    await this.clickToDropdown()
    await this.hoverToFile()
    await new Promise(resolve => setTimeout(resolve, 2000));
    await this.refreshBlackList()
  }

  @step('Пользователь раскрывает Дропдаун')
  async clickToDropdown() {
    await this.page.locator(this.dropdown).click()
  } 

  @step('Пользователь делает ховер на строку Стоп-лист')
  async hoverToFile() {
    await this.page.locator(this.blackListFile).hover()
  } 

  @step('Пользователь нажимает на кнопку Скачать файл Стоп-листа')
  async downloadBlackList() {
    await this.page.locator(this.blackListDownloadButton).click()
    await this.page.waitForEvent('download');
  } 

  @step('Открыть стартовую страницу')
  async open() {
    await this.page.goto(base_url);
    const currentTitle = await this.page.title();
    expect(currentTitle).toBe('S.Plan');
    await new Promise(resolve => setTimeout(resolve, 1000));
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
    const files = fs.readdirSync(GoodFilesDirectory).map(file => `${GoodFilesDirectory}/${file}`);
      
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
    if (filesUploaded < files.length) {
        throw new Error('Не все файлы были загружены');
    }
}
@step('Пользователь загружает НЕ ВСЕ файлы')
async loadNotAllFiles() {
  const files = fs.readdirSync(GoodFilesDirectory).map(file => `${GoodFilesDirectory}/${file}`);
  
  let filesUploaded = 0;
  for (let i = 0; i < Math.floor(files.length/2); i++) {
      const file_path = files[i];
      if (file_path) {
          await this.uploadFile(file_path);
          console.log(`Загружается файл: ${file_path}`);
          await new Promise(resolve => setTimeout(resolve, 2000));
          filesUploaded++;
      }
  }
}

@step('Пользователь загружает ошибочные файлы')
  async loadErrorFiles() {
    const files = fs.readdirSync(ErrorFilesDirectory).map(file => `${ErrorFilesDirectory}/${file}`);
      
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
    if (filesUploaded < files.length) {
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
  }

  @step('Пользователь нажимает кнопку Скачать предыдущий расчет')
  async clickToDownloadPreviousPlan() {
    await this.page.locator(this.downloadPreviousPlanButton).click()
    await this.page.waitForEvent('download');
  }

  @step('Пользователь нажимает кнопку Скачать')
  async clickToDownloadFiles() {
    await this.page.waitForSelector(this.modalDownloadWindow);
    await this.page.locator(this.downloadButton).click()
    await this.page.waitForEvent('download');
  }
  
  @step('Пользователь обновляет файл Стоп-лист')
  async refreshBlackList() {
    const files = fs.readdirSync(GoodFilesDirectory)
    const refreshFilePath = files.find(file => file === refreshFileName);
    const fullFilePath: string = `${GoodFilesDirectory}/${refreshFilePath}`;
    const inputFile = await this.page.$(this.blackListRefreshButton);
    
    if (inputFile) {
        await inputFile.setInputFiles(fullFilePath);
        await Promise.all([
            this.page.waitForLoadState('load'),
            this.page.waitForResponse(response => response.status() === 200)
        ]);
    }
    await expect(this.page.locator(this.blackListRefreshToastSuccess)).toBeVisible({timeout: 10000})
  }
}
