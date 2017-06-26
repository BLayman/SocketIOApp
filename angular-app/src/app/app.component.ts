import { Component } from '@angular/core';
import {UserService} from './UserService/UserService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Code Share app';
  admin = false;
  userID : string = "";

  constructor(private userService : UserService){
    this.listenForAdmin();
  }

  ngOnInit(){
    this.getUserID();
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

  getUserID(){
    // get their user ID
    setTimeout(() => {
      do{
        var entered = prompt("Enter your student ID");
      }while(entered == null || entered == "");
      console.log("user added: " + entered);
      // send their user ID to the server to add it to the database
      this.userService.addUser(entered);

    }
  ,100)
}

}
