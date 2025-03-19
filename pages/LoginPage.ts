import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private usernameField: Locator;
    private passwordField: Locator;
    private loginButton: Locator;
    private logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('#UserName');
        this.passwordField = page.locator('#Password');
        this.loginButton = page.locator('#login-submit');
        this.logoutButton = page.locator('#logout-container');
    }

    async navigateToLogin() {
        await this.page.goto('');
    }

    async login(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async isLoggedIn(): Promise<boolean> {
        return this.logoutButton.isVisible();
    }
}
