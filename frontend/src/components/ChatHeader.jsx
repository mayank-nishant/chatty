import { useEffect } from "react";
import { XIcon, PhoneIcon, VideoIcon } from "lucide-react";

import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const actionBtnClass = `
  size-10 rounded-xl flex items-center justify-center
  text-slate-400 hover:text-cyan-400
  hover:bg-slate-800/70 transition-all duration-200
`;

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser?._id?.toString());

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <header className="sticky top-0 z-20 h-20 px-5 md:px-6 flex items-center justify-between border-b border-slate-700/40 bg-slate-900/70 backdrop-blur-xl shadow-sm">
      {/* User info */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="relative shrink-0">
          <div className="size-12 rounded-2xl overflow-hidden ring-2 ring-slate-700/40">
            <img src={selectedUser?.profilePic || "/avatar.png"} alt={selectedUser?.fullName || "User"} className="size-full object-cover" />
          </div>
          <span
            className={`
              absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-slate-900
              ${isOnline ? "bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" : "bg-slate-500"}
            `}
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-slate-100 font-semibold text-[15px] truncate">{selectedUser?.fullName}</h3>
          <p className={`text-sm ${isOnline ? "text-emerald-400" : "text-slate-400"}`}>{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className={`hidden sm:flex ${actionBtnClass}`} aria-label="Voice call">
          <PhoneIcon className="size-5" />
        </button>

        <button className={`hidden sm:flex ${actionBtnClass}`} aria-label="Video call">
          <VideoIcon className="size-5" />
        </button>

        <button onClick={() => setSelectedUser(null)} className={`${actionBtnClass} hover:text-red-400 hover:bg-red-500/10`} aria-label="Close chat">
          <XIcon className="size-5" />
        </button>
      </div>
    </header>
  );
}

export default ChatHeader;
