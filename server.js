var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var codeList = []; // for storing code submissions

const database = require('./db');
var db = new database();
db.addUser("4");

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

  console.log("connected");
  // emit join event
  socket.emit('join', codeList);

  // listen for code sent from user
  socket.on('sendCode', function (code) {
    console.log(code);
    // add to codeList array
    codeList.push(code);
    // broadcast code to all users
    socket.emit('sendBack', code);
    socket.broadcast.emit('sendBack', code);
  });
  // listen for event to clear code submissions
  socket.on('clear',function () {
    // empty codeList array
    codeList = [];
    // tell browsers to clear content
    socket.emit('cleared');
    socket.broadcast.emit('cleared');
  });

});

server.listen(8080);
