"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const section = searchParams.get("section");

  useEffect(() => {
    if (section === "practice-tests") {
      router.replace("/tests");
    }
  }, [section, router]);

  return (
    <main className="min-h-screen bg-cream-paper">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-cream-paper" />}>
      <HomeContent />
    </Suspense>
  );
}
