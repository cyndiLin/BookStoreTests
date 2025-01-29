const { expect } = require('@playwright/test');

exports.ProfilePo = class ProfilePo {
    constructor(page){
        this.page = page;
        this.tableHeadings = page.locator('.rt-th');
        this.deleteBookButton = page.getByRole('button', { name: 'Delete All Books'});
        this.smallModal = page.locator('#closeSmallModal-cancel');
        this.logoutButton = page.getByRole('button', { name: 'Log out' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async assertTableHeadings(headings){
        await expect(this.tableHeadings).toHaveText(headings);
    }

    async clickDeleteBookButton(){
        await this.deleteBookButton.click();
    }

    async clickCloseModal(){
        await this.smallModal.click();
    }

    async clickLogout(){
        await this.logoutButton.click();
    }

    async assertLogout(){
        await expect(this.loginButton).toBeVisible();
    }
}