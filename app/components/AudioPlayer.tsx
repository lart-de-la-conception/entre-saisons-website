"use client";

import { useEffect, useRef, useState } from "react";

type Track = {
  title: string;
  artist?: string;
  src: string;
};

const TRACKS: Track[] = [
  {
    title: "Falling",
    artist: "Julee Cruise",
    src: "https://media.entresaisons.com/sounds/Falling.mp3",
  },
  {
    title: "Weightless",
    artist: "Brian Eno",
    src: "https://media.entresaisons.com/sounds/Weightless%20(Remastered%202005).mp3",
  },
  {
    title: "Waltz No. 2",
    artist: "Dmitri Shostakovich",
    src: "https://media.entresaisons.com/sounds/Dmitri%20Shostakovich%20-%20Waltz%20No.%202%200.mp3",
  },
];

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoplayNextRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const audio = new Audio(TRACKS[0]?.src);
    audioRef.current = audio;
    audio.preload = "auto";
    audio.volume = 0.6;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      autoplayNextRef.current = true;
      setIndex((i) => (i + 1) % TRACKS.length);
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    // Attempt autoplay on first load (may be blocked by browser policy).
    audio
      .play()
      .then(() => {
        setBlocked(false);
      })
      .catch(() => {
        setBlocked(true);
      });
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // When track changes, swap src and (if playing) keep playing.
  useEffect(() => {
    const audio = audioRef.current;
    const track = TRACKS[index];
    if (!audio || !track) return;
    const wasPlaying = !audio.paused;
    const shouldAutoplay = autoplayNextRef.current;
    autoplayNextRef.current = false;
    audio.src = track.src;
    audio.load();
    if (wasPlaying || shouldAutoplay) {
      audio
        .play()
        .then(() => setBlocked(false))
        .catch(() => setBlocked(true));
    }
  }, [index]);

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

  function prev() {
    setIndex((i) => (i - 1 + TRACKS.length) % TRACKS.length);
  }

  function next() {
    setIndex((i) => (i + 1) % TRACKS.length);
  }

  const current = TRACKS[index];

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded bg-white/90 px-4 py-3 shadow-md backdrop-blur">
      <div className="flex items-center gap-3 max-w-[320px]">
        <button
          onClick={prev}
          className="h-8 w-8 border border-black text-sm leading-none text-black hover:bg-black hover:text-white transition-colors"
          aria-label="Previous track"
          title="Previous"
        >
          ‹
        </button>
        <button
          onClick={toggle}
          className="h-8 w-8 border border-black text-sm leading-none text-black hover:bg-black hover:text-white transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "❚❚" : "►"}
        </button>
        <button
          onClick={next}
          className="h-8 w-8 border border-black text-sm leading-none text-black hover:bg-black hover:text-white transition-colors"
          aria-label="Next track"
          title="Next"
        >
          ›
        </button>
        <div className="ml-3 min-w-0 text-xs leading-tight">
          <div className="truncate font-semibold text-black">
            {current?.title ?? "Audio"}
          </div>
          {current?.artist && (
            <div className="truncate text-zinc-700">{current.artist}</div>
          )}
          {blocked && (
            <div className="mt-1 text-[10px] text-zinc-500">Tap play to enable audio</div>
          )}
        </div>
      </div>
    </div>
  );
}

