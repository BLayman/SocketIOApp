/* Imports */
// chai
const chai = require('chai');
var expect = chai.expect;
// seed helper module
const seedCon = require('../../Dev/seed');
var seed = new seedCon;
// database connection
const Sequelize = require('sequelize');
const db = require('../../database/db2');
const connection = db.sequelize;
// posts table API
const postsCon = require('../../database/posts')
var posts = new postsCon;
// posts table model
var Posts = db.posts;

/* tests */
describe('posts', function(){

// test addPost method
describe('addpost', function(){
  // input variables
  var inputUser = 0;
  var inputPost = "I am a post";

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
        expect(result).to.not.be.null;
        done();
      });
    });
  });
});


// test for deletePosts method
describe('deletePosts', function(){
  // add something to database before deleting everything
  beforeEach(function (done) {
    seed.posts(function () {
      done();
    });
  });

  it('deletes all posts', function(done){
    // delete posts
    posts.deletePosts(function () {
      // find all posts left
      Posts.findAll()
      .then(function (result) {
        // the result should be empty
        expect(result).to.be.empty;
        done();
      })
    }, function () {
      throw new Error("failed to delete posts");
      done();
    });
  });
});

describe('retrievePosts',function () {
  // add something to database to be retrieved
  beforeEach(function (done) {
    seed.posts(function () {
      done();
    });
  });

  it('sends an array of results to the success callback', function (done) {
    posts.retrieve(function (results) {
      expect(results).to.include.members(['post 1','post 2']);
      done();
    },
    function (err) {
        throw new Error('retrieve failed');
    })
  })
})
});
