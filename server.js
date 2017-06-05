let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

let usersCon = require('./database/users');
let users = new usersCon(); // users table API
let postsCon = require('./database/posts')
let posts = new postsCon; // posts table API

// send files in Public folder
app.use(express.static("Public"));

// set of rooms for current server session
let roomList = [];

// io connection
io.on('connection',function(socket){
  console.log("io connected");
  let codeList = []; // list of posts
  socket.currRoom = ''; // current problem room

  // emit join event, sending list of problem rooms
  socket.emit('join', roomList );

  /* new user */

  // listen for addition of new user
  socket.on('addUser', function (userID){
    // give administrator privaledges to user with this id
    if (userID == 753){
      // tell browser to display admin content
      socket.emit('admin');
    }
    // set currentUser to whatever ID was given by the client
    socket.currentUserID = userID;
    // add user ID to users table in database
    users.addUser(userID);
  });

  /* room logic */

  // join selected room
  socket.on('join room', function (room) {
    console.log(socket.id + ' joined ' + room);
    // leave prevous rooms
    roomList.forEach(function (room){
      socket.leave(room);
    });
    //join new room
    socket.join(room);
    socket.currRoom = room;
    // retrieve array of posts for that room
    posts.retrieve(room, function (array) {
      codeList = array;
      // console.log(codeList);
      // send codeList to be displayed in current client's browser
      socket.emit('display room', codeList);
    });
  });

  // creation of new room
  socket.on('new room', function (newRoom) {
    // add room to roomList
    roomList.push(newRoom);
    console.log(newRoom + "added to " + roomList);
    // notify all clients of new room
    io.emit('add room', newRoom);
  });

  // delete a room
  socket.on('delete room', function (room) {
      let index = roomList.indexOf(room);
      roomList.splice(index, 1);
      // delete posts contained in that room
      posts.deletePosts(room);
      // notify all clients
      io.emit('room deleted');
  });

  /* revieve and broadcast post entries */

  // listen for code posted by user
  socket.on('sendCode', function (code) {
    // if no room has been selected, return error
    if(socket.currRoom == ""){
      socket.emit('no room');
    }
    // otherwise add code to posts, and send to all users in room
    else{
      console.log(code + " sent in room " + socket.currRoom);
      // add code to posts table in database
      posts.addPost(socket.currentUserID, code, socket.currRoom);
      // broadcast code to all users in the currRoom room
      io.in(socket.currRoom).emit('sendBack', code);
    }
  });

  /* delete posts */

  // listen for event to clear code submissions
  socket.on('clear',function () {
    // clear table in database
    posts.deletePosts(socket.currRoom);
    // tell browser to clear content
    io.in(socket.currRoom).emit('cleared');
  });

});

server.listen(8080 || process.env.PORT,function () {
  console.log('listening on 8080');
});
