import { test } from '@playwright/test';
import { ProdPage } from '../fixtures/pages/ProductionPlan';

test('Расчет производственного плана', async ({ page }) => {
  const prodpage = new ProdPage(page);
  await prodpage.open();
  await prodpage.navigateToProdPlan();
  await prodpage.loadFiles();

})