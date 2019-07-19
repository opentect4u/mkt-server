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
                      pt.type_desc as project_type,
                      t.contact_no,
                      t.designation,
                      dst.district_name as dist,
                      t.block,
                      t.order_dt,
                      t.order_dtls,
                      t.order_value,
                      t.tax,
                      t.payment_terms,
                      t.monthly_rental,
                      t.payment_status,
                      t.proposed_instl_dt,
                      t.sales_person,
                      t.installed_by,
                      t.installation_dt,
                      t.sss_remarks,
                      t.cust_remarks
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
                                                online_dt,
                                                sss_remarks,
                                                cust_remarks,
                                                created_by,
                                                created_dt
                                            )
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

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
                    data.monthly_rental,
                    data.payment_status,
                    data.proposed_instl_dt,
                    data.created_by,
                    data.installed_by,
                    data.installation_dt,
                    data.online_dt,
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
                                         monthly_rental = ?,
                                         payment_status = ?,
                                         proposed_instl_dt = ?,
                                         sales_person = ?,
                                         installed_by = ?,
                                         installation_dt = ?,
                                         online_dt = ?,
                                         sss_remarks = ?,
                                         cust_remarks = ?,
                                         modified_by = ?,
                                         modified_dt = ?
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
                    data.monthly_rental,
                    data.payment_status,
                    data.proposed_instl_dt,
                    data.modified_by,
                    data.installed_by,
                    data.installation_dt,
                    data.online_dt,
                    data.sss_remarks,
                    data.cust_remarks,
                    data.modified_by,
                    data.modified_dt
    ], (err, result) => {

        if (err) throw err;

        cb(result);

    });
}

orders.filter = (data, cb) => {

    let sql = `SELECT t.id,
                      t.project_name,
                      pt.type_desc as project_type,
                      t.contact_no,
                      t.designation,
                      dst.district_name as dist,
                      t.block,
                      t.order_dt,
                      t.order_dtls,
                      t.order_value,
                      t.tax,
                      t.payment_terms,
                      t.monthly_rental,
                      t.payment_status,
                      t.proposed_instl_dt,
                      t.sales_person,
                      t.installed_by,
                      t.installation_dt,
                      t.sss_remarks,
                      t.cust_remarks
              FROM td_project_details t, md_district dst, md_project_type pt
              WHERE t.project_type = pt.type_cd
              AND t.dist = dst.district_code
              ${(data.fromDate && data.toDate)? "AND t.order_dt >= '"+data.fromDate+"' AND t.order_dt <= '"+data.toDate+"'":''}
              ${(data.prjectType != '')? "AND t.project_type = "+data.prjectType+"":''}
              ${(data.district != '')? "AND t.dist = "+data.district+"":''}
              ${(data.employee != '')? "AND t.sales_person = '"+data.employee+"'":''}
              `;
    
        let a = db.query(sql, (err, result) => {
    
            if (err) throw err;
    
            cb(result);
    
        });
}

module.exports = orders;