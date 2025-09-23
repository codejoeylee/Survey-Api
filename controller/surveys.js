const asyncHandler = require("express-async-handler");
const Survey      = require("../models/Survey");

exports.getAllSurveys = asyncHandler(async (req, res) => {
  const surveys = await Survey.find();
  res.status(200).json(surveys);
});

exports.getSurveysByUser = asyncHandler(async (req, res) => {
  const { userEmail } = req.params;
  const surveys = await Survey.find({ createdBy: userEmail });
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
  const {
    title,
    description,
    isActive,
    createdBy,
    questions,
      category
  } = req.body;


  const owner = req.user.email;

  const survey = await Survey.create({
    title:       title || "Untitled Survey",
    description: description || "No description provided",
    isActive:    typeof isActive === "boolean" ? isActive : true,
    createdBy:   owner,
    questions,
    category: category || "general"
  });

  res.status(201).json(survey);
});

exports.updateSurvey = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    isActive,
    questions,
    createdBy ,
    category
  } = req.body;

  const survey = await Survey.findById(id);
  if (!survey) {
    res.status(404);
    throw new Error("Survey not found");
  }

  if (survey.createdBy !== req.user.email) {
    res.status(403);
    throw new Error("Forbidden: not your survey");
  }

  const updates = {
    ...(title       !== undefined && { title }),
    ...(description !== undefined && { description }),
    ...(isActive    !== undefined && { isActive }),
    ...(questions   !== undefined && { questions }),
    ...(category    !== undefined && { category }),
    updatedAt: Date.now()
  };

  const updated = await Survey.findByIdAndUpdate(id, updates, { new: true });
  res.status(200).json(updated);
});

exports.deleteSurvey = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const survey = await Survey.findById(id);
  if (!survey) {
    res.status(404);
    throw new Error("Survey not found");
  }
  if (survey.createdBy !== req.user.email) {
    res.status(403);
    throw new Error("Forbidden: not your survey");
  }
  await survey.remove();
  res.status(200).json({ message: "Survey deleted" });
});

