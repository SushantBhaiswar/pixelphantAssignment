const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const { service } = require('../../services/v1');
const utility = require('../../utils/helper');


const createService = catchAsync(async (req, res) => {
    await service.createService(req);
    res.sendJSONResponse({
        code: httpStatus.OK,
        status: true,
        message: utility.getuserMessagess('userMessages.servicecreated'),
    });

});


module.exports = { createService }