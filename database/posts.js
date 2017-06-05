const Sequelize = require('sequelize');
const db = require('./db2');
const connection = db.sequelize;

// posts model
let Posts = db.posts;

// methods on the posts model
module.exports = function () {
  // method for inserting posts
  this.addPost = function (userID, post, postCategory, successCallback = () => {},failureCallback = (err) => {}) {
    connection.sync(/*{force:true}*/).then(function () {
      // create new row using userID and post as arguments
      Posts.create({
        studentID : userID,
        postBody: post,
        group: postCategory
      })
      .then(function (insertedUser) {
        console.log('* Inserted *');
        successCallback();
        //console.log(insertedUser.dataValues);
      })
      .catch(function (err) {
        console.log(' ERROR: ' + err);
        failureCallback(err);
      });
    });
  },

  // method fo retrieving array of posts
  this.retrieve = function (postsGroup, success = () => {}, failure = () => {}) {
    Posts.findAll({
      attributes: ['postBody'],
      where: {
        group: postsGroup
      }
    })
    .then(function (records) {
      let results = []; // array of posts to be sent in callback
      records.forEach(function (record){
        results.push(record.dataValues.postBody);
      });
      //console.log(results);
      success(results);
    })
    .catch(function (err) {
      console.log(err);
      failure(err);
    });
  },

  // for deleting all posts
  this.deletePosts = function (postsGroup, callback = () => {}) {
    Posts.destroy({
      where: {
        group: postsGroup
      }
    });
    callback();
  }

}

/* testing
modExp = new module.exports();
modExp.addPost(222, "new post");
modExp.retrieve();
*/
