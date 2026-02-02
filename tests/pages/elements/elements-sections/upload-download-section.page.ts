import { Page, Locator, expect, path } from '@playwright/test';

const ENVIRONMENT = process.env.ENTORNO_UPLOAD_DOWNLOAD;
const SAMPLE_FILE_PATTERN = /^sampleFile(?:\(\d+\))?\.jpeg$/;

const UPLOAD_FILE_PATH = path.resolve(
  'tests/pages/elements/elements-sections/media/sampleFile.jpeg'
);

export class UploadDownloadSectionPage {
    readonly #page: Page;
    readonly #sectionHeader: Locator;

    readonly #uploadButton: Locator;
    readonly #downloadButton: Locator;

    readonly #selectFileText: Locator;

    readonly #pathText: Locator;

    constructor(page: Page) {
        this.#page = page;
        this.#sectionHeader = page.getByRole('heading', { name: 'Upload and Download' });

        this.#uploadButton = page.getByRole('button', { name: 'Select a file' });
        this.#downloadButton = page.getByRole('link', { name: 'Download' });
        this.#selectFileText = page.getByText('Select a file');
        this.#pathText = page.getByText('C:\\fakepath\\sampleFile.jpeg');
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

    async clickUploadButton() {
        await this.clickWhenVisible(this.#uploadButton);
    }

    async clickAndCheckDownloadFile() {
        const [download] = await Promise.all([
            this.#page.waitForEvent('download'),
            this.clickWhenVisible(this.#downloadButton),
        ]);
        expect(download.suggestedFilename()).toMatch(SAMPLE_FILE_PATTERN);
        expect(download).toBeTruthy();
    }

    async clickDownloadButton() {
        await this.clickWhenVisible(this.#downloadButton);
    }

    async uploadFile() {
        await this.#uploadButton.setInputFiles(UPLOAD_FILE_PATH);

        await this.expectPathText();
    }

    async expectAllElements() {
        await this.expectLocatorVisible(this.#sectionHeader);
        await this.expectLocatorVisible(this.#uploadButton);
        await this.expectLocatorVisible(this.#downloadButton);
        await this.expectLocatorVisible(this.#selectFileText);
    }

    async expectPathText() {
        await this.expectLocatorVisible(this.#pathText);
    }
}
