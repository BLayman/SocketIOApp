var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var usersCon = require('./database/users');
var users = new usersCon(); // users table API
var postsCon = require('./database/posts')
var posts = new postsCon; // posts table API

// send files in Public folder
app.use(express.static("Public"));
/*
// rendering practice
app.get('/posts',function (req,res) {
  res.locals = {submissions : codeList};
  res.render('posts.ejs');
});
*/

// io connection
io.on('connection',function(socket){
  console.log("io connected");
  // retrieve list of posts from database
  var codeList = [];
  posts.retrieve(function (array){
    codeList = array;
    console.log(codeList);
    // emit join event
    socket.emit('join', codeList);
  }); // for storing code submissions

  // listen for addition of new user
  socket.on('addUser', function (userID){
    console.log(userID);
    // set currentUser to whatever ID was given by the client
    socket.currentUserID = userID;
    // add user ID to users table in database
    users.addUser(userID);
    //database.insert('users','studentid',userID);
  });

  // listen for code sent from user
  socket.on('sendCode', function (code) {
    console.log(code);
    // add code to posts table in database
    posts.addPost(socket.currentUserID,code);
    /* add to codeList array
    codeList.push(code);*/
    // broadcast code to all users
    socket.emit('sendBack', code);
    socket.broadcast.emit('sendBack', code);
  });
  // listen for event to clear code submissions
  socket.on('clear',function () {
    /* empty codeList array
    codeList = []; */
    // clear table in database
    posts.deletePosts();
    // tell browsers to clear content
    socket.emit('cleared');
    socket.broadcast.emit('cleared');
  });

});

server.listen(8080 || process.env.PORT,function () {
  console.log('listening on 8080');
});
