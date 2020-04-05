let mongoose = require('mongoose');
let schema = mongoose.Schema;
let UserSchema = schema({
    user_id:{
        type:String,
        required:true,
    },
    user_name:{
        type:String,
        required:false
    },
    user_password:{
        type:String,
        required:false
    },
    first_name:{
        type:String,
        required:false
    },
    last_name:{
        type:String,
        required:false
    },
    adress:{
        type:String,
        required:false
    },
    contact_number:{
        type:Number,
        required:false
    },
    isTrue:{
        type:Boolean,
        required:true,
        default:true
    }
});

let User = module.exports = mongoose.model('User', UserSchema);