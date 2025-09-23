const express = require("express");
const router = express.Router();
const { surveyRules } = require("../middleware/validation");
const { updateSurveyRules } = require("../middleware/validation");
const auth    = require("../middleware/auth");
const validateRequest = require("../middleware/validateRequest");
const surveyCtrl = require("../controller/surveys");


router.get("/", surveyCtrl.getAllSurveys);
router.get("/mine",auth, surveyCtrl.getSurveysByUser);
router.get("/:id",auth, surveyCtrl.getSurveyById);
router.post("/",auth, surveyRules, validateRequest, surveyCtrl.createSurvey);
router.put("/:id",auth, updateSurveyRules, validateRequest, surveyCtrl.updateSurvey);
router.delete("/:id",auth, surveyCtrl.deleteSurvey);

module.exports = router;
