module.exports = function (client) {
  // add new post
  this.addPost = function (stuID, post) {
    client.query('INSERT INTO posts (studentID, body) VALUES ($1,$2)', [stuID,post]);
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
      results.push(row.body);
    });
    query.on('end', function () {
      callback(results);
    });
  }
};

/*const pg = require('pg'); // postgres
const conString = 'postgres://testEditor:ezpass3@localhost:5432/test';

module.exports = function () {
  // add new post
  this.addPost = function (stuID, post) {
    pg.connect(conString, function (err, client, done) {
        client.query('INSERT INTO posts (studentID, body) VALUES ($1,$2)', [stuID,post]);
    });
  },
  // delete all posts
  this.deletePosts = function () {
      pg.connect(conString, function (err, client, done) {
        client.query('DELETE FROM posts');
      });
  },
  // retrieve list of posts
  this.retrieve = function (callback) {
      pg.connect(conString, function (err, client, done) {
        console.log("database connected");
        var results = [];
        const query = client.query('SELECT body FROM posts');
        query.on('row',function (row) {
          results.push(row.body);
        });
        query.on('end', function () {
          callback(results);
        });
      });
  }
};
*/
