const mongoose = require('mongoose');
const fSchema = new mongoose.Schema({
    folderName : {
        type : String,
        default : null,
        unique : true,
        required : true
    },
    userid : {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : [true,'Userid is required']

    }
});
const folder = mongoose.model('Folders',fSchema);
module.exports = folder;
