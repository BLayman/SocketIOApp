import { Component, Input } from '@angular/core';
import {UserService} from './UserService/UserService.service';
import {Dialog} from './popup/popup.component';
import {MdDialog, MdDialogRef} from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dialogRef : MdDialogRef<Dialog>;
  title = 'Share Code';
  admin : boolean = false;
  userID : string = "";
  validationError : boolean = false;

  constructor(private userService : UserService, public dialog: MdDialog ){
    this.listenForAdmin();
    this.openDialog();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(Dialog,{disableClose: true,});
    if (this.validationError) {
      this.dialogRef.componentInstance.errorMsg = "Invalid Nickname or Student ID";
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
      .then((isValid) => {
        if (isValid) {
          console.log("passed verification");
          this.userID = result.stID;
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
      () => {
        console.log("administrator");
        this.admin = true;
      },
      (error) => {console.log(error);},
      () => {console.log("done");}
    );
  }


}
