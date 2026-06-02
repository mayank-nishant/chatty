function UsersLoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="relative overflow-hidden rounded-2xl border border-slate-700/30 bg-slate-800/40 p-3 animate-pulse">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          <div className="relative flex items-center gap-3">
            <div className="size-14 shrink-0 rounded-2xl bg-slate-700/60" />

            <div className="flex-1 min-w-0">
              <div className="h-4 w-36 rounded-full bg-slate-700/60" />
              <div className="mt-3 h-3 w-20 rounded-full bg-slate-700/40" />
            </div>

            <div className="size-3 rounded-full bg-slate-700/50" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersLoadingSkeleton;
