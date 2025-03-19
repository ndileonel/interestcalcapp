import { Page, Locator } from '@playwright/test';

export class CalculatorPage {
    private page: Page;
    private principalAmount: Locator;
    private interestRate: Locator;
    private duration: Locator;
    private consent: Locator;
    private calculateButton: Locator;
    private calculatedInterest: Locator;
    private totalAmount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.principalAmount = page.locator('#customRange1');
        this.interestRate = page.locator('#dropdownMenuButton');
        this.duration = page.locator('#durationList a');
        this.consent = page.locator('#gridCheck1');
        this.calculateButton = page.locator('button:has-text("Calculate")');
        this.calculatedInterest = page.locator('#interestAmount');
        this.totalAmount = page.locator('#totalAmount');
    }

    async selectPrincipalSliderValue(value: number) {
        await this.principalAmount.evaluate((slider, newValue) => {
            const inputElement = slider as HTMLInputElement;
            inputElement.value = String(newValue); 
            inputElement.dispatchEvent(new Event('input', { bubbles: true }));
            inputElement.dispatchEvent(new Event('change', { bubbles: true }));
        }, value);
    }

    async selectInterestRate(value: string) {
        await this.interestRate.click();
        const checkboxLocator = this.page.locator(`div.dropdown-item:has-text("${value}%") input[type="checkbox"]`);
        await checkboxLocator.check();
        // click outside the checkbox to close the dropdown
        const outerCheckboxLocator = this.page.locator(`div.dropdown-item:has-text("${value}%")`);
        await outerCheckboxLocator.click();
    }

    async selectDuration(value: string) {
        await this.duration.getByText(value).click();
    }

    async acceptConsent() {
        await this.consent.click({ force: true });
    }

    async calculateInterest(principal: string, rate: string, duration: string) {
        await this.selectPrincipalSliderValue(parseInt(principal));
        await this.selectInterestRate(rate);
        await this.selectDuration(duration);
        await this.acceptConsent();
        await this.calculateButton.click();
    }

    async getCalculatedInterest(): Promise<string> {
        return this.calculatedInterest.innerText();
    }

    async getTotalAmount(): Promise<string> {
        return this.totalAmount.innerText();
    }

}

