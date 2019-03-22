const express = require('express');
const router = express.Router();
const CommonObj = require('../models/common'); 

const login = require ('../controllers/login');

router.use('/login', login);



module.exports = router;