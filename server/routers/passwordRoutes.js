const passwordController = require('../controllers/PasswordController');
const {Router} = require('express');
const router = Router();
router.post('/addpassword',passwordController.addPassword)
module.exports = router