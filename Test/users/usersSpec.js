/* Imports */
// chai
const chai = require('chai');
let expect = chai.expect;
// database connection
const Sequelize = require('sequelize');
const db = require('../../database/db2');
// get database connection
let connection = db.sequelize;
// users table model
let Users = db.users;

// users table API
let usersCon = require('../../database/users');
let users = new usersCon();


/* Tests */
describe('users', function(){

// test users.addUser function
describe('addUser', function(){
  let inputUser = 0; // user passed into addUser
  let tableUser = 1; // user retrieved from table

  // test to make sure that user is actually added to the database
  it('Adds a user into the database users table', function(done){
    // add input user
    users.addUser(inputUser)
    .then(function () {
      // seach users for students with a student id that matches inputUser
      Users.findOne({
        where: {
          studentID: inputUser
        }
      })
      .then(function (result) {
        expect(result).to.not.be.null;
        done();
      })
    })
    .catch(function () {
      throw new Error('add user failed');
    })

  });
});
});
