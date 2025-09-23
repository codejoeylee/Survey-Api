// models/Response.js
const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  surveyId: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      "Survey",
    required: true
  },
  answers: [
    {
      question: {
        type:     String,
        required: true,
        trim:     true
      },
      answer: {
        type:     String,
        required: true,
        trim:     true
      }
    }
  ],
  submittedBy: {
    type:      String,
    required:  true,
    lowercase: true,
    trim:      true
  }
}, {
  timestamps: {
    createdAt: "submittedAt",
    updatedAt: "updatedAt"
  }
});

module.exports = mongoose.model("Response", responseSchema);

