const LocalStrategy = require('passport-local').Strategy,
      db = require('./database'),
      jwt = require('jsonwebtoken');
      CommonObj = require('../models/common');

module.exports = function(passport) {

    passport.use(new LocalStrategy(
    
        function(username, password, done) {
      
          let sql = `select user_name, user_status, password
                     from md_users where user_id = ?`;
      
          db.query(sql, [username],(err, result) => {
              
              if(err){
                throw err;
              }
              else if(typeof result[0] == 'object' && result[0].user_status == 'A' && CommonObj.comparePassword(password, result[0].password)){
                
                delete result[0].password;

                jwt.sign({user: result[0]}, 'loggedin', (err, token) => {
                    if (err) throw err;
                    return done(null, token);
                });
              }
              else{
                return done(null, null);
              }
              
          });
      
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

}      

