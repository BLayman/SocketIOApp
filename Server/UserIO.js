// users table API
const usersCon = require('../database/users');
let users = new usersCon();
// whitelists for student and admin IDs
let studentList;
let adminList;
// if their or config variables defining these lists, use those
if (process.env.STUDENT_IDS && process.env.ADMIN_IDS) {
  let tempStudentList = process.env.STUDENT_IDS.split(' ');
  let tempAdminList = process.env.ADMIN_IDS.split(' ');
  studentList = new Set(tempStudentList);
  adminList = new Set(tempAdminList);
}
// otherwise use test lists
else{
  studentList = new Set(["4","5","6","7","8","9"]);
  adminList = new Set(["1","2","3"]);
}

// UserIO class
module.exports = class {
  // set up socket in constructor
  constructor(socket, io){
    this.admin = false; // variable for storing whether on not a user is an admin
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
      users.addUser(userID)
      .then((userPk) => {
        // tell browser user user is valid and send user session id
        this.socket.emit("validation", {valid: true, pk: userPk});
      })
    }
    else{
      // tell browser user is invalid
      this.socket.emit("validation", {valid: false, pk:-1});
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
  searchStudents(user){
    return studentList.has(user);
  }
  // determing if user has a valid admin ID
  searchAdmins(user){
    return adminList.has(user);
  }
}
