import React from "react";
import SessionItem from "./SessionItem";

export default function Sidebar({ sessions, onSelect, onNew, collapsed, setCollapsed, activeId }) {
  return (
    <aside className={`bg-gray-100 dark:bg-gray-900 transition-all ${collapsed ? 'hidden md:block' : 'w-72'} md:w-72 border-r dark:border-gray-700`}>
      <div className="p-4 flex flex-col h-full">
        <div className="mb-4">
          <div className="font-semibold mb-2">User</div>
          <div className="text-sm">X Y Z</div>
        </div>

        <div className="mb-4">
          <button onClick={onNew} className="w-full text-left px-3 py-2 bg-white dark:bg-gray-800 rounded shadow-sm">+ New Chat</button>
        </div>

        <div className="flex-1 overflow-auto">
          <h4 className="text-xs uppercase text-gray-500 mb-2">Sessions</h4>
          <div className="space-y-2">
            {(!sessions || sessions.length === 0) && <div className="text-sm text-gray-500">No sessions yet.</div>}
            {sessions.map(s => (
              <SessionItem key={s.sessionId || s.id} session={s} onClick={() => onSelect(s.sessionId || s.id)} active={(s.sessionId || s.id) === activeId} />
            ))}
          </div>
        </div>

        <div className="mt-4 text-xs text-gray-400">Collapsible Panel</div>
        <button className="mt-2 text-sm underline" onClick={() => setCollapsed(!collapsed)}>Toggle</button>
      </div>
    </aside>
  );
}
