const router = require('express').Router();
const Users = require('../models/users')
const common = require('../models/common');

router.get('/', (req, res) => {

    Users.getUsers((data) => {
        res.send(data);
    });

});

router.get('/user/:userId', (req, res) => {

    Users.getUser(req.params.userId, (data) => {
        res.send(data);
    });

});

router.put('/status/:empNo/:status', (req, res) => {

    Users.updateStatus(req.params.empNo, req.params.status, () => {
        res.send({msg: 200});
    });

});

router.put('/update/:empNo', (req, res) => {

    let data = {
        userId: req.body.userid,
        name: req.body.name,
        status: req.body.status,
        password:req.body.password,
        modefiedBy:req.data.user.user_name,
        modefiedDt:common.formatDate(new Date()),
    };

    Users.updateUser(data, req.params.empNo, () => {
        res.send({msg: 200});
    });

});

router.post('/add', (req, res) => {
    let data = {
        userId: req.body.userid,
        empId: req.body.userid,
        name: req.body.name,
        status: req.body.status,
        password:req.body.password,
        createdBy:req.data.user.user_name,
        createdDt:common.formatDate(new Date()),
    }
    Users.insertUser(data, () => {
        res.send({msg: 200});
    });

});

router.put('/updatepass', (req, res) => {
    let data = {
        user: req.data.user.user_id,
        oldPass: req.body.oldPass,
        newPass: req.body.newPass
    }

    Users.updatePass(data, (result) => {
        res.send(result);
    });
});

module.exports = router;