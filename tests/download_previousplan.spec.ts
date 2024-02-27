import { test } from '@playwright/test';
import { ProdPage } from '../fixtures/pages/ProductionPlan';
import { USER_SESSION } from '../helpers/constants/auth';

test.use({ storageState: USER_SESSION });

test('Скачивание предыдущего Производственного плана', async ({ page }) => {
  const prodpage = new ProdPage(page);
  await prodpage.openProdPlan()
  await prodpage.clickToDownloadPreviousPlan()
})