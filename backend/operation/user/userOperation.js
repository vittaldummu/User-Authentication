let UserModel = require('../../model/user/userModel');
let Promise = require('promise');

/**
 * 
 * This is for saving the new user
 * 
 */
let saveNewUser = (parameter)=>{
    return new Promise((resolve, reject)=>{
        let newUser = new UserModel(parameter);
        newUser.save().then((saveUser)=>{
            if(saveUser){
                resolve(saveUser);
            }else{
                reject('Error occur');
            }
        }).catch((err)=>{
            console.log('Error Occur : '+err);
            reject(err);
        });
    });
};

/**
 * 
 * This is for getting the new user
 * 
 */
let getAllUser = ()=>{
    return new Promise((resolve, reject)=>{
        UserModel.find({isTrue:true})
        .exec()
        .then((allRecords)=>{
            if(allRecords.length > 0){
                resolve(allRecords)
            }else{
                reject("Error in getting the records");
            }
        }).catch((err)=>{
            console.log('Error in getting the user details');
            reject(err);
        });
    });
};

/**
 * 
 * This is for update the new user
 * 
 */
let updateUser = (id, parameter)=>{
    return new Promise((resolve, reject)=>{
        UserModel.findByIdAndUpdate(id, { $set : parameter })
        .exec()
        .then((updatedRecord)=>{
            resolve(updatedRecord)
        }).catch((err)=>{
            console.log('Error in getting the user details');
            reject(err);
        });
    });
};


/**
 * 
 * This is for delete the new user
 * 
 */
let deleteUser = (id, userDetails)=>{
    return new Promise((resolve, reject)=>{
        UserModel.findByIdAndUpdate(id, { $set: userDetails }).then((data) => {
            console.log('data in operation file')
            console.log(data)
            resolve(data)
        }).catch((err)=>{
            console.log('Error in deleting the user');
            reject(err);
        })
    })
};


/**
 * 
 * This is for getting selected user
 * 
 */
let getSelectedUser = (id)=>{
    return new Promise((resolve, reject)=>{
        UserModel.findById({_id : id})
        .exec()
        .then((allRecords)=>{
            if(allRecords){
                resolve(allRecords)
            }else{
                reject("Error in getting the records");
            }
        }).catch((err)=>{
            console.log('Error in getting the user details');
            reject(err);
        });
    });
};


module.exports = {
    saveNewUser : saveNewUser,
    getAllUser : getAllUser,
    updateUser : updateUser,
    deleteUser : deleteUser,
    getSelectedUser : getSelectedUser
}