import { Page, Locator, expect } from '@playwright/test';

const ENVIRONMENT = process.env.ENTORNO_TEXT_BOX;

export class TextBoxSection {
  readonly #page: Page;
  
  readonly #textBoxForm: Locator;
// Inputs
  readonly #fullNameInput: Locator;
  readonly #emailInput: Locator;
  readonly #currentAddressInput: Locator;
  readonly #permanentAddressInput: Locator;
// Buttons
  readonly #submitButton: Locator;
// Texts
  readonly #fullNameText: Locator;
  readonly #emailText: Locator;
  readonly #currentAddressText: Locator;
  readonly #permanentAddressText: Locator;

  constructor(page: Page) {
    this.#page = page;

    this.#textBoxForm = page.getByText('Text BoxFull NameEmailCurrent');
    // Inputs
    this.#fullNameInput = page.locator('#userName');
    this.#emailInput = page.locator('#userEmail');
    this.#currentAddressInput = page.locator('#currentAddress');
    this.#permanentAddressInput = page.locator('#permanentAddress');
    // Buttons
    this.#submitButton = page.locator('#submit');
    // Texts
    this.#fullNameText = page.getByText('Full Name');
    this.#emailText = page.getByText('Email');
    this.#currentAddressText = page.getByText('Current Address');
    this.#permanentAddressText = page.getByText('Permanent Address');
    this.#textBoxForm = page.getByRole('heading', { name: 'Text Box' });
  }

  async goto() {
    await this.#page.goto(ENVIRONMENT!);
  }

  private async expectTextAndInputVisible(text: Locator, input: Locator) {
    await expect(text).toBeVisible();
    await expect(input).toBeVisible();
  }

  private async expectLocatorVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  private async clickLocator(locator: Locator) {
    await expect(locator).toBeVisible();
    await locator.click();
  }

  private async fillInput(input: Locator, value: string) {
    await expect(input).toBeVisible();
    await input.fill(value);
  }

  async fillAllFields(fullName: string, email: string, currentAddress: string, permanentAddress: string) {
    await this.fillInput(this.#fullNameInput, fullName);
    await this.fillInput(this.#emailInput, email);
    await this.fillInput(this.#currentAddressInput, currentAddress);
    await this.fillInput(this.#permanentAddressInput, permanentAddress);
  }

  async clickSubmitButton() {
    await this.clickLocator(this.#submitButton);
  }

  async expectFullNameFieldVisible() {
    await this.expectTextAndInputVisible(this.#fullNameText, this.#fullNameInput);
  }

  async expectEmailFieldVisible() {
    await this.expectTextAndInputVisible(this.#emailText, this.#emailInput);
  }

  async expectCurrentAddressFieldVisible() {
    await this.expectTextAndInputVisible(this.#currentAddressText, this.#currentAddressInput);
  }

  async expectPermanentAddressFieldVisible() {
    await this.expectTextAndInputVisible(this.#permanentAddressText, this.#permanentAddressInput);
  }

  async expectTextBoxFormVisible() {
    await this.expectLocatorVisible(this.#textBoxForm);
  }
}