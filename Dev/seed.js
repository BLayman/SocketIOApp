const db = require('../database/db2');
const connection = db.sequelize;
let Posts = db.posts;
let Users = db.users;
// posts table API
const postsCon = require('../database/posts')
let posts = new postsCon;
// users table API
const usersCon = require('../database/users');
let users = new usersCon();


module.exports = function () {
  this.users = function (success, failure) {
    connection.sync({}).then(function () {
      let p1 = Users.create({
        studentID : 1,
      });
      let p2 = Users.create({
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
      let p1 = Posts.create({
        studentID : 1,
        postBody: 'post 1',
        group: 'group 1'
      })
      let p2 = Posts.create({
        studentID : 2,
        postBody: 'post 2',
        group: 'group 1'
      });
      // different group
      let p3 = Posts.create({
        studentID : 3,
        postBody: 'post 3',
        group: 'group 2'
      });
      Promise.all([p1,p2,p3])
      .then(function () {
        success();
      })
      .catch(function () {
        failure();
      })
    });
  }
}
