const Sequelize = require('sequelize');
const db = require('./db2');
const connection = db.sequelize;

// posts model
let Posts = db.posts;

// methods on the posts model
module.exports = function () {
  // method for inserting posts
  this.addPost = function (userID, name, post, postRoom){
    return new Promise((resolve, reject) => {
      connection.sync(/*{force:true}*/).then(function () {
        // create new row using userID and post as arguments
        Posts.create({
          studentID : userID,
          nickname : name,
          postBody: post,
          room: postRoom
        })
        .then(function (inserted) {
          resolve(inserted);
          //console.log(insertedUser.dataValues);
        })
        .catch(function (err) {
          console.log(' ERROR: ' + err);
          reject(err);
        });
      });
    });
  },

  // method fo retrieving array of posts
  this.retrieve = function (postsRoom) {
    return new Promise((resolve, reject) => {
      Posts.findAll({
        where: {
          room: postsRoom
        }
      })
      .then(function (records) {
        let results = []; // array of posts to be sent in callback
        records.forEach(function (record){
          let post = {selected:false, body:record.dataValues.postBody, nickname: record.dataValues.nickname};
          results.push(post);
        });
        resolve(results);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  // for deleting all posts
  this.deletePosts = function (postsRoom) {
    return new Promise(function (resolve, reject) {
      Posts.destroy({
        where: {
          room: postsRoom
        }
      })
      .then(function () {
        resolve(postsRoom);
      })
      .catch(function () {
        reject("failed to delete posts");
      });
    });

  }

}

/* testing
modExp = new module.exports();
modExp.addPost(222, "new post");
modExp.retrieve();
*/
