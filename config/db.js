const mysql = require('mysql');

const conn = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "node_crud"
});



module.exports = conn;
