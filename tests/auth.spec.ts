import { test } from '@playwright/test';
import { AuthPage } from '../fixtures/pages/AuthPage';
import { user } from '../helpers/constants/user';
import { path } from '../helpers/constants/auth';

test('Авторизация', async ({ page }) => {
  const authpage = new AuthPage(page);
  await authpage.open();
  await authpage.submitForm(user.username, user.password);
  await authpage.goToStage();
  await authpage.saveSession(page, path)
})