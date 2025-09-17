const asyncHandler = require("express-async-handler");
const Survey = require("../models/Survey");

exports.getAllSurveys = asyncHandler(async (req, res) => {
  const list = await Survey.find();
  res.status(200).json(list);
});

exports.getSurveyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const survey = await Survey.findById(id);
  if (!survey) {
    const error = new Error("Survey not found");
    error.status = 404;
    throw error;
  }
  res.status(200).json(survey);
});

exports.createSurvey = asyncHandler(async (req, res) => {
  const survey = new Survey(req.body);
  await survey.save();
  res.status(201).json({ survey });
});

exports.updateSurvey = asyncHandler(async (req, res) => {
  const update = await Survey.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      updatedAt: Date.now(),
    },
    { new: true },
  );

  if (!update) {
    const error = new Error("Survey not found");
    error.status = 404;
    throw error;
  }
  res.status(200).json(update);
});

exports.deleteSurvey = asyncHandler(async (req, res) => {
  const deleted = await Survey.findByIdAndDelete(req.params.id);
  if (!deleted) {
    const error = new Error("Survey not found");
    error.status = 404;
    throw error;
  }
  res.status(200).json({ message: "Survey deleted" });
});
