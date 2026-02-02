import { Page, Locator, expect } from '@playwright/test';

const ENVIRONMENT = process.env.ENTORNO_ELEMENTS;

export class ElementsPage {
  readonly #page: Page;

  readonly #banner: Locator;
  readonly #componentsSideBar: Locator;

  readonly #elementsSideBar: Locator;

  // Buttons
  readonly #textBoxButton: Locator;
  readonly #checkBoxButton: Locator;
  readonly #radioButtonButton: Locator;
  readonly #webTablesButton: Locator;
  readonly #buttonsButton: Locator;
  readonly #linksButton: Locator;
  readonly #brokenLinksImagesButton: Locator;
  readonly #uploadAndDownloadButton: Locator;
  readonly #dynamicPropertiesButton: Locator;
  // Titles
  readonly #textBoxButtonTitle: Locator;
  readonly #checkBoxButtonTitle: Locator;
  readonly #radioButtonButtonTitle: Locator;
  readonly #webTablesButtonTitle: Locator;
  readonly #buttonsButtonTitle: Locator;
  readonly #linksButtonTitle: Locator;
  readonly #brokenLinksImagesButtonTitle: Locator;
  readonly #uploadAndDownloadButtonTitle: Locator;
  readonly #dynamicPropertiesButtonTitle: Locator;
  // Icons
  readonly #textBoxButtonIcon: Locator;
  readonly #checkBoxButtonIcon: Locator;
  readonly #radioButtonButtonIcon: Locator;
  readonly #webTablesButtonIcon: Locator;
  readonly #buttonsButtonIcon: Locator;
  readonly #linksButtonIcon: Locator;
  readonly #brokenLinksImagesButtonIcon: Locator;
  readonly #uploadAndDownloadButtonIcon: Locator;
  readonly #dynamicPropertiesButtonIcon: Locator;

  constructor(page: Page) {
    this.#page = page;

    this.#banner = page.getByRole('banner');

    this.#componentsSideBar = page.locator('div').filter({ hasText: 'Elements Text BoxCheck' }).nth(5);
    this.#elementsSideBar = page.locator('.header-wrapper').first();
    // Buttons
    this.#textBoxButton = page.getByRole('listitem').filter({ hasText: 'Text Box' });
    this.#checkBoxButton = page.getByRole('listitem').filter({ hasText: 'Check Box' });
    this.#radioButtonButton = page.getByRole('listitem').filter({ hasText: 'Radio Button' });
    this.#webTablesButton = page.getByRole('listitem').filter({ hasText: 'Web Tables' });
    this.#buttonsButton = page.getByRole('listitem').filter({ hasText: 'Buttons' });
    this.#linksButton = page.getByRole('listitem').filter({ hasText: /^Links$/ });
    this.#brokenLinksImagesButton = page.getByRole('listitem').filter({ hasText: 'Broken Links - Images' });
    this.#uploadAndDownloadButton = page.getByRole('listitem').filter({ hasText: 'Upload and Download' });
    this.#dynamicPropertiesButton = page.getByRole('listitem').filter({ hasText: 'Dynamic Properties' });
    // Titles
    this.#textBoxButtonTitle = page.getByText('Text Box');
    this.#checkBoxButtonTitle = page.getByText('Check Box');
    this.#radioButtonButtonTitle = page.getByText('Radio Button');
    this.#webTablesButtonTitle = page.getByText('Web Tables');
    this.#buttonsButtonTitle = page.getByText('Buttons');
    this.#linksButtonTitle = page.getByText('Links', { exact: true });
    this.#brokenLinksImagesButtonTitle = page.getByText('Broken Links - Images');
    this.#uploadAndDownloadButtonTitle = page.getByText('Upload and Download');
    this.#dynamicPropertiesButtonTitle = page.getByText('Dynamic Properties');
    // Icons
    this.#textBoxButtonIcon = page.getByRole('listitem').filter({ hasText: 'Text Box' }).getByRole('img');
    this.#checkBoxButtonIcon = page.getByRole('listitem').filter({ hasText: 'Check Box' }).getByRole('img');
    this.#radioButtonButtonIcon = page.getByRole('listitem').filter({ hasText: 'Radio Button' }).locator('svg');
    this.#webTablesButtonIcon = page.getByRole('listitem').filter({ hasText: 'Web Tables' }).locator('svg');
    this.#buttonsButtonIcon = page.getByRole('listitem').filter({ hasText: 'Buttons' }).getByRole('img');
    this.#linksButtonIcon = page.locator('#item-5 > svg').first();
    this.#brokenLinksImagesButtonIcon = page.getByRole('listitem').filter({ hasText: 'Broken Links - Images' }).getByRole('img');
    this.#uploadAndDownloadButtonIcon = page.getByRole('listitem').filter({ hasText: 'Upload and Download' }).getByRole('img');
    this.#dynamicPropertiesButtonIcon = page.getByRole('listitem').filter({ hasText: 'Dynamic Properties' }).getByRole('img');
  }

