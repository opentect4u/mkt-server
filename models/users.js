const db = require('../config/database');
const users = {};

users.getUsers = (cb) => {

    let sql = `SELECT emp_id, user_name, user_status FROM
               md_users`;

    db.query(sql, (err, result) => {

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
module.exports = users;