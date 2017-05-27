const chai = require('chai');
var expect = chai.expect;

// establish database connection
var database = require('../database/db');
const pgpClient = database.client;
// users API
var usersCon = require('../database/users');
var users = new usersCon();

// test users.addUser function
describe('addUser', function(){

  var inputUser = "unusual user id"; // user passed into addUser
  var tableUser = "different user id"; // user retrieved from table

  // call addUser function before running tests
  before(function(done){
    users.addUser(inputUser, function () {
      done();
    });
  });

  // delete added user from database to leave it unmodified
  after(function(done){
    pgpClient.none('DELETE FROM users WHERE studentid = $1', [tableUser])
    .then(function () {
      console.log('deleted');
      done();
    })
    .catch(function (err) {
      console.log('deletion error' + err);
      done();
    });
    //pgpClient.none('DROP TABLE $1',[table]);
  });

  // test to make sure that user is actually added to the database
  it('adds a user into the database users table', function(done){
    // seach users for students with a student id that matches inputUser
    pgpClient.one('SELECT * FROM users WHERE studentid = $1', [inputUser])
    // user with matching id is found
    .then(function (result) {
      // change tableUser to match result of search
      tableUser = result.studentid;
      // if user found in table matches input user, pass test
      expect(tableUser).to.equal(inputUser);
      done();
    })
    // matching id not found
    .catch(function () {
      console.log('not found');
      // tableUser unchanged, so test fails
      expect(tableUser).to.equal(inputUser);
      done();
    });
  });
});




// test database.insert function
describe('database insert', function(){
  var table = 'testtable';
  var row = 'testrow';
  var input = 'input'; // database input
  var output = "different"; // retrieved from table

  // call database insert function before running tests
  before(function(done){
    pgpClient.none('CREATE TABLE $1~ ($2~ varchar(20));', [table,row])
    .then(function functionName() {
      database.insert(table, row, input, function () {
      done();
      });
    })
    .catch(function (err) {
      console.log("table creation failed: " + err);
      done();
    });
  });

  // delete added element from table to leave it unmodified
  after(function(done){
    pgpClient.none('DROP TABLE $1~', [table])
    .then(function () {
      console.log('deleted');
      done();
    })
    .catch(function (err) {
      console.log('deletion error: ' + err);
      done();
    })
  });

  // test to make sure that user is actually added to the database
  it('inserts an element into a row of the table', function(done){
    // seach users for students with a student id that matches inputUser
    pgpClient.one('SELECT * FROM $1~ WHERE $2~ = $3', [table,row,input])
    // user with matching id is found
    .then(function (result) {
      // change tableUser to match result of search
      output = result.testrow;
      // if user found in table matches input user, pass test
      expect(input).to.equal(output);
      done();
    })
    // matching id not found
    .catch(function (err) {
      console.log('not found: ' + err);
      // tableUser unchanged, so test fails
      expect(input).to.equal(output);
      done();
    });
  });
});
