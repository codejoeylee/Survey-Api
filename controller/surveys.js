const asyncHandler = require("express-async-handler");
const Survey = require("../models/Survey");

exports.getAllSurveys = asyncHandler(async (req, res) => {
  const list = await Survey.find();
  res.status(200).json(list);
});

exports.getSurveysByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const surveys = await Survey.find({ createdBy: userId });
  res.status(200).json(surveys);
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
  console.log("Incoming body:", req.body);
  const { title, description, isActive, createdBy, questions } = req.body;
  const survey = new Survey({
    title: title || "Untitled Survey",
    description: description || "No description provided",
    isActive: isActive ?? true,
    createdBy,
    questions,
  });

  console.log("Survey to save:", survey);

  await survey.save();
  res.status(201).json({ survey });
});

exports.updateSurvey = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, isActive, questions ,createdBy} = req.body;

  const updates = {
    ...(title !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(isActive !== undefined && { isActive }),
    ...(questions !== undefined && { questions }),
    ...(createdBy !== undefined && {createdBy}),
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
