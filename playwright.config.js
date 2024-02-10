const { devices } = require('@playwright/test');

module.exports = {
  // Список браузеров, которые будут использоваться для запуска тестов
  // Можно указать несколько браузеров для параллельного запуска тестов
  browsers: ['chromium', 'firefox', 'webkit'],

  // Папка, где находятся тесты
  testDir: 'tests',

  // Список устройств, доступных для эмуляции
  // Полный список устройств доступен здесь: https://playwright.dev/docs/emulation
  devices: [
    devices['iPhone 13'],
    devices['iPad Mini'],
    devices['Pixel 5']
  ],

  // Параметры запуска тестов
  use: {
    headless: false,
    
    slowMo: 50
  },

  beforeAll: async () => {
   
  },

  
  afterAll: async () => {
   
  }
};
