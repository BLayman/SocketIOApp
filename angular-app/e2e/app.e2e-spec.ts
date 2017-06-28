import { Page } from './app.po';
import {ProbSelect} from "./probSelect.po";

describe('Admin features', () => {
  let page: Page;
  let probSelect : ProbSelect;

  beforeEach(() => {
    page = new Page();
    probSelect = new ProbSelect();
  });

  it('should display title', () => {
    page.navigateTo();
    page.adminLogin();
    expect(page.getMainTitleText()).toEqual('Code Share app');
  });

  it('should have delete button', function () {
    expect(probSelect.getDeleteRoomButton().isDisplayed()).toBeTruthy();
  });

  it('should have create button', function () {
    expect(probSelect.getCreateRoomButton().isDisplayed()).toBeTruthy();
  });
});

/*
describe('No admin features', function () {
  let page: Page;
  let probSelect : ProbSelect;

  beforeEach(() => {
    probSelect = new ProbSelect();
    page = new Page();
  });

  it('should display title', () => {
    page.navigateTo();
    page.nonAdminLogin();
    expect(page.getMainTitleText()).toEqual('Code Share app');
  });

  it('should not have delete button', function () {
    expect(probSelect.getDeleteRoomButton().isDisplayed()).toBe(false);
  });

  it('should not have create button', function () {
    expect(probSelect.getCreateRoomButton().isDisplayed()).toBe(false);
  });
});
*/
