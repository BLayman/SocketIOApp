// posts table API
const postsCon = require('../database/posts')
const posts = new postsCon();

// DELETE ?
let publishedPosts = {}; // posts that an admin has published, with keys as rooms and values as arrays of posts

//postIO class
module.exports = class {
  // set up socket
  constructor(socket, io){
    this.socket = socket;
    this.io = io;
  }
  // DELETE ?
  // get posts published by admin
  getPublishedPosts(){
    console.log("getPublishedPosts: " + publishedPosts);
    return publishedPosts;
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
  }

  // TODO
  // clear list of published posts in that room
  deletePublished(room){
    publishedPosts[room] = [];
    // tell clients to delete all posts in that room
    this.io.in(this.socket.currRoom).emit('published deleted');
  }


  processPublished(published){
    console.log("received: ");
    console.log(published);
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

  // mark these posts as published
  markPublished(published){
    console.log("received: ");
    console.log(published);
    // mark as published in our database
    published.forEach((post) => {
      posts.markPublished(post.id);
    });
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
