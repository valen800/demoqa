import { expect, Locator, Page } from '@playwright/test';

type TreeNode =
  | 'Home'
  | 'Desktop'
  | 'Notes'
  | 'Commands'
  | 'Documents'
  | 'WorkSpace'
  | 'React'
  | 'Angular'
  | 'Veu'
  | 'Office'
  | 'Public'
  | 'Private'
  | 'Classified'
  | 'General'
  | 'Downloads'
  | 'Word File'
  | 'Excel File';

const ENVIRONMENT = process.env.ENTORNO_CHECK_BOX;

export class CheckBoxSection {
  readonly #page: Page;

  readonly #sectionHeader: Locator;
  readonly #expandAllButton: Locator;
  readonly #collapseAllButton: Locator;
  readonly #resultCheckedBoxes: Locator;

  constructor(page: Page) {
    this.#page = page;
    this.#sectionHeader = page.getByRole('heading', { name: 'Check Box' });
    this.#expandAllButton = page.getByRole('button', { name: 'Expand All' });
    this.#collapseAllButton = page.getByRole('button', { name: 'Collapse All' });
    this.#resultCheckedBoxes = page.locator('#result').getByText('You have selected');
  }

  // Navigate directly to the Check Box section URL.
  async goto() {
    await this.#page.goto(ENVIRONMENT!);
  }

  // Ensure the section header is displayed.
  async expectSectionVisible() {
    await expect(this.#sectionHeader).toBeVisible();
  }

  async expectResultCheckedBoxesVisible() {
    await expect(this.#resultCheckedBoxes).toBeVisible();
  }

  // Expand every node in the tree.
  async expandAll() {
    await this.clickWhenVisible(this.#expandAllButton);
  }

  // Collapse the entire tree.
  async collapseAll() {
    await this.clickWhenVisible(this.#collapseAllButton);
  }

  // Toggle a single node (expand/collapse).
  async toggleNode(name: TreeNode) {
    const toggle = this.toggle(name);
    await expect(toggle).toBeVisible();
    await toggle.click();
  }

  // Check a node if it is not already checked.
  async selectNode(name: TreeNode) {
    await this.setNodeChecked(name, true);
  }

  // Uncheck a node when it is currently checked.
  async unselectNode(name: TreeNode) {
    await this.setNodeChecked(name, false);
  }

  // Verify that a node label is visible in the tree.
  async expectNodeVisible(name: TreeNode) {
    await expect(this.label(name)).toBeVisible();
  }

  // Assert that a node is currently checked.
  async expectNodeChecked(name: TreeNode) {
    await expect(this.checkboxIcon(name)).toHaveClass(/rct-icon-check/);
  }

  // Assert that a node remains unchecked.
  async expectNodeUnchecked(name: TreeNode) {
    await expect(this.checkboxIcon(name)).toHaveClass(/rct-icon-uncheck/);
  }

  // Ensure a node matches the desired checked state.
  private async setNodeChecked(name: TreeNode, shouldBeChecked: boolean) {
    const isChecked = await this.isNodeChecked(name);

    if (isChecked !== shouldBeChecked) {
      await this.checkbox(name).click();
    }
  }

  // Determine if a node shows the checked icon.
  private async isNodeChecked(name: TreeNode) {
    const classes = await this.checkboxIcon(name).getAttribute('class');
    return classes?.includes('rct-icon-check') ?? false;
  }

  // Locate the row that contains the node title.
  private textRow(name: TreeNode) {
    return this.#page
      .locator('.rct-text')
      .filter({ has: this.#page.locator('.rct-title', { hasText: this.exactText(name) }) })
      .first();
  }

  // Return the checkbox container for the node.
  private checkbox(name: TreeNode) {
    return this.textRow(name).locator('.rct-checkbox');
  }

  // Get the icon inside the checkbox.
  private checkboxIcon(name: TreeNode) {
    return this.checkbox(name).locator('.rct-icon');
  }

  // Obtain the toggle button (collapse/expand) for the node.
  private toggle(name: TreeNode) {
    return this.textRow(name).locator('.rct-collapse, .rct-expand');
  }

  // Retrieve the visible label element for the node.
  private label(name: TreeNode) {
    return this.textRow(name).locator('.rct-title');
  }

  // Generic helper to click locators once they are visible.
  private async clickWhenVisible(locator: Locator) {
    await expect(locator).toBeVisible();
    await locator.click();
  }

  // Build an exact text RegExp, escaping special characters.
  private exactText(text: string) {
    const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`^${escaped}$`, 'm');
  }
}