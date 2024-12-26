const Joi = require('joi');


const login = {

    body: Joi.object().keys({
        password: Joi.string().required(),
        email: Joi.string().required().email(),
    }),
};

const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};


module.exports = {
    login,
    logout,
    refreshTokens,
}