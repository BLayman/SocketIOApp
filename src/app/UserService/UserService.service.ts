import {Injectable} from "@angular/core";
import * as io from "socket.io-client";
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService{
  private url = 'http://localhost:8080';
  private socket : SocketIOClient.Socket;

  constructor(){
      this.socket = io();
  }

  addUser(user){
    this.socket.emit("add user", user);
  }

  listenForAdmin(){
    let listener = Observable.fromEvent(this.socket, "admin");
    return listener;
  }

}
