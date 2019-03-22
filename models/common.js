const bcrypt = require('bcryptjs'),
      jwt = require('jsonwebtoken');

var exportObj = {};

//Hashing Password
exportObj.hashPassword = (password) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    return hash;
}

//Comparing Password
exportObj.comparePassword = (textPassword, hash) => {
    return bcrypt.compareSync(textPassword, hash);
}

exportObj.verifyToken = (req, res, next) => {

    //Get Auth Header
    const beareHeader = req.headers['authorization'];

    if(typeof beareHeader !== 'undefined'){

        const beare = beareHeader.split(' ');

        req.token = beare[1];

        jwt.verify(req.token, 'loggedin', (err, data) => {
            if (err) {
                res.json({ token: false} );
            }
            else{
                req.data = data;
                next();
            }    
            
        });

    }
    else{
        res.json({ token: false} );
    }

}

module.exports = exportObj;