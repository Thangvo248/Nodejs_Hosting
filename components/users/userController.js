const Account = require('../users/AccountModel');
const User = require('../users/userModel');
const { userValidate } = require('../../conf/db/validation');
const createError = require('http-errors');
const {signAccessToken}= require('../../middlewares/authJwt');
class UserController {

    async submitLogin(req, res, next) {
        try {


            const { email, password } = req.body;

            const { error } = userValidate(req.body);
             if (error) {
                 throw createError(error.details[0].message);
             }
            const user = await Account.findOne({
                email: email
            });
            if (!user) {    
                throw createError.NotFound('Tai khoan chua duoc dang ky');
            }
            const isValid = await user.isCheckPassword(password);
            if (!isValid) {
                throw createError.Unauthorized();
            }
            const accessToken = await signAccessToken(user._id);
            res.redirect('/');
        }
        catch (error) {
            next(error);
        }

    }
    async login(req, res, next) {
        res.render('users/login');
    }
    async register(req, res, next) {
        res.render('users/register');
    }
    async profile(req, res, next) {
        res.render('users/profile');
    }
    async submitregister(req, res, next) {
        try {
            const { email, password } = req.body;
            const { error } = userValidate(req.body);
           /* if (error) {
                throw createError(error.details[0].message);
            }*/
            const isExits = await Account.findOne({
                email: email
            });
            if (isExits) {
                throw console.log('Da co loi xay ra');
            }
            const Newaccount = new Account({
                email: email,
                password: password
            })
            const SaveNewaccount = await Newaccount.save();
            const user = new User ({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
            })
            const newuser= await user.save();
            res.redirect('/users/login')
        }
        catch (error) {
            next(error);
        }
    }
};

module.exports = new UserController();