import { defineConfig } from '@playwright/test';
import { USER_SESSION } from './helpers/constants/auth';

const config = defineConfig({
  
  use: { 
    headless: false,       
    storageState: USER_SESSION,
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
  
  expect: {
    timeout: 1 * 60 * 1000,
  },
  globalTimeout: 1 * 60 * 60 * 1000,
  testMatch: /.*\.spec\.ts/,
  timeout: 1 * 60 * 1000,
  fullyParallel: true,
  testDir: './tests/',
});

export default config;
