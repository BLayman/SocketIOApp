import {POSTS} from "./mockPosts";
import {Injectable} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import {Post} from './post';
import 'rxjs/Rx';
import {AppService} from "../app.service";


@Injectable()
export class PostService{
  private url = 'http://localhost:8080';
  private socket : SocketIOClient.Socket;

  constructor(private appService: AppService){
    this.socket = appService.socket;
  }

  // listen for response rooms events
  listenForPosts(){
    let listener = Observable.fromEvent(this.socket, 'response posts');
    return listener;
  }

  listenForPublished(){
    let listener = Observable.fromEvent(this.socket, "response published");
    return listener;
  }

  publishPosts(posts){
    console.log(posts);
    this.socket.emit('publish posts', posts);
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
