import {Component} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'my-dialog',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class Dialog {
  userInput : {ncknm:string,stID:string};
  errorMsg: string = "";

  constructor(public dialogRef: MdDialogRef<Dialog>){}
}
