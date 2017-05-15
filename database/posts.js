module.exports = function (client) {
  this.addPost = function (stuID, post) {
    client.query('INSERT INTO posts (studentID, body) VALUES ($1,$2)', [stuID,post]);
  }
};
