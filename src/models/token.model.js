const mongoose = require('mongoose');
const { tokenTypes } = require('../config/tokens');
const schemaNames = require('../config/schemaNames');

const tokenSchema = mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            index: true,
        },
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: schemaNames.USER,
            required: true,
        },
        type: {
            type: String,
            enum: [tokenTypes.REFRESH],
            required: true,
        },
        expires: {
            type: Date,
            required: true,
        },
        blacklisted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);


/**
 * @typedef Token
 */
const Token = mongoose.model(schemaNames.TOKEN, tokenSchema);

module.exports = Token;
