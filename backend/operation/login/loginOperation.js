let LoginModel = require('../../model/register/registerModel');
let Promise = require('promise');

let loginUser = (userdetails) =>{
    return new Promise((resolve, reject)=>{
        console.log(userdetails.email)
        LoginModel.findOne({user_name: userdetails.email}, (err,user)=>{
            if(err){
                console.log('000000000000');
                resolve({
                    MSG:err,
                    status:false
                })
            }else{
                if(!user){
                    console.log('1111111111');
                    resolve({
                        MSG:'Invalid Email',
                        status:false
                    })
                }else{
                    console.log('--------user --------- '+user);
                    if(user.user_password !== userdetails.password){
                        console.log('222222222');
                        resolve({
                            MSG:'Invalid Password',
                            status:false
                        })
                    }else{
                        console.log('33333333333');
                        resolve({
                            status:true,
                            user:user
                        })
                    }
                }
            }
        })
    })
}



module.exports = {
    loginUser : loginUser
}