const userController = require('../controllers/userController');
const {Router} = require('express');
const router = Router();
router.get('/',userController.getUserDetails)
router.put('/:userid',userController.updateUserDetails)
router.delete('/:userid',userController.deleteUser)
module.exports = router