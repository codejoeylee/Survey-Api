const express = require("express");
const router = express.Router();
const { surveyRules } = require("../middleware/validation");
const { updateSurveyRules } = require("../middleware/validation");
const validateRequest = require("../middleware/validateRequest");
const surveyCtrl = require("../controller/surveys");

router.get("/", surveyCtrl.getAllSurveys);
router.get("/:id", surveyCtrl.getSurveyById);
router.post("/", surveyRules, validateRequest, surveyCtrl.createSurvey);
router.put("/:id", updateSurveyRules, validateRequest, surveyCtrl.updateSurvey);
router.delete("/:id", surveyCtrl.deleteSurvey);

module.exports = router;
