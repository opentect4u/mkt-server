var mysql = require('mysql');

module.exports = con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "teachers",
  database: "mkt"
});
 
  
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
