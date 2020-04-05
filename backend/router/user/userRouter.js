let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
let UserOperation = require('../../operation/user/userOperation');
let config  = require('../../../config/config');

/**
 * 
 * This is the rest API for saving the new user
 * 
 */
router.post('/saveNewUser', function(req, res, next){
    let userDetails = {
        user_id : req.body.userId,
        user_name : req.body.userName,
        user_password : req.body.userPassword,
        first_name : req.body.firstName,
        last_name : req.body.lastName,
        adress : req.body.adress,
        contact_number : req.body.contact,
        isTrue : true,
    }
    UserOperation.saveNewUser(userDetails).then(function(savedUser){
        if(savedUser){
            res.send({
                success : true,
                MSG : "Successfully saved the user",
                savedUser : savedUser
            });
        }
    }).catch(function(err){
        res.send({
            success : true,
            MSG : "Not able to saved the user",
            Error : err
        });
    })
});

/**
 * 
 * This is the rest API for getting user
 * 
 */
router.get('/getUserList', verifyToken , function(req, res){
    console.log('===== sessionId ========= '+req.sessionID);
    UserOperation.getAllUser().then(function(allUser){
        res.send({
            success : true,
            MSG : "Successfully get the user details",
            getAllUser : allUser
        })
    }).catch(function(err){
        res.send({
            success : true,
            MSG : "Error in getting the user details",
            Error : err
        })
    });
});

/**
 * 
 * This is the rest API for getting selected user
 * 
 */
router.get('/getSelectedUser', function(req, res){
    let parameter = {
        name : req.body.firstName
    }
    UserOperation.getSelectedUser(parameter).then(function(selectedUser){
        res.send({
            success : true,
            MSG : "Successfully get the user details",
            selectedUser : selectedUser
        })
    }).catch(function(err){
        res.send({
            success : true,
            MSG : "Error in getting the user detail",
            Error : err
        })
    });
});

/**
 * 
 * This is the rest API for updating the user
 * 
 */
router.post('/updateUser', function(req, res){
    UserOperation.getSelectedUser(req.body._id).then(function(data){
        let updateDetails = {
            user_id : req.body.user_id,
            user_name : req.body.user_name,
            user_password : data.user_password,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            adress : req.body.adress,
            contact_number : req.body.contact_number,
            isTrue : true,
        }
        UserOperation.updateUser(req.body._id, updateDetails).then(function(updatedUser){
            res.send({
                success : true,
                MSG : "Successfully updated the user",
                updatedUserDetails : updatedUser
            })
        }).catch(function(err){
            res.send({
                success : true,
                MSG : "Error in updated the user",
                Error : err
            })
        })
    })
});

/**
 * 
 * This is the rest API for deleting the user
 * 
 */
router.post('/deleteUser', function(req, res){
    let id = req.body._id;
    let userDetails = req.body;
    userDetails.isTrue = false;
    
    UserOperation.deleteUser(id, userDetails).then(function(userDeleted){
        res.send({
            success : true,
            MSG : 'Successfully deleted the user',
        })
    }).catch(function(err){
        res.send({
            success : false,
            MSG : 'Error during deleting the user',
            Error : err
        })
    })
});

function verifyToken(req, res, next){
    console.log('-------req.headers in user route-------- '+JSON.stringify(req.headers));

    if(!req.headers.authorization){
        return res.status(401).send(
            'Unauthorized request'
        )
    }
    let token = req.headers.authorization.split(' ')[1];
    console.log('-------token -------- '+token);
    var decoded = jwt.decode(token);
    console.log('====== token after decode ======== '+JSON.stringify(decoded));
    if(token == 'null'){
        return res.status(401).send(
            'Unauthorized request'
        )
    }

    let payload = jwt.verify(token, config.secretKey);
    console.log('------- payload ------ '+JSON.stringify(payload));
    if(!payload){
        return res.status(401).send(
            'Unauthorized request'
        )
    }
    console.log('-------- 000000000')
    req.userId = payload.subject
    next();
}

module.exports = router;