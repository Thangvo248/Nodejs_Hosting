var express = require('express');
var router = express.Router();

const UserController = require('./userController');


router.get('/login', UserController.login);
router.post('/submitregister', UserController.submitregister);
router.get('/register', UserController.register);

router.get('/', UserController.profile);

module.exports = router;    