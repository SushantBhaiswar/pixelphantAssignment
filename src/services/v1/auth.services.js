
const ApiError = require('../../utils/apiError')
const httpStatus = require('http-status');
const { geterrorMessagess } = require('../../utils/helper');
const token = require('./token.services')
const { tokenTypes } = require('../../config/tokens');
const tokenServices = require('./token.services')
const { USER, TOKEN } = require('../../models/index');

const loginUser = async (req) => {
    const { email, password } = req?.body;

    const userData = await USER.findOne({ email });
    if (!userData) throw new ApiError(httpStatus.NOT_FOUND, geterrorMessagess('authError.invalidLogin'))

    if (!await userData.isPasswordMatch(password)) throw new ApiError(httpStatus.NOT_FOUND, geterrorMessagess('authError.invalidPass'))

    const tokens = await token.generateAuthTokens(userData?._id, true)
    delete userData.password
    return { user: userData, tokens }
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (req) => {
    const refreshTokenDoc = await TOKEN.findOne({
        token: req.body.refreshToken,
        type: tokenTypes.REFRESH,
        blacklisted: false,
    });
    if (refreshTokenDoc) {
        await TOKEN.deleteOne({
            token: req.body.refreshToken,
            type: tokenTypes.REFRESH,
            blacklisted: false,
        });
    }
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (req) => {
    const { refreshToken } = req?.body;
    try {
        const refreshTokenDoc = await tokenServices.verifyToken(refreshToken, tokenTypes.REFRESH);
        const genereated = new Date(refreshTokenDoc.expires) < new Date();
        if (new Date(refreshTokenDoc.expires) <= new Date()) throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
        const user = await USER.findOne({ _id: refreshTokenDoc.user._id }).lean();
        if (!user) {
            throw new Error();
        }
        const tokens = await tokenServices.generateAuthTokens(user, genereated, refreshTokenDoc.deviceId);
        if (tokens.refresh.token) {
            await TOKEN.deleteOne({ _id: refreshTokenDoc._id });

        } else {
            tokens.refresh.token = refreshToken;
            tokens.refresh.expires = new Date(refreshTokenDoc.expires);
        }
        return { tokens, user };
    } catch (error) {
        console.log(error.message);
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
};

module.exports = {
    logout,
    loginUser,
    refreshAuth,
}