let mongoose = require('mongoose');
let schema = mongoose.Schema;
let LoginSchema = schema({
    user_name:{
        type:String,
        required:true,
    },
    user_password:{
        type:String,
        required:false
    }
});

let Login = module.exports = mongoose.model('Login', LoginSchema);