import { Component } from "@angular/core";
import {Post} from '../postsService/post'; // post model
import {PostService} from "../PostsService/PostsService.service";

@Component({
  selector: 'posts-display',
  templateUrl: './postsDisplay.component.html',
  styleUrls: ['./postsDisplay.component.css'],
})

export class postsDisplayComponent {
  posts: Post[]; // array of posts bound to our html by structural directive
  selectedPost : Post = {"body" : "Code displayed here."} // default display
  connection;

  constructor(private postService: PostService){}

  ngOnInit(){
    this.connection = this.postService.getPosts("group 1").subscribe(retrievedPosts => {
      this.posts = (<Post[]>retrievedPosts);
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  viewPost(post){
    this.selectedPost = post;
  }
}
