/* Imports */
// chai
const chai = require('chai');
let expect = chai.expect;
// seed helper module
const seedCon = require('../../Dev/seed');
let seed = new seedCon;
// database connection
const Sequelize = require('sequelize');
const db = require('../../database/db2');
const connection = db.sequelize;
// posts table API
const postsCon = require('../../database/posts')
let posts = new postsCon;
// posts table model
let Posts = db.posts;

/* tests */
describe('posts', function(){

// test addPost method
describe('addpost', function(){
  // input letiables
  let inputUser = 0;
  let inputPost = "I am a post";
  let inputRoom = "problem 1"

  // test if it sucessfully adds a post
  it('adds a post to the database', function(done){
    // add post using input letiables
    posts.addPost(inputUser,inputPost, inputRoom)
    .then(function () {
      // then seach for added post in Posts model
      return Posts.findOne({
        where: {
          studentID: inputUser,
          postBody: inputPost,
          room: inputRoom
        }
      })
      // process result of search
      .then(function (result) {
        expect(result).to.not.be.null;
        done();
      });
    });
  });

  it('adds multiple posts', function(done){
    // add post using input letiables
    posts.addPost(inputUser,"hello", inputRoom)
    .then(function () {
      return posts.addPost(inputUser,"hello 2", inputRoom);
    })
    .then(function () {
      return Posts.findAll({
        where: {
          studentID: inputUser,
          room: inputRoom
        }
      });
    })
    // process result of search
    .then(function (result) {
      expect(result).to.have.lengthOf(2);
      done();
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

  it('deletes all posts matching room', function(done){
    // delete posts
    posts.deletePosts('room 1')
    .then(function () {
      // find all posts left
      return Posts.findAll();
    })
    .then(function (result) {
      // the result should be empty
      expect(result).to.have.lengthOf(1);
      expect(result[0].dataValues.room).to.equal('room 2');
      done();
    })
    .catch(function (error) {
      console.log(error);
    });
  });

});

describe('retrievePosts',function () {
  let inputRoom = "room 1"
  // add something to database to be retrieved
  beforeEach(function (done) {
    seed.posts(function () {
      done();
    });
  });

  it('sends an array of results to the success callback', function (done) {
    posts.retrieve(inputRoom)
    .then(function (results) {
      expect(results).to.include.members(['post 1','post 2']);
      expect(results).to.not.include('post 3');
      done();
    })
    .catch(function (error) {
      console.log(error);
    });
  });

});
});
