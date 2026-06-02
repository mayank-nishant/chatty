import { MessageCircleIcon, SparklesIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const QUICK_ACTIONS = [
  { label: "💬 Start chatting", tab: "contacts" },
  { label: "👋 Say hello", tab: "contacts" },
  { label: "🔥 Continue conversations", tab: "chats" },
];

function NoConversationPlaceholder() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-10 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_45%)] pointer-events-none" />

      <div className="relative z-10 max-w-lg">
        <div className="relative inline-flex mb-7">
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="relative size-24 rounded-3xl flex items-center justify-center border border-cyan-400/15 bg-slate-800/60 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.08)]">
            <MessageCircleIcon className="size-12 text-cyan-400" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-100">Select a conversation</h2>

        <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-400">Choose a contact from the sidebar to start chatting or continue a previous conversation in real time.</p>

        <div className="relative w-40 h-px mx-auto my-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
        </div>

        <div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <SparklesIcon className="size-4 text-cyan-400" />
            <p className="text-xs uppercase tracking-wider text-slate-500">Quick Actions</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {QUICK_ACTIONS.map(({ label, tab }) => (
              <button
                key={label}
                onClick={() => setActiveTab(tab)}
                className="
                  px-4 py-2 rounded-full
                  border border-cyan-400/10 bg-cyan-500/10
                  text-xs font-medium text-cyan-300
                  backdrop-blur-md transition-all duration-200
                  hover:bg-cyan-500/20 hover:border-cyan-400/20
                  hover:scale-[1.03] active:scale-95
                "
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoConversationPlaceholder;
