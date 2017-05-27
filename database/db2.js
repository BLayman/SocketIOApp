// establish database connection
const Sequelize = require('sequelize');
var connection = new Sequelize('postgres://testEditor:ezpass3@localhost:5432/test');
console.log("connected to database");

// access to sequelize connection and models
module.exports = {
  sequelize: connection,
  users: connection.define('users', {
    studentID : {
      type: Sequelize.INTEGER,
      unique: true
    }
  }),
  posts: connection.define('posts',{
    studentID : {
      type: Sequelize.INTEGER,
      unique: true
    },
    postBody: Sequelize.TEXT
  })
}
