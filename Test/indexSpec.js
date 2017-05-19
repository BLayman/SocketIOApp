const chai = require('chai');
const client = require('../database/db').client;
var expect = chai.expect;
var database = require('../database/db'); // establish database connection
var users = database.users; // users table API

// test users.addUser function
describe('addUser', function(){

  var inputUser = "unusual user id"; // user passed into addUser
  var tableUser = "different user id"; // user retrieved from table

  // call addUser function before running tests
  before(function(){
    users.addUser(inputUser);
    /*users.addUser(inputUser, function () {
      done();
    });*/
  });

  // delete added user from database to leave it unmodified
  after(function(done){
    client.query('DELETE FROM users WHERE studentid = $1', [tableUser], function () {
      done();
    });
  });

  // test to make sure that user is actually added to the database
  it('adds a user into the database users table', function(done){
    // seach users for students with a student id that matches inputUser
    var userQuery = client.query('SELECT * FROM users WHERE studentid = $1', [inputUser]);
    // if there is a search hit, assign that id to tableUser
    userQuery.on('row',function (row) {
      tableUser = row.studentid;
    })
    // let the query complete
    userQuery.on('end',function () {
      // if a match was found, tableUser should now equal inputUser
      expect(tableUser).to.equal(inputUser);
      done();
    });
  });


});
