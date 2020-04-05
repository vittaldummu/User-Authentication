let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let LoginOperation = require('../../operation/login/loginOperation');
let config = require('../../../config/config');
let server = require('../../../server');




router.post('/loginUser',function(req, res, next){
    console.log("=========== inside the login user routes========== "+req.body);
    
    LoginOperation.loginUser(req.body).then(function(userDetails){
        console.log('-------userDetails ------- '+JSON.stringify(userDetails));
        if(userDetails.status == true){
            console.log('-------userDetails._id in login routes ------- '+userDetails.user._id);
        let payload = { subject : userDetails.user._id };
        req.session.userId = userDetails.user._id;
        // console.log('-------- req.session =========== in login routes ====== '+JSON.stringify(req.session));
        let token = jwt.sign(payload, config.secretKey);
            res.status(200).send({
                success: true,
                token
            })
        }else{
            if(userDetails.MSG == 'Invalid Email'){
                res.status(401).send({
                    success : false,
                    Msg : userDetails.MSG,
                })
            }else{
                res.status(401).send({
                    success : false,
                    Msg : userDetails.MSG,
                })
            }
        }
    })
});

router.post('/logoutUser', function (req, res, next){
    console.log('------- inside the logout route------'+JSON.stringify(req.body))
    if(req.body.instruction == 'logout'){
        req.session.destroy(function(err) {
            // cannot access session here
            if(err){
                res.send({
                    success : false,
                    MSG : 'Unable to logout'
                })
            }else{
                res.clearCookie(config.SESS_NAME);
                res.send({
                    success : true,
                    MSG : 'successfully loggedout'
                })
            }
          })
    }
})

module.exports = router;