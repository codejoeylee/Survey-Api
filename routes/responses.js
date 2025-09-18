const express = require("express");
const router = express.Router();
const responseCtrl = require("../controller/response");

const { responseRules } = require("../middleware/validation");
const validateRequest = require("../middleware/validateRequest");

console.log("submitResponse:", typeof responseCtrl.submitResponse);
console.log("getSurveyResponses:", typeof responseCtrl.getSurveyResponses);

const validation = require("../middleware/validation");
console.log("validation keys:", Object.keys(validation));

router.post(
  "/",
  ...responseRules,
  validateRequest,
  responseCtrl.submitResponse,
);
router.get("/survey/:id", responseCtrl.getSurveyResponses);
router.get(
  "/user/:userId/survey/:surveyId",
  responseCtrl.getUserSurveyResponses,
);

module.exports = router;
