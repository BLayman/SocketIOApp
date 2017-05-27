/* Imports */
// chai
const chai = require('chai');
var expect = chai.expect;
// database connection
const Sequelize = require('sequelize');
const db = require('../database/db2');
var connection = db.sequelize;
// posts table API
var postsCon = require('../database/posts')
var posts = new postsCon;
// posts table model
var Posts = db.posts;

/* tests */
// test addPost method
describe('addpost', function(){
  // input variables
  var inputUser = 0;
  var inputPost = "I am a post";
  // variables to be redefined by table selection
  var tableUser = 1;
  var tablePost = "i am a different post"

  // test if it sucessfully adds a post
  it('adds a post to the database', function(done){
    // add post using input variables
    posts.addPost(inputUser,inputPost,function () {
      // then seach for added post in Posts model
      Posts.findOne({
        where: {
          studentID: inputUser,
          postBody: inputPost
        }
      })
      // process result of search
      .then(function (result) {
        if (result != null){
          tableUser = result.dataValues.studentID;
          tablePost = result.dataValues.postBody;
        }
        // change tableUser, and tablePost to equal what was found
        expect(tableUser).to.equal(inputUser);
        expect(tablePost).to.equal(inputPost);
        done();
      });
    });
  });
});
