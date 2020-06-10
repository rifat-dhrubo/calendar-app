const User = require('../Model/User');
const Event = require('../Model/Event');
const { asyncHandler } = require('../utils/errorHandler');

const createEvents = async (req, res) => {
  const { googleId, events } = req.body;

  const [errUser, user] = await asyncHandler(
    User.findOne({ googleId }).lean().exec()
  );

  const [err, event] = await asyncHandler(Event.create(...events));

  // const payload = JSON.stringify(event);

  // const [err, data] = await asyncHandler(
  //   fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${user.refreshToken.access_token}`,
  //     },
  //     body: payload,
  //   }).then((response) => response.json())
  // );

  res.json({ err, event });
};
const getEvents = async (req, res) => {
  const [err, event] = await asyncHandler(Event.find().lean().exec());

  res.json({ err, event });
};
const confirmEvents = async (req, res) => {
  const [err, event] = await asyncHandler(Event.find().lean().exec());

  res.json({ err, event });
};

module.exports = { createEvents, getEvents, confirmEvents };
