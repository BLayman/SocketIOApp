const Sequelize = require('sequelize');
const db = require('./db2');
var connection = db.sequelize;

// posts model
var Posts = db.posts;

// methods on the posts model
module.exports = function () {
  // method for inserting posts
  this.addPost = function (userID, post, callback) {
    connection.sync(/*{force:true}*/).then(function () {
      // create new row using userID and post as arguments
      Posts.create({
        studentID : userID,
        postBody: post
      })
      .then(function (insertedUser) {
        console.log('* Inserted *');
        if (typeof callback === 'function') callback();
        //console.log(insertedUser.dataValues);
      })
      .catch(function (err) {
        console.log(' ERROR: ' + err.name);
        if (typeof callback === 'function') callback();
      });
    });
  },

  // method fo retrieving array of posts
  this.retrieve = function (success = () => {}, failure = () => {}) {
    Posts.findAll({
      attributes: ['postBody']
    })
    .then(function (records) {
      var results = []; // array of posts to be sent in callback
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
  this.deletePosts = function (callback = () => {}) {
    Posts.destroy({truncate: true});
    callback();
  }

}

/* testing
modExp = new module.exports();
modExp.addPost(222, "new post");
modExp.retrieve();
*/
