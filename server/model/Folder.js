const mongoose = require('mongoose');
const fSchema = new mongoose.Schema({
    folderName : {
        type : String,
        default : null,
        unique : true,
        required : true
    }
});
const folder = mongoose.model('Folders',fSchema);
module.exports = folder;
