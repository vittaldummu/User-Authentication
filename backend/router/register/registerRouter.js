let express = require('express');
let jwt = require('jsonwebtoken');
let router = express.Router();
let RegisterOperation = require('../../operation/register/registerOperation');

router.post('/registerUser',function(req, res, next){
    console.log(req.body);
    let  newUser = {
        user_name : req.body.email,
        user_password : req.body.password
    }
    RegisterOperation.regiterUser(newUser).then(function(userDetails){
        let payload = { subject : userDetails._id };
        let token = jwt.sign(payload, 'mySecretKey');
        res.status(200).send({
            success: true,
            token
        })
    })
})

module.exports = router;