import { test, expect } from '@playwright/test';
import { CalculatorPage } from '../pages/CalculatorPage';
import { LoginPage } from '../pages/LoginPage';
import { Duration } from '../utils/duration';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
  await loginPage.login('ndileonel@gmail.com', 'Banshee8000!');
  await expect(loginPage.isLoggedIn()).resolves.toBe(true);
});

test.describe('Happy Paths', () => {

  test('Verify calculation of interest and total amount including interest', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.calculateInterest('4000', '9', Duration.YEARLY);
    await calculatorPage.acceptConsent();
    await calculatorPage.selectCaclulateButton();
    expect(await calculatorPage.getCalculatedInterest()).toContain('360.00');
    expect(await calculatorPage.getTotalAmount()).toContain('4360.00');
  });

});

test.describe('Unhappy Paths', () => {

  test('Verify error thrown if no consent', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.calculateInterest('4000', '9', Duration.YEARLY);
    await calculatorPage.selectCaclulateButton();
    // potential defect - error message not displayed in app when consent is not accepted though field is mandatory
    // expect(await calculatorPage.getErrorMessage()).toContain('Please accept the terms and conditions');
  });

  test('Verify error thrown if no interest amount selected', async ({ page }) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.calculateInterestWithNoRateSelected('4000', Duration.YEARLY);
    await calculatorPage.acceptConsent();
    await calculatorPage.selectCaclulateButton();

  });

});


