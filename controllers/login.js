const express = require('express');
const router = express.Router();
const db = require('../config/database');
const passport = require('passport');
const jwt = require('jsonwebtoken');

//For Login
router.post('/login', (req, res) => {

    passport.authenticate('local', { failureRedirect: '/login' })
    

});

module.exports = router;