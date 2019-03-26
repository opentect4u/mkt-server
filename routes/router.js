const express = require('express');
const router = express.Router();
const CommonObj = require('../models/common'); 

const login = require('../controllers/login');
const users = require('../controllers/users');
const orders = require('../controllers/orders');

router.use('/login', login);

router.use('/users', CommonObj.verifyToken, users);
router.use('/orders', CommonObj.verifyToken, orders);

module.exports = router;