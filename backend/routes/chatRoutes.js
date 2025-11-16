// routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// Start new chat session
router.post("/new", chatController.startNewChat);

// Ask question
router.post("/ask", chatController.askQuestion);

// Fetch all sessions
router.get("/sessions", chatController.getSessions);

// Fetch history by session ID
router.get("/history/:sessionId", chatController.getSessionHistory);

module.exports = router;
