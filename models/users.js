const db = require('../config/database'),
      common = require('./common');

const users = {};

users.getUsers = (cb) => {

    let sql = `SELECT emp_id, user_name, user_status FROM
               md_users`;

    db.query(sql, (err, result) => {

        if (err) throw err;

        cb(result);

    });

}

users.getUser = (userId, cb) => {

    let sql = `SELECT user_id, user_name, user_status FROM
               md_users WHERE emp_id = ?`;

    db.query(sql, [userId], (err, result) => {

        if (err) throw err;

        cb(result);

    });

}


users.updateStatus = (empNo, status, cb) => {

    let sql = `UPDATE md_users SET user_status = ?
               WHERE emp_id = ?`;

    db.query(sql, [status, empNo], (err, result) => {

        if (err) throw err;

        cb(result);

    });

}

users.updateUser = (data, empNo, cb) => {

    
    if(data.password === 'R'){
    
        let salt = common.hashPassword('123');

        let sql = `UPDATE md_users SET user_id = ?,
                   user_name = ?, user_status = ?,
                   password = ?, modified_by = ?, modified_dt = ?
                   WHERE emp_id = ?`;

        db.query(sql, [data.userId, 
                       data.name,
                       data.status,
                       salt,
                       data.modefiedBy,
                       data.modefiedDt,
                       empNo,
                      ], (err, result) => {
                                            if (err) throw err;
                                            cb(result);
                                        }
        );    
        

    }
    else if(data.password === null){
        
        let sql = `UPDATE md_users SET user_id = ?,
                   user_name = ?, user_status = ?,
                   modified_by = ?, modified_dt = ?
                   WHERE emp_id = ?`;

        db.query(sql, [data.userId, 
                       data.name,
                       data.status,
                       data.modefiedBy,
                       data.modefiedDt,
                       empNo
                      ], (err, result) => {
                                            if (err) throw err;
                                            cb(result);
                                        }
        ); 

    }

}

users.insertUser = (data, cb) => {

    let salt = common.hashPassword('123');

    let sql = `INSERT INTO md_users (emp_id, user_id, password, user_name, user_status, created_by, created_dt)
               VALUES(?,?,?,?,?,?,?)`;

    db.query(sql, [data.userId, 
                   data.empId,
                   data.password,
                   data.name,
                   data.status,
                   data.createdBy,
                   data.createdDt
                  ], (err, result) => {

        if (err) throw err;

        cb(result);

    });

}

users.updatePass = (data, cb) => {

    let sql = `SELECT password FROM md_users WHERE user_id = ?`;

    db.query(sql, [data.user], (err, result) => {

        if (err) throw err;

        if(common.comparePassword(data.oldPass, result[0].password)){
            let salt = common.hashPassword(data.newPass);
            let sql = `UPDATE md_users SET password = ?
                       WHERE user_id = ?`;
            db.query(sql, [salt, data.user], (err, result) => {
                if(err) throw err;
                cb({msg: 'Password Successfully changed', process: 'successfull'});
            });
        }
        else{
            cb({msg: 'Old password did not match', process: 'failed'});
        }
        

    });

}


module.exports = users;