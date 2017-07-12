import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from '@angular/material';
import { MdDialogModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import { AppComponent } from './app.component';
import { ProbSelectComponent} from './probSelect/probSelect.component'
import { SubmitPostComponent } from "./submitPost/submitPost.component";
import {postsDisplayComponent} from "./postsDisplay/postsDisplay.component";
import {Dialog} from './popup/popup.component';

import {PostService} from "./PostsService/PostsService.service";
import {ProbService} from './ProbsService/ProbsService.service';
import {UserService} from './UserService/UserService.service';
import {AppService} from "./app.service";


@NgModule({
  declarations: [
    AppComponent,
    ProbSelectComponent,
    SubmitPostComponent,
    postsDisplayComponent,
    Dialog,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MdDialogModule,
  ],
  entryComponents:[Dialog],
  providers: [AppService,PostService, ProbService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
