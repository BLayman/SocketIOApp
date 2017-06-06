// posts table API
const postsCon = require('../database/posts')
let posts = new postsCon();

let roomList = [];
console.log(roomList);


module.exports = class {

  constructor(socket, io){
    this.socket = socket;
    this.io = io;
  }

  addRoom(newRoom){
    // add room to roomList
    roomList.push(newRoom);
    console.log(newRoom + " added to " + roomList);
    // notify all clients of new room
    this.io.emit('add room', newRoom);
  }

  joinRoom(room){
    let thisInstance = this;
    console.log(this.socket.id + ' joined ' + room);
    // leave prevous rooms
    roomList.forEach(function (room){
      thisInstance.socket.leave(room);
    });
    //join new room
    this.socket.join(room);
    this.socket.currRoom = room;
    // retrieve array of posts for that room
    posts.retrieve(room)
    .then(function (array) {
      // send posts array to be displayed in current client's browser
      thisInstance.socket.emit('display room', array);
      console.log(array + ' retrieved');
    })
    .catch(function (err) {
      console.log(err);
    })
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
  
  // get roomList variable
  getRoomList(){
    return roomList;
  }

}
