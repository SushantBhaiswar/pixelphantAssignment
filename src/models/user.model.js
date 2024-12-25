const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schemaNames = require('../config/schemaNames');

const userSchema = mongoose.Schema(
  {

    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },

  },
  {
    timestamps: true,
  }
);

userSchema.index({ userId: -1 });


/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};


/**
 * Check if username is taken
 * @param {string} userName - The user's unique name
 * @returns {Promise<boolean>}
 */
userSchema.statics.isUserNameTaken = async function (userName) {
  const user = await this.findOne({ userName });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model(schemaNames.USER, userSchema);

module.exports = User;
