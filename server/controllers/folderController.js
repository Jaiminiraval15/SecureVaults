const Folder = require('../model/Folder');
const getAll = (async (req, res) => {
    try {
        const userid = req.userid
        const folder = await Folder.find({userid : userid});
        res.send(folder);
    }
    catch (error) {
        res.status(400).send('Cannot get folders!');
    }

})
const addFolder = (async (req, res) => {
    try {
        const userid = req.userid
        const {folderName }= req.body;
        const folder = new Folder({
            folderName,
            userid : userid
        })
        await folder.save();
        res.json(folder);
        res.send(folder);
    } catch (error) {
        // duplicate error
        if (error.code === 11000) {
            return res.status(400).json({ error: "Folder already exists" });
          }     
        res.status(500).json({ error: error.message })
    }

})
const deleteFolder = async (req, res) => {
    try {
        const folderid = req.params.folderid;
        console.log("Folder ID:", folderid);

        // Check if the folder exists
        const folder = await Folder.findById(folderid);
        console.log("Found Folder:", folder);

        if (!folder) {
            console.log("Folder not found");
            return res.status(404).json({ error: 'Folder not found' });
        }
        if (folder.userid.toString() !== req.userid){
            return res.status(403).json({error : 'Permission not granted'})
        }

        // Delete the folder
        await Folder.findByIdAndDelete(folderid);

        console.log("Folder deleted successfully");
        res.json({ message: 'Folder deleted successfully', deletedFolder: folder });
    } catch (error) {
        console.error('Error deleting folder:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updateFolder =(async (req,res)=>{
    try {
        const folderid = req.params.folderid;
        const folder = await Folder.findById(folderid);
        const folderName = req.body.folderName;
    
        if(!folder){
            console.log("Folder not found");
            return res.status(404).json({ error: 'Folder not found' });
        } 
        if (folder.userid.toString() !== req.userid) {
            return res.status(403).json({ error: "Permission is denied" });
          }
        folder.folderName = folderName;
        const updatedFolder = await folder.save();
        res.status(200).json(updatedFolder);
    } catch (error) {
        if (error.name === 'Cast Error'){
            return res.status(404).json({error : "Not found"});
        }
        res.status(500).json({error : error.message})
    }
   

})
module.exports = { addFolder, getAll,deleteFolder,updateFolder };