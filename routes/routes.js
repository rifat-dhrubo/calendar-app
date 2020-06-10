const express = require('express');
const passport = require('passport');
const axios = require('axios');
const fetch = require('node-fetch');
const { authenticate } = require('../controllers/authController');
const { createEvents, getEvents } = require('../controllers/eventController');

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

router.get('/event', getEvents);
router.post('/event', createEvents);
router.post('/event/confirm', confirmEvents);

module.exports = router;
