const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      db = require('./database'),
      bcrypt = require('bcryptjs');

module.exports = function(passport) {

    passport.use(new LocalStrategy(
    
        function(username, password, done) {
            
            console.log(username, password);
          /* User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          });
      
          let data = {
      
              "user_id": req.body.user_id,
              "password": req.body.password
              
          }
      
          let sql = `select user_name, user_status
                     from md_users where user_id = 
                     ? AND password = ?`;
      
          db.query(sql, [data.user_id, data.password],(err, result) => {
              
              if(err){
                  throw err;
              }
              else if(typeof result[0] == 'object' && result[0].user_status == 'A'){
                  
                  jwt.sign({user: result[0]}, 'loggedin', (err, token) =>{
                      if (err) throw err;
                      res.json({ token: token});
                  });
              }
              else{
                  res.json({ token: "No Data Found"});
              }
              
          }); */
      
        }
    ));

}      

