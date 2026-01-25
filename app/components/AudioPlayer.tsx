"use client";

import { useEffect, useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    // Play local asset served from /public
    const audio = new Audio("https://media.entresaisons.com/sounds/Falling.mp3");
    audioRef.current = audio;
    audio.preload = "auto";
    audio.volume = 0.6;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setBlocked(false);
      })
      .catch(() => {
        setBlocked(true);
      });
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setBlocked(false);
        })
        .catch(() => setBlocked(true));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded bg-white/90 px-4 py-2 shadow-md backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="h-8 w-8 rounded-full border border-black text-sm leading-none text-black hover:bg-black hover:text-white transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "❚❚" : "►"}
        </button>
        <div className="text-xs leading-tight">
          <div className="font-semibold text-black">Falling</div>
          <div className="text-zinc-700">Julee Cruise</div>
          {blocked && (
            <div className="mt-1 text-[10px] text-zinc-500">Tap play to enable audio</div>
          )}
        </div>
      </div>
    </div>
  );
}

