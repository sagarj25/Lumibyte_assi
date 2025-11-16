import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChatPanel from "../components/ChatPanel";
import { fetchSessions, createSession } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function SessionPage() {
  const [sessions, setSessions] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadSessions();
    // eslint-disable-next-line
  }, []);

  async function loadSessions() {
    try {
      const data = await fetchSessions();
      setSessions(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load sessions", e);
    }
  }

  async function handleNew() {
    try {
      const res = await createSession();
      // backend returns { sessionId } or full session, handle both
      const newId = res.sessionId || res.sessionId || res.sessionId;
      // reload sessions and navigate to new
      await loadSessions();
      if (newId) navigate(`/session/${newId}`);
    } catch (e) {
      console.error(e);
    }
  }

  function handleSelect(sessionId) {
    navigate(`/session/${sessionId}`);
  }

  return (
    <div className="flex h-screen">
      <Sidebar sessions={sessions} onSelect={handleSelect} onNew={handleNew} collapsed={collapsed} setCollapsed={setCollapsed} activeId={id} />
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
        <Header onNewChat={handleNew} collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="flex-1 overflow-hidden">
          <ChatPanel sessionId={id} reloadSessions={loadSessions} />
        </main>
      </div>
    </div>
  );
}
