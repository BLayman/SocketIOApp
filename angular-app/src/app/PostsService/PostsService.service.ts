import {POSTS} from "./mockPosts";
import {Injectable} from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from 'rxjs/Observable';
import {Post} from './post';
import 'rxjs/Rx';

@Injectable()
export class PostService{
  private url = 'http://localhost:8080';
  private socket : SocketIOClient.Socket;

  constructor(){
    this.socket = io();
  }

  // listen for response rooms events
  listenForPosts(){
    let listener = Observable.fromEvent(this.socket, 'response posts');
    return listener;
  }

  addPost(post){
    this.socket.emit('new post', post);
  }

  requestPosts(room){
    this.socket.emit('join room', room); // join requested room
    /*
    let thisInstance : PostService = this; // for accessing class properties
    // observable sends retrieved posts to the subscriber
    let observable = new Observable(observer => {
      // test joining a room
      this.socket.emit('join room', room); // join requested room
      // listen for servers response
      this.socket.on('display room', function (retrieved) {
        // for each retrieved post body, push it to a new Post in posts
        retrieved.forEach(post => {
            thisInstance.posts.push({
              'body' : post
            })
        });
        // pass posts to observer
        observer.next(thisInstance.posts);
      });
    });
    // return created observable
    return observable;
    */
  }

}
