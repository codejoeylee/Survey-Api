const swaggerAutogen = require("swagger-autogen")();
const m2s = require("mongoose-to-swagger");
const dotenv = require("dotenv");
dotenv.config();

const Survey = require("./models/Survey");

const doc = {
  info: {
    title: "Survey API",
    description: "Auto-generated Swagger documentation for managing surveys",
    version: "1.0.0",
  },
  host: process.env.RENDER_EXTERNAL_HOSTNAME || "localhost:4040",
  basePath: "/",
  schemes: [process.env.RENDER_EXTERNAL_HOSTNAME ? "https" : "http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Surveys",
      description: "Endpoints for managing surveys",
    },
  ],
  definitions: {
    Survey: m2s(Survey),
  },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
