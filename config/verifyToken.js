let jwt = require('jsonwebtoken');
let UserOperation = require('../backend/operation/user/userOperation');

module.exports = function(req, res, next){
    console.log('-------req.headers in verify token-------- '+JSON.stringify(req.headers));
    if(!req.headers.authorization){
        return res.status(401).send(
            'Unauthorized request'
        )
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token == 'null'){
        return res.status(401).send(
            'Unauthorized request'
        )
    }

    console.log('----------- token inside verifytoken file ---------- '+token);

    let payload = jwt.verify(token, 'secretkey');
    if(!payload){
        return res.status(401).send(
            'Unauthorized request'
        )
    }
    req.userId = payload.subject
    next();
}