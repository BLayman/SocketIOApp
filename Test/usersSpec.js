/* Imports */
// chai
const chai = require('chai');
var expect = chai.expect;
// database connection
const Sequelize = require('sequelize');
const db = require('../database/db2');
var connection = db.sequelize;
// users table API
var usersCon = require('../database/users');
var users = new usersCon();
// Users table model
var Users = db.users;

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
      Users.findOne({
        where: {
          studentID: inputUser
        }
      })
      .then(function (result) {
        if (result != null){
          // change tableUser to match result of search
          tableUser = result.dataValues.studentID;
        }
        // if user found in table matches input user, pass test
        expect(tableUser).to.equal(inputUser);
        done();
      });
    });
  });
});
