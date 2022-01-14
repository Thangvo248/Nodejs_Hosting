const jwt = require("jsonwebtoken");
const create = require('http-errors');
const Account = require('../components/users/AccountModel');

const signAccessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId
    }
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: '1h'
    }
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) reject(err)
      resolve(token);
    });
  })

};
const verifyAccessToken = (req, res, next) => {
  if (!req.headers['authorization']) {
    return next(createError.Unauthorized());
  }
  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  //start verify toke
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {

    if (!err) {
      return next(createError.Unauthorized());
    }
    req.payload = payload;
    next();
  })
};
const signRefreshToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId
    }
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: '1y'
    }
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) reject(err)
      resolve(token);
    });
  })

};
const verifyRefereshToken = async (refreshToken) => {
  return new Promise((resolve,reject)=>{
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err,payload)=>{
      if(err){
        return reject(err);
      }
      resolve(payload);
    })
  });
};

module.exports = {
  signAccessToken, verifyAccessToken ,signRefreshToken,verifyRefereshToken
 }