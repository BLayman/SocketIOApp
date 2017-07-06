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
  }

  deletePosts(){
    this.socket.emit('delete posts');
  }

  listenForDeleted(){
    let listener = Observable.fromEvent(this.socket, 'posts deleted');
    return listener;
  }

}
