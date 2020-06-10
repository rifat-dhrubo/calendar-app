const express = require('express');
const passport = require('passport');
const { authenticate } = require('../controllers/authController');
const {
  createEvents,
  getEvents,
  confirmEvents,
} = require('../controllers/eventController');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: true });
});

router.get('/auth/google', authenticate);

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('http://127.0.0.1:3000/book');
  }
);

router.get('/event', getEvents);
router.post('/event', createEvents);
router.post('/event/confirm', confirmEvents);

module.exports = router;
