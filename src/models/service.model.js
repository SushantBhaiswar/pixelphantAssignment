const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schemaNames = require('../config/schemaNames');

const serviceSchema = mongoose.Schema(
    {

        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: schemaNames.USER,
            required: true,
            trim: true,
        },
        serviceName: {
            type: String,
            required: true,
            unique: true,
        },
        serviceLink: {
            type: String,
            required: true,
            trim: true,
        },
        monthlyFee: {
            type: Number,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

serviceSchema.index({ userId: -1 });




/**
 * @typedef User
 */
const Service = mongoose.model(schemaNames.SERVICE, serviceSchema);

module.exports = Service;
