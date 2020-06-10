const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    start: {
      type: String,
      required: 'Please provide a starting time',
    },
    end: {
      type: String,
      required: 'Please provide an ending time',
    },
    attendees: [{ email: String }],
    duration: {
      type: Number,
      required: 'Please provide a duration for the event',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Event', eventSchema);
