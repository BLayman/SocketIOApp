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

  constructor(private postService: PostService){}

  ngOnInit(){
    this.posts = this.postService.getPosts();
  }

  viewPost(post){
    this.selectedPost = post;
  }
}
