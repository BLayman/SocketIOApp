import { browser, by, element } from 'protractor';

export class ProbSelect {

  getDeleteRoomButton(){
  return element(by.id('deleteProblem'));
  }

  getCreateRoomButton(){
  return element(by.id('createProblem'));
  }

}
