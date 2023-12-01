const passwordController = require('../controllers/PasswordController');
const {Router} = require('express');
const router = Router();
router.get('/',passwordController.getAllPasswords)
router.post('/addpassword',passwordController.addPassword)
router.put('/:passwordid',passwordController.updatePassword)
router.delete('/:passwordid',passwordController.deletePassword)
module.exports = router