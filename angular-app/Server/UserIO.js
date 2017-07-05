// users table API
const usersCon = require('../database/users');
let users = new usersCon();

module.exports = class {

  constructor(socket, io){
    this.socket = socket;
    this.io = io;
  }

  addUser(userID){
    console.log(userID);
    // give administrator privaledges to user with this id
    if (userID == "54"){
      // tell browser to display admin content
      this.socket.emit('admin');
    }
    // set currentUser to whatever ID was given by the client
    this.socket.currentUserID = userID;
    // add user ID to users table in database
    users.addUser(userID);
  }

}
