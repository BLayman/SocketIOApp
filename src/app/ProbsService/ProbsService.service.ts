import {PROBS} from "./mockProbs";
import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {AppService} from "../app.service";

@Injectable()
export class ProbService{
  private socket : SocketIOClient.Socket;

  constructor(private appService: AppService){
      this.socket = appService.socket;;
  }

  /* problem addition */

  listenForProbs(){
    let listener = Observable.fromEvent(this.socket, 'response rooms');
    return listener;
  }

  addNewProb(prob){
    this.socket.emit("new room", prob);
  }

  /* problem deletion */

  listenForDeleted(){
    let listener = Observable.fromEvent(this.socket, 'room deleted');
    return listener;
  }

  deleteProb(probPK){
    this.socket.emit("delete room", probPK);
  }

}
