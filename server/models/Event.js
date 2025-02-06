const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  category: String, 
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Event', eventSchema);
