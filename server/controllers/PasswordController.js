const Password = require('../model/Password');
//const Folder = require('../model/Folder');
const getAllPasswords = (async (req, res) => {
    try {
        const userid = req.userid
        const password = await Password.find({ userid }).populate('folderid');
        res.status(200).json(password)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
const addPassword = (async (req, res) => {
    try {
        const userid = req.userid
        const { username, password, passwordName, folderid } = req.body;
        const vault = new Password({
            passwordName,
            userid: userid,
            username: username,
            password: password,
            folderid: folderid
        })
        await vault.save();
        res.status(200).json(vault);
    } catch (error) {
        console.error("Error adding the password:", error);
        res.status(500).json({ error: error.message });
    }
})
const updatePassword = (async (req, res) => {
    try {
        const passwordid = req.params.passwordid
        const { passwordName, password, username, folderid } = req.body
        const vault = await Password.findById(passwordid)
        if (!vault) {
            return res.status(400).json({ error: ' not found' })
        }
        if (vault.userid._id.toString() !== req.userid._id.toString()) {
            return res.status(402).json({ error: ' not allowed to access' })
        }
        vault.Password = password,
            vault.passwordName = passwordName,
            vault.folderid = folderid,
            vault.username = username
        const updatedVault = await vault.save()
        res.status(200).json(updatedVault)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})
const deletePassword = (async (req, res) => {
    try {
        const passwordid = req.params.passwordid
        const password = await Password.findById(passwordid)
        if (!password) {
            return res.status(400).json({ error: 'not found' })
        }
        if (password.userid._id.toString() !== req.userid._id.toString()) {
            return res.status(402).json({ error: ' not allowed to access' })
        }
        await Password.findByIdAndDelete(passwordid)
        res.json({ message: 'Password deleted successfully', deletePasswordPassword: password });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({ error: "Vault not found" });
        }
        res.status(500).json({ error: error.message });
    }
}
)
module.exports = { getAllPasswords, addPassword, updatePassword, deletePassword }