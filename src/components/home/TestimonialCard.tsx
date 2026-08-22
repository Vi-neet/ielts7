"use client";

import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  content: string;
  name: string;
  role: string;
  date: string;
  rating: number;
  isActive?: boolean;
}

/**
 * Reusable testimonial quote card component per DESIGN.md.
 * Clean layout, Forest Ink text, Highlighter Yellow stars.
 */
export const TestimonialCard = ({
  content,
  name,
  role,
  date,
  rating,
  isActive = true,
}: TestimonialCardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-8 transition-all duration-500 border",
        isActive 
          ? "border-forest-ink/15 shadow-[var(--shadow-elevated)] opacity-100 scale-100" 
          : "border-pencil-gray/20 opacity-40 scale-[0.97]"
      )}
    >
      <div className="flex items-center mb-6 gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={cn(
              "w-5 h-5",
              i < rating ? "text-highlighter-yellow" : "text-pencil-gray/30"
            )}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>

      <p className="text-forest-ink text-[17px] leading-relaxed mb-8 font-inter">
        "{content}"
      </p>

      <div className="flex justify-between items-end">
        <div>
          <h4 className="font-semibold text-forest-ink font-inter text-[15px]">
            {name}
          </h4>
          <p className="text-[13px] text-forest-ink/50 font-roboto-mono tracking-tight mt-0.5">
            {role}
          </p>
        </div>
        <div className="text-[12px] font-roboto-mono text-forest-ink/40 tracking-tight">
          {date}
        </div>
      </div>
    </div>
  );
};
