const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { userServices } = require('../../services/v1');
const utility = require('../../utils/helper');


const createUser = catchAsync(async (req, res) => {
    await userServices.createUser(req);
    res.sendJSONResponse({
        code: httpStatus.OK,
        status: true,
        message: utility.getuserMessagess('userMessages.usercreated'),
    });

});

const getUser = catchAsync(async (req, res) => {
    const response = await userServices.getUser(req);
    console.log("🚀 ~ getUser ~ response:", response)
    res.sendJSONResponse({
        code: httpStatus.OK,
        status: true,
        message: utility.getuserMessagess('userMessages.usercreated'),
        data: { ...response }
    });

});


module.exports = {
    createUser,
    getUser
}