const joi = require('joi');

const userValidate = data => {
    const Account = joi.object({
        email: joi.string().pattern(new RegExp('gmail.com$')).email().lowercase().required(),//email chu thuong khong miss
        password: joi.string().min(8).max(32).required(),
        repeatPassword: joi.ref('password'),
    });
    return Account.validate(data);
};

module.exports = {
    userValidate
}