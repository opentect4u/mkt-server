const router = require('express').Router();
const Users = require('../models/users')

router.get('/', (req, res) => {

    Users.getUsers((data) => {
        res.send(data);
    });

});

router.put('/status/:empNo/:status', (req, res) => {

    Users.updateStatus(req.params.empNo, req.params.status, () => {
        res.send({msg: 200});
    });

});

module.exports = router;