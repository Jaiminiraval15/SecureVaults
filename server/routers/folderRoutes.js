const folderController = require('../controllers/folderController');
const {Router } = require('express');
const router = Router();
router.post("/addfolder",folderController.addFolder);
router.get("/",folderController.getAll);
router.delete("/:folderid",folderController.deleteFolder);
router.put("/:folderid",folderController.updateFolder);
module.exports = router;