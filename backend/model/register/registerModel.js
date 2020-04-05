let mongoose = require('mongoose');
let schema = mongoose.Schema;
let RegisterSchema = schema({
    user_name:{
        type:String,
        required:true,
    },
    user_password:{
        type:String,
        required:false
    }
});

let Register = module.exports = mongoose.model('Register', RegisterSchema);