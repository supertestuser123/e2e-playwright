import { test } from '@playwright/test';
import { AuthPage } from '../fixtures/pages/AuthPage';
import { user } from '../helpers/constants/user';
import { USER_SESSION } from '../helpers/constants/auth';

test('Авторизация', async ({ page }) => {
  const authpage = new AuthPage(page);
  await authpage.open();
  await authpage.submitForm(user.username, user.password);
  await authpage.saveSession(page, USER_SESSION)
})