const { body } = require("express-validator");

const surveyRules = [
  body("title")
      .notEmpty()
      .withMessage("title is required")
      .isString()
      .withMessage("title must be a string"),

  body("description")
      .optional()
      .isString()
      .withMessage("description must be a string"),

  body("isActive")
      .optional()
      .isBoolean()
      .withMessage("isActive must be a boolean"),


  body("createdBy")
      .notEmpty()
      .withMessage("createdBy is required")
      .isEmail()
      .withMessage("createdBy must be a valid email"),

  body("questions")
      .isArray({ min: 1 })
      .withMessage("questions must be a non-empty array"),

  body("questions.*.questionText")
      .notEmpty()
      .withMessage("Each question must have questionText")
      .isString()
      .withMessage("questionText must be a string"),

  body("questions.*.options")
      .isArray({ min: 1 })
      .withMessage("options must be a non-empty array"),

  body("questions.*.options.*")
      .notEmpty()
      .withMessage("Each option must be a non-empty string")
      .isString()
      .withMessage("Each option must be a string"),
];

const updateSurveyRules = [
  body("title")
      .optional()
      .isString()
      .withMessage("title must be a string"),

  body("description")
      .optional()
      .isString()
      .withMessage("description must be a string"),

  body("isActive")
      .optional()
      .isBoolean()
      .withMessage("isActive must be a boolean"),

  body("createdBy")
      .optional()
      .isEmail()
      .withMessage("createdBy must be a valid email"),

  body("questions")
      .optional()
      .isArray({ min: 1 })
      .withMessage("questions must be a non-empty array"),

  body("questions.*.questionText")
      .optional()
      .notEmpty()
      .withMessage("questionText cannot be empty")
      .isString()
      .withMessage("questionText must be a string"),

  body("questions.*.options")
      .optional()
      .isArray({ min: 1 })
      .withMessage("options must be a non-empty array"),

  body("questions.*.options.*")
      .optional()
      .notEmpty()
      .withMessage("Each option must be a non-empty string")
      .isString()
      .withMessage("Each option must be a string"),
];

const responseRules = [
  body("surveyId")
      .notEmpty()
      .withMessage("surveyId is required")
      .isMongoId()
      .withMessage("surveyId must be a valid ObjectId"),

  body("answers")
      .isArray({ min: 1 })
      .withMessage("answers must be a non-empty array"),

  body("answers.*.question")
      .notEmpty()
      .withMessage("Each answer must include a question")
      .isString()
      .withMessage("question must be a string"),

  body("answers.*.answer")
      .notEmpty()
      .withMessage("Each answer must include a response")
      .isString()
      .withMessage("answer must be a string"),
];

module.exports = {
  surveyRules,
  updateSurveyRules,
  responseRules,
};
