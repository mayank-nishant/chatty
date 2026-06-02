import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon, CameraIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";

const FILE_SIZE_LIMIT = 5 * 1024 * 1024;
const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();

  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const resetFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    resetFileInput();

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (file.size > FILE_SIZE_LIMIT) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);

      try {
        await updateProfile({ profilePic: base64Image });
        setSelectedImg(null);
      } catch {
        setSelectedImg(null);
      }
    };

    reader.onerror = () => {
      toast.error("Failed to read image. Please try again.");
      console.error("FileReader error.");
    };

    reader.readAsDataURL(file);
  };

  const handleToggleSound = () => {
    mouseClickSound.currentTime = 0;
    mouseClickSound.play().catch((err) => console.error("Audio play failed:", err));
    toggleSound();
  };

  return (
    <div className="px-5 py-4 border-b border-slate-700/40 bg-slate-900/20 backdrop-blur-xl sticky top-0 z-20">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative shrink-0">
            <button onClick={() => fileInputRef.current?.click()} className="relative size-14 rounded-2xl overflow-hidden ring-2 ring-slate-700/50 hover:ring-cyan-400/50 transition-all duration-300 group" aria-label="Change profile picture">
              <img src={selectedImg || authUser?.profilePic || "/avatar.png"} alt={authUser?.fullName || "User"} className="size-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">{isUpdatingProfile ? <Loader2 className="size-5 text-white animate-spin" /> : <CameraIcon className="size-5 text-white" />}</div>
            </button>

            <span className="absolute bottom-0 right-0 size-4 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>

          <div className="min-w-0">
            <h3 className="text-slate-100 font-semibold text-base truncate max-w-[180px]">{authUser?.fullName}</h3>
            <p className="text-emerald-400 text-xs flex items-center gap-1">
              <span className="size-2 rounded-full bg-emerald-400" />
              Online
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleToggleSound} className="size-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-800/70 transition-all duration-200" aria-label={isSoundEnabled ? "Mute sounds" : "Unmute sounds"}>
            {isSoundEnabled ? <Volume2Icon className="size-5" /> : <VolumeOffIcon className="size-5" />}
          </button>

          <button onClick={logout} className="size-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200" aria-label="Log out">
            <LogOutIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
