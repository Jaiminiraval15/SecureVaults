const Folder = require('../model/Folder');
const getAll = (async (req, res) => {
    try {
        const folder = await Folder.find();
        res.send(folder);
    }
    catch (error) {
        res.status(400).send('Cannot get folders!');
    }

})
const addFolder = (async (req, res) => {
    try {
        const folderName = req.body.folderName;
        const folder = new Folder({
            folderName
        })
        await folder.save();
        res.json(folder);
        res.send(folder);
    } catch (error) {
        res.status(400).json({ error: "Folder exists!" })
    }

})
// const deleteFolder = (async (req,res)=>{
//     try {
//         //const folderid = req.params.folderid;
//         const folder = await Folder.findById({_id:req.params.folderid});
//         if(!folder){
//             res.status(400).json({error:'Folder not found'});
//         }
//         await Folder.findByIdAndDelete({_id:req.params.folderid});

//     } catch (error) {
//         res.status(500).json({error : error.message});
//     }
// })
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

        // Delete the folder
        await Folder.findByIdAndDelete(folderid);

        console.log("Folder deleted successfully");
        res.json({ message: 'Folder deleted successfully', deletedFolder: folder });
    } catch (error) {
        console.error('Error deleting folder:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addFolder, getAll,deleteFolder };