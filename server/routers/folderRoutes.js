const folderController = require('../controllers/folderController');
const {Router } = require('express');
const router = Router();
router.post("/addfolder",folderController.addFolder);
router.get("/",folderController.getAll);
router.delete("/:folderid",folderController.deleteFolder);
module.exports = router;