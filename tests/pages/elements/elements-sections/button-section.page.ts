import { Locator, Page, expect } from '@playwright/test';

const ENVIRONMENT = process.env.ENTORNO_BUTTONS;

export class ButtonSection {
    readonly #page: Page;
    readonly #sectionHeader: Locator;

    readonly #doubleClickButton: Locator;
    readonly #rightClickButton: Locator;
    readonly #clickMeButton: Locator;

    readonly #doubleClickMessage: Locator;
    readonly #rightClickMessage: Locator;
    readonly #clickMeMessage: Locator;
    
    constructor(page: Page) {
        this.#page = page;
        this.#sectionHeader = page.getByRole('heading', { name: 'Buttons' });

        this.#doubleClickButton = page.getByRole('button', { name: 'Double Click Me' });
        this.#rightClickButton = page.getByRole('button', { name: 'Right Click Me' });
        this.#clickMeButton = page.getByRole('button', { name: 'Click Me', exact: true });
        
        this.#doubleClickMessage = page.getByText('You have done a double click');
        this.#rightClickMessage = page.getByText('You have done a right click');
        this.#clickMeMessage = page.getByText('You have done a dynamic click');
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
    
    async clickDoubleClickButton() {
        await this.clickWhenVisible(this.#doubleClickButton);
    }
    
    async clickRightClickButton() {
        await this.clickWhenVisible(this.#rightClickButton);
    }
    
    async clickClickMeButton() {
        await this.clickWhenVisible(this.#clickMeButton);
    }

    async expectDoubleClickMessageVisible() {
        await this.expectLocatorVisible(this.#doubleClickMessage);
    }

    async expectRightClickMessageVisible() {
        await this.expectLocatorVisible(this.#rightClickMessage);
    }

    async expectClickMeMessageVisible() {
        await this.expectLocatorVisible(this.#clickMeMessage);
    }
}