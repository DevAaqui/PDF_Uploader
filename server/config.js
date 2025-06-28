module.exports = {
  PORT: process.env.BACKEND_PORT || 3001,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  NODE_ENV: process.env.NODE_ENV || "development",
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  MAX_TEXT_LENGTH: 10000, // 10KB preview limit
};
