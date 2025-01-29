import{ test } from '@playwright/test';
import{ TEST_USER, TEST_BOOK, URL } from '../constants';
const { LoginPo } = require('../page-objects/login');
const { BookStorePo } = require('../page-objects/book-store');
const { ProfilePo } = require('../page-objects/profile');

test.beforeEach(async ({ page }) => {
    await page.goto(URL.bookstore);
});

test.describe('Book Store', () => {
    test('should allow existing user to log in, browse books and view their profile', async ({page}) => {
        const loginPage = new LoginPo(page);
        const bookStorePage = new BookStorePo(page);
        const profilePage = new ProfilePo(page);

        //User enters credentials on the login page
        await loginPage.clickLoginButton();
        await loginPage.fillUserNameField(TEST_USER.userName);
        await loginPage.fillPasswordField(TEST_USER.passWord);
        await loginPage.clickLoginButton();

        //Assert user login successful when user name label matches user name
        await bookStorePage.assertSuccessfulLogin(TEST_USER.userName);

        //Assert Book store table is displayed correctly
        await bookStorePage.assertTableTitles(['Image', 'Title', 'Author', 'Publisher' ]);

        //User can search for a book in the book store
        await bookStorePage.searchBook(TEST_BOOK.title);
        await bookStorePage.assertSearchResults(TEST_BOOK.title);

        //User navigate to the profile page
        await bookStorePage.clickProfileButton();

        //Assert Profile table is displayed correctly
        await profilePage.assertTableHeadings(['Image', 'Title', 'Author', 'Publisher', 'Action']);

        //Delete all books from profile
        await profilePage.clickDeleteBookButton();
        await profilePage.clickCloseModal();

        //User sign out
        await profilePage.clickLogout();
        await profilePage.assertLogout();

    })

})