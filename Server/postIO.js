// posts table API
const postsCon = require('../database/posts')
let posts = new postsCon();

publishedPosts = {}; // posts that an admin has published, with keys as rooms and values as arrays of posts

//postIO class
module.exports = class {
  // set up socket
  constructor(socket, io){
    this.socket = socket;
    this.io = io;
  }
  // get posts published by admin
  getPublishedPosts(){
    console.log("getPublishedPosts: " + publishedPosts);
    return publishedPosts;
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
    this.io.in(this.socket.currRoom).emit('posts deleted');
  }

  // clear list of published posts in that room
  deletePublished(room){
    publishedPosts[room] = [];
    // tell clients to delete all posts in that room
    this.io.in(this.socket.currRoom).emit('published deleted');
  }

  // broadcast published posts to other users
  processPublished(published){
    console.log("received: " + published);
    let room = this.socket.currRoom;
    // if the current room property doesn't yet exist in our object
    if (!publishedPosts[room]) {
      console.log("no property in publishedPosts");
      // create it with the published posts
      publishedPosts[room] = published;
    }
    // if the property exists
    else{
      console.log("found property in publishedPosts");
      // add published posts to that array property
      published.forEach((post) => publishedPosts[room].push(post));
    }
    console.log(publishedPosts);
    // emit published post to all users in this room
    this.io.in(this.socket.currRoom).emit('response published', published);
  }

  // new post
  processNewPost(post){
    // if no room has been selected, return error
    if(this.socket.currRoom == ""){
      this.socket.emit('no room');
    }
    // otherwise add postContent to posts, and send to all users in room
    else{
      console.log(post.body + " sent in room " + this.socket.currRoom);
      // add postContent to posts table in database
      console.log("this.socket.currentUserID: " + this.socket.currentUserID);
      posts.addPost(this.socket.currentUserID, post.nickname, post.body, this.socket.currRoom)
      .then(() => {console.log('post added: ' + post.body);})
      .catch((err) => {console.log(err);});
      // broadcast postContent to all users in the currRoom room
      this.io.in(this.socket.currRoom).emit('response posts', [post]);
    }
  }
}
