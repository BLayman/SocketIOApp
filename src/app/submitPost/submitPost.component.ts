import { Component, Input } from "@angular/core";
import {PostService} from "../PostsService/PostsService.service";
import {postsDisplayComponent} from '../postsDisplay/postsDisplay.component';
import {Post} from '../PostsService/post';

@Component({
  selector: 'submit-post',
  templateUrl: './submitPost.component.html',
  styleUrls: ['./submitPost.component.css']
})
export class SubmitPostComponent {
  @Input() admin: boolean;
  @Input() nickname: string;
  @Input() postsDisplay: postsDisplayComponent;
  newPost : Post;
  textBody : string = "";

  constructor(private postService: PostService){}

  submitCode(){
    console.log("submitting: " + this.textBody);
    this.newPost = {selected:false, body:this.textBody, nickname:this.nickname};
    this.postService.addPost(this.newPost);
    if (!this.admin) {
      this.postsDisplay.postToSelf(this.textBody, this.nickname);
    }
  }
}
