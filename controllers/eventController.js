const fetch = require('node-fetch');
const User = require('../Model/User');
const Event = require('../Model/Event');
const { asyncHandler } = require('../utils/errorHandler');

const createEvents = async (req, res) => {
  const { googleId, events } = req.body;

  const [errUser, user] = await asyncHandler(
    User.findOne({ googleId }).lean().exec()
  );

  const [err, event] = await asyncHandler(Event.create(...events));

  res.json({ err, event });
};
const getEvents = async (req, res) => {
  const [err, event] = await asyncHandler(Event.find().lean().exec());

  res.json({ err, event });
};
const confirmEvents = async (req, res) => {
  const { id, email } = req.body;

  const [err, event] = await asyncHandler(
    Event.findByIdAndUpdate(id, { booked: true }, { new: true }).lean().exec()
  );

  const { summary, description, start, end, userId } = event;

  const [errUser, user] = await asyncHandler(
    User.findById(userId).lean().exec()
  );

  const token = `Bearer ${user.refreshToken.access_token}`;

  const payload = JSON.stringify({
    summary,
    description,
    start,
    end,
    attendees: [{ email }],
    status: 'confirmed',
  });

  console.log(JSON.parse(payload));

  const [errData, data] = await asyncHandler(
    fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: payload,
    }).then((response) => response.json())
  );

  res.json({ errData, data });
};

module.exports = { createEvents, getEvents, confirmEvents };
