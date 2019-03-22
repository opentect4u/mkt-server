const express = require('express');
const router = express.Router();
// const db = require('../config/database');
const passport = require('passport');
// const jwt = require('jsonwebtoken');

//For Login
router.post('/', (req, res) => { passport.authenticate('local', (err, token) => {
        if (err) throw err;
        res.send({ token: token});
    })(req, res)
    
});

module.exports = router;