import {Injectable} from "@angular/core";
import * as io from "socket.io-client";
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {AppService} from "../app.service";

@Injectable()
export class UserService{
  private socket : SocketIOClient.Socket;

  constructor(private appService: AppService){
      this.socket = appService.socket;
  }

  addUser(user){
    return new Promise((resolve, reject) => {
      this.socket.emit("add user", user);
      let eventListener = Observable.fromEvent(this.socket, "validation");
      eventListener.subscribe(
        (resObj) => {
            resolve(resObj);
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
