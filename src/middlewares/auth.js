/* eslint-disable array-callback-return */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable eqeqeq */
const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/apiError');


const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
    try {
        if (err || info || !user) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, err || 'Please Authenticate'));
        }

        req.user = user;

        resolve();
    } catch (error) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, error));
    }
};

const auth = () => async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(
            req,
            res,
            next
        );
    })
        .then(() => next())
        .catch((err) => {
            return next(err);
        });
};

module.exports = auth;