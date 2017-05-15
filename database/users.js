module.exports = function (client) {
  this.addUser = function (x){
    client.query('INSERT INTO users (studentID) VALUES ($1);',[x]);
  }
};
