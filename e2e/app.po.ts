import { browser, by, element,ExpectedConditions } from 'protractor';

export class Page {

  navigateTo() {
    browser.ignoreSynchronization = true;
    browser.get('/');
  }

  adminLogin(){
    browser.wait(ExpectedConditions.alertIsPresent(), 200);
    let alert = browser.switchTo().alert();
    alert.sendKeys("54");
    alert.accept();
  }

  nonAdminLogin(){
    browser.wait(ExpectedConditions.alertIsPresent(), 200);
    let alert = browser.switchTo().alert();
    alert.sendKeys("111");
    alert.accept();
  }


  getMainTitleText() {
    return element(by.id('mainTitle')).getText();
  }

}
