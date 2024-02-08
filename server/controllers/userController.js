const User = require('../model/User');
const bcrypt = require('bcrypt');
const Folder = require('../model/Folder');
const Vault = require('../model/Password');
 const getUserDetails = async(req,res) => {
    try {
            const userid = req.userid;
            const user = await  User.findById(userid).select({password:0});
            if(!user){
                return res.status(404).json({error : 'User not found'})
            }
            res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
    }

const updateUserDetails = async (req, res) => {
    try {
        const userid = req.userid;
        const { firstname, lastname, username, password, email } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await User.findByIdAndUpdate(
            userid,
            { firstname, lastname, username, password: hashedPassword, email },
            { new: true, projection: {  _id: 0, __v: 0 } }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
       
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to update" });
    }
};

 const deleteUser = async(req,res)=>{
        try {
            const userid = req.params.userid;
            const user = await User.findById(userid);
            if(!user){
                return res.status(404).json({error : 'User not found'})
            }
            await Folder.deleteMany({userid:userid});
            await Vault.deleteMany({userid:userid});
            await User.deleteOne(userid);
            res.status(204).end();
            res.status(200).json({message : 'User deleted successfully'})
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
 }
 module.exports = {getUserDetails,updateUserDetails,deleteUser}