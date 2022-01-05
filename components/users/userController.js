const User = require('./userModel');

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
};

module.exports = new UserController();