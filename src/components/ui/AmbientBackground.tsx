"use client";

import { cn } from "@/lib/utils";

type AmbientVariant = "cream" | "mint" | "blush" | "forest";

interface AmbientBackgroundProps {
  variant?: AmbientVariant;
  className?: string;
}

export function AmbientBackground({ variant = "cream", className }: AmbientBackgroundProps) {
  const getGradients = () => {
    switch (variant) {
      case "mint":
        return (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(141,208,186,0.06)_0%,transparent_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_100%_100%,rgba(255,233,92,0.04)_0%,transparent_100%)]" />
          </>
        );
      case "blush":
        return (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,rgba(244,204,204,0.05)_0%,transparent_80%)]" />
        );
      case "forest":
         return (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(26,51,0,0.15)_0%,transparent_100%)] mix-blend-overlay" />
         );
      case "cream":
      default:
        return (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(252,250,245,1)_0%,rgba(252,250,245,0.6)_50%,transparent_100%)]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(255,233,92,0.04)_0%,transparent_70%)]" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_80%_80%,rgba(26,51,0,0.015)_0%,transparent_60%)]" />
          </>
        );
    }
  };

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}>
      {getGradients()}
    </div>
  );
}
