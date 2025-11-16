import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SessionPage from "./pages/SessionPage";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/session" replace />} />
        <Route path="/session" element={<SessionPage />} />
        <Route path="/session/:id" element={<SessionPage />} />
      </Routes>
    </ThemeProvider>
  );
}
