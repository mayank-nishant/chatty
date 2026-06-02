import { useCallback, useMemo } from "react";

const KEYSTROKE_SOUND_PATHS = ["/sounds/keystroke1.mp3", "/sounds/keystroke2.mp3", "/sounds/keystroke3.mp3", "/sounds/keystroke4.mp3"];

const KEYSTROKE_VOLUME = 0.4;

const createAudio = (src) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.volume = KEYSTROKE_VOLUME;
  return audio;
};

function useKeyboardSound() {
  const keyStrokeSounds = useMemo(() => KEYSTROKE_SOUND_PATHS.map(createAudio), []);

  const playRandomKeyStrokeSound = useCallback(() => {
    try {
      const sound = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];
      sound.currentTime = 0;
      sound.play().catch((err) => console.error("Audio playback failed:", err));
    } catch (err) {
      console.error("Keyboard sound error:", err);
    }
  }, [keyStrokeSounds]);

  return { playRandomKeyStrokeSound };
}

export default useKeyboardSound;
