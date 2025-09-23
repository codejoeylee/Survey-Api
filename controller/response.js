// controllers/response.js
const asyncHandler = require("express-async-handler");
const Survey      = require("../models/Survey");
const Response    = require("../models/Response");


exports.submitResponse = asyncHandler(async (req, res) => {
  const { surveyId, answers, submittedBy } = req.body;
  const owner = req.user.email;


  const survey = await Survey.findById(surveyId);
  if (!survey) {
    res.status(404);
    throw new Error("Survey not found");
  }


  const response = await Response.create({
    surveyId,
    answers,
    submittedBy: owner
  });

  res.status(201).json(response);
});

exports.getSurveyResponses = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const owner  = req.user.email;


  const survey = await Survey.findOne({ _id: id, createdBy: owner });
  if (!survey) {
    res.status(404);
    throw new Error("Not authorized or survey not found");
  }


  const responses = await Response.find({ surveyId: id });
  res.status(200).json(responses);
});

exports.getUserSurveyResponses = asyncHandler(async (req, res) => {
  const { surveyId } = req.params;
  const owner        = req.user.email;

  const responses = await Response.find({
    surveyId,
    submittedBy: owner
  });

  res.status(200).json(responses);
});

console.log("Response controller loaded");

