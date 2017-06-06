// posts table API
const postsCon = require('../database/posts')
let posts = new postsCon();

module.exports = class {

  constructor(socket, io){
    this.socket = socket;
    this.io = io;
  }

  // delete posts from current room
  deletePosts(){
    // clear table in database
    posts.deletePosts(this.socket.currRoom)
    .then(function (room) {
      console.log('deleted posts in room: ' + room);
    })
    .catch((err) => {console.log(err);});
    // tell browser to clear content
    this.io.in(this.socket.currRoom).emit('cleared');
  }

  // new post
  processNewPost(postContent){
    // if no room has been selected, return error
    if(this.socket.currRoom == ""){
      this.socket.emit('no room');
    }
    // otherwise add postContent to posts, and send to all users in room
    else{
      console.log(postContent + " sent in room " + this.socket.currRoom);
      // add postContent to posts table in database
      posts.addPost(this.socket.currentUserID, postContent, this.socket.currRoom)
      .then(() => {console.log('post added: ' + postContent);})
      .catch((err) => {console.log(err);});
      // broadcast postContent to all users in the currRoom room
      this.io.in(this.socket.currRoom).emit('sendBack', postContent);
    }
  }
}
