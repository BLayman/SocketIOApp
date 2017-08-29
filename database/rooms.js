const Sequelize = require('sequelize');
const db = require('./db2');
const connection = db.sequelize;
const Rooms = db.rooms;

module.exports = function () {
  // function for inserting users
  this.addRoom = function (roomName) {
    return new Promise(function (resolve, reject) {
      // uncomment "force:true" option to force changes on database structure
      connection.sync(/*{force:true}*/).then(function () {
        // create new row using roomName argument
        Rooms.create({
          name : roomName
        })
        .then(function (insertedRoom) {
          console.log("room created: " + roomName);
          console.log("primary key: " + insertedRoom.dataValues.id);
          // resolve promise with id of new entry in database
          resolve(insertedRoom.dataValues.id);
        })
        .catch(function (err) {
          reject(err);
        });
      });
    });
  }

}
