import { Page, Locator, expect } from '@playwright/test';
import { QuicStream } from 'node:quic';

const ENVIRONMENT = process.env.ENTORNO_WEB_TABLES;

export class WebTablesSection {
    readonly #page: Page;

    readonly #title: Locator;
    readonly #addButton: Locator;
    readonly #searchInput: Locator;
    readonly #searchIcon: Locator;

    readonly #editButton: Locator;
    readonly #deleteButton: Locator;

    // Number of rows
    readonly #nRows: Locator;

    // COLUMN LOCATORS
    readonly #firstNameColumn: Locator;
    readonly #lastNameColumn: Locator;
    readonly #ageColumn: Locator;
    readonly #emailColumn: Locator;
    readonly #salaryColumn: Locator;
    readonly #departmentColumn: Locator;
    readonly #actionsColumn: Locator;

    readonly #celd: Locator;

    // Registration Form
    readonly #registrationFormTitle: Locator;
    readonly #closeButton: Locator;
    readonly #submitButtonRegistrationForm: Locator;

    // Registration Form Inputs
    readonly #firstNameInput: Locator;
    readonly #lastNameInput: Locator;
    readonly #ageInput: Locator;
    readonly #emailInput: Locator;
    readonly #salaryInput: Locator;
    readonly #departmentInput: Locator;

    // Registration Form Labels
    readonly #firstNameLabel: Locator;
    readonly #lastNameLabel: Locator;
    readonly #ageLabel: Locator;
    readonly #emailLabel: Locator;
    readonly #salaryLabel: Locator;
    readonly #departmentLabel: Locator;

    //footer
    readonly #nextButton: Locator;
    readonly #previousButton: Locator;
    readonly #jumpToPageInput: Locator;
    readonly #totalPagesText: Locator;
    
