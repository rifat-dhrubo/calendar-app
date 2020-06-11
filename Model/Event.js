const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    summary: String,
    description: String,
    start: {
      dateTime: String,
      timeZone: String,
    },
    end: {
      dateTime: String,
      timeZone: String,
    },
    attendees: [{ email: String }],
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    booked: {
      type: String,
      default: 'unconfirmed',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Event', eventSchema);
