const { body } = require("express-validator");

const surveyRules = [
  body("title").notEmpty().withMessage("This is required"),
  body("description").optional().isString(),
  body("isActive").optional().isBoolean(),
  body("createdBy")
    .notEmpty()
    .isMongoId()
    .withMessage("Valid user ID required"),
  body("questions")
    .isArray({ min: 1 })
    .withMessage("Questions must be a non-empty array"),
  body("questions.*")
    .notEmpty()
    .isString()
    .withMessage("Each question must be a non-empty string"),
];

const updateSurveyRules = [
  body("title").optional().isString(),
  body("description").optional().isString(),
  body("isActive").optional().isBoolean(),
  body("questions")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Questions must be a non-empty array"),
  body("questions.*")
    .optional()
    .notEmpty()
    .isString()
    .withMessage("Each question must be a non-empty string"),
];

const registerRules = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
];

const loginRules = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const responseRules = [
  body("surveyId")
    .notEmpty()
    .isMongoId()
    .withMessage("Valid surveyId is required"),
  body("submittedBy")
    .notEmpty()
    .isMongoId()
    .withMessage("Valid submittedBy userId is required"),
  body("answers")
    .isArray({ min: 1 })
    .withMessage("Answers must be a non-empty array"),
  body("answers.*.question")
    .notEmpty()
    .withMessage("Each answer must include a question"),
  body("answers.*.answer")
    .notEmpty()
    .withMessage("Each answer must include a response"),
];

module.exports = {
  surveyRules,
  updateSurveyRules,
  registerRules,
  loginRules,
  responseRules,
};
