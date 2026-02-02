import { expect, Locator, Page } from "@playwright/test";

type RadioButtonOption = 'Yes' | 'No' | 'Impressive';
const radioButtonOptions: RadioButtonOption[] = ['Yes', 'No', 'Impressive'];
const ENVIRONMENT = process.env.ENTORNO_RADIO_BUTTON;


export class RadioButtonSection {
    readonly #page: Page;

    readonly #textQuestion: Locator;
    readonly #title: Locator;
    
    constructor(page: Page) {
        this.#page = page;
        this.#textQuestion = page.getByText('Do you like the site?');
        this.#title = page.getByRole('heading', { name: 'Radio Button' });
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
    
    async expectTextQuestionVisible() {
        await this.expectLocatorVisible(this.#textQuestion);
    }
    
    async selectRadioButton(option: RadioButtonOption) {
        const result = this.#page.locator(`div`).filter({ hasText: new RegExp(`^${option}$`) });
        await this.clickWhenVisible(result);
    }

    async expectResultRadioButtonText(text: string) {
        const result = this.#page.getByText(`You have selected \`${text}\``);
        await this.expectLocatorVisible(result);
    }
    
    async expectTitleVisible() {
        await this.expectLocatorVisible(this.#title);
    }

    async expectAllVisible() {
        await this.expectTitleVisible();
        await this.expectTextQuestionVisible();

        for (const option of radioButtonOptions) {
            await this.selectRadioButton(option);
            await this.expectResultRadioButtonText(option);
        }
    }
}
