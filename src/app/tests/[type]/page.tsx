"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Test {
  id: string;
  year: string;
  testNumber: number;
  title: string;
}

export default function TestTypePage() {
  const params = useParams();
  const type = params.type as string;
  const router = useRouter();

  useEffect(() => {
    if (type) {
      router.replace(`/tests?module=${type}`);
    }
  }, [type, router]);

  return (
    <div className="min-h-screen bg-cream-paper flex items-center justify-center p-8">
      <div className="flex items-center gap-3 font-mono text-xs font-bold text-forest-ink/70 bg-white px-5 py-3 rounded-2xl border border-forest-ink/15 shadow-sm">
        <div className="w-4 h-4 border-2 border-forest-ink/20 border-t-forest-ink rounded-full animate-spin" />
        Redirecting to test catalog...
      </div>
    </div>
  );
}
