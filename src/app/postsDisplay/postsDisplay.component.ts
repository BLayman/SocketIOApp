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
  selectedPost: Post = { body: "Code displayed here.", selected: true } // default display
  adminSelected: Post[] = [];
  currRoom: string = "";
  storedByRoom: {} = {};

  constructor(private postService: PostService) { // create a PostService variable
    this.listenForDeleted();
  }

  postToSelf(post){
    if(this.storedByRoom[this.currRoom]){
      this.storedByRoom[this.currRoom].push(post);
    }
    else{
      this.storedByRoom[this.currRoom] = [];
      this.storedByRoom[this.currRoom].push(post);
    }
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
    console.log("published listener called");
    let observer = this.postService.listenForPublished();
    observer.subscribe(
      retrievedPublished => {
        console.log("recieved: " + retrievedPublished);
        this.addPosts(retrievedPublished);
      }, (error) => {
        console.error(error);
      }, () => {
        console.log("done");
      }
    )

  }

  listenForDeleted() {
    let deletedObserver = this.postService.listenForDeleted();
    // subscribe to observable that listens for posts
    deletedObserver.subscribe(
      // when posts are retrieved, add the to posts property
      () => {
        console.log("deleted posts");
        this.posts = [];
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
      this.posts.push({
        body: post,
        selected: false
      })
    });
  }

  publishSelection() {
    this.postService.publishPosts(this.adminSelected);
  }

  clearSubmissions() {
    this.postService.deletePosts();
  }
  // display post in large text area
  viewPost(post) {
    this.selectedPost = post;
    // if administrator clicks on a post, select or deselect
    if (this.admin) {
      // if selected, deselect and remove from adminSelected
      if (post.selected) {
        post.selected = false;
        let index = this.adminSelected.indexOf(post);
        this.adminSelected.splice(index, 1);
        console.log(this.adminSelected);
      }
      // if not yet selected, then select it and add it to adminSelected
      else {
        this.adminSelected.push(post);
        post.selected = true;
        console.log(this.adminSelected);
      }


    }
  }
}
