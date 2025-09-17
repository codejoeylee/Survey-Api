const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
//const expressOasGenerator = require("express-oas-generator");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const mongodb = require("./db/connect");
const logger = require("./middleware/logger");
const notFound = require("./middleware/Notfound");
const errorHandler = require("./middleware/error");
//const attachCollections = require("./middleware/collections");
const surveysRouter = require("./routes/surveys");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4040;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

//Api doc
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//Routes Mount
app.use("/surveys", surveysRouter);

// General error handling middleware
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await mongodb.initDb();
    app.listen(PORT, () => {
      console.log(`Connected to DB and listening on port ${PORT}`);
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  }
};

startServer();
