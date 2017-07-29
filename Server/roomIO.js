// posts table connection
const postsCon = require('../database/posts')
let posts = new postsCon();
// rooms table connection
const roomsCon = require('../database/rooms')
let rooms = new roomsCon();
// default room list REPLACE
let roomList = [];

// roomIO class
module.exports = class {

  // set up socket connection
  constructor(socket, io){
    this.socket = socket;
    this.io = io;
  }

  // called when new room is created
  addRoom(newRoom){
    // add room to rooms table
    rooms.addRoom(newRoom)
    .then((roomPK) => {
      console.log(newRoom + " added with key: " + roomPK);
      // add new room to roomList
      roomList.push({name:newRoom, pk:roomPK});
      // notify all clients of new room
      this.io.emit('response rooms', [{name:newRoom, pk:roomPK}]);
    })
    .catch(function (err) {
      console.log(err);
    })

  }

  // called when a user selects a room
  joinRoom(roomPK, admin, publishedPosts){
    let thisInstance = this; // for referencing instance variables
    console.log(this.socket.id + ' joined room pk: ' + roomPK);
    // leave prevous room
    this.socket.leave(this.socket.currRoom);
    /*
    roomList.forEach(function (room){
      thisInstance.socket.leave(room);
    });
    */
    //join new room
    this.socket.join(roomPK);
    this.socket.currRoom = roomPK;
    // retrieve posts from database if user is an admin
    if (admin) {
      posts.retrieve(roomPK)
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
      if(publishedPosts[roomPK]){
        this.socket.emit('response published', publishedPosts[roomPK]);
      }
    }
  }

  deleteRoom(roomPK){
    // remove room from roomList
    //let index = roomList.indexOf(/*****/);
    //roomList.splice(index, 1);

    // delete posts contained in that room
    posts.deletePosts(roomPK)
    .then(() => {console.log('deleted posts in room with PK : ' + roomPK);})
    .catch((err) => {console.log(err);});
    // notify all clients
    this.io.emit('room deleted', roomPK);
  }

  // get list of rooms
  getRoomList(){
    console.log("fetching rooms: " + roomList);
    return roomList;
  }

}
