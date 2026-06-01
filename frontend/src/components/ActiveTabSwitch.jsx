import { MessageSquareIcon, UsersIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const TABS = [
  { id: "chats", label: "Chats", Icon: MessageSquareIcon },
  { id: "contacts", label: "Contacts", Icon: UsersIcon },
];

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="relative flex items-center gap-2 p-1 rounded-2xl bg-slate-800/60 border border-slate-700/40 backdrop-blur-xl">
      <div
        className={`
          absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl
          bg-cyan-500/15 border border-cyan-400/20
          shadow-[0_0_20px_rgba(34,211,238,0.08)]
          transition-all duration-300 ease-out
          ${activeTab === "chats" ? "left-1" : "left-[calc(50%+2px)]"}
        `}
      />

      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`
            relative z-10 flex-1 h-11 rounded-xl
            flex items-center justify-center gap-2
            text-sm font-medium transition-all duration-300
            ${activeTab === id ? "text-cyan-400" : "text-slate-400 hover:text-slate-200"}
          `}
          aria-pressed={activeTab === id}
        >
          <Icon className="size-4" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

export default ActiveTabSwitch;
