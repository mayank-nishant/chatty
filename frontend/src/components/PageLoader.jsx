import { Loader2Icon } from "lucide-react";

function PageLoader({ text = "Loading..." }) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_35%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl" />
          <div className="relative flex items-center justify-center size-20 rounded-full border border-cyan-400/20 bg-slate-900/70 backdrop-blur-xl">
            <Loader2Icon className="size-10 animate-spin text-cyan-400" />
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-slate-100 font-semibold text-lg">{text}</h3>
          <p className="mt-1 text-sm text-slate-500">Please wait a moment</p>
        </div>
      </div>
    </div>
  );
}

export default PageLoader;
