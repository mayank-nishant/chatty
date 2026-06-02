function MessagesLoadingSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {[...Array(8)].map((_, index) => {
          const isOwnMessage = index % 2 !== 0;

          return (
            <div key={index} className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
              <div
                className={`
                  relative max-w-[80%] rounded-2xl overflow-hidden
                  border border-slate-700/40 animate-pulse
                  ${isOwnMessage ? "bg-cyan-500/10 rounded-br-md" : "bg-slate-800/60 rounded-bl-md"}
                `}
              >
                {index % 3 === 0 && <div className="w-[240px] h-[160px] bg-slate-700/40" />}

                <div className="p-4 space-y-3">
                  <div className="h-3 rounded-full bg-slate-700/50 w-40" />
                  <div className="h-3 rounded-full bg-slate-700/40 w-28" />
                  <div className="h-2 rounded-full bg-slate-700/30 w-12 ml-auto" />
                </div>

                <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MessagesLoadingSkeleton;
