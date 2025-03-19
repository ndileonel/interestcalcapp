import { test, expect } from '@playwright/test';
import { CalculatorPage } from '../pages/CalculatorPage';
import { LoginPage } from '../pages/LoginPage';
import { Duration } from './utils/duration';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
  await loginPage.login('ndileonel@gmail.com', 'Banshee8000!');
  await expect(loginPage.isLoggedIn()).resolves.toBe(true);
});

test('Calculate interest', async ({ page }) => {
  const calculatorPage = new CalculatorPage(page);
  await calculatorPage.calculateInterest('4000', '9', Duration.YEARLY);
  expect(await calculatorPage.getCalculatedInterest()).toContain('360.00');
  expect(await calculatorPage.getTotalAmount()).toContain('4360.00');
});
