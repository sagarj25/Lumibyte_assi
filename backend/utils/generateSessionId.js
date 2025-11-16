// utils/generateSessionId.js

module.exports = function generateSessionId() {
  return "session_" + Math.random().toString(36).substring(2, 10);
};
