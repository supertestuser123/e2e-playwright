export const locators = {

uploadField: '//*[@data-testid="test-id-upload-files"]//input[@type="file"]',
prodplanLink: '//*[@data-testid="test-id-menu-item-product-plan"]',
calculateButton: '//button[@data-testid="test-id-button-start-recalculate"]',
downloadButton: '//button[@data-testid="test-id-button-download-recalculate"]',
modalUploadWindow: '//*[text()="Перерасчет запущен"]',
modalDownloadWindow: '//*[text()="Перерасчет завершен"]',
downloadPreviousPlanButton: '//*[@data-testid="test-id-button-download-previous-recalculate"]',
dropdown: '//*[@data-testid="test-id-dropdown"]',
blackListFile: '//*[@data-testid="test-id-file-menu-item-BLACK_LIST"]',
blackListDownloadButton: '//div[@data-testid="test-id-file-menu-item-BLACK_LIST"]//span[@data-testid="tend-ui-download-icon"]',
blackListRefreshButton: '//div[@data-testid="test-id-file-menu-item-BLACK_LIST"]//input[@type="file"]',
blackListRefreshToastSuccess: '//*[text()="Стоп лист обновлен"]',
notAllFilesToastFail: '//*[text()="Не все файлы загружены"]',
errorModalWindow: '//*[text()="Ошибка обработки файлов"]',
errorOKButton: '//button[@data-testid="test-id-button-see"]',
errorNetworkWindow: '//*[text()="Нет сети"]',
errorNetworkTryAgainButton: '//button[@data-testid="test-id-button-again"]',

}

export const refreshFileName: string = 'Стоп-лист.xlsx';
export const GoodFilesDirectory: string = './data/good_files';
export const ErrorFilesDirectory: string = './data/bad_files';
export const base_url = 'https://splan-stage.samoletgroup.ru/production-plan/'