"use client";

import { useEffect, useRef } from "react";

type RevealMark = {
  x: number;
  y: number;
  createdAt: number;
};

type Props = {
  text: string;
  attribution?: string;
  className?: string;
  textClassName?: string;
  attributionClassName?: string;
};

const BRUSH_RADIUS = 34;
const REVEAL_HOLD_MS = 6000;
const REVEAL_FADE_MS = 4000;
const MIN_MARK_DISTANCE = 4;
const TRAIL_STEP = 6;

export default function ScratchRevealText({
  text,
  attribution,
  className = "",
  textClassName = "",
  attributionClassName = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const marksRef = useRef<RevealMark[]>([]);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frameId = 0;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(rect.height * pixelRatio));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawOverlay = () => {
      const now = performance.now();
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      marksRef.current = marksRef.current.filter(
        (mark) => now - mark.createdAt < REVEAL_HOLD_MS + REVEAL_FADE_MS,
      );

      context.clearRect(0, 0, width, height);
      context.fillStyle = "rgba(255, 255, 255, 1)";
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalCompositeOperation = "destination-out";

      for (const mark of marksRef.current) {
        const elapsed = now - mark.createdAt;
        const fadeProgress =
          elapsed <= REVEAL_HOLD_MS
            ? 1
            : Math.max(0, 1 - (elapsed - REVEAL_HOLD_MS) / REVEAL_FADE_MS);

        if (fadeProgress <= 0) continue;

        const radius = BRUSH_RADIUS * fadeProgress;
        const gradient = context.createRadialGradient(mark.x, mark.y, 0, mark.x, mark.y, radius);
        gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
        gradient.addColorStop(0.55, "rgba(0, 0, 0, 0.9)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(mark.x, mark.y, radius, 0, Math.PI * 2);
        context.fill();
      }

      context.restore();
      frameId = window.requestAnimationFrame(drawOverlay);
    };

    resizeCanvas();
    drawOverlay();

    const observer = new ResizeObserver(() => {
      resizeCanvas();
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const addMark = (x: number, y: number) => {
    const lastPoint = lastPointRef.current;
    const createdAt = performance.now();

    if (lastPoint) {
      const dx = x - lastPoint.x;
      const dy = y - lastPoint.y;
      const distance = Math.hypot(dx, dy);

      if (distance < MIN_MARK_DISTANCE) return;

      const steps = Math.max(1, Math.ceil(distance / TRAIL_STEP));
      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        marksRef.current.push({
          x: lastPoint.x + dx * progress,
          y: lastPoint.y + dy * progress,
          createdAt,
        });
      }
    } else {
      marksRef.current.push({ x, y, createdAt });
    }

    lastPointRef.current = { x, y };
  };

  const textContent = (
    <div className="relative z-0">
      <p className={`text-[14px] uppercase tracking-[0.08em] text-[#171717] ${textClassName}`}>{text}</p>
      {attribution ? (
        <div
          className={`mt-4 pt-4 text-[12px] uppercase tracking-[0.12em] text-[#171717] ${attributionClassName}`}
        >
          {attribution}
        </div>
      ) : null}
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-transparent ${className}`}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        addMark(event.clientX - rect.left, event.clientY - rect.top);
      }}
      onPointerLeave={() => {
        lastPointRef.current = null;
      }}
    >
      {textContent}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}
