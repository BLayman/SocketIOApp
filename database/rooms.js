const Sequelize = require('sequelize');
const db = require('./db2');
const connection = db.sequelize;
const Rooms = db.rooms;

module.exports = function () {
  // function for inserting users
  this.addRoom = function (roomName) {
    return new Promise(function (resolve, reject) {
      connection.sync(/*{force:true}*/).then(function () {
        // create new row using roomName argument
        Rooms.create({
          name : roomName
        })
        .then(function (insertedRoom) {
          console.log("room created: " + roomName);
          console.log("primary key: " + insertedRoom.dataValues.id);
          // send primary key with promise resolution
          resolve(insertedRoom.dataValues.id);
        })
        .catch(function (err) {
          reject(err);
        });
      });
    });
  }

}
