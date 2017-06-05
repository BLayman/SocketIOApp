// establish database connection
const Sequelize = require('sequelize');
// const connection = new Sequelize('postgres://testEditor:ezpass3@localhost:5432/test'); // test db
const connection = new Sequelize('postgres://testEditor:ezpass3@localhost:5432/coshdev',{logging:false}); // dev db
console.log("connected to database");

// access to sequelize connection and models
module.exports = {
  // database connection
  sequelize: connection,
  // users model
  users: connection.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    studentID : {
      type: Sequelize.INTEGER,
      unique: false
    }
  }),
  // posts model
  posts: connection.define('posts',{
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    studentID : {
      type: Sequelize.INTEGER,
      unique: false
    },
    postBody: {
      type: Sequelize.TEXT,
      unique: false
    },
    group: {
      type: Sequelize.STRING,
      unique: false
    },
  })
}
