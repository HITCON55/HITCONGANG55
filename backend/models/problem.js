const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  status: { type: String, enum: ['Reported', 'In Progress', 'Resolved'], default: 'Reported' },
  upvotes: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Problem', ProblemSchema);
