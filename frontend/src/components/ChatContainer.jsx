import { useEffect, useRef } from "react";

import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";

import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

const formatTime = (dateStr) =>
  new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

function ChatContainer() {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading, subscribeToMessages, unsubscribeFromMessages } = useChatStore();

  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessagesByUserId(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <>
        <ChatHeader />
        <MessagesLoadingSkeleton />
        <MessageInput />
      </>
    );
  }

  return (
    <>
      <ChatHeader />

      <div className="flex-1 min-h-0 overflow-y-auto px-4 md:px-6 py-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <NoChatHistoryPlaceholder name={selectedUser?.fullName} />
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg) => {
              // HANDLE ALL POSSIBLE BACKEND STRUCTURES
              const senderId = msg.senderId?._id || msg.senderId?.id || msg.senderId;

              const currentUserId = authUser?._id || authUser?.id;

              const isOwnMessage = String(senderId) === String(currentUserId);

              return (
                <div key={msg._id} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`
                      relative max-w-[85%] md:max-w-[70%]
                      rounded-2xl overflow-hidden
                      backdrop-blur-md border shadow-lg
                      transition-all duration-300
                      ${isOwnMessage ? "bg-cyan-500/90 border-cyan-400/20 text-white rounded-br-md" : "bg-slate-800/80 border-slate-700/40 text-slate-100 rounded-bl-md"}
                      ${msg.isOptimistic ? "opacity-70" : "opacity-100"}
                    `}
                  >
                    {msg.image && (
                      <div className="p-2 pb-0">
                        <img src={msg.image} alt="Shared image" className="rounded-xl w-full max-h-[350px] object-cover" />
                      </div>
                    )}

                    {msg.text && (
                      <div className="px-4 py-3">
                        <p className="text-sm md:text-[15px] leading-relaxed break-words whitespace-pre-wrap">{msg.text}</p>
                      </div>
                    )}

                    <div
                      className={`
                        px-4 pb-2 flex items-center justify-end gap-2 text-[11px]
                        ${isOwnMessage ? "text-cyan-100/80" : "text-slate-400"}
                      `}
                    >
                      <span>{formatTime(msg.createdAt)}</span>

                      {msg.isOptimistic && <span className="italic">Sending...</span>}
                    </div>
                  </div>
                </div>
              );
            })}

            <div ref={messageEndRef} />
          </div>
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
