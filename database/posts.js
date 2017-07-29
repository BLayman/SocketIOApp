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
          usersId : userID,
          nickname : name,
          postBody: post,
          roomId: postRoom
        })
        .then(function (inserted) {
          resolve(inserted);
          //console.log(insertedUser.dataValues.usersId);
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
          roomId: postsRoom
        }
      })
      .then(function (records) {
        let results = []; // array of posts to be sent in callback
        records.forEach(function (record){
          let post = {
            selected: false,
            viewing: false,
            body: record.dataValues.postBody,
            nickname: record.dataValues.nickname,
            userPK: record.dataValues.usersPk,
            roomPK: record.dataValues.roomsPk
          };
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
          roomId: postsRoom
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
