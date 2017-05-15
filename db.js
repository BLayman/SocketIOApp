const pg = require('pg');
const conString = 'postgres://testEditor:ezpass3@localhost:5432/test';
const client = new pg.Client(conString);
client.connect();

module.exports = function(){
  this.addUser = function (x){
    client.query('INSERT INTO users (studentID) VALUES ($1);',[x]);
  }
};
