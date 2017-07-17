// posts table API
const postsCon = require('../database/posts')
let posts = new postsCon();
publishedPosts = {};

module.exports = class {

  constructor(socket, io){
    this.socket = socket;
    this.io = io;
  }

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

  deletePublished(room){
    publishedPosts[room] = [];
    this.io.in(this.socket.currRoom).emit('published deleted');
  }

  // broadcast published posts to other users
  processPublished(published){
    console.log("recieved: " + published);
    let room = this.socket.currRoom;
    // if the current room property doesn't yet exist in our object
    if (!publishedPosts[room]) {
      console.log("found property in publishedPosts");
      // create it with the published posts
      publishedPosts[room] = published;
    }
    // if the property does exist
    else{
      console.log("no property in publishedPosts");
      // add published posts to that array property
      published.forEach((post) => publishedPosts[room].push(post));
    }

    console.log(publishedPosts);
    // if student submitted a post, show it in their display
      this.socket.emit('response published', published);
    // if admin submitted the posts, show them to all student users
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
