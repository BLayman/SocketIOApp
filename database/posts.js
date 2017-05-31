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
  this.retrieve = function (callback = () => {}) {
    Posts.findAll({
      attributes: ['postBody']
    })
    .then(function (records) {
      var results = []; // array of posts to be sent in callback
      records.forEach(function (record){
        results.push(record.dataValues.postBody);
      });
      console.log(results);
      callback(results);
    })
    .catch(function (err) {
      console.log(err);
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

/* old code
module.exports = function (client) {
  // add new post
  this.addPost = function (stuID, post) {
    client.query('INSERT INTO posts (studentID, body) VALUES ($1,$2)', [stuID, post]);
  },
  // delete all posts
  this.deletePosts = function () {
    client.query('DELETE FROM posts');
  },
  // retrieve list of posts
  this.retrieve = function (callback) {
    var results = []; // array of posts to be send in callback
    const query = client.query('SELECT body FROM posts');
    query.on('row',function (row) {
      results.push(row .body);
    });
    query.on('end', function () {
      callback(results);
    });
  }
};
*/
