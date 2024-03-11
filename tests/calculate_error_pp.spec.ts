import { test } from '@playwright/test';
import { ProdPage } from '../fixtures/pages/ProductionPlan';
import { USER_SESSION } from '../helpers/constants/auth';

test.use({ storageState: USER_SESSION });

test('Расчет производственного плана на ошибочных файлах', async ({ page }) => {
  const prodpage = new ProdPage(page);
  await prodpage.openProdPlan()
  await prodpage.uploadErrorFiles();
  await prodpage.calculateProdPlan();
  await prodpage.getErrorModalWindow();
})