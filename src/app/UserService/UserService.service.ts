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
    return new Promise((resolve, reject) => {
      this.socket.emit("add user", user);
      let eventListener = Observable.fromEvent(this.socket, "validation");
      eventListener.subscribe(
        (isValid) => {
            resolve(isValid);
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {console.log("done");
      });
    });
  }

  listenForAdmin(){
    let listener = Observable.fromEvent(this.socket, "admin");
    return listener;
  }

}
