import { Component, Input } from "@angular/core";

@Component({
  selector: 'submit-post',
  templateUrl: './submitPost.component.html',
  styleUrls: ['./submitPost.component.css']
})
export class SubmitPostComponent {
  @Input() admin: boolean;
  textBody : string = "";

  clearSubmissions(){
    console.log("clear submissions");
  }

  submitCode(){
    console.log("submitting: " + this.textBody);
  }
}
