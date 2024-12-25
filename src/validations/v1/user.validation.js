const Joi = require('joi');


const createUser = {
    body: Joi.object().keys({
        userName: Joi.string().required(),
        password: Joi.string().required().min(8),
        email: Joi.string().required().email(),
    }),
};

const getUser = {
    params: Joi.object().keys({
        userName: Joi.string().required(),
    }),
};


module.exports = {
    createUser,
    getUser
}