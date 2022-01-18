const Account = require('../users/AccountModel');
const User = require('../users/userModel');
const { signAccessToken, verifyAccessToken } = require('../../middlewares/authJwt');
const { create } = require('hbs');
const createError = require('http-errors');
const { userValidate } = require('../../conf/db/validation');
const { mongooseToObject } = require('../util/mongooese');

class UserController {

    async submitLogin(req, res, next) {
        try {
            const { email, password } = req.body;
            const account = await Account.findOne({
                email: email
            });
            const { error } = userValidate(req.body);
            if (error) {
                throw createError('Bạn nhập sai email, password');
            }
            if (!account) {
                throw createError('Email không chính xác');
            }
            const isValid = await account.isCheckPassword(password);
            if (!isValid) {
                throw createError('Sai mật khẩu');
            }
            const user = await User.findOne({ email: email })
            const accessToken = await signAccessToken(user._id);
            if (!accessToken) {
                throw createError('Đăng nhập không thành công, bạn vui lòng thử lại');
            }
            res.cookie('access_token', accessToken, { httpOnly: true });
            res.redirect('/');
        }
        catch (error) {
            next(error);
        }

    }
    async login(req, res, next) {
        res.render('users/login');
    }
    async logout(req, res, next) {
        res.clearCookie('access_token').redirect('/');
    }

    async register(req, res, next) {
        res.render('users/register');
    }
    async profile(req, res, next) {
        const id = req.payload.userId;
        const user = await User.findOne({
            _id: id,
        })
            .then(user => {
                res.render('users/profile', {
                    user: mongooseToObject(user)
                })
            })
            .catch(next);
    }
    async submitregister(req, res, next) {
        try {
            const { email, password } = req.body;
            const isExits = await Account.findOne({
                email: email
            });
            if (isExits) {
                throw createError('Email đã được đăng ký');
            }
            const Newaccount = new Account({
                email: email,
                password: password
            })
            const SaveNewaccount = await Newaccount.save();
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
            })
            const newuser = await user.save();
            res.redirect('/users/login')
        }
        catch (error) {
            next(error);
        }
    }

};

module.exports = new UserController();