    constructor(page: Page) {
        this.#page = page;
        this.#title = page.getByRole('heading', { name: 'Web Tables' });
        this.#addButton = page.getByRole('button', { name: 'Add' });
        this.#searchInput = page.getByPlaceholder('Search');
        this.#searchIcon = page.locator('#basic-addon2');

        // Column locators
        this.#firstNameColumn = page.getByRole('columnheader', { name: 'First Name' });
        this.#lastNameColumn = page.getByRole('columnheader', { name: 'Last Name' });
        this.#ageColumn = page.getByRole('columnheader', { name: 'Age' });
        this.#emailColumn = page.getByRole('columnheader', { name: 'Email' });
        this.#salaryColumn = page.getByRole('columnheader', { name: 'Salary' });
        this.#departmentColumn = page.getByRole('columnheader', { name: 'Department' });
        this.#actionsColumn = page.getByRole('columnheader', { name: 'Action' });

        this.#celd = page.getByRole('gridcell');
        
        // Action buttons
        this.#editButton = page.locator('#edit-record-1 > svg');
        this.#deleteButton = page.locator('#delete-record-1 > svg');
        
        // Number of rows
        this.#nRows = page.getByLabel('rows per page');

        // Registration Form
        this.#registrationFormTitle = page.getByText('Registration Form');
        this.#closeButton = page.getByRole('button', { name: 'Close' });
        this.#submitButtonRegistrationForm = page.getByRole('button', { name: 'Submit' });

        // Registration Form Inputs
        this.#firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.#lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.#ageInput = page.getByRole('textbox', { name: 'Age' });
        this.#emailInput = page.getByRole('textbox', { name: 'name@example.com' });
        this.#salaryInput = page.getByRole('textbox', { name: 'Salary' });
        this.#departmentInput = page.getByRole('textbox', { name: 'Department' });

        // Registration Form Labels
        this.#firstNameLabel = page.locator('#firstName-label');
        this.#lastNameLabel = page.locator('#lastName-label');
        this.#ageLabel = page.locator('#age-label');
        this.#emailLabel = page.locator('#userEmail-label');
        this.#salaryLabel = page.locator('#salary-label');
        this.#departmentLabel = page.locator('#department-label');
        
        // Footer
        this.#nextButton = page.getByRole('button', { name: 'Next' });
        this.#previousButton = page.getByRole('button', { name: 'Previous' });
        this.#jumpToPageInput = page.getByRole('spinbutton', { name: 'jump to page' });
        this.#totalPagesText = page.getByText(/^of \d+/); // expresion regular para buscar "of X" donde X es un numero


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

    private async getNRowsSelected() {
        return await this.#nRows.inputValue();
    }

    async fillInput(text: string, locator: Locator) {
        await this.expectLocatorVisible(locator);
        await locator.fill(text);
    }

    async nextPage() {
        await this.clickWhenVisible(this.#nextButton);
    }

    async previousPage() {
        await this.clickWhenVisible(this.#previousButton);
    }

    private async appendToEmailLocalPart(email: string, suffix: string) {
        const index = email.indexOf('@');
        const result = email.substring(0, index) + suffix + email.substring(index);
        
        return result;
    }

    private async checkCeldsEdited(firstName: string, lastName: string, age: string, email: string, salary: string, department: string) {

        const celds: string[] = [firstName, lastName, age, email, salary, department];

        for (const celd of celds) {
            await this.expectLocatorVisible(this.#page.getByRole('gridcell', { name: celd }));
        }
    }

    async goToPage(pageNumber: number) {
        //TODO: Implement pagination
        const totalPagesText = await this.#totalPagesText.textContent(); // "of 5"
        const totalPages = parseInt(totalPagesText!.replace('of', '').trim(), 10); // trim quita los espacios

        if (pageNumber < 1 || pageNumber > totalPages) {
            throw new Error(`Page ${pageNumber} is out of range (1-${totalPages})`);
        }

        await this.#jumpToPageInput.fill(pageNumber.toString());
        await this.#jumpToPageInput.press('Enter');
    }

    async searchRecord(searchTerm: string) {
        await this.fillInput(searchTerm, this.#searchInput);
    }

    async deleteRecord(nRow: number) {
        const nRowsSelected = await this.getNRowsSelected();

        const deleteButton = this.#page.locator(`#delete-record-${nRow} > svg`);

        if (nRow > parseInt(nRowsSelected) || nRow <= 0) {
            throw new Error('Invalid row number');
        }

        await this.clickWhenVisible(deleteButton);
    }

    async addRecord(firstname: string, lastname: string, age: string, email: string, salary: string, department: string) {

        await this.clickAddButton();

        await this.expectLocatorsRegistrationFormVisible();

        await this.fillInput(firstname, this.#firstNameInput);
        await this.fillInput(lastname, this.#lastNameInput);
        await this.fillInput(age, this.#ageInput);
        await this.fillInput(email, this.#emailInput);
        await this.fillInput(salary, this.#salaryInput);
        await this.fillInput(department, this.#departmentInput);

        await this.clickWhenVisible(this.#submitButtonRegistrationForm);
    }

    async editRecord(nRow: number) {
        const nRowsSelected = await this.getNRowsSelected();

        const editButton = this.#page.locator(`#edit-record-${nRow} > svg`);

        const age: number = parseInt(await this.#ageInput.inputValue()) + 1;
        const salary: number = parseInt(await this.#salaryInput.inputValue()) + 100;

        const valueEmailInput = await this.#emailInput.inputValue();
        const valueFirstNameInput = await this.#firstNameInput.inputValue() + " edited";
        const valueLastNameInput = await this.#lastNameInput.inputValue() + " edited";
        const valueEmailInputEdited = await this.appendToEmailLocalPart(valueEmailInput, "edited");
        const valueDepartmentInputEdited = await this.#departmentInput.inputValue() + " edited";
        
        
        if (nRow > parseInt(nRowsSelected) || nRow <= 0) {
            throw new Error('Invalid row number');
        }

        await this.clickWhenVisible(editButton);

        await this.expectLocatorsRegistrationFormVisible();

        await this.fillInput(valueFirstNameInput, this.#firstNameInput);
        await this.fillInput(valueLastNameInput, this.#lastNameInput);
        await this.fillInput(age.toString(), this.#ageInput);
        await this.fillInput(valueEmailInputEdited, this.#emailInput);
        await this.fillInput(salary.toString(), this.#salaryInput);
        await this.fillInput(valueDepartmentInputEdited, this.#departmentInput);

        await this.clickWhenVisible(this.#submitButtonRegistrationForm);

        await this.checkCeldsEdited(valueFirstNameInput, valueLastNameInput, age.toString(), valueEmailInputEdited, salary.toString(), valueDepartmentInputEdited);
    }

    async selectNumberOfRows(optionLabel: string) {

        await this.#nRows.selectOption(optionLabel);
        await expect(this.#nRows).toHaveValue(optionLabel);
    } 
    
    async expectTitleVisible() {
        await this.expectLocatorVisible(this.#title);
    }
    
    async expectAddButtonVisible() {
        await this.expectLocatorVisible(this.#addButton);
    }
    
    async clickAddButton() {
        await this.clickWhenVisible(this.#addButton);
    }
    
    async expectSearchInputVisible() {
        await this.expectLocatorVisible(this.#searchInput);
    }
    
    async expectSearchIconVisible() {
        await this.expectLocatorVisible(this.#searchIcon);
    }

    async closeRegistrationForm() {
        await this.clickWhenVisible(this.#closeButton);
    }

    async expectAllColumnsVisible() {
        await this.expectLocatorVisible(this.#firstNameColumn);
        await this.expectLocatorVisible(this.#lastNameColumn);
        await this.expectLocatorVisible(this.#ageColumn);
        await this.expectLocatorVisible(this.#emailColumn);
        await this.expectLocatorVisible(this.#salaryColumn);
        await this.expectLocatorVisible(this.#departmentColumn);
        await this.expectLocatorVisible(this.#actionsColumn);
    }

    async expectLocatorsRegistrationFormVisible() {
        //title
        await this.expectLocatorVisible(this.#registrationFormTitle);
        //inputs
        await this.expectLocatorVisible(this.#firstNameInput);
        await this.expectLocatorVisible(this.#lastNameInput);
        await this.expectLocatorVisible(this.#ageInput);
        await this.expectLocatorVisible(this.#emailInput);
        await this.expectLocatorVisible(this.#salaryInput);
        await this.expectLocatorVisible(this.#departmentInput);
        //button submit
        await this.expectLocatorVisible(this.#submitButtonRegistrationForm);
        //labels
        await this.expectLocatorVisible(this.#firstNameLabel);
        await this.expectLocatorVisible(this.#lastNameLabel);
        await this.expectLocatorVisible(this.#ageLabel);
        await this.expectLocatorVisible(this.#emailLabel);
        await this.expectLocatorVisible(this.#salaryLabel);
        await this.expectLocatorVisible(this.#departmentLabel);
    }
}
