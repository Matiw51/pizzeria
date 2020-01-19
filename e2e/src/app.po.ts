import { browser, by, element } from 'protractor';
import { forEach } from '@angular/router/src/utils/collection';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  checkBrowserUrl(){
    return browser.getCurrentUrl();
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getActiveCategory(){
    return element(by.css('.category.active')).getText();
  }

  getPastasButton(){
    return element(by.id('pastas-category'));
  }

  getDrinksButton(){
    return element(by.id('drinks-category'));
  }

  getDetailsButton(){
    return element(by.buttonText('Details'));
  }

  getBackButton(){
    return element(by.id('backArrow'));
  }

  getOrdersButton(){
    return element(by.id('orders-category'));
  }

  Logout(){
    element(by.buttonText('Logout')).click();
  }

  logIn(){
    element(by.id('login-input')).sendKeys('a');
    element(by.id('password-input')).sendKeys('a');
    element(by.buttonText('Login')).click();
  }

  getCartButton(){
    return element(by.id('cart-panel'));
  }

}
