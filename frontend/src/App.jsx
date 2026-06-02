import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useAuthStore } from "./store/useAuthStore.js";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PageLoader from "./components/PageLoader";

export default function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-900">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f18_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f18_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="pointer-events-none fixed -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="pointer-events-none fixed -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-pink-500/20 blur-[120px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <Routes>
          <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" replace />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0f172a",
            color: "#e2e8f0",
            border: "1px solid rgba(51,65,85,0.5)",
            borderRadius: "14px",
          },
        }}
      />
    </div>
  );
}
