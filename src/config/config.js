const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

// Load environment variables

dotenv.config({ path: path.join(__dirname, `../../${'.env'}`) });

// validate env with given schema
const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().default(4000),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
        MONGODB_URL: Joi.string().required(),

    })
    .unknown();

console.log(process.env.NODE_ENV)
//load errors or environment variables 
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

// throw error after validating env
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

// export variables for accessing it in application
module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    verifyEmailExpirationMinutes: envVars.EMAIL_VERIFY_OTP_EXPIRATION_MINUTES,
    mongoose: {
        url: envVars.MONGODB_URL,
        options: {
        },
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    },


};
