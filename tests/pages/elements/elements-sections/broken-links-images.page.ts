import { Page, Locator, expect } from '@playwright/test';

const ENVIRONMENT = process.env.ENTORNO_BROKEN_LINKS_IMAGES;
const ENVIRONMENT_VALID_LINK = process.env.ENTORNO;
const BROKEN_LINK = process.env.BROKEN_LINK;

export class BrokenLinksImagesPage {
    readonly #page: Page;
    readonly #sectionHeader: Locator;

    readonly #validImageText: Locator;
    readonly #brokenImage: Locator;
    readonly #brokenImageText: Locator;
    readonly #brokenLink: Locator;
    readonly #validLinkText: Locator;
    readonly #validLinkButton: Locator;
    readonly #brokenLinkText: Locator;
    readonly #brokenLinkButton: Locator;

    
    
    constructor(page: Page) {
        this.#page = page;
        this.#sectionHeader = page.getByRole('heading', { name: 'Broken Links - Images' });

        this.#validImageText = page.getByText('Valid image');
        this.#brokenImage = page.locator('img').nth(2);
        this.#brokenImageText = page.getByText('Broken image');
        this.#brokenLink = page.locator('img').nth(3);
        this.#validLinkText = page.getByText('Valid Link', { exact: true });
        this.#validLinkButton = page.getByRole('link', { name: 'Click Here for Valid Link' });
        this.#brokenLinkText = page.getByText('Broken Link', { exact: true });
        this.#brokenLinkButton = page.getByRole('link', { name: 'Click Here for Broken Link' });
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

    async clickValidLink() {
        await this.clickWhenVisible(this.#validLinkButton);
        await this.#page.waitForURL(ENVIRONMENT_VALID_LINK!);
    }
    async clickBrokenLink() {
        await this.clickWhenVisible(this.#brokenLinkButton);
        await this.#page.waitForURL(BROKEN_LINK!);
    }

    expectAllElements() {
        this.expectLocatorVisible(this.#sectionHeader);
        this.expectLocatorVisible(this.#validImageText);
        this.expectLocatorVisible(this.#brokenImage);
        this.expectLocatorVisible(this.#brokenImageText);
        this.expectLocatorVisible(this.#brokenLink);
        this.expectLocatorVisible(this.#validLinkText);
        this.expectLocatorVisible(this.#validLinkButton);
        this.expectLocatorVisible(this.#brokenLinkText);
        this.expectLocatorVisible(this.#brokenLinkButton);
    }

}
