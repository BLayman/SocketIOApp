import {PROBS} from "./mockProbs";
import {Injectable} from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ProbService{
  private url = 'http://localhost:8080';
  private socket : SocketIOClient.Socket;

  constructor(){
      this.socket = io();
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

  deleteProb(prob){
    this.socket.emit("delete room", prob);
  }

}
