import { Component } from "@angular/core";
import {Post} from '../postsService/post'; // post model
import {PostService} from "../PostsService/PostsService.service";
import {Input} from '@angular/core';

@Component({
  selector: 'posts-display',
  templateUrl: './postsDisplay.component.html',
  styleUrls: ['./postsDisplay.component.css'],
})

export class postsDisplayComponent {
  @Input() admin: boolean;
  posts: Post[] = []; // array of posts bound to our html by structural directive
  selectedPost: Post = { body: "Code displayed here.", selected: true, nickname: "", viewing: true} // default display
  adminSelected: Post[] = [];
  currRoom: string = "";
  storedByRoom: {} = {}; // client storage of users own posts

  constructor(private postService: PostService) { // create a PostService variable
    this.listenForDeletedPosts();
    this.listenForDeletedPublished();
  }

  postToSelf(text, name){
    let post = {body: text, selected: false, nickname: name};
    // if the room exists in our object
    if(this.storedByRoom[this.currRoom]){
      // push new post content
      this.storedByRoom[this.currRoom].push(post);
    }
    // if the room doesn't yet exist
    else{
      // create an array at that room key, and push post content
      this.storedByRoom[this.currRoom] = [];
      this.storedByRoom[this.currRoom].push(post);
    }
    // display new post on screen
    this.addPosts([post]);
    console.log(this.storedByRoom);
  }

  changeRoom(room) {
    this.posts = [];
    this.currRoom = room;
    console.log("room changed to: " + room);
    if (this.storedByRoom[room]) {
      console.log(this.storedByRoom[room]);
      this.addPosts(this.storedByRoom[room]);
    }
    else{
      console.log("no posts yet");
    }
    this.adminSelected = [];
    this.postService.requestPosts(room);
  }

  listenForPosts() {
    let postObserver = this.postService.listenForPosts();
    // subscribe to observable that listens for posts
    postObserver.subscribe(
      // when posts are retrieved, add the to posts property
      retrievedPosts => {
        this.addPosts(retrievedPosts);
      }, (error) => {
        console.error(error);
      }, () => {
        console.log("done");
      }
    );
  }

  listenForPublished() {
    let observer = this.postService.listenForPublished();
    observer.subscribe(
      retrievedPublished => {
        console.log("received: " + retrievedPublished);
        this.addPosts(retrievedPublished);
      }, (error) => {
        console.error(error);
      }, () => {
        console.log("done");
      }
    )
  }

  listenForDeletedPublished(){
    let observer = this.postService.listenForDeletedPublished();
    // subscribe to observable that listens for posts
    observer.subscribe(
      // when posts are retrieved, add the to posts property
      () => {
        console.log("deleted published");
        if(!this.admin){
          this.posts = [];
          // retain post that were submitted by this user
          this.addPosts(this.storedByRoom[this.currRoom]);
        }
      }, (error) => {
        console.log("error");
        console.error(error);
      }, () => {
        console.log("done");
      }
    );
  }

  listenForDeletedPosts() {
    let deletedObserver = this.postService.listenForDeletedPosts();
    // subscribe to observable that listens for posts
    deletedObserver.subscribe(
      // when posts are retrieved, add the to posts property
      () => {
        if (this.admin) {
          console.log("deleted posts");
          this.posts = [];
        }
      }, (error) => {
        console.log("error");
        console.error(error);
      }, () => {
        console.log("done");
      }
    );
  }
  // for converting array of strings to posts
  addPosts(newPosts) {
    newPosts.forEach(post => {
      post.viewing = false;
      post.selected = false;
      this.posts.push(post);
    });
  }

  publishSelection() {
    this.postService.publishPosts(this.adminSelected);
  }

  clearSubmissions() {
    this.adminSelected = []; // empty adminSelected array so that deleted posts are not published
    this.postService.deletePosts();
  }

  clearPublished(){
    this.postService.clearPublished(this.currRoom);
  }
  // display post in large text area
  viewPost(post) {
    this.selectedPost.viewing = false;
    this.selectedPost = post;
    this.selectedPost.viewing = true;
    // if administrator clicks on a post, select or deselect
    if (this.admin) {
      // if selected, deselect and remove from adminSelected
      if (post.selected) {
        post.selected = false;
        let index = this.adminSelected.indexOf(post);
        this.adminSelected.splice(index, 1);
      }
      // if not yet selected, then select it and add it to adminSelected
      else {
        this.adminSelected.push(post);
        post.selected = true;
      }
      console.log(this.selectedPost);

    }
  }
}
