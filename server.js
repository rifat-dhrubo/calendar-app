/* eslint-disable no-underscore-dangle */
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const router = require('./routes/routes');
const User = require('./Model/User');

const app = express();

// registering global middleware
app.use(bodyParser.json());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // authorizationURL: 'https://oauth2.googleapis.com',
      callbackURL: 'http://127.0.0.1:8000/auth/google/callback',
    },
    (request, accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) done(err);
        if (!user) {
          console.log('new user');
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            accessToken,
            refreshToken,
          });
          user.save((errCreate) => {
            if (errCreate) console.log(errCreate);
            return done(errCreate, user);
          });
        }
        return done(err, user);
      });
    }
  )
);

app.use(passport.initialize());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use('/', router);

module.exports = app;
