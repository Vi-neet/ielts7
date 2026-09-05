"use client";

import React, { Suspense } from "react";
import PracticeTestsSection from "@/components/home/PracticeTestsSection";

export default function TestsCatalogPage() {
  return (
    <div className="min-h-screen bg-cream-paper">
      <Suspense fallback={<div className="p-8 text-center text-forest-ink/60 font-mono">Loading tests catalog...</div>}>
        <PracticeTestsSection />
      </Suspense>
    </div>
  );
}
