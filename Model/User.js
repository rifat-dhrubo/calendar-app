const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    googleId: {
      type: String,
    },
    accessToken: String,
    refreshToken: {
      access_token: String,
      expires_in: String,
      token_type: String,
      id_token: String,
    },
    refreshTokenExpires: {
      type: Date,
      default: Date.now() + 3600 * 1000,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
