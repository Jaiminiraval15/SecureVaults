const mongoose =require('mongoose');
//const bcrypt = require('bcrypt')
const passwordSchema = mongoose.Schema({
    passwordName: {
        type: String,
  
        required:true
    },
    username: {
        type: String,
      
        required:true
    },
    password: {
        type: String,
        
        required:true
    },

    //to which folder category will that password belong refering to folder model

    folderid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        required: true

    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
})

const Password = mongoose.model('Password',passwordSchema)
module.exports = Password
