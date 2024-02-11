import { test } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { user } from '../helpers/constants/user';

test('Авторизация на стейдж', async ({ page }) => {
  const authpage = new AuthPage(page);
  await authpage.open();
  await authpage.login(user.username, user.password);
  await authpage.checkTitle()
});