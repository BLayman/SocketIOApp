import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { probSelectComponent} from './probSelect/probSelect.component'
import { submitPostComponent } from "./submitPost/submitPost.component";
import {postsDisplayComponent} from "./postsDisplay/postsDisplay.component";

@NgModule({
  declarations: [
    AppComponent,
    probSelectComponent,
    submitPostComponent,
    postsDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
