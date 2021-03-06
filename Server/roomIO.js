// posts table connection
const postsCon = require('../database/posts')
let posts = new postsCon();
// rooms table connection
const roomsCon = require('../database/rooms')
let rooms = new roomsCon();
// array for storing list of rooms active in current session
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
  joinRoom(roomPK, admin){
    let thisInstance = this; // for referencing instance variables
    console.log(this.socket.id + ' left room pk: ' + this.socket.currRoom);
    console.log(this.socket.id + ' joined room pk: ' + roomPK);
    // leave prevous room
    this.socket.leave(this.socket.currRoom);
    //join new room
    this.socket.join(roomPK);
    this.socket.currRoom = roomPK;
    // retrieve posts from database if user is an admin
    if (admin) {
      posts.retrieve(roomPK)
      .then(function (records) {
        let results = []; // array of posts to be sent in callback
        // create a new post for each record retrieved
        records.forEach(function (record){
          let post = {
            selected: false,
            viewing: false,
            body: record.dataValues.postBody,
            nickname: record.dataValues.nickname,
            userPK: record.dataValues.usersPk,
            roomPK: record.dataValues.roomsPk,
            id: record.dataValues.id
          };
          results.push(post);
        });
        // send posts array to be displayed in current client's browser
        thisInstance.socket.emit('response posts', results);
        console.log(results)
        console.log(' retrieved');
      })
      .catch(function (err) {
        console.log(err);
      })
    }
    // not admin: send back posts that have been published in that room
    else{
      // retrieve published posts from database
      posts.retrievePublished(roomPK)
      .then(records => {
        let results = []; // stores retrieved posts
        records.forEach((record) => {
          let post = {
            selected: false,
            viewing: false,
            body: record.dataValues.postBody,
            nickname: record.dataValues.nickname,
            userPK: record.dataValues.usersPk,
            roomPK: record.dataValues.roomsPk,
            id: record.dataValues.id
          }
          results.push(post);
        });
        // send published posts back to user that joined the room
        thisInstance.socket.emit('response published', results);
        console.log('published retrieved: ');
        console.log(results);
      })
    }
  }
  // delete room (from browser display), but not database content for that room
  deleteRoom(roomObj){
    console.log("removing: ");
    console.log(roomObj);
    // remove room from roomList
    let index = roomList.indexOf(roomObj);
    roomList.splice(index, 1);

    // uncomment to delete posts in that room from the database
    /*
    posts.deletePosts(roomPK)
    .then(() => {console.log('deleted posts in room with PK : ' + roomPK);})
    .catch((err) => {console.log(err);});
    */
    // notify all clients
    this.io.emit('room deleted', roomObj);
  }

  // get list of rooms
  getRoomList(){
    console.log("fetching rooms: " + roomList);
    return roomList;
  }

}
