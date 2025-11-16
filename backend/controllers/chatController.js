// controllers/chatController.js
const fs = require("fs");
const path = require("path");
const generateSessionId = require("../utils/generateSessionId");

const sessionsFile = path.join(__dirname, "../data/sessions.json");
const historyFile = path.join(__dirname, "../data/chatHistory.json");

// Read JSON helper
function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

// Write JSON helper
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Create new chat session
exports.startNewChat = (req, res) => {
  const sessions = readJSON(sessionsFile);
  const chatHistory = readJSON(historyFile);

  const sessionId = generateSessionId();
  const title = "New Chat";

  sessions.push({ sessionId, title });
  chatHistory[sessionId] = [];

  writeJSON(sessionsFile, sessions);
  writeJSON(historyFile, chatHistory);

  res.json({ sessionId });
};

// Ask question in a session
exports.askQuestion = (req, res) => {
  const { sessionId, question } = req.body;

  if (!sessionId || !question) {
    return res.status(400).json({ error: "sessionId and question required" });
  }

  const chatHistory = readJSON(historyFile);

  // Dummy table data
  const answer = {
    description: "This is a dummy AI-generated answer.",
    table: [
      { id: 1, name: "Item A", value: 100 },
      { id: 2, name: "Item B", value: 200 },
      { id: 3, name: "Item C", value: 300 }
    ]
  };

  const chatEntry = {
    question,
    answer,
    timestamp: new Date().toISOString()
  };

  chatHistory[sessionId].push(chatEntry);
  writeJSON(historyFile, chatHistory);

  res.json(chatEntry);
};

// Get all sessions
exports.getSessions = (req, res) => {
  const sessions = readJSON(sessionsFile);
  res.json(sessions);
};

// Get full history for a session
exports.getSessionHistory = (req, res) => {
  const { sessionId } = req.params;
  const chatHistory = readJSON(historyFile);
  res.json(chatHistory[sessionId] || []);
};
