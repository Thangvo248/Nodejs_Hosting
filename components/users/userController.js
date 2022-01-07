const config = require("../../conf/db/authconf");
const Account = require('../users/AccountModel');
const User = require('../users/userModel');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { create } = require("hbs");
const createHttpError = require("http-errors");
class UserController {


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
            if (!email || !password) {
                throw console.log('Da co loi xay ra');
            }
            const isExits = await Account.findOne({
                email: email
            });
            if (isExits) {
                throw console.log('Da co loi xay ra');
            }
            const Newaccount = await Account.create({
                email: email,
                password
            });
            const users= req.body;
            const Newuser= await User.create({
                name: users.name,
                email: users.email,
                phone: users.phone,
            })
            res.redirect('users/login')
        }
        catch (error) {
            next(error);
        }
    }
};

module.exports = new UserController();