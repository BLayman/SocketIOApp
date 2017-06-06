// express
const express = require('express');
let app = express();
// http server
const server = require('http').Server(app);
// socket io
const io = require('socket.io')(server);
// users table API
const usersCon = require('../database/users');
let users = new usersCon();
// posts table API
const postsCon = require('../database/posts')
let posts = new postsCon();

var roomList = [];
exports.roomList = roomList;
// postIO
const PostIO = require('./postIO');
const RoomIO = require('./roomIO');

// send files in Public folder
app.use(express.static("../Public"));

// io connection
io.on('connection',function(socket){
  console.log("io connected");
  // class for managing post IO
  const postIO = new PostIO(socket, io);
  const roomIO = new RoomIO(socket, io);

  // emit join event, sending list of problem rooms
  socket.emit('join', roomList);

  /* new user */

  // listen for addition of new user
  socket.on('addUser', function (userID){
    // give administrator privaledges to user with this id
    if (userID == 753){
      // tell browser to display admin content
      socket.emit('admin');  socket.currRoom = ''; // current problem room
    }
    // set currentUser to whatever ID was given by the client
    socket.currentUserID = userID;
    // add user ID to users table in database
    users.addUser(userID);
  });

  /* room logic */

  socket.currRoom = ''; // set invalid default room

  // join selected room
  socket.on('join room', function (room) {
    roomIO.joinRoom(room);
  });

  // creation of new room
  socket.on('new room', function (newRoom) {
    roomIO.addRoom(newRoom);
  });

  // delete a room
  socket.on('delete room', function (room) {
      roomIO.deleteRoom(room);
  });

  /* post logic */

  // listen for new post from user
  socket.on('sendCode', function (postContent) {
    postIO.processNewPost(postContent)
  });

  // listen for event to clear code submissions
  socket.on('clear',function () {
    // delete posts from current room
    postIO.deletePosts();
  });

});

server.listen(8080 || process.env.PORT,function () {
  console.log('listening on 8080');
});
