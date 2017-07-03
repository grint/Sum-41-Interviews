import { $$, browser } from 'protractor';

export class Sum41Family {
  navigateTo() {
    return browser.get('/');
  }

  getNavbarElement(n) {
    return $$('app-root a').get(n).getText();
  }

}
