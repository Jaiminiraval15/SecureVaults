const folderController = require('../controllers/folderController');
const {Router } = require('express');
const router = Router();
router.post("/addfolder",folderController.addFolder);
router.get("/",folderController.getAll);
module.exports = router;