const { body } = require("express-validator");

const surveyRules = [
  body("title").notEmpty().withMessage("This is required"),
  body("description").optional().isString(),
  body("isActive").optional().isBoolean(),
];

const updateSurveyRules = [
  body("title").optional().isString(),
  body("description").optional().isString(),
  body("isActive").optional().isBoolean(),
];

module.exports = {
  surveyRules,
  updateSurveyRules,
};
