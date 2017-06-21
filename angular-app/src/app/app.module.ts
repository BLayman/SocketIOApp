import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProbSelectComponent} from './probSelect/probSelect.component'
import { SubmitPostComponent } from "./submitPost/submitPost.component";
import {postsDisplayComponent} from "./postsDisplay/postsDisplay.component";
import {FormsModule} from "@angular/forms";
import {PostService} from "./PostsService/PostsService.service";
import {ProbService} from './ProbsService/ProbsService.service';

@NgModule({
  declarations: [
    AppComponent,
    ProbSelectComponent,
    SubmitPostComponent,
    postsDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [PostService, ProbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
