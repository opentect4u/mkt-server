const express = require('express');
const router = express.Router();
const CommonObj = require('../models/common'); 

const login = require('../controllers/login');
const users = require('../controllers/users');

router.use('/login', login);

router.use('/users', CommonObj.verifyToken, users);

module.exports = router;