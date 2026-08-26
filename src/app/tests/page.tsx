"use client";

import React, { Suspense } from "react";
import PracticeTestsSection from "@/components/home/PracticeTestsSection";
import Header from "@/components/layout/header";

export default function TestsCatalogPage() {
  return (
    <div className="min-h-screen bg-cream-paper flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <Suspense fallback={<div className="p-8 text-center text-forest-ink/60 font-mono">Loading tests catalog...</div>}>
          <PracticeTestsSection />
        </Suspense>
      </main>
    </div>
  );
}
