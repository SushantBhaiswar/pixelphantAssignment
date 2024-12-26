const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { authServices } = require('../../services/v1');
const utility = require('../../utils/helper');



const login = catchAsync(async (req, res) => {
    const response = await authServices.loginUser(req);

    return res.sendJSONResponse({
        code: httpStatus.OK,
        status: true,
        message: utility.getuserMessagess('authMessages.loginSuccessfully'),
        data: { user: response.user, tokens: response.tokens },
    });
});

const logout = catchAsync(async (req, res) => {
    await authServices.logout(req);
    res.sendJSONResponse({
        code: httpStatus.OK,
        status: true,
        message: utility.getuserMessagess('authMessages.logoutSuccessfully'),
    });
});

const refreshTokens = catchAsync(async (req, res) => {
    const tokens = await authServices.refreshAuth(req);
    res.sendJSONResponse({
        code: httpStatus.OK,
        status: true,
        message: utility.getuserMessagess('authMessages.refreshTokenGenerated'),
        data: { user: tokens.user, tokens: tokens.tokens },
    });
});


module.exports = {
    login,
    logout,
    refreshTokens,
}