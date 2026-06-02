import { MessageCircleIcon, ArrowRightIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="relative flex flex-col items-center justify-center py-16 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.06),transparent_45%)] pointer-events-none" />

      <div className="relative z-10 max-w-sm">
        <div className="relative inline-flex mb-6">
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl" />
          <div className="relative size-20 rounded-3xl flex items-center justify-center border border-cyan-400/15 bg-slate-800/60 backdrop-blur-xl">
            <MessageCircleIcon className="size-10 text-cyan-400" />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-slate-100">No conversations yet</h3>

        <p className="mt-3 text-sm leading-relaxed text-slate-400">Your recent chats will appear here. Start a new conversation by exploring your contacts.</p>

        <div className="w-32 h-px mx-auto my-6 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

        <button
          onClick={() => setActiveTab("contacts")}
          className="
            group inline-flex items-center gap-2 rounded-xl
            border border-cyan-400/10 bg-cyan-500/10
            px-5 py-3 text-sm font-medium text-cyan-300
            backdrop-blur-md transition-all duration-200
            hover:bg-cyan-500/20 hover:border-cyan-400/20
            hover:scale-[1.02] active:scale-95
          "
        >
          Find Contacts
          <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

export default NoChatsFound;
