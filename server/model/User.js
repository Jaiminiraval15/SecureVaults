const mongoose = require("mongoose")
const {isEmail} = require('validator')
const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:[true,'Enter firstname']
    },
    lastname:{
        type:String,
        required:[true,'Enter lastname']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Enter email'],
        validate: [isEmail,'Enter a valid email']
    },
    username:{
        type:String,
        unique:true,
        required:[true,'Enter username']
    },
    password:{
        type:String,
        minLength:[8,'Password should be minimum 8 characters long'],
        required:[true,'Enter password']
    }
})
const User = mongoose.model('User',userSchema)
module.exports = User
//fire a function after doc is saved to db
userSchema.post('save',function (doc,next){
    console.log("new user created and saved to db",doc);
    next();
})
userSchema.pre('save',function (next){
    console.log("new user will be created and saved to db");
    next();
})