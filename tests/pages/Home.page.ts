import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly #page: Page;

  // Header
  readonly #banner: Locator;
  readonly #logo: Locator;
  // Main Content
  readonly #homeBanner: Locator;
  readonly #linkTutorialSelenium: Locator;
  // Cards Menu and card elements
  readonly #elementsFormsAlerts: Locator;
  readonly #elementsCard: Locator;
  readonly #formsCard: Locator;
  readonly #alertsCard: Locator;
  readonly #widgetsCard: Locator;
  readonly #interactionsCard: Locator;
  readonly #bookStoreCard: Locator;
  // Icons
  readonly #elementsCardIcon: Locator;
  readonly #formsCardIcon: Locator;
  readonly #alertsCardIcon: Locator;
  readonly #widgetsCardIcon: Locator;
  readonly #interactionsCardIcon: Locator;
  readonly #bookStoreCardIcon: Locator;
  // Titles
  readonly #elementsCardTitle: Locator;
  readonly #formsCardTitle: Locator;
  readonly #alertsCardTitle: Locator;
  readonly #widgetsCardTitle: Locator;
  readonly #interactionsCardTitle: Locator;
  readonly #bookStoreCardTitle: Locator;  
  // Footer elements
  readonly #fixedFooter: Locator;
  readonly #googleAd: Locator;
  readonly #closeButtonGoogleAd: Locator;

  constructor(page: Page) {
    this.#page = page;
    // Header
    this.#banner = page.getByRole('banner');
    this.#logo = page.getByRole('link').filter({ hasText: /^$/ });
    // Main Content
    this.#homeBanner = page.locator('.home-banner');
    // Link Tutorial Selenium
    this.#linkTutorialSelenium = page.getByRole('link', { name: 'Selenium Online Training' });
    // Cards Menu and card elements
    this.#elementsFormsAlerts = page.locator('div').filter({ hasText: 'ElementsFormsAlerts, Frame &' }).nth(3);
    this.#elementsCard = page.locator('div').filter({ hasText: 'Elements' }).nth(5);
    this.#formsCard = page.locator('div').filter({ hasText: 'Forms' }).nth(5);
    this.#alertsCard = page.locator('div').filter({ hasText: 'Alerts, Frame & Windows' }).nth(5);
    this.#widgetsCard = page.locator('div').filter({ hasText: 'Widgets' }).nth(5);
    this.#interactionsCard = page.locator('div').filter({ hasText: 'Widgets' }).nth(5);
    this.#bookStoreCard = page.locator('div').filter({ hasText: 'Book Store Application' }).nth(5);
    // Icons
    this.#elementsCardIcon = page.getByRole('img').nth(3);
    this.#formsCardIcon = page.getByRole('img').nth(4);
    this.#alertsCardIcon = page.getByRole('img').nth(5);
    this.#widgetsCardIcon = page.getByRole('img').nth(6);
    this.#interactionsCardIcon = page.getByRole('img').nth(7);
    this.#bookStoreCardIcon = page.getByRole('img').nth(8);
    // Titles
    this.#elementsCardTitle = page.getByRole('heading', { name: 'Elements' });
    this.#formsCardTitle = page.getByRole('heading', { name: 'Forms' });
    this.#alertsCardTitle = page.getByRole('heading', { name: 'Alerts, Frame & Windows' });
    this.#widgetsCardTitle = page.getByRole('heading', { name: 'Widgets' });
    this.#interactionsCardTitle = page.getByRole('heading', { name: 'Interactions' });
    this.#bookStoreCardTitle = page.getByRole('heading', { name: 'Book Store Application' });
    // Footer
    this.#fixedFooter = page.locator('#fixedban');
    this.#googleAd = page.locator('[id="google_ads_iframe_/21849154601,22343295815/Ad.Plus-Anchor_0__container__"]');
    this.#closeButtonGoogleAd = page.locator('#close-fixedban');
  }

  async goto() {
    await this.#page.goto(process.env.ENTORNO!);
  }

  private async expectCardVisible(
    card: Locator, 
    title: Locator, 
    icon: Locator
  ) {
    await expect(card).toBeVisible();
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

  async expectElementsCardVisible() {
    await this.expectCardVisible(this.#elementsCard, this.#elementsCardTitle, this.#elementsCardIcon);
  }

  async expectFormsCardVisible() {
    await this.expectCardVisible(this.#formsCard, this.#formsCardTitle, this.#formsCardIcon);
  }

  async expectAlertsCardVisible() {
    await this.expectCardVisible(this.#alertsCard, this.#alertsCardTitle, this.#alertsCardIcon);
  }

  async expectWidgetsCardVisible() {
    await this.expectCardVisible(this.#widgetsCard, this.#widgetsCardTitle, this.#widgetsCardIcon);
  }

  async expectInteractionsCardVisible() {
    await this.expectCardVisible(this.#interactionsCard, this.#interactionsCardTitle, this.#interactionsCardIcon);
  }

  async expectBookStoreCardVisible() {
    await this.expectCardVisible(this.#bookStoreCard, this.#bookStoreCardTitle, this.#bookStoreCardIcon);
  }

  async expectFixedFooterVisible() {
    await this.expectLocatorVisible(this.#fixedFooter);
  }

  async expectGoogleAdVisible() {
    await this.expectLocatorVisible(this.#googleAd);
  }

  async expectCloseButtonGoogleAdVisible() {
    await this.expectLocatorVisible(this.#closeButtonGoogleAd);
  }

  async expectBannerVisible() {
    await this.expectLocatorVisible(this.#banner);
  }

  async expectLogoVisible() {
    await this.expectLocatorVisible(this.#logo);
  }

  async expectHomeBannerVisible() {
    await this.expectLocatorVisible(this.#homeBanner);
  }

  async expectLinkTutorialSeleniumVisible() {
    await this.expectLocatorVisible(this.#linkTutorialSelenium);
  }

  async expectElementsFormsAlertsVisible() {
    await this.expectLocatorVisible(this.#elementsFormsAlerts);
  }

  async expectAllHomeVisible() {
    await this.expectBannerVisible();
    await this.expectLogoVisible();
    await this.expectHomeBannerVisible();
    await this.expectLinkTutorialSeleniumVisible();
    await this.expectElementsFormsAlertsVisible();
    await this.expectElementsCardVisible();
    await this.expectFormsCardVisible();
    await this.expectAlertsCardVisible();
    await this.expectWidgetsCardVisible();
    await this.expectInteractionsCardVisible();
    await this.expectBookStoreCardVisible();
    await this.expectFixedFooterVisible();
    await this.expectGoogleAdVisible();
    await this.expectCloseButtonGoogleAdVisible();
  }

  async clickLogo() {
    await this.clickLocator(this.#logo);
  }

  async clickHomeBanner() {
    await this.clickLocator(this.#homeBanner);
  }

  async clickLinkTutorialSelenium() {
    await this.clickLocator(this.#linkTutorialSelenium);
  }

  async clickElementsCard() {
    await this.clickLocator(this.#elementsCard);
  }

  async clickFormsCard() {
    await this.clickLocator(this.#formsCard);
  }

  async clickAlertsCard() {
    await this.clickLocator(this.#alertsCard);
  }

  async clickWidgetsCard() {
    await this.clickLocator(this.#widgetsCard);
  }

  async clickInteractionsCard() {
    await this.clickLocator(this.#interactionsCard);
  }

  async clickBookStoreCard() {
    await this.clickLocator(this.#bookStoreCard);
  }
}