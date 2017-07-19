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

  // when user clicks "Sumbit code"
  submitCode(){
    // if the user is in a valid room
    if (this.probSelect.currProb != this.probSelect.default){
      console.log("submitting: " + this.textBody);
      // create new post with text area content and user's nickname
      this.newPost = {selected:false, viewing:false, body:this.textBody, nickname:this.nickname};
      // send new post to the server
      this.postService.addPost(this.newPost);
      // if user is not an admin, also post the content to their client stored posts object
      if (!this.admin) {
        this.postsDisplay.postToSelf(this.textBody, this.nickname);
      }
    }
    // alert if no room has been selected
    else{
      alert("Please select a problem from the dropdown menu.")
    }
  }
}
