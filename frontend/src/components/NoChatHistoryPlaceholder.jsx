import { useState } from "react";
import { MessageCircleIcon, SparklesIcon } from "lucide-react";

import { useChatStore } from "../store/useChatStore";

const STARTER_MESSAGES = ["👋 Say Hello", "🤝 How are you?", "📅 Meet up soon?", "🔥 What's new?"];

function NoChatHistoryPlaceholder({ name }) {
  const { sendMessage } = useChatStore();

  const [isSending, setIsSending] = useState(false);

  const handleStarter = async (msg) => {
    try {
      setIsSending(true);

      await sendMessage({
        text: msg,
        image: null,
      });
    } catch (error) {
      console.error("Failed to send starter message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-10 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_45%)] pointer-events-none" />

      <div className="relative z-10 max-w-lg">
        {/* ICON */}
        <div className="relative inline-flex mb-6">
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative size-20 rounded-3xl flex items-center justify-center border border-cyan-400/20 bg-slate-800/60 backdrop-blur-xl">
            <MessageCircleIcon className="size-10 text-cyan-400" />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
          Start chatting with <span className="text-cyan-400">{name}</span>
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-400">This is the beginning of your conversation. Send a message, share an image, and stay connected in real time.</p>

        {/* DIVIDER */}
        <div className="relative w-40 h-px mx-auto my-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
        </div>

        {/* STARTERS */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <SparklesIcon className="size-4 text-cyan-400" />

            <p className="text-xs uppercase tracking-wider text-slate-500">Conversation Starters</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {STARTER_MESSAGES.map((msg) => (
              <button
                key={msg}
                disabled={isSending}
                onClick={() => handleStarter(msg)}
                className="
                  px-4 py-2 rounded-full
                  border border-cyan-400/10 bg-cyan-500/10
                  text-xs font-medium text-cyan-300
                  backdrop-blur-md transition-all duration-200
                  hover:bg-cyan-500/20 hover:border-cyan-400/20
                  hover:scale-[1.03] active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {msg}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoChatHistoryPlaceholder;
