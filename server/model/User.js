const mongoose = require("mongoose")
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')
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


//password hashing before saving passwords to db
userSchema.pre('save', async function (next){
    const salt =  await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    console.log("new user will be created and saved to db");
    next();
})
//fire a function after doc is saved to db
userSchema.post('save',function (doc,next){
    console.log("new user created and saved to db",doc);
    next();
})
const User = mongoose.model('User',userSchema)
module.exports = User
