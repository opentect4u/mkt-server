const db = require('../config/database'),
      common = require('./common');

const orders = {};

orders.getOrders = (user, cb) => {

    let sql = `SELECT t.id,
                      t.project_name,
                      pt.type_desc,
                      t.contact_no,
                      t.designation,
                      dst.district_name,
                      t.*
               FROM td_project_details t, md_district dst, md_project_type pt
               WHERE t.project_type = pt.type_cd
               AND t.dist = dst.district_code
               AND t.created_by = ?`;

    db.query(sql, [user], (err, result) => {

        if (err) throw err;

        cb(result);

    });

}

orders.getOrder = (data, cb) => {

    let sql = `SELECT * FROM td_project_details
               WHERE id = ? 
               AND created_by = ?`;

    db.query(sql, [data.id, data.user], (err, result) => {

        if (err) throw err;

        cb(result);

    });

}

orders.getAllOrders = (cb) => {

    let sql = `SELECT t.id,
                      t.project_name,
                      pt.type_desc project_type,
                      t.contact_no,
                      t.designation,
                      dst.district_name dist,
                      t.*
                FROM td_project_details t, md_district dst, md_project_type pt
                WHERE t.project_type = pt.type_cd
                AND t.dist = dst.district_code`;

    db.query(sql, (err, result) => {

        if (err) throw err;

        cb(result);

    });

}

orders.getAll = (tableName, cb) => {

    let sql = `SELECT * FROM ${tableName}`;

    db.query(sql, (err, result) => {

        if (err) throw err;

        cb(result);

    });

}

orders.addDtls = (data, cb) => {

    let sql = `INSERT INTO td_project_details ( project_name,
                                                project_type,
                                                contact_person,
                                                contact_no,
                                                designation,
                                                dist,
                                                block,
                                                order_dt,
                                                order_dtls,
                                                order_value,
                                                tax,
                                                payment_terms,
                                                monthly_rental,
                                                payment_status,
                                                proposed_instl_dt,
                                                sales_person,
                                                installed_by,
                                                installation_dt,
                                                sss_remarks,
                                                cust_remarks,
                                                created_by,
                                                created_dt
                                            )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    db.query(sql, [ data.project_name,
                    data.project_type,
                    data.contact_person,
                    data.contact_no,
                    data.designation,
                    data.dist,
                    data.block,
                    data.order_dt,
                    data.order_dtls,
                    data.order_value,
                    data.tax,
                    data.payment_terms,
                    data.payment_status,
                    data.proposed_instl_dt,
                    data.sales_person,
                    data.installed_by,
                    data.installation_dt,
                    data.sss_remarks,
                    data.cust_remarks,
                    data.created_by,
                    data.created_dt
    ], (err, result) => {

        if (err) throw err;

        cb(result);

    });
}

orders.editDtls = (data, id, cb) => {

    let sql = `UPDATE td_project_details SET project_name = ?,
                                         project_type = ?,
                                         contact_person = ?,
                                         contact_no = ?,
                                         designation = ?,
                                         dist = ?,
                                         block = ?,
                                         order_dt = ?,
                                         order_dtls = ?,
                                         order_value = ?,
                                         tax = ?,
                                         payment_terms = ?,
                                         payment_status = ?,
                                         proposed_instl_dt = ?,
                                         sales_person = ?,
                                         installed_by = ?,
                                         installation_dt = ?,
                                         sss_remarks = ?,
                                         cust_remarks = ?,
                                         created_by = ?,
                                         created_dt = ?
                WHERE id = ${id}`;

    db.query(sql, [ data.project_name,
                    data.project_type,
                    data.contact_person,
                    data.contact_no,
                    data.designation,
                    data.dist,
                    data.block,
                    data.order_dt,
                    data.order_dtls,
                    data.order_value,
                    data.tax,
                    data.payment_terms,
                    data.payment_status,
                    data.proposed_instl_dt,
                    data.sales_person,
                    data.installed_by,
                    data.installation_dt,
                    data.sss_remarks,
                    data.cust_remarks,
                    data.created_by,
                    data.created_dt
    ], (err, result) => {

        if (err) throw err;

        cb(result);

    });
}

module.exports = orders;