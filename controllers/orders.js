const router = require('express').Router(),
      Orders = require('../models/orders'),     
      common = require('../models/common');

router.get('/', (req, res) => {

    Orders.getOrders((data) => {
        res.send(data);
    });

});
module.exports = router;