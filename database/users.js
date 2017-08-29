const Sequelize = require('sequelize');
const db = require('./db2');
const connection = db.sequelize;

// users table model
const Users = db.users;

// methods on the users model
module.exports = function () {

  // function for inserting a new user session into the database
  this.addUser = function (userID) {
    return new Promise(function (resolve, reject) {
      // uncomment force:true option to force changes on database structure
      connection.sync(/*{force:true}*/).then(function () {
        // create new row using userID argument
        Users.create({
          studentID : userID,
        })
        .then(function (insertedUser) {
          console.log("user joined: " + userID);
          console.log("primary key: " + insertedUser.dataValues.id);
          // resolve promise with id of new user session entry
          resolve(insertedUser.dataValues.id);
        })
        .catch(function (err) {
          reject(err);
        });
      });
    });

  }

}
