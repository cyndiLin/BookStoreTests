const { expect } = require('@playwright/test');

exports.LoginPo = class LoginPo {
    constructor(page){
        this.page = page;
        this.loginButton = page.locator('#login');
        this.userNameField = page.locator('#userName');
        this.passwordField = page.locator('#password');
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }

    async fillUserNameField(userName){
        await this.userNameField.fill(userName);
    }

    async fillPasswordField(password){
        await this.passwordField.fill(password);
    }
}