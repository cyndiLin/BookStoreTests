const { expect } = require('@playwright/test');

exports.BookStorePo = class BookStorePo {
    constructor(page){
        this.page = page;
        this.userName = page.locator('#userName-value');
        this.tableHeadings = page.locator('.rt-th');
        this.search = page.locator('#searchBox');
        this.searchResult = page.locator('.action-buttons');
        this.profileButton = page.getByText('Profile');
    }

    async assertSuccessfulLogin(userName){
        await expect(this.userName).toHaveText(userName);
    }

    async assertTableTitles(headings){
        await expect(this.tableHeadings).toHaveText(headings);
    }

    async searchBook(book){
        await this.search.fill(book);
    }

    async assertSearchResults(book){
        await expect(this.searchResult).toHaveText(book);
    }

    async clickProfileButton(){
        await this.profileButton.click();
    }
}