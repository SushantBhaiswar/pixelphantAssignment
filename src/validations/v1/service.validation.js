const Joi = require('joi');


const createService = {

    body: Joi.object().keys({
        serviceName: Joi.string().required(),
        serviceLink: Joi.string().required(),
        monthlyFee: Joi.number().required(),
    }),
};

module.exports = {
    createService
}