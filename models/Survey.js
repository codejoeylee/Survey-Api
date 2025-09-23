const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  title: {
    type:      String,
    required:  true,
    trim:      true,
    maxlength: 100,
    minlength: 2
  },
  description: {
    type:      String,
    required:  true,
    trim:      true,
    maxlength: 500,
    minlength: 10
  },
  questions: [
    {
      questionText: {
        type:      String,
        required:  true,
        trim:      true,
        minlength: 1
      },
      options: [
        {
          type:     String,
          required: true,
          trim:     true
        }
      ]
    }
  ],
  isActive: {
    type:    Boolean,
    default: false
  },
  createdBy: {
    type:      String,
    required:  true,
    lowercase: true,
    trim:      true
  },
  category: {
    type:     String,
    required: true,
    trim:     true,
    lowercase: true,
    maxlength: 50
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Survey", surveySchema);

