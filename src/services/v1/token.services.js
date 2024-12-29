const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../../config/config');
const { TOKEN } = require('../../models/index');
const ApiError = require('../../utils/apiError');
const { tokenTypes } = require('../../config/enumValues');
/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
    const payload = {
        userId: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    };
    return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type) => {
    const tokenDoc = await TOKEN.create({
        token,
        userId,
        expires: expires.toDate(),
        type,
    });
    return tokenDoc;
};



const verifyToken = (token, type) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.jwt.secret, async (err, payload) => {
            if (err) {
                // Handle JWT expiration or other errors
                if (err.name === 'TokenExpiredError') {
                    reject(new ApiError(httpStatus.BAD_REQUEST, 'The password reset link has timed out. Please return to the login page and try resetting your password again to generate a new link'));
                } else {
                    reject(new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token'));
                }
            } else {
                // If verification is successful, proceed to find the token document
                try {
                    const tokenDoc = await TOKEN.findOne({ token, type, user: payload.sub, blacklisted: false });
                    if (!tokenDoc) {
                        reject(new ApiError(httpStatus.BAD_REQUEST, 'The password reset link has timed out. Please return to the login page and try resetting your password again to generate a new link'));
                    } else {
                        resolve(tokenDoc);
                    }
                } catch (dbError) {
                    reject(new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error'));
                }
            }
        });
    });
};

const generateAuthTokens = async (user, refreshTokenExpired) => {
    console.log(user, refreshTokenExpired)
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user, accessTokenExpires, tokenTypes.ACCESS);

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    let refreshToken;

    // if refresh token is not expired then generate access token only
    if (refreshTokenExpired) {
        refreshToken = await generateToken(user, refreshTokenExpires, tokenTypes.REFRESH);
        await saveToken(refreshToken, user, refreshTokenExpires, tokenTypes.REFRESH);
    }
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken || false,
            expires: refreshTokenExpires.toDate(),
        },
    };
};




module.exports = {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens,
};
