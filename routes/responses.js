const express = require("express");
const router = express.Router();
const responseCtrl = require("../controller/response");

const { responseRules } = require("../middleware/validation");
const validateRequest = require("../middleware/validateRequest");
const auth = require("../middleware/auth");

console.log("submitResponse:", typeof responseCtrl.submitResponse);
console.log("getSurveyResponses:", typeof responseCtrl.getSurveyResponses);

const validation = require("../middleware/validation");
console.log("validation keys:", Object.keys(validation));

router.post(
  "/",auth,
  ...responseRules,
  validateRequest,
  responseCtrl.submitResponse,
);
router.get("/survey/:id",auth, responseCtrl.getSurveyResponses);
router.get(
  "/mine/:surveyId",auth,
  responseCtrl.getUserSurveyResponses,
);

module.exports = router;
