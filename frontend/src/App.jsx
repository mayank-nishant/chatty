import { Routes, Route } from "react-router-dom";

import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

export default function App() {
  return (
    <div className="relative min-h-screen w-full bg-slate-900 overflow-hidden">
      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      {/* Glow — top left */}
      <div className="fixed -top-24 -left-24 w-[600px] h-[600px] bg-pink-500 opacity-20 blur-[120px] rounded-full pointer-events-none" />

      {/* Glow — bottom right */}
      <div className="fixed -bottom-24 -right-24 w-[600px] h-[600px] bg-cyan-500 opacity-20 blur-[120px] rounded-full pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </div>
  );
}
