const passport = require('passport');

const authenticate = passport.authenticate('google', {
  scope: [
    'profile',
    'email',
    'openid',
    'https://www.googleapis.com/auth/calendar',

    'https://www.googleapis.com/auth/calendar.events',
  ],
  accessType: 'offline',
  prompt: 'consent',
});

module.exports = { authenticate };
