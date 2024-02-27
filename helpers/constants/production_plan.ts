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
};

export const filesDirectory: string = './data/files';
export const base_url = 'https://splan-stage.samoletgroup.ru/production-plan'