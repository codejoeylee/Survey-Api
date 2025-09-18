const asyncHandler = require("express-async-handler");
const Response = require("../models/Response");
const Survey = require("../models/Survey");
const User = require("../models/User");

exports.submitResponse = asyncHandler(async (req, res) => {
  const { surveyId, answers, submittedBy } = req.body;

  const survey = await Survey.findById(surveyId);
  if (!survey) {
    throw new Error("Survey not found");
  }

  const user = await User.findById(submittedBy);
  if (!user) {
    throw new Error("User not found");
  }

  const response = new Response({ surveyId, answers, submittedBy });
  await response.save();

  res.status(201).json(response);
});

exports.getSurveyResponses = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.query;

  const survey = await Survey.findOne({ _id: id, createdBy: userId });
  if (!survey) {
    throw new Error("Not authorized or survey not found");
  }

  const responses = await Response.find({ surveyId: id });
  res.status(200).json(responses);
});

exports.getUserSurveyResponses = asyncHandler(async (req, res) => {
  const { userId, surveyId } = req.params;

  const responses = await Response.find({
    surveyId,
    submittedBy: userId,
  });

  res.status(200).json(responses);
});

console.log("Controller loaded");
