const { } = require('@playwright/test');

module.exports = {
  browsers: ['chromium'],
  testDir: 'tests',
  use: {
    headless: false,
    slowMo: 5000,
    contextOptions: {
      incognito: true
    }
  },

  beforeAll: async () => {
   
  },
  
  afterAll: async () => {
   
  }
};
