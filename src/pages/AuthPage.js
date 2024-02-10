const locators = require('../helpers/constants/auth');

class AuthPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://splan-stage.samoletgroup.ru/');
  }

  async login(username, password) {
    const { usernameInput, passwordInput, loginButton } = locators.AuthPage;
    await this.page.fill(usernameInput, username);
    await this.page.fill(passwordInput, password);
    await this.page.click(loginButton);
  }

  async getTitle() {
    return await this.page.title();
  }
}

module.exports = AuthPage;