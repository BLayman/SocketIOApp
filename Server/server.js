/* Imports */

// express
const express = require('express');
let app = express();
// http server
const server = require('http').Server(app);
// socket io
const io = require('socket.io')(server);
// modules for handling IO behavior
const PostIO = require('./postIO');
const RoomIO = require('./roomIO');
const UserIO = require('./UserIO');

/* express */
// send files in Public folder
app.use(express.static("../Public"));

/* io */
// io connection
io.on('connection',function(socket){
  console.log("io connected");
  // class for managing post IO
  const postIO = new PostIO(socket, io);
  const roomIO = new RoomIO(socket, io);
  const userIO = new UserIO(socket, io);
  // emit join event, sending list of problem rooms
  socket.emit('join', roomIO.getRoomList());

  /* user IO */
  // listen for addition of new user
  socket.on('addUser', function (userID){
    userIO.addUser(userID);
  });

  /* room IO */
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

  /* post IO */
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

// server listens on
server.listen(8080 || process.env.PORT,function () {
  console.log('listening on 8080');
});
