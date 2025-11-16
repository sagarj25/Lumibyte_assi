import React, { useEffect, useState } from "react";
import { fetchHistory, askQuestion } from "../api";
import MessageItem from "./MessageItem";

export default function ChatPanel({ sessionId, reloadSessions }) {
  const [history, setHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    loadHistory();
    // eslint-disable-next-line
  }, [sessionId]);

  async function loadHistory() {
    setLoading(true);
    try {
      const data = await fetchHistory(sessionId);
      // normalize array
      setHistory(Array.isArray(data) ? data : (data || []));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      if (reloadSessions) reloadSessions();
    }
  }

  async function submit(e) {
    e.preventDefault();
    if (!question.trim() || !sessionId) return;
    setLoading(true);
    try {
      const res = await askQuestion(sessionId, question);
      // backend returns saved chat entry
      setHistory(h => [...h, res]);
      setQuestion("");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (!sessionId) return <div className="p-6 text-center text-gray-500">Click "New Chat" to start.</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-6">
        {loading && <div className="text-sm text-gray-500">Loading...</div>}
        {history.map((m, i) => <MessageItem key={m.timestamp || i} msg={m} />)}
      </div>

      <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <form onSubmit={submit} className="flex gap-2">
          <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask something..." className="flex-1 p-2 rounded border dark:border-gray-700 bg-white dark:bg-gray-800" />
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
        </form>
      </div>
    </div>
  );
}
