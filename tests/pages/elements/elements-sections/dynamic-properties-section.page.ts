import { Page, Locator, expect } from '@playwright/test';

const ENVIRONMENT = process.env.ENTORNO_DYNAMIC_PROPERTIES;

export class DynamicPropertiesSectionPage {
    readonly #page: Page;
    readonly #sectionHeader: Locator;
    readonly #randomIdText: Locator;
    readonly #enableButton: Locator;
    readonly #colorChangeButton: Locator;
    readonly #visibleAfterButton: Locator;
    
    constructor(page: Page) {
        this.#page = page;
        this.#sectionHeader = page.getByRole('heading', { name: 'Dynamic Properties' });

        this.#randomIdText = page.getByText('This text has random Id');
        this.#enableButton = page.getByRole('button', { name: 'Will enable 5 seconds' });
        this.#colorChangeButton = page.getByRole('button', { name: 'Color Change' });
        this.#visibleAfterButton = page.getByRole('button', { name: 'Visible After 5 Seconds' });
    }

    async goto() {
        await this.#page.goto(ENVIRONMENT!);
    }

    private async expectLocatorVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    private async clickWhenVisible(locator: Locator) {
        await this.expectLocatorVisible(locator);
        await locator.click();
    }

    async expectButtonEnabled(button: Locator) {
        await expect(button).toBeEnabled();
    }

    async expectChangeColor(button: Locator) {
        await expect(button).toHaveCSS('color', 'rgb(220, 53, 69)');
    }

    async expectDynamicsButtons() {
        await this.expectButtonEnabled(this.#enableButton);
        await this.expectChangeColor(this.#colorChangeButton);
        await this.expectLocatorVisible(this.#visibleAfterButton);
    }

    async expectAllElements() {
        await expect(this.#sectionHeader).toBeVisible();
        await expect(this.#randomIdText).toBeVisible();
        await expect(this.#enableButton).toBeVisible();
        await expect(this.#colorChangeButton).toBeVisible();
        await expect(this.#visibleAfterButton).toBeVisible();
    }
}