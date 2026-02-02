import { expect, Locator, Page } from '@playwright/test';

const ENVIRONMENT = process.env.ENTORNO_LINKS;
const HOME_URL = 'https://demoqa.com/';
const HOME_5_CNR_4_URL = 'https://demoqa.com/';

type LinkResponse = {
    code: string;
    text: string;
};

export class LinksSection {
    readonly #page: Page;
    readonly #sectionHeader: Locator;

    // Links
    readonly #homeLink: Locator;
    readonly #home5CNR4Link: Locator;
    readonly #createdLink: Locator;
    readonly #noContentLink: Locator;
    readonly #movedLink: Locator;
    readonly #badRequestLink: Locator;
    readonly #unauthorizedLink: Locator;
    readonly #forbiddenLink: Locator;
    readonly #notFoundLink: Locator;

    readonly #dynamicResponse: Locator;

    private readonly responses = {
        created: { code: '201', text: 'Created' },
        noContent: { code: '204', text: 'No Content' },
        moved: { code: '301', text: 'Moved' },
        badRequest: { code: '400', text: 'Bad Request' },
        unauthorized: { code: '401', text: 'Unauthorized' },
        forbidden: { code: '403', text: 'Forbidden' },
        notFound: { code: '404', text: 'Not Found' }
    };

        
    constructor(page: Page) {
        this.#page = page;
        this.#sectionHeader = page.getByRole('heading', { name: 'Links', exact: true });

        this.#homeLink = page.getByRole('link', { name: 'Home', exact: true });
        this.#home5CNR4Link = page.getByRole('link', { name: 'Home5CNR4' });
        this.#createdLink = page.getByRole('link', { name: 'Created' });
        this.#noContentLink = page.getByRole('link', { name: 'No Content' });
        this.#movedLink = page.getByRole('link', { name: 'Moved' });
        this.#badRequestLink = page.getByRole('link', { name: 'Bad Request' });
        this.#unauthorizedLink = page.getByRole('link', { name: 'Unauthorized' });
        this.#forbiddenLink = page.getByRole('link', { name: 'Forbidden' });
        this.#notFoundLink = page.getByRole('link', { name: 'Not Found' });

        this.#dynamicResponse = page.getByText('Link has responded with staus')
        
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

    private async clickAndExpectNewTab(locator: Locator, expectedUrl: string) {
        const [newPage] = await Promise.all([
            this.#page.waitForEvent('popup'),
            this.clickWhenVisible(locator)
        ]);
        await newPage.waitForLoadState();
        expect(newPage.url()).toBe(expectedUrl);
    }

    private async checkDynamicResponse(code: string, text: string) {
        const responseText = this.#dynamicResponse.getByText(text)
        const responseCode = this.#dynamicResponse.getByText(code)
        
        await expect(responseText).toBeVisible();
        await expect(responseCode).toBeVisible();
    }

    private async clickAndCheckResponse(locator: Locator, response: LinkResponse) {
        await this.clickWhenVisible(locator);
        await this.checkDynamicResponse(response.code, response.text);
    }

    async checkHomeLink() {
        await this.clickAndExpectNewTab(this.#homeLink, HOME_URL);
    }

    async checkHome5CNR4Link() {
        await this.clickAndExpectNewTab(this.#home5CNR4Link, HOME_5_CNR_4_URL);
    }

    async clickCreatedLink() {
        await this.clickAndCheckResponse(this.#createdLink, this.responses.created);
    }

    async clickNoContentLink() {
        await this.clickAndCheckResponse(this.#noContentLink, this.responses.noContent);
    }

    async clickMovedLink() {
        await this.clickAndCheckResponse(this.#movedLink, this.responses.moved);
    }

    async clickBadRequestLink() {
        await this.clickAndCheckResponse(this.#badRequestLink, this.responses.badRequest);
    }

    async clickUnauthorizedLink() {
        await this.clickAndCheckResponse(this.#unauthorizedLink, this.responses.unauthorized);
    }

    async clickForbiddenLink() {
        await this.clickAndCheckResponse(this.#forbiddenLink, this.responses.forbidden);
    }

    async clickNotFoundLink() {
        await this.clickAndCheckResponse(this.#notFoundLink, this.responses.notFound);
    }

    async expectSectionHeaderVisible() {
        await this.expectLocatorVisible(this.#sectionHeader);
    }

    async expectAllLinksVisible() {
        await this.expectLocatorVisible(this.#homeLink);
        await this.expectLocatorVisible(this.#home5CNR4Link);
        await this.expectLocatorVisible(this.#createdLink);
        await this.expectLocatorVisible(this.#noContentLink);
        await this.expectLocatorVisible(this.#movedLink);
        await this.expectLocatorVisible(this.#badRequestLink);
        await this.expectLocatorVisible(this.#unauthorizedLink);
        await this.expectLocatorVisible(this.#forbiddenLink);
        await this.expectLocatorVisible(this.#notFoundLink);
    }
}

