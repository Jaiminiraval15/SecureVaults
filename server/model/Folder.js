const mongoose = require('mongoose');
const fSchema = new mongoose.Schema({
    folderName : {
        type : String,
        default : null,
        unique : true,
        required : true
    },
    userid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : [true,'Userid is required']

    }
});
fSchema.index({ folderName: 1, userid: 1 }, { unique: true });
const Folder = mongoose.model('Folder',fSchema);
module.exports = Folder;
