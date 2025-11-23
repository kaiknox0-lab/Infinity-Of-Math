const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  fileURL: String,
  createdAt: { type: Date, default: Date.now }
});

const ClassContentSchema = new mongoose.Schema({
  classNumber: { type: Number, required: true, unique: true },
  books: [ItemSchema],
  notes: [ItemSchema],
  suggestions: [ItemSchema],
  formulas: [ItemSchema]
});

module.exports = mongoose.model('ClassContent', ClassContentSchema);
