
const ApiError = require('../../utils/apiError')
const httpStatus = require('http-status');
const utility = require('../../utils/helper');
const { SERVICE } = require('../../models/index')

const createService = async (req) => {
    try {
        const { serviceName, serviceLink, monthlyFee } = req?.body || {}


        const createdUser = await SERVICE.create({ serviceName, serviceLink, monthlyFee, userId: req.user._id })
        console.log("🚀 ~ createService ~ createdUser:", createdUser)
        return createdUser
    } catch (error) {
        throw error
    }

};


module.exports = {
    createService,
}
