function BorderAnimatedContainer({ children, className = "" }) {
  return (
    <div
      className={`
        relative w-full h-full overflow-hidden rounded-3xl p-[1px]
        bg-[conic-gradient(from_var(--border-angle),theme(colors.slate.700),theme(colors.cyan.500),theme(colors.cyan.300),theme(colors.slate.700))]
        animate-border
        shadow-[0_0_50px_rgba(34,211,238,0.08)]
        before:absolute before:inset-0 before:rounded-3xl
        before:bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_40%)]
        before:pointer-events-none
        ${className}
      `}
    >
      <div
        className="
          relative z-10 w-full h-full
          rounded-[calc(1.5rem-1px)]
          bg-slate-900/95 backdrop-blur-2xl
          border border-slate-800/60
          overflow-hidden
        "
      >
        {children}
      </div>
    </div>
  );
}

export default BorderAnimatedContainer;
