// middleware/logger.js
const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`,
  );
  next();
};

module.exports = logger; // ✅ This must be a function
