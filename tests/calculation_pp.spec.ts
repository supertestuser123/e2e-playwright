import { test } from '@playwright/test';
import { ProdPage } from '../fixtures/pages/ProductionPlan';
import { USER_SESSION } from '../helpers/constants/auth';

test.use({ storageState: USER_SESSION });

test('Расчет производственного плана', async ({ page }) => {
  const prodpage = new ProdPage(page);
  await prodpage.openProdPlan()
  await prodpage.uploadFiles();
  await prodpage.calculateProdPlan();
  await prodpage.downloadFiles()
})