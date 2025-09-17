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
  const { title, description, isActive } = req.body;
  const survey = new Survey({
    title: title || "Customer Satisfaction",
    description: description || "Survey about customer experience",
    isActive: isActive ?? true,
  });
  await survey.save();
  res.status(201).json({ survey });
});

exports.updateSurvey = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, isActive } = req.body;

  const updates = {
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(isActive !== undefined && { isActive }),
    updatedAt: Date.now(),
  };

  const survey = await Survey.findByIdAndUpdate(id, updates, { new: true });

  if (!survey) {
    throw new Error("Survey not found");
  }

  res.status(200).json(survey);
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
