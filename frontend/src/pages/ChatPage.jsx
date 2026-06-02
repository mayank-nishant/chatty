import { useChatStore } from "../store/useChatStore.js";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="relative w-full max-w-7xl h-[92vh] min-h-[700px] max-h-[900px]">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex overflow-hidden rounded-3xl">
            {/* Sidebar */}
            <aside className="w-[340px] shrink-0 flex flex-col border-r border-slate-700/40 bg-slate-800/40 backdrop-blur-xl">
              <div className="shrink-0">
                <ProfileHeader />
              </div>

              <div className="px-4 pt-4 shrink-0">
                <ActiveTabSwitch />
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <div className="space-y-2">{activeTab === "chats" ? <ChatsList /> : <ContactList />}</div>
              </div>
            </aside>

            {/* Chat area */}
            <main className="flex-1 flex flex-col relative overflow-hidden min-h-0 bg-slate-900/40 backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.06),transparent_35%)] pointer-events-none" />

              <div className="relative z-10 flex-1 flex flex-col min-h-0">{selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}</div>
            </main>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default ChatPage;
