var express = require('express');
const userController = require('./userController');
var router = express.Router();
const {verifyAccessToken} = require('../../middlewares/authJwt')
const UserController = require('./userController');


router.get('/login', UserController.login);
router.get('/logout',verifyAccessToken,userController.logout);
router.post('/submitLogin',userController.submitLogin);
router.post('/submitregister', UserController.submitregister);
router.get('/register', UserController.register);

router.get('/',verifyAccessToken, UserController.profile);

module.exports = router;    