import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });


  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to Capizza!');
  });

  it('should open pizzas at start', () => {
    page.navigateTo();
    expect(page.checkBrowserUrl()).toContain('menu/pizza');
    expect(page.getActiveCategory()).toEqual('Pizza');
  });

  it('should change to pastas on click', ()=>{
    page.getPastasButton().click();
    expect(page.checkBrowserUrl()).toContain('menu/pasta');
    expect(page.getActiveCategory()).toEqual('Pasta');
  });

  it('should change to drinks on click', ()=>{
    page.getDrinksButton().click();
    expect(page.checkBrowserUrl()).toContain('menu/drink');
    expect(page.getActiveCategory()).toEqual('Drinks');
  });

  it('should add to cart', () =>{
    page.getCartButton().click();
    expect(page.checkBrowserUrl()).toContain('cart');
  });

  it('should log in', () => {
    page.logIn();
    expect(page.checkBrowserUrl()).toContain('admin/items');
  });

  it('should go into details', () => {
    page.getDetailsButton().click();
    expect(page.checkBrowserUrl()).toContain('admin/items/1');
  });

  it('should go back after back button clicked', () => {
    page.getBackButton().click();
    expect(page.checkBrowserUrl()).toContain('admin/items');
  })

  it('should check orders', () => {
    page.getOrdersButton().click();
    expect(page.checkBrowserUrl()).toContain('admin/orders');
  });

  it('should check order details', () => {
    page.getDetailsButton().click();
    expect(page.checkBrowserUrl()).toContain('admin/orders/1');
  });

  it('should log out', () => {
    page.Logout();
    expect(page.checkBrowserUrl()).toContain('menu/pizza');
  });


});
