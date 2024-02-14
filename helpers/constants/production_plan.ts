export const locators = {

uploadField: '//*[@data-testid="test-id-upload-files"]//input[@type="file"]',
prodplanLink: '//a[contains(@href,"production-plan") and contains(text(),"Производственный план")]',
calculateButton: '//button[@data-testid="tend-ui-button" and contains(text(), "Запустить перерасчет")]',
downloadButton: '//div[@class="tend-ui-modal-content"]//div[@class="tend-ui-modal-footer"]//button[@data-testid="tend-ui-button" and text()="Скачать"]',
modalUploadWindow: '//*[text()="Перерасчет запущен"]',
modalDownloadWindow: '//*[text()="Перерасчет завершен"]'

};

export const filesDirectory: string = './data/files';
export const base_url = 'https://splan-stage.samoletgroup.ru/production-plan'