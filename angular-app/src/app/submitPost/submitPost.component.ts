import { Component, Input } from "@angular/core";

@Component({
  selector: 'submit-post',
  templateUrl: './submitPost.component.html',
  styleUrls: ['./submitPost.component.css']
})
export class submitPostComponent {
  @Input() admin: boolean;
}
