var mysql = require('mysql');

module.exports = con = mysql.createConnection({
  host: "localhost",
  user: "sbhtdtwxjd",
  password: "D4DFe9TUyz",
  database: "sbhtdtwxjd"
});
 
  
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
