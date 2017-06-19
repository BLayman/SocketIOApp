import { Component } from "@angular/core";
import {Post} from './post'; // post model
import {POSTS} from "./mockPosts"; // mock posts

@Component({
  selector: 'posts-display',
  templateUrl: './postsDisplay.component.html',
  styleUrls: ['./postsDisplay.component.css']
})

export class postsDisplayComponent {
  posts: Post[]; // array of posts bound to our html by structural directive

  ngOnInit(){
    // load in mock posts
    this.posts = POSTS;
  }
}
