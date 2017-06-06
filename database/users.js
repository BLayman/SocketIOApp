const Sequelize = require('sequelize');
const db = require('./db2');
const connection = db.sequelize;

// users table model
const Users = db.users;

// methods on the users model
module.exports = function () {

  // function for inserting users
  this.addUser = function (userID) {
    return new Promise(function (resolve, reject) {
      connection.sync(/*{force:true}*/).then(function () {
        // create new row using userID argument
        Users.create({
          studentID : userID,
        })
        .then(function (insertedUser) {
          resolve(insertedUser);
        })
        .catch(function (err) {
          reject(err);
        });
      });
    });

  }

}
/* test module
modExp = new module.exports();
modExp.addUser(445);
*/
