import { useEffect } from "react";

import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

const formatTime = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) {
    return <UsersLoadingSkeleton />;
  }

  if (chats.length === 0) {
    return <NoChatsFound />;
  }

  return (
    <div className="space-y-2">
      {chats.map((chat) => {
        const isOnline = onlineUsers.includes(chat._id?.toString());

        const isSelected = selectedUser?._id?.toString() === chat._id?.toString();

        return (
          <button
            key={chat._id}
            onClick={() => setSelectedUser(chat)}
            className={`
              group relative w-full p-3 rounded-2xl
              flex items-center gap-3 border
              transition-all duration-300
              ${isSelected ? "bg-cyan-500/15 border-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.08)]" : "bg-slate-800/40 border-slate-700/30 hover:bg-slate-800/70 hover:border-slate-600/40"}
            `}
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div
                className={`
                  size-14 rounded-2xl overflow-hidden ring-2 transition-all duration-300
                  ${isSelected ? "ring-cyan-400/40" : "ring-slate-700/40"}
                `}
              >
                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} className="size-full object-cover" />
              </div>

              <span
                className={`
                  absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-slate-900
                  ${isOnline ? "bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" : "bg-slate-500"}
                `}
              />
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between gap-2">
                <h4
                  className={`
                    truncate font-medium text-sm md:text-[15px]
                    ${isSelected ? "text-cyan-300" : "text-slate-100"}
                  `}
                >
                  {chat.fullName}
                </h4>

                <span className="text-[11px] text-slate-500 shrink-0">{formatTime(chat.lastMessageTime)}</span>
              </div>

              <p className="mt-1 text-xs text-slate-400 truncate">{chat.lastMessage || "Start a conversation"}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default ChatsList;
