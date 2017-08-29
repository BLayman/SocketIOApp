const Sequelize = require('sequelize');
const db = require('./db2');
const connection = db.sequelize;

// posts model
let Posts = db.posts;

// methods on the posts model
module.exports = function () {
  // method for inserting posts
  this.addPost = function (post){
    return new Promise((resolve, reject) => {
      // uncomment force:true option to force changes on database structure
      connection.sync(/*{force:true}*/).then(function () {
        // create new row using post object information
        Posts.create({
          userId : post.userPK,
          nickname : post.nickname,
          postBody: post.body,
          roomId: post.roomPK,
          published: false
        })
        // once inserted resolve promise with new refinedPost object
        .then(function (inserted) {
          let refinedPost = post;
          // get id from new row in database
          refinedPost.id = inserted.dataValues.id;
          console.log("Inserted by user: " + inserted.dataValues.userId);
          console.log("post refined by database: ");
          console.log(refinedPost);
          resolve(refinedPost);
        })
        .catch(function (err) {
          console.log(' ERROR: ' + err);
          reject(err);
        });
      });
    });
  },
  // mark a post as published by setting it's published column to true
  this.markPublished = function (postID) {
    return new Promise((resolve, reject) => {
      // uncomment force:true option to force changes on database structure
        connection.sync(/*{force:true}*/).then(() => {
            Posts.update({
              published:true
            },{
              where:{id: postID},
              returning: true
            })
            .then(record => {
              resolve(postID);
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            })
        })
    })
  },
  // retrieve all posts that have been published in a given room
  this.retrievePublished = function (postsRoomPK) {
    return new Promise((resolve, reject) => {
        Posts.findAll({
          where: {
            roomId : postsRoomPK,
            published: true
          }
        })
        .then(records => {
          resolve(records);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
    })
  },
  // set published to false for all posts in a given room
  this.unmarkPublished = function (roomPK) {
    return new Promise((resolve, reject) => {
      // uncomment force:true option to force changes on database structure
        connection.sync(/*{force:true}*/).then(() => {
            Posts.update({
              published:false
            },{
              where:{
                roomId: roomPK,
                published: true
              },
              returning: true
            })
            .then(result => {
              console.log("unmarked");
              resolve(result);
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            })
        })
    })
  },

  // method fo retrieving array of posts for a given room
  this.retrieve = function (postsRoom) {
    return new Promise((resolve, reject) => {
      Posts.findAll({
        where: {
          roomId: postsRoom
        }
      })
      .then(function (records) {
        resolve(records);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  // for deleting all posts in a given room
  this.deletePosts = function (postsRoom) {
    return new Promise(function (resolve, reject) {
      Posts.destroy({
        where: {
          roomId: postsRoom
        }
      })
      .then(function (rows) {
        console.log("rows destroyed: " + rows);
        resolve(postsRoom);
      })
      .catch(function () {
        reject("failed to delete posts");
      });
    });
  }
}
