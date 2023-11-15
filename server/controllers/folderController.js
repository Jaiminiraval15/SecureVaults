const Folder = require('../model/Folder');
const getAll = ( async (req,res)=>{
    const folder = await Folder.find();
    res.send(folder);
})
const addFolder = ( async (req,res)=>{
    const folderName = req.body.folderName;
    const folder = new Folder({
        folderName
    })
    await folder.save();
    res.json(folder)
    res.send(folder);
})
module.exports = {addFolder,getAll};