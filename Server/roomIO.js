// posts table API
const postsCon = require('../database/posts')
let posts = new postsCon();
// default room list
let roomList = ["problem 1", "problem 2"];

// roomIO class
module.exports = class {

  // set up socket connection
  constructor(socket, io){
    this.socket = socket;
    this.io = io;
  }

  // called when new room is created
  addRoom(newRoom){
    // add room to roomList
    roomList.push(newRoom);
    console.log(newRoom + " added to " + roomList);
    // notify all clients of new room
    this.io.emit('response rooms', [newRoom]);
  }

  // called when a user selects a room
  joinRoom(room, admin, publishedPosts){
    let thisInstance = this; // for referencing instance variables
    console.log(this.socket.id + ' joined ' + room);
    // leave prevous rooms
    roomList.forEach(function (room){
      thisInstance.socket.leave(room);
    });
    //join new room
    this.socket.join(room);
    this.socket.currRoom = room;
    // retrieve posts from database if user is an admin
    if (admin) {
      posts.retrieve(room)
      .then(function (posts) {
        // send posts array to be displayed in current client's browser
        thisInstance.socket.emit('response posts', posts);
        console.log(posts + ' retrieved');
      })
      .catch(function (err) {
        console.log(err);
      })
    }
    // not admin
    else{
      // send back posts that have been published in that room
      console.log(publishedPosts);
      if(publishedPosts[room]){
        this.socket.emit('response published', publishedPosts[room]);
      }
    }
  }

  deleteRoom(room){
    // remove room from roomList
    let index = roomList.indexOf(room);
    roomList.splice(index, 1);

    // delete posts contained in that room
    posts.deletePosts(room)
    .then(() => {console.log('deleted posts in room : ' + room);})
    .catch((err) => {console.log(err);});
    // notify all clients
    this.io.emit('room deleted', room);
  }

  // get list of rooms
  getRoomList(){
    console.log("fetching rooms: " + roomList);
    return roomList;
  }

}
