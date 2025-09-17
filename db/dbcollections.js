const { getDb } = require("../db/connect");
const DB_NAME = "SurveyDb";

function getSurveyCollection() {
  return getDb().db(DB_NAME).collection("survey");
}

module.exports = {
  getSurveyCollection,
};
