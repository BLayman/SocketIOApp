import { Component, Input, ViewChild } from '@angular/core';
import {UserService} from './UserService/UserService.service';
import {Dialog} from './popup/popup.component';
import {MdDialog, MdDialogRef} from '@angular/material';
import {postsDisplayComponent} from "./postsDisplay/postsDisplay.component";

// this component handles the popup, and user setup
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(postsDisplayComponent) postsDisp: postsDisplayComponent;
  dialogRef : MdDialogRef<Dialog>; // popup
  title = 'Share Code'; // html title
  admin : boolean = false; // non-admin privaleges by default
  // user info
  userID : string = "";
  userPK : number;
  nickname: string = "";
  // for handling login errors
  validationError : boolean = false;

  constructor(private userService : UserService, public dialog: MdDialog ){
    // open login popup
    this.openDialog();
  }

  ngOnInit(){
    // listen for whether user is an admin
    this.listenForAdmin();
  }

  // open popup
  openDialog() {
    this.dialogRef = this.dialog.open(Dialog,{disableClose: true,});
    // catch validationError in case function is called again after error
    if (this.validationError) {
      // display error message
      this.dialogRef.componentInstance.errorMsg = "Blank nickname or invalid ID.";
    }
    // after dialog form is submitted
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
      console.log(result);
      // test for missing fields
      if(result.stID == "" || result.ncknm == ""){
        this.validationError = true;
        this.openDialog();
        return;
      }
      // notify server of user login
      this.userService.addUser(result.stID)
      .then((resObj: any) => {
        // if user passes verification
        if (resObj.valid) {
          console.log("passed verification");
          this.userPK = resObj.pk;
          this.userID = result.stID;
          this.nickname = result.ncknm;
        }
        // if user fails verification
        else{
          console.log("failed verification");
          this.validationError = true;
          this.openDialog();
          return;
        }
      })
      .catch((error) => {console.log(error);})
    });
  }
  // listen for whether user has administrative privaleges
  listenForAdmin(){
    this.userService.listenForAdmin()
    .subscribe(
      (isAdmin) => {
        // if they are an admin
        if (isAdmin) {
          console.log("administrator");
          this.admin = true;
          // listen for all posts
          this.postsDisp.listenForPosts();
        }
        // if not admin
        else{
          console.log("listening for published");
          this.admin = false;
          // just listen for published posts
          this.postsDisp.listenForPublished();
        }
      },
      (error) => {console.log(error);},
      () => {console.log("done");}
    );
  }


}
