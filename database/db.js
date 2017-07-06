/* old pg package database connection, not in use anymore

const conString = 'postgres://testEditor:ezpass3@localhost:5432/test';
// postgre-promise
const pgp = require('pg-promise')();
var pgpClient = pgp(conString);
exports.client = pgpClient;

// connect to test database
const pg = require('pg'); // postgres
var pgClient = new pg.Client(conString || process.env.DATABASE_URL);
pgClient.connect(function () {
  //console.log('database connected');
});

// modules corresponding to database tables
const posts = require('./posts');
exports.posts = new posts(pgClient);

// method for inserting
exports.insert = function (table, row, element, callback){
  pgpClient.none('INSERT INTO $1~ ($2~) VALUES ($3);',[table, row, element])
  .then(function () {
    console.log('element added');
    callback();
  })
  .catch(function (err) {
    console.log('error adding user: ' + err);
    callback();
  })
}
