const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const mongodb = require("./db/connect");
const logger = require("./middleware/logger");
const NotFound = require("./middleware/Notfound");
const errorHandler = require("./middleware/error");
const surveysRouter = require("./routes/surveys");
const responsesRouter = require("./routes/responses");
const usersRouter = require("./routes/users");

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
app.use("/responses", responsesRouter);
app.use("/users", usersRouter);

console.log("Routes mounted:");
console.log("/surveys →", typeof surveysRouter);
console.log("/responses →", typeof responsesRouter);
console.log("/users →", typeof usersRouter);

// General error handling middleware
app.use(NotFound);
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
