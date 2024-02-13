import { test } from '@playwright/test';
import { ProdPage } from '../fixtures/pages/ProductionPlan';
import { path } from '../helpers/constants/auth';

test.use({ storageState: path });

test('Расчет производственного плана', async ({ page }) => {
  const prodpage = new ProdPage(page);
  await prodpage.open();
  await prodpage.loadFiles();

  
})