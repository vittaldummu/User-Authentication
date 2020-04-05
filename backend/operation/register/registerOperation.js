let RegisterModel = require('../../model/register/registerModel');
let Promise = require('promise');

let regiterUser = (userdetails)=>{
    return new Promise((resolve, reject)=>{
        let registerModel = new RegisterModel(userdetails);
        registerModel.save()
        .then((userData)=>{
            resolve(userData);
        }).catch((err)=>{
            reject(err);
        });
    });
};

module.exports = {
    regiterUser : regiterUser,
}