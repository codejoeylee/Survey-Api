const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const initDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "SurveyDb", // optional if included in URI
    });
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
};

module.exports = { initDb };
