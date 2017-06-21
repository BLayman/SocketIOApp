import {POSTS} from "./mockPosts";
import {Injectable} from "@angular/core";
import {Subject} from 'rxjs/Subject';
import * as io from "socket.io-client";
import { Observable } from 'rxjs/Observable';
import {Post} from './post';

@Injectable()
export class PostService{
  private url = 'http://localhost:8080';
  private socket : SocketIOClient.Socket;
  posts : Post[] = POSTS;


  constructor(){
    this.socket = io();
    this.socket.emit('message', 'hello from client');
  }

  getPosts(room){
    let thisInstance : PostService = this;
    let observable = new Observable(observer => {
      // test joining a room
      this.socket.emit('join room', "room 1");
      // recieve posts for that room
      this.socket.on('display room', function (retrieved) {
        retrieved.forEach(post => {
            thisInstance.posts.push({
              'body' : post
            })
        });
        // pass posts to observer
        observer.next(thisInstance.posts);
      });
      return () => {
        thisInstance.socket.disconnect();
      }
    })
    return observable;
  }

}
