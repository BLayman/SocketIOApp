const db = require('../database/db2');
var connection = db.sequelize;


// Global before each wipes database clean before starting test
beforeEach(function (done) {
  connection.sync({force:true})
  .then(function () {
    console.log("** database reset **");
    done();
  })
  .catch(function (err) {
    console.log(err);
    done();
  });
});
