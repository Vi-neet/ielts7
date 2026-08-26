"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export default function ProfileLoadingOverlay() {
  return (
    <div className="min-h-[75vh] bg-[#fcfaf5] flex flex-col items-center justify-center p-4">
      <Loader2 className="h-8 w-8 text-forest-ink animate-spin mb-3" />
      <span className="text-forest-ink/70 font-inter text-sm font-semibold tracking-wide">
        Loading profile...
      </span>
    </div>
  );
}
