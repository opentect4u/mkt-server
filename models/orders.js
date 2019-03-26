const db = require('../config/database'),
      common = require('./common');

const orders = {};

orders.getOrders = (cb) => {

    let sql = `SELECT t.id,
                      t.project_name,
                      pt.type_desc,
                      t.contact_no,
                      t.designation,
                      dst.district_name,
                      t.*
               FROM td_project_details t, md_district dst, md_project_type pt
               WHERE t.project_type = pt.type_cd
               AND t.dist = dst.district_code`;

    db.query(sql, (err, result) => {

        if (err) throw err;

        cb(result);

    });

}

module.exports = orders;