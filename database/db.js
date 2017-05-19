const pg = require('pg'); // postgres
// connect to test database
const conString = 'postgres://testEditor:ezpass3@localhost:5432/test';
var client = new pg.Client(conString || process.env.DATABASE_URL);
client.connect(function () {
  console.log('database connected');
});
// modules corresponding to database tables
const users = require('./users');
const posts = require('./posts');

// export constructors for modules, passing in client connection
exports.users = new users(client);
exports.posts = new posts(client);
exports.client = client;
