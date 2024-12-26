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
    await userServices.getUser(req);
    res.sendJSONResponse({
        code: httpStatus.OK,
        status: true,
        message: utility.getuserMessagess('userMessages.usercreated'),
    });

});


module.exports = {
    createUser,
    getUser
}