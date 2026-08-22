"use client";

export function PaperTexture() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 h-[100vh] w-[100vw] opacity-[0.025] mix-blend-overlay">
      <svg className="absolute inset-0 h-full w-full">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
