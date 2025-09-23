const express = require("express");
const cookieParser = require("cookie-parser");
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
const authRoutes = require("./routes/auth");

dotenv.config();

delete swaggerFile.paths["/auth/google"];
delete swaggerFile.paths["/auth/google/callback"];

const app = express();
const PORT = process.env.PORT || 4040;

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

//Routes Mount
app.use("/auth", authRoutes);
app.use("/surveys", surveysRouter);
app.use("/responses", responsesRouter);

//Api doc
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, {
    explorer: true,
    swaggerOptions: {
      withCredentials: true,
      persistAuthorization: true,
    },
  }),
);

console.log("Routes mounted:");
console.log("/surveys →", typeof surveysRouter);
console.log("/responses →", typeof responsesRouter);

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
