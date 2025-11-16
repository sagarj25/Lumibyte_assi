import React from "react";

export default function SessionItem({ session, onClick, active }) {
  return (
    <div onClick={onClick} className={`p-2 rounded cursor-pointer ${active ? 'bg-blue-500 text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-800'}`}>
      <div className="text-sm font-medium">{session.title || session.sessionId || session.id}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{session.createdAt ? new Date(session.createdAt).toLocaleString() : ''}</div>
    </div>
  );
}
