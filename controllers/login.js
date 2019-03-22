const express = require('express');
const router = express.Router();
const passport = require('passport');

//For Login
router.post('/', (req, res) => 

    { passport.authenticate('local', (err, token) => {
        if (err) throw err;
        res.send({ token: token});
    })(req, res)
    
});

module.exports = router;