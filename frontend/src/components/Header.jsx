import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Header({ onNewChat, collapsed, setCollapsed }) {
  const { dark, toggle } = useContext(ThemeContext);

  return (
    <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
      <div className="flex items-center gap-3">
        <button className="md:hidden p-2" onClick={() => setCollapsed(!collapsed)}>
          ☰
        </button>
        <h1 className="text-lg font-semibold">Chat Mock</h1>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onNewChat} className="px-3 py-1 bg-blue-600 text-white rounded">New Chat</button>

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" checked={dark} onChange={toggle} />
          <span className="text-sm">{dark ? "Dark" : "Light"}</span>
        </label>
      </div>
    </div>
  );
}
