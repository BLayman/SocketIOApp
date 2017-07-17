import { Component, Input } from "@angular/core";
import {PostService} from "../PostsService/PostsService.service";
import {postsDisplayComponent} from '../postsDisplay/postsDisplay.component';
import {Post} from '../PostsService/post';
import {ProbSelectComponent} from '../probSelect/probSelect.component';

@Component({
  selector: 'submit-post',
  templateUrl: './submitPost.component.html',
  styleUrls: ['./submitPost.component.css']
})
export class SubmitPostComponent {
  @Input() admin: boolean;
  @Input() nickname: string;
  @Input() postsDisplay: postsDisplayComponent;
  @Input() probSelect: ProbSelectComponent;
  newPost : Post;
  textBody : string = "";

  constructor(private postService: PostService){}

  submitCode(){
    if (this.probSelect.currProb != this.probSelect.default){
      console.log("submitting: " + this.textBody);
      this.newPost = {selected:false, viewing:false, body:this.textBody, nickname:this.nickname};
      this.postService.addPost(this.newPost);
      if (!this.admin) {
        this.postsDisplay.postToSelf(this.textBody, this.nickname);
      }
    }
    else{
      alert("Please select a problem from the dropdown menu.")
    }
  }
}
