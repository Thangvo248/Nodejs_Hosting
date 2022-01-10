const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const signAccessToken = async (userId) => {

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
}
module.exports={
  signAccessToken
}