"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide =
  | { type: "image"; src: string; alt: string; className?: string }
  | { type: "video"; src: string; ariaLabel: string; className?: string };

const DEFAULT_PUBLIC_MEDIA_ORIGIN = "https://media.entresaisons.com";

const configuredMediaOrigin = (process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? DEFAULT_PUBLIC_MEDIA_ORIGIN).trim();
const mediaOrigin = configuredMediaOrigin.includes(".r2.cloudflarestorage.com")
  ? DEFAULT_PUBLIC_MEDIA_ORIGIN
  : configuredMediaOrigin.replace(/\/+$/, "");
const MEDIA_BASE = `${mediaOrigin}/images`;

const slides: Slide[] = [
  { type: "image", src: `${MEDIA_BASE}/mulholland-drive.jpg`, alt: "Featured collection look one" },
  { type: "image", src: `${MEDIA_BASE}/haussmann.jpg`, alt: "Featured collection look one" },
  { type: "image", src: `${MEDIA_BASE}/cherry-red.jpg`, alt: "Featured collection look two" },
  { type: "video", src: `${MEDIA_BASE}/ibiza-clipped..mp4`, ariaLabel: "Ibiza featured collection video", className: "scale-95" },
  { type: "video", src: `${MEDIA_BASE}/im-deranged-crop.mov`, ariaLabel: "Featured collection video", className: "scale-95" },
  { type: "image", src: `${MEDIA_BASE}/richter-faces.jpg`, alt: "Featured collection look eight" },
  { type: "image", src: `${MEDIA_BASE}/edie-3.jpg`, alt: "Featured collection look nine" },
  { type: "image", src: `${MEDIA_BASE}/red-pink-blue.jpg`, alt: "Featured collection look three", className: "scale-90" },
  { type: "image", src: `${MEDIA_BASE}/opening-scene-01.jpg`, alt: "Featured collection look four" },
  { type: "image", src: `${MEDIA_BASE}/paulie-chris-waiter.jpg`, alt: "Featured collection look five" },
  { type: "image", src: `${MEDIA_BASE}/sextape-disclaimer.png`, alt: "Featured collection look six", className: "scale-95" },
  { type: "image", src: `${MEDIA_BASE}/sextape.png`, alt: "Featured collection look seven", className: "scale-95" },
];

const ROTATION_MS = 1800;

export default function HomeHeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, ROTATION_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <div className="relative mt-6 aspect-[4/5] w-full max-h-[64svh] md:max-h-none">
      {activeSlide.type === "image" ? (
        <Image
          key={activeSlide.alt}
          src={activeSlide.src}
          alt={activeSlide.alt}
          unoptimized
          priority
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className={`object-contain object-center ${activeSlide.className ?? ""}`}
        />
      ) : (
        <video
          key={activeSlide.src}
          src={activeSlide.src}
          aria-label={activeSlide.ariaLabel}
          autoPlay
          muted
          loop
          playsInline
          className={`h-full w-full object-contain object-center ${activeSlide.className ?? ""}`}
        />
      )}
    </div>
  );
}
