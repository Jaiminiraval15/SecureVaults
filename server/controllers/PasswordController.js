const Password = require('../model/Password');
const Folder = require('../model/Folder');
const addPassword = (async (req,res)=>{
    try {
        const {username,password,passwordName,folderid } = req.body;
        const vault = new Password({
            passwordName,
            username : username,
            password : password,
            folderid : folderid
        }) 
        await vault.save();
        res.status(200).json(vault);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
})
module.exports = {addPassword}