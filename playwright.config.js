const { } = require('@playwright/test');

module.exports = {
  browsers: ['chromium'],
  testDir: 'tests',
  use: {
    headless: false,
    slowMo: 50,
    contextOptions: {
      incognito: true
    }
  },
  reporter: [
    ['line'],
    [
      'allure-playwright',
      {
        detail: true,
        suiteTitle: false,
      },
    ],
  ],
  beforeAll: async () => {
   
  },
  
  afterAll: async () => {
   
  }
};
