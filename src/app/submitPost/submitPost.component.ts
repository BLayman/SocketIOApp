import { Component, Input } from "@angular/core";
import {PostService} from "../PostsService/PostsService.service";
import {postsDisplayComponent} from '../postsDisplay/postsDisplay.component';

@Component({
  selector: 'submit-post',
  templateUrl: './submitPost.component.html',
  styleUrls: ['./submitPost.component.css']
})
export class SubmitPostComponent {
  @Input() admin: boolean;
  @Input() postsDisplay: postsDisplayComponent;

  textBody : string = "";

  constructor(private postService: PostService){}

  submitCode(){
    console.log("submitting: " + this.textBody);
    this.postService.addPost(this.textBody);
    this.postsDisplay.postToSelf(this.textBody);
  }
}
