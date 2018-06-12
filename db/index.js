var pgp = require("pg-promise")({});
var connectionString = 'postgres://localhost/budget';
var db = pgp(connectionString);

module.exports = db;
  
