const router = require('express').Router(),
      Orders = require('../models/orders'),     
      common = require('../models/common');

router.get('/', (req, res) => {

    Orders.getOrders(req.data.user.user_name, (data) => {
        res.send(data);
    });

});

router.get('/dependencies', (req, res) => {

    var dataObj = {};

    Orders.getAll('md_district', (data) => {
        dataObj.dist = data;
    });

    Orders.getAll('md_project_type', (data) => {
        dataObj.projectType = data;
        res.send(dataObj);
    });

});

router.get('/report', (req, res) => {

    Orders.getAllOrders((data) => {
        res.send(data);
    });

});

router.get('/getorder/:id', (req, res) => {

    data = {
        id: req.params.id,
        user: req.data.user.user_name
    }
    Orders.getOrder(data, (data) => {
        res.send(data);
    });

});

router.post('/details', (req, res) => {

    let data = {
        project_name: req.body.prjectName ,
        project_type: req.body.projectType ,
        contact_person: req.body.socPerson ,
        contact_no: req.body.contactNo ,
        designation: req.body.designation ,
        dist: req.body.dist ,
        block: req.body.block ,
        order_dt: req.body.orderDt ,
        order_dtls: req.body.orderDetails ,
        order_value: req.body.orderValue ,
        tax: req.body.tax ,
        payment_terms: req.body.paymentTerms ,
        monthly_rental: req.body.monthlyRental ,
        payment_status: req.body.paymentStatus,
        proposed_instl_dt: req.body.proposedInstlDt,
        sales_person:req.body.salePerson , 
        installed_by: req.body.installedBy ,
        installation_dt: req.body.installationDate ,
        online_dt: req.body.onlineDate ,
        sss_remarks: req.body.sssRemarks ,
        cust_remarks: req.body.customerRemarks ,
        created_by: req.data.user.user_name,
        created_dt: common.formatDate(new Date()),
    }
    Orders.addDtls(data, () => {
        res.send({msg: 'success'});
    });

});

router.put('/editdetails/:id', (req, res) => {

    let data = {
        project_name: req.body.prjectName ,
        project_type: req.body.projectType ,
        contact_person: req.body.socPerson ,
        contact_no: req.body.contactNo ,
        designation: req.body.designation ,
        dist: req.body.dist ,
        block: req.body.block ,
        order_dt: req.body.orderDt ,
        order_dtls: req.body.orderDetails ,
        order_value: req.body.orderValue ,
        tax: req.body.tax ,
        payment_terms: req.body.paymentTerms ,
        monthly_rental: req.body.monthlyRental ,
        payment_status: req.body.paymentStatus,
        proposed_instl_dt: req.body.proposedInstlDt, 
        installed_by: req.body.installedBy ,
        installation_dt: req.body.installationDate ,
        online_dt: req.body.onlineDate ,
        sss_remarks: req.body.sssRemarks ,
        cust_remarks: req.body.customerRemarks ,
        modified_by: req.data.user.user_name,
        modified_dt: common.formatDate(new Date()),
    }
    Orders.editDtls(data, req.params.id ,() => {
        res.send({msg: 'success'});
    });
    
});

router.post('/filter', (req, res) => {
    Orders.filter(req.body ,(data) => {
        res.send(data);
    });
});
module.exports = router;