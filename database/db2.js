// establish database connection
const Sequelize = require('sequelize');
let connection = null;

// if running in heroku environment
if (process.env.DATABASE_URL) {
  connection = new Sequelize(process.env.DATABASE_URL, {logging: false});
    console.log("connected to database");
}
// if running on local host
else{
  // local database connection
  connection = new Sequelize('postgres://testEditor:ezpass3@localhost:5432/coshdev',{logging:console.log}); // dev db
  console.log("connected to database");
}

// access to sequelize connection and models
const tables = {
  // database connection
  sequelize: connection,
  // users table
  users: connection.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    studentID : {
      type: Sequelize.INTEGER,
      unique: false
    }
  }),
  // rooms table
  rooms: connection.define('rooms',{
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name : {
      type: Sequelize.STRING
    }
  }),
  // posts model
  posts: connection.define('posts',{
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickname : {
      type: Sequelize.STRING,
    },
    postBody: {
      type: Sequelize.TEXT,
      unique: false
    },
    published:
    {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  })
}
// establish foreign keys in posts table
tables.posts.belongsTo(tables.users);
tables.posts.belongsTo(tables.rooms);
// export dabase model
module.exports = tables;
