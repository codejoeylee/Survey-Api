const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  isActive: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Survey", surveySchema);
