const Folder = require('../model/Folder');
const Password = require('../model/Password');
const getAll = (async (req, res) => {
    try {
        const userid = req.userid.id
        const folder = await Folder.find({userid : userid});
        res.send(folder);
    }
    catch (error) {
        res.status(400).send('Cannot get folders!');
    }

})
const addFolder = (async (req, res) => {
    try {
        const userid = req.userid.id
        const {folderName }= req.body;
        console.log(req.body); // Log the request body

        const folder = new Folder({
            folderName,
            userid : userid
        })
        await folder.save();
        res.json(folder);
 
    } catch (error) {
        // duplicate error
        if (error.code === 11000) {
            console.log("Folder already exists");
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
        console.log(folder.userid.toString())
        if (!folder) {
            console.log("Folder not found");
            return res.status(404).json({ error: 'Folder not found' });
        }
        if (folder.userid._id.toString() !== req.userid._id.toString()){
            return res.status(403).json({error : 'Permission not granted'})
        }
        await Password.deleteMany({ folderid: folderid });
        // Delete the folder
        await Folder.findByIdAndDelete(folderid);

        console.log("Folder deleted successfully");
        res.json({ message: 'Folder deleted successfully', deletedFolder: folder });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({ error: "Folder is not found" });
          }
        console.error('Error deleting folder:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updateFolder =(async (req,res)=>{
    try {
        const folderid = req.params.folderid;
        const folder = await Folder.findById(folderid);
        const folderName = req.body.folderName;
        console.log("User ID from request:", req.userid);
        console.log("User ID from request:", req.userid._id.toString());
        console.log("User ID from folder:", folder.userid);
        console.log("User ID type from folder:", typeof folder.userid.toString());
        console.log("User ID type from request:", typeof req.userid);
          console.log("Comparison result:", folder.userid.toString()=== req.userid);
        if(!folder){
            console.log("Folder not found");
            return res.status(404).json({ error: 'Folder not found' });
        } 
        if (folder.userid._id.toString() !== req.userid._id.toString()) {
            return res.status(403).json({ error: "Permission is denied" });
          }
        folder.folderName = folderName;
        const updatedFolder = await folder.save();
        res.status(200).json(updatedFolder);

    }
     catch (error) {
        if (error.name === 'Cast Error'){
            return res.status(404).json({error : "Not found"});
        }
        res.status(500).json({error : error.message})
    }
   

})
module.exports = { addFolder, getAll,deleteFolder,updateFolder };