  async goto() {
    await this.#page.goto(ENVIRONMENT!);
  }

  private async expectListItemVisible(
    item: Locator, 
    title: Locator, 
    icon: Locator
  ) {
    await expect(item).toBeVisible();
    await expect(title).toBeVisible();
    await expect(icon).toBeVisible();
  }

  private async expectLocatorVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  private async clickLocator(locator: Locator) {
    await expect(locator).toBeVisible();
    await locator.click();
  }

  async expectTextBoxButtonVisible() {
    this.expectListItemVisible(this.#textBoxButton, this.#textBoxButtonTitle, this.#textBoxButtonIcon);
  }

  async expectCheckBoxButtonVisible() {
    this.expectListItemVisible(this.#checkBoxButton, this.#checkBoxButtonTitle, this.#checkBoxButtonIcon);
  }

  async expectRadioButtonButtonVisible() {
    this.expectListItemVisible(this.#radioButtonButton, this.#radioButtonButtonTitle, this.#radioButtonButtonIcon);
  }

  async expectWebTablesButtonVisible() {
    this.expectListItemVisible(this.#webTablesButton, this.#webTablesButtonTitle, this.#webTablesButtonIcon);
  }

  async expectButtonsButtonVisible() {
    this.expectListItemVisible(this.#buttonsButton, this.#buttonsButtonTitle, this.#buttonsButtonIcon);
  }

  async expectLinksButtonVisible() {
    this.expectListItemVisible(this.#linksButton, this.#linksButtonTitle, this.#linksButtonIcon);
  }

  async expectBrokenLinksImagesButtonVisible() {
    this.expectListItemVisible(this.#brokenLinksImagesButton, this.#brokenLinksImagesButtonTitle, this.#brokenLinksImagesButtonIcon);
  }

  async expectUploadAndDownloadButtonVisible() {
    this.expectListItemVisible(this.#uploadAndDownloadButton, this.#uploadAndDownloadButtonTitle, this.#uploadAndDownloadButtonIcon);
  }

  async expectDynamicPropertiesButtonVisible() {
    this.expectListItemVisible(this.#dynamicPropertiesButton, this.#dynamicPropertiesButtonTitle, this.#dynamicPropertiesButtonIcon);
  }

  async expectBannerVisible() {
    this.expectLocatorVisible(this.#banner);
  }

  async expectComponentsSideBarVisible() {
    this.expectLocatorVisible(this.#componentsSideBar);
  }

  async expectElementsSideBarVisible() {
    this.expectLocatorVisible(this.#elementsSideBar);
  }

  async expectAllElementsVisible() {
    this.expectBannerVisible();
    this.expectComponentsSideBarVisible();
    this.expectElementsSideBarVisible();
    this.expectTextBoxButtonVisible();
    this.expectCheckBoxButtonVisible();
    this.expectRadioButtonButtonVisible();
    this.expectWebTablesButtonVisible();
    this.expectButtonsButtonVisible();
    this.expectLinksButtonVisible();
    this.expectBrokenLinksImagesButtonVisible();
    this.expectUploadAndDownloadButtonVisible();
    this.expectDynamicPropertiesButtonVisible();
  }

  async clickTextBoxButton() {
    await this.clickLocator(this.#textBoxButton);
  }

  async clickCheckBoxButton() {
    await this.clickLocator(this.#checkBoxButton);
  }

  async clickRadioButtonButton() {
    await this.clickLocator(this.#radioButtonButton);
  }

  async clickWebTablesButton() {
    await this.clickLocator(this.#webTablesButton);
  }

  async clickButtonsButton() {
    await this.clickLocator(this.#buttonsButton);
  }

  async clickLinksButton() {
    await this.clickLocator(this.#linksButton);
  }

  async clickBrokenLinksImagesButton() {
    await this.clickLocator(this.#brokenLinksImagesButton);
  }

  async clickUploadAndDownloadButton() {
    await this.clickLocator(this.#uploadAndDownloadButton);
  }

  async clickDynamicPropertiesButton() {
    await this.clickLocator(this.#dynamicPropertiesButton);
  }
}
