
const ApiError = require('../../utils/apiError')
const httpStatus = require('http-status');
const utility = require('../../utils/helper');
const { SERVICE } = require('../../models/index')

const createService = async (req) => {
    try {
        const { email, password, userName } = req?.body || {}



        const createdUser = await SERVICE.create({ email, password, userName })
        return createdUser
    } catch (error) {
        throw error
    }

};


module.exports = {
    createService,
}
