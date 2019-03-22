const jwt = require('jsonwebtoken');

//Token Verification
function verifyToken(req, res, next){

    //Get Auth Header
    const beareHeader = req.headers['authorization'];

    if(typeof beareHeader !== 'undefined'){

        const beare = beareHeader.split(' ');

        req.token = beare[1];

        jwt.verify(req.token, 'loggedin', (err, data) => {
            if (err) {
                res.json({ token: "No Data Found"} );
            }
            else{
                req.data = data;
                next();
            }    
            
        });

    }
    else{
        res.json({ token: "No Data Found"} );
    }

}

Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
 }

//Current Date
function formatDate(date) {
    var d = new Date(date),
        dformat = [ d.getFullYear(),
                    (d.getMonth()+1).padLeft(),
                    d.getDate().padLeft()].join('-')+
                    ' ' +
                  [ d.getHours().padLeft(),
                    d.getMinutes().padLeft(),
                    d.getSeconds().padLeft()].join(':');

    return dformat;
}
