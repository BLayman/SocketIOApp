import { Component, Input, ViewChild } from '@angular/core';
import {UserService} from './UserService/UserService.service';
import {Dialog} from './popup/popup.component';
import {MdDialog, MdDialogRef} from '@angular/material';
import {postsDisplayComponent} from "./postsDisplay/postsDisplay.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(postsDisplayComponent) postsDisp: postsDisplayComponent;
  dialogRef : MdDialogRef<Dialog>;
  title = 'Share Code';
  admin : boolean = false;
  userID : string = "";
  userPK : number;
  nickname: string = "";
  validationError : boolean = false;

  constructor(private userService : UserService, public dialog: MdDialog ){
    this.openDialog();
  }

  ngOnInit(){
    this.listenForAdmin();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(Dialog,{disableClose: true,});
    if (this.validationError) {
      this.dialogRef.componentInstance.errorMsg = "Blank nickname or invalid ID.";
    }
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
      console.log(result);
      if(result.stID == "" || result.ncknm == ""){
        this.validationError = true;
        this.openDialog();
        return;
      }
      this.userService.addUser(result.stID)
      .then((resObj: any) => {
        if (resObj.valid) {
          console.log("passed verification");
          this.userPK = resObj.pk;
          this.userID = result.stID;
          this.nickname = result.ncknm;
        }
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

  listenForAdmin(){
    this.userService.listenForAdmin()
    .subscribe(
      (isAdmin) => {
        if (isAdmin) {
          console.log("administrator");
          this.admin = true;
          this.postsDisp.listenForPosts();
        }
        else{
          console.log("listening for published");
          this.admin = false;
          this.postsDisp.listenForPublished();
        }
      },
      (error) => {console.log(error);},
      () => {console.log("done");}
    );
  }


}
