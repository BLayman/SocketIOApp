// posts table API
const postsCon = require('../database/posts')
const posts = new postsCon();

//postIO class
module.exports = class {
  // set up socket
  constructor(socket, io){
    this.socket = socket;
    this.io = io;
  }

  // delete posts from current room
  deletePosts(roomPK){
    // clear table in database
    posts.deletePosts(roomPK)
    .then(function (room) {
      console.log('deleted posts in room id: ' + room);
    })
    .catch((err) => {console.log(err);});
    // tell browser to clear content
    this.io.in(this.socket.currRoom).emit('posts deleted');
    // when posts are deleted, published posts should also be deleted
    this.io.in(this.socket.currRoom).emit('published deleted');
  }

  // un-publish posts in a given room
  unmarkPublished(roomPK){
    // set published to false in database entries
    posts.unmarkPublished(roomPK);
    console.log("current room: " + this.socket.currRoom);
    // tell clients to delete all posts in that room
    this.io.in(this.socket.currRoom).emit('published deleted');
  }

  // mark this array of posts as published
  markPublished(published){
    console.log("received: ");
    console.log(published);
    // mark as published in our database for each post
    published.forEach((post) => {
      posts.markPublished(post.id);
    });
    // publish posts to student users
    this.io.in(this.socket.currRoom).emit('response published', published);
  }

  // new post
  processNewPost(post){
    // if no room has been selected, return error
    if(this.socket.currRoom == ""){
      this.socket.emit('no room');
    }
    // otherwise add postContent to posts table, and send to all users in room
    else{
      console.log(post.body + " sent in room " + this.socket.currRoom);
      console.log("this.socket.currentUserID: " + this.socket.currentUserID);
      // add postContent to posts table in database
      posts.addPost(post)
      .then((inserted) => {
        console.log('post added: ')
        console.log(inserted);
        // broadcast postContent to all users in the currRoom room
        this.io.in(this.socket.currRoom).emit('response posts', [inserted]);
      })
      .catch((err) => {console.log(err);});
    }
  }
}
