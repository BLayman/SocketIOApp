import { Component, Input } from "@angular/core";
import {PostService} from "../PostsService/PostsService.service";

@Component({
  selector: 'submit-post',
  templateUrl: './submitPost.component.html',
  styleUrls: ['./submitPost.component.css']
})
export class SubmitPostComponent {
  @Input() admin: boolean;
  textBody : string = "";

  constructor(private postService: PostService){}

  clearSubmissions(){
    console.log("clear submissions");
  }

  submitCode(){
    console.log("submitting: " + this.textBody);
    this.postService.addPost(this.textBody);
  }
}
