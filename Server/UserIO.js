// users table API
const usersCon = require('../database/users');
let users = new usersCon();
studentList = ["3","4","5","6","7","8","9"];
adminList = ["1","2","3"];

module.exports = class {

  constructor(socket, io){
    this.socket = socket;
    this.io = io;
  }

  addUser(userID){
    console.log(userID);
    // if user is valid student or admin
    if (this.searchStudents(userID) || this.searchAdmins(userID)){
      // set currentUser to whatever ID was given by the client
      this.socket.currentUserID = userID;
      // add user ID to users table in database
      users.addUser(userID);
      // tell browser user is valid
      this.socket.emit("validation", true);
    }
    else{
      // tell browser user is invalid
      this.socket.emit("validation", false);
    }
    // if user has admin id
    if (this.searchAdmins(userID)){
      // tell browser to display admin content
      this.socket.emit('admin');
    }
  }

  searchStudents(student){
    for (var i = 0; i < studentList.length; i++) {
      if (studentList[i] == student){
        return true;
      }
    }
    return false;
  }

  searchAdmins(student){
    for (var i = 0; i < adminList.length; i++) {
      if (adminList[i] == student){
        return true;
      }
    }
    return false;
  }

}
