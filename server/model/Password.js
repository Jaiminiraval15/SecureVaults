const mongoose =require('mongoose');
const passwordSchema = mongoose.Schema({
    passwordName: {
        type: String,
        default:null,
        required:true
    },
    username: {
        type: String,
        default:null,
        required:true
    },
    password: {
        type: String,
        default:null,
        required:true
    },

    //to which folder category will that password belong refering to folder model

    folderid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        required: true

    }
    // userid:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true

    // },
})
const Password = mongoose.model('Password',passwordSchema)
module.exports = Password
