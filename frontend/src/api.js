const BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api/chat";

/**
 * createSession -> POST { } -> { sessionId }
 * fetchSessions -> GET -> [ { sessionId, title, createdAt? } ]
 * fetchHistory(sessionId) -> GET -> [ { question, answer, timestamp } ]
 * askQuestion(sessionId, question) -> POST { sessionId, question } -> { question, answer, timestamp }
 */

export async function createSession() {
  const res = await fetch(`${BASE}/new`, { method: "POST" });
  return res.json();
}

export async function fetchSessions() {
  const res = await fetch(`${BASE}/sessions`);
  return res.json();
}

export async function fetchHistory(sessionId) {
  const res = await fetch(`${BASE}/history/${sessionId}`);
  return res.json();
}

export async function askQuestion(sessionId, question) {
  const res = await fetch(`${BASE}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, question })
  });
  return res.json();
}
