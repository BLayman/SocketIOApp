//const pg = require('pg'); // postgres
//const conString = 'postgres://testEditor:ezpass3@localhost:5432/test';

module.exports = function (client) {
  // add new user
  this.addUser = function (userID){
    client.query('INSERT INTO users (studentID) VALUES ($1);',[userID]);
  }
};
