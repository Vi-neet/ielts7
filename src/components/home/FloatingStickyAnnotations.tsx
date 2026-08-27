"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Award, FileCheck2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingStickyAnnotationsProps {
  className?: string;
}

export function FloatingStickyAnnotations({ className }: FloatingStickyAnnotationsProps) {
  const prefersReducedMotion = useReducedMotion();

  const notes = [
    {
      id: 1,
      title: "AUTHENTIC MATERIAL",
      desc: "100+ Real IELTS Exam Tests",
      icon: FileCheck2,
      colorClass: "bg-sticky-note-mint border-forest-ink/20 text-forest-ink",
      rotation: "rotate-[-3deg]",
      position: "left-2 top-10 xl:left-8",
    },
    {
      id: 2,
      title: "INSTANT EVALUATION",
      desc: "Real-time Band Score Insights",
      icon: Sparkles,
      colorClass: "bg-sticky-note-teal border-forest-ink/20 text-forest-ink",
      rotation: "rotate-[4deg]",
      position: "right-2 top-8 xl:right-10",
    },
  ];

  return (
    <div className={cn("relative w-full max-w-6xl mx-auto pointer-events-none z-20", className)}>
      {notes.map((note) => {
        const Icon = note.icon;
        return (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 * note.id }}
            whileHover={
              prefersReducedMotion
                ? {}
                : {
                    scale: 1.05,
                    rotate: 0,
                    boxShadow: "0px 8px 20px rgba(26,51,0,0.12)",
                  }
            }
            className={cn(
              "absolute hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl border font-inter shadow-xs pointer-events-auto cursor-pointer transition-all",
              note.colorClass,
              note.rotation,
              note.position
            )}
          >
            <div className="p-1.5 rounded-lg bg-forest-ink/10">
              <Icon className="w-4 h-4 text-forest-ink" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-extrabold tracking-wider font-bricolage opacity-75 uppercase">
                {note.title}
              </span>
              <span className="text-[13px] font-semibold font-inter leading-tight">
                {note.desc}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
