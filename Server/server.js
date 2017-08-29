/* Imports */
// path
const path = require('path');
// express
const express = require('express');
const app = express();
// http server
const server = require('http').Server(app);
// socket io
const io = require('socket.io')(server);
// modules for handling IO behavior
const PostIO = require('./postIO');
const UserIO = require('./UserIO');
const RoomIO = require('./roomIO');


/* express */
// send files in Public folder
app.use(express.static(path.join(__dirname, '/../dist')));

/* io */
// io connection
io.on('connection',function(socket){
  socket.currRoom = ""; // set default room to be empty string
  console.log("io connected: " + socket.id);
  // create instances of classes for handing posts, users, and rooms
  const postIO = new PostIO(socket, io);
  const userIO = new UserIO(socket, io);
  const roomIO = new RoomIO(socket, io);

  // send rooms to new user using list in roomIO
  socket.emit('response rooms', roomIO.getRoomList());

  /* user IO */
  // listen for addition of new user
  socket.on('add user', function (userID){
    userIO.addUser(userID);
  });

  /* room IO */

  // join selected room
  socket.on('join room', function (roomPK) {
    console.log("admin: " + userIO.getAdmin());
    roomIO.joinRoom(roomPK, userIO.getAdmin());
  });

  // creation of new room
  socket.on('new room', function (newRoom) {
    roomIO.addRoom(newRoom);
  });

  // delete a room
  socket.on('delete room', function (roomObj) {
    roomIO.deleteRoom(roomObj);
  });

  /* post IO */
  // listen for new post from user
  socket.on('new post', function (newPost) {
    postIO.processNewPost(newPost);
  });

  // listen for posts published by the admin
  socket.on("publish posts", function (published) {
    postIO.markPublished(published);
  })

  socket.on("clear published", function (roomPK) {
    postIO.unmarkPublished(roomPK);
  })

  // listen for event to clear code submissions
  socket.on('delete posts',function (roomPK) {
    // delete posts from current room
    postIO.deletePosts(roomPK);
  });

});

// server listens on
const port = process.env.PORT || 8080;
server.listen(port, function () {
  console.log(`listening on: ${port}`);
});
