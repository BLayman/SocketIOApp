const db = require('../database/db2');
const connection = db.sequelize;
var Posts = db.posts;
var Users = db.users;
// posts table API
const postsCon = require('../database/posts')
var posts = new postsCon;
// users table API
const usersCon = require('../database/users');
var users = new usersCon();


module.exports = function () {
  this.users = function (success, failure) {
    connection.sync({}).then(function () {
      var p1 = Users.create({
        studentID : 1,
      });
      var p2 = Users.create({
        studentID : 2,
      });
      Promise.all([p1,p2])
      .then(function () {
        success();
      })
      .catch(function () {
        failure();
      });
    });
  }
  this.posts = function (success, failure) {
    connection.sync({}).then(function () {
      var p1 = Posts.create({
        studentID : 1,
        postBody: 'post 1'
      });
      var p2 = Posts.create({
        studentID : 2,
        postBody: 'post 2'
      });
      Promise.all([p1,p2])
      .then(function () {
        success();
      })
      .catch(function () {
        failure();
      })
    });
  }
}
