var express = require('express');
const userController = require('./userController');
var router = express.Router();

const UserController = require('./userController');


router.get('/login', UserController.login);
router.post('/submitLogin',userController.submitLogin);
router.post('/submitregister', UserController.submitregister);
router.get('/register', UserController.register);

router.get('/', UserController.profile);

module.exports = router;    