// users table API
const usersCon = require('../database/users');
let users = new usersCon();
// whitelists for student and admin IDs
let studentList;
let adminList;
// if their or config variables defining these lists, use those
if (process.env.STUDENT_IDS && process.env.ADMIN_IDS) {
  studentList = process.env.STUDENT_IDS.split(' ');
  adminList = process.env.ADMIN_IDS.split(' ');
}
// otherwise use test lists
else{
  studentList = ["3","4","5","6","7","8","9"];
  adminList = ["1","2","3"];
}

// UserIO class
module.exports = class {
  // set up socket in constructor
  constructor(socket, io){
    this.admin; // variable for storing whether on not a user is an admin
    this.socket = socket;
    this.io = io;
  }
  // other classes may need to know if the user is an admin
  getAdmin(){
    return this.admin;
  }
  // function called when user first joins
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
      // set admin variable to true and tell browser to display admin content
      this.admin = true;
      this.socket.emit('admin', true);
    }
    else {
      // set admin variable to false and tell browser not to display admin content
      this.admin = false;
      this.socket.emit('admin', false);
    }
  }
  // determing if user has a valid student ID
  searchStudents(student){
    for (var i = 0; i < studentList.length; i++) {
      if (studentList[i] == student){
        return true;
      }
    }
    return false;
  }
  // determing if user has a valid admin ID
  searchAdmins(student){
    for (var i = 0; i < adminList.length; i++) {
      if (adminList[i] == student){
        return true;
      }
    }
    return false;
  }

}
