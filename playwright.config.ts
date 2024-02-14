import { defineConfig } from '@playwright/test';

const config = defineConfig({
  
  use: { 
    headless: false,       
  },
  name: 'chromium',

  reporter: [
    ['line'],
    [
      'allure-playwright',
      {
        environmentInfo: {
          NODE_VERSION: process.version,
          OS: process.platform,
        },
        suiteTitle: false,
        detail: true,
      },
    ],
  ],
  
  testMatch: /.*\.spec\.ts/,
  fullyParallel: true,
  testDir: './tests/',
  timeout: 1000000, 
});

export default config;
