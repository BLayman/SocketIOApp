import { Component } from "@angular/core";
import {Post} from '../postsService/post'; // post model
import {PostService} from "../PostsService/PostsService.service";


@Component({
  selector: 'posts-display',
  templateUrl: './postsDisplay.component.html',
  styleUrls: ['./postsDisplay.component.css'],
})

export class postsDisplayComponent {
  posts: Post[] = []; // array of posts bound to our html by structural directive
  selectedPost : Post = {"body" : "Code displayed here."} // default display

  constructor(private postService: PostService){ // create a PostService variable
    this.listenForPosts(); // start listening for incomming posts
  }

  changeRoom(room){
    console.log("room changed to: " + room);
    this.posts = [];
    this.postService.requestPosts(room);
  }

  listenForPosts(){
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
  // for converting array of strings to posts
  addPosts(newPosts){
    newPosts.forEach(post => {
          this.posts.push({
          'body' : post
        })
  });
}
  // display post in large text area
  viewPost(post){
    this.selectedPost = post;
  }
}
