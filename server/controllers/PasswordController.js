const Password = require('../model/Password');
//const Folder = require('../model/Folder');
const getAllPasswords = (async (req,res) =>{
    try {
        const userid = req.userid
        const password = await Password.find({userid})
        res.status(200).json(password)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})
const addPassword = (async (req,res)=>{
    try {
        const userid = req.userid
        const {username,password,passwordName,folderid } = req.body;
        const vault = new Password({
            passwordName,
            userid : userid,
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
module.exports = {getAllPasswords,addPassword}