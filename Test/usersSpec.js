/* Imports */
// chai
const chai = require('chai');
var expect = chai.expect;
// database connection
const Sequelize = require('sequelize');
const db = require('../database/db2');
// get database connection
var connection = db.sequelize;
// users table model
var Users = db.users;

// users table API
var usersCon = require('../database/users');
var users = new usersCon();


/* Tests */
// test users.addUser function
describe('addUser', function(){
  var inputUser = 0; // user passed into addUser
  var tableUser = 1; // user retrieved from table

  // test to make sure that user is actually added to the database
  it('Adds a user into the database users table', function(done){
    // add input user
    users.addUser(inputUser, function () {
      // seach users for students with a student id that matches inputUser
      var found = false;
      Users.findOne({
        where: {
          studentID: inputUser
        }
      })
      .then(function (result) {
        expect(result).to.not.be.null;
        done();
      })
      /*.catch(function (err) {
        throw new Error('error');
      })*/
    });
  });
});
