import { Component } from "@angular/core";
import {Post} from '../postsService/post'; // post model
import {PostService} from "../PostsService/PostsService.service";
import {Input} from '@angular/core';
import {ProbSelectComponent} from '../probSelect/probSelect.component'

@Component({
  selector: 'posts-display',
  templateUrl: './postsDisplay.component.html',
  styleUrls: ['./postsDisplay.component.css'],
})

export class postsDisplayComponent {
  @Input() admin: boolean;
  @Input() probSelect: ProbSelectComponent;

  posts: Post[] = []; // array of posts bound to our html by structural directive
  selectedPost: Post = {
    body: "Code displayed here.",
    selected: true,
    nickname: "",
    viewing: true,
    roomPK: -1,
    userPK: -1,
    id: -1
  }
  adminSelected: Post[] = [];
  currRoom: string = "";
  storedByRoom: {} = {}; // client storage of users own posts

  constructor(private postService: PostService) { // create a PostService variable
    this.listenForDeletedPosts();
    this.listenForDeletedPublished();
  }

  postToSelf(post){
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
  // called by probSelect when room is changed
  changeRoom(room) {
    // clear out old posts from display
    this.posts = [];
    // clear out old selection
    this.adminSelected = [];
    // change current room to new room name
    this.currRoom = room;
    console.log("room changed to: " + room);
    // add posts from storedByRoom if there are any
    if (this.storedByRoom[room]) {
      console.log(this.storedByRoom[room]);
      this.addPosts(this.storedByRoom[room]);
    }
    else{
      console.log("no posts yet");
    }

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
        console.log("received: ");
        console.log(retrievedPublished);
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
          if (this.storedByRoom[this.currRoom]){
            this.addPosts(this.storedByRoom[this.currRoom]);
          }
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
    if (this.currRoom != "") {
      this.adminSelected = []; // empty adminSelected array so that deleted posts are not published
      this.postService.deletePosts(this.probSelect.getCurrKey());
    }
  }

  clearPublished(){
    this.postService.clearPublished(this.probSelect.getCurrKey());
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
