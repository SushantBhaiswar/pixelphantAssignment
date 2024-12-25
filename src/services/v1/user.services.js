
const ApiError = require('../../utils/apiError')
const httpStatus = require('http-status');
const utility = require('../../utils/helper');
const { USER } = require('../../models/index')

const createUser = async (req) => {
    try {
        console.log(req?.body)
        const { email, password, userName } = req?.body || {}

        if (await USER.isEmailTaken(email))
            throw new ApiError(httpStatus.BAD_REQUEST, utility.geterrorMessagess('authError.emailExist'));

        if (await USER.isUserNameTaken(userName))
            throw new ApiError(httpStatus.BAD_REQUEST, utility.geterrorMessagess('authError.usernameExist'));


        const createdUser = await USER.create({ email, password, userName })
        return createdUser
    } catch (error) {
        throw error
    }

};

const getUser = async (req) => {
    const { userName } = req?.body || {}

    if (await USER.isEmailTaken(email))
        throw new ApiError(httpStatus.BAD_REQUEST, utility.getErrMessages('authMessage.emailAlreadyExist'));

    if (await USER.isUserNameTaken(userName))
        throw new ApiError(httpStatus.BAD_REQUEST, utility.getErrMessages('authMessage.emailAlreadyExist'));


    await USER.create({ email, password, userName })
};

module.exports = {
    createUser,
    getUser
}
