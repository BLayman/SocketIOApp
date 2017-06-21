import {POSTS} from "./mockPosts";
import {Injectable} from "@angular/core";
import {Subject} from 'rxjs/Subject';
//import * as io from "socket.io-client";

@Injectable()
export class PostService{
  private url = 'http://localhost:8080';
  private socket;
/*
  ngOnInit(){
    this.socket = io(this.url);
  }
*/
  getPosts(){
    return POSTS;
  }
/*
  sendMessage(){
    this.socket.emit('message', 'hello from client');
  }
  */
}
