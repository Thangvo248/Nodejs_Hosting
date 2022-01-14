const create = require('http-errors');
const Account = require('../components/users/AccountModel')


const checkLogin = (req, res, next) => {
    try {
      const token = req.cookies.token
      const idUser = await signAccessToken(user._id);
      const account = new Account.findOne({ _id: idUser._id });
    } catch (error) {
      next(error);
    }
  };
  const checkUser = async (req, res, next) => {
    try {
      const role = req.body.role;
      if (role === 'User' || role === 'Admin') {
        next();
      }
    } catch (error) {
      next(error);
    }
  };
  const checkAdmin = async (req, res, next) => {
    try {
      const role = req.body.role;
      if (role === 'Admin') {
        next();
      }
    } catch (error) {
      next(error);
    }
  };v