const Sequelize = require('sequelize');
const db = require('./db2');
var connection = db.sequelize;

// users table model
var Users = db.users;

// methods on the users model
module.exports = function () {

  // function for inserting users
  this.addUser = function (userID, callback) {
    connection.sync(/*{force:true}*/).then(function () {
      // create new row using userID argument
      Users.create({
        studentID : userID,
      })
      .then(function (insertedUser) {
        console.log(' * Inserted *');
        if (typeof callback === 'function') callback();
      })
      .catch(function (err) {
        console.log(err);
        if (typeof callback === 'function') callback();
      });
    });
  }

}
/* test module
modExp = new module.exports();
modExp.addUser(445);
*/
