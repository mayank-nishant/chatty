import { useRef, useState } from "react";
import { ImageIcon, SendIcon, XIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";

const FILE_SIZE_LIMIT = 5 * 1024 * 1024;

function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const { sendMessage, isSoundEnabled, isSendingMessage } = useChatStore();

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const playKeystroke = () => {
    if (isSoundEnabled) playRandomKeyStrokeSound();
  };

  const resetFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = () => {
    setImagePreview(null);
    resetFileInput();
  };

  const handleImageChange = (e) => {
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

    reader.onloadend = () => setImagePreview(reader.result);
    reader.onerror = () => {
      console.error("Failed to read image file.");
      toast.error("Failed to read image. Please try again.");
    };

    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) return;

    try {
      playKeystroke();

      await sendMessage({ text: text.trim(), image: imagePreview });

      setText("");
      setImagePreview(null);
      resetFileInput();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="border-t border-slate-700/40 bg-slate-900/70 backdrop-blur-xl p-4">
      {imagePreview && (
        <div className="max-w-4xl mx-auto mb-4">
          <div className="relative inline-block">
            <img src={imagePreview} alt="Preview" className="w-28 h-28 object-cover rounded-2xl border border-slate-700/50 shadow-lg" />
            <button type="button" onClick={removeImage} aria-label="Remove image" className="absolute -top-2 -right-2 size-7 rounded-full flex items-center justify-center bg-slate-800 border border-slate-700 text-slate-300 hover:text-red-400 transition-colors">
              <XIcon className="size-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
        <div className="flex items-end gap-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-700/40 backdrop-blur-xl">
          <div className="flex-1">
            <textarea
              rows={1}
              value={text}
              placeholder="Type your message..."
              disabled={isSendingMessage}
              onChange={(e) => {
                setText(e.target.value);
                playKeystroke();
              }}
              onKeyDown={handleKeyDown}
              className="w-full resize-none bg-transparent outline-none text-slate-100 placeholder:text-slate-500 text-sm md:text-[15px] max-h-40"
            />
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isSendingMessage}
            aria-label="Attach image"
            className={`
              shrink-0 size-11 rounded-xl flex items-center justify-center transition-all duration-200
              ${imagePreview ? "bg-cyan-500/15 text-cyan-400 border border-cyan-400/20" : "text-slate-400 hover:text-cyan-400 hover:bg-slate-700/70"}
            `}
          >
            <ImageIcon className="size-5" />
          </button>

          <button type="submit" disabled={(!text.trim() && !imagePreview) || isSendingMessage} aria-label="Send message" className="shrink-0 size-11 rounded-xl flex items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
            {isSendingMessage ? <Loader2 className="size-5 animate-spin" /> : <SendIcon className="size-5" />}
          </button>
        </div>

        <p className="mt-2 px-2 text-[11px] text-slate-500">Press Enter to send • Shift + Enter for new line</p>
      </form>
    </div>
  );
}

export default MessageInput;
