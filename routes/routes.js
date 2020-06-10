const express = require('express');
const passport = require('passport');
const { authenticate } = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: true });
});

router.get('/auth/google', authenticate);

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    const { email, name, googleId } = req.user;
    res.json({ email, name, googleId });
  }
);

module.exports = router;
