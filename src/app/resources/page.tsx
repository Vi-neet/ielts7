"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { FloatingShape } from "@/components/ui/FloatingShape";
import { SectionTransition } from "@/components/ui/SectionTransition";

import { videos as resourceVideos } from "@/data/resources/videos";
import { essays as resourceEssays } from "@/data/resources/essays";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Types definition
interface Essay {
  id: number;
  title: string;
  content: string;
  fullContent: string;
  image?: string;
  category?: string;
  date?: string;
}

interface Video {
  id: number;
  title: string;
  description: string;
  videoId: string;
  category?: string;
}

// =========================
// Component Sub-Sections
// =========================

const VideoItem = ({ video, index }: { video: Video; index: number }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!videoRef.current || prefersReducedMotion) return;
    
    gsap.from(videoRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: videoRef.current,
        start: "top 85%",
      }
    });
  }, { scope: videoRef });

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const getCategoryStyle = () => {
    switch (video.category) {
      case "speaking": return "bg-sticky-note-mint/30 text-forest-ink border-pencil-gray/10";
      case "writing": return "bg-sticky-note-blush/30 text-forest-ink border-pencil-gray/10";
      case "listening": return "bg-sticky-note-teal/30 text-forest-ink border-pencil-gray/10";
      case "general":
      default: return "bg-highlighter-yellow/30 text-forest-ink border-pencil-gray/10";
    }
  };

  return (
    <div
      ref={videoRef}
      className="bg-white rounded-[24px] shadow-sm border border-pencil-gray/20 overflow-hidden flex flex-col lg:flex-row gap-0"
      data-testid="video-item"
    >
      <div
        className={`relative ${index % 2 === 0 ? "lg:order-1 border-r border-pencil-gray/10" : "lg:order-2 border-l border-pencil-gray/10"} w-full lg:w-7/12`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!isPlaying && (
          <div className="relative aspect-video w-full overflow-hidden">
            <div
              className="absolute inset-0 bg-forest-ink/20 z-10 transition-opacity duration-300"
              style={{ opacity: isHovered ? 0.4 : 0.2 }}
            />
            <Image
              src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
              alt={`${video.title} thumbnail`}
              className={`object-cover w-full h-full transition-transform duration-700 ${isHovered ? "scale-105" : "scale-100"}`}
              width={1280}
              height={720}
            />

            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <button
                onClick={togglePlay}
                className="group bg-highlighter-yellow rounded-full p-4 shadow-sm transition-transform duration-300 hover:scale-110 pointer-events-auto"
                aria-label={`Play ${video.title} video`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-forest-ink ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-20">
              <span className={`px-3 py-1 rounded-md border ${getCategoryStyle()} text-xs font-medium font-inter`}>
                {video.category || "General"}
              </span>
              <span className="bg-forest-ink/80 text-white px-2.5 py-1 rounded-md text-xs font-roboto-mono backdrop-blur-sm">
                10:45
              </span>
            </div>
          </div>
        )}

        {isPlaying && (
          <div className="aspect-video w-full relative">
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
              title={video.title}
              className="w-full h-full rounded-t-[24px] lg:rounded-t-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={togglePlay}
              className="absolute top-4 right-4 z-30 bg-forest-ink/80 backdrop-blur-sm rounded-full p-2 text-white hover:bg-forest-ink transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className={`${index % 2 === 0 ? "lg:order-2" : "lg:order-1"} w-full lg:w-5/12 p-8 lg:p-10 flex flex-col justify-center bg-cream-paper/50`}>
        <div className="space-y-5">
          {!isPlaying && (
            <div className="lg:hidden">
              <span className={`inline-block px-3 py-1.5 rounded-md border ${getCategoryStyle()} text-xs font-medium font-inter`}>
                {video.category || "General"}
              </span>
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-ink font-bricolage tracking-tight leading-tight">
            {video.title}
          </h2>

          <div className="w-12 h-1 bg-highlighter-yellow rounded-full"></div>

          <p className="text-forest-ink/80 font-inter leading-relaxed">
            {video.description}
          </p>

          {!isPlaying && (
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 px-6 py-2.5 bg-forest-ink text-white rounded-lg hover:bg-forest-ink/90 transition-colors shadow-sm font-medium font-inter"
              >
                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Video
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EssayCard = ({ essay, onSelect, index }: { essay: Essay; onSelect: (essay: Essay) => void; index: number }) => {
  const prefersReducedMotion = useReducedMotion();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(dateString));
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm overflow-hidden border border-pencil-gray/20 h-full flex flex-col group cursor-pointer transition-shadow hover:shadow-[var(--shadow-card)] hover:border-forest-ink/20"
      whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.01 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 400, damping: 25 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onClick={() => onSelect(essay)}
    >
      <div className="p-6 md:p-8 flex-1 flex flex-col relative overflow-hidden">
        
        {/* Subtle decorative background shape that scales on hover */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-cream-paper rounded-full opacity-50 transform scale-50 group-hover:scale-100 transition-transform duration-500 ease-out z-0" />

        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-xl font-bold text-forest-ink mb-3 line-clamp-2 font-bricolage tracking-tight leading-snug group-hover:text-forest-ink/90 transition-colors">
            {essay.title}
          </h3>

          <div className="flex-1">
            <p className="text-forest-ink/70 mb-6 text-sm line-clamp-4 font-inter leading-relaxed">
              {essay.content}
            </p>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between">
              {essay.date && (
                <div className="flex items-center text-[11px] font-roboto-mono text-forest-ink/50 bg-whisper-gray px-2 py-1 rounded-md border border-pencil-gray/10 opacity-70 group-hover:opacity-100 transition-opacity">
                  {formatDate(essay.date)}
                </div>
              )}
              
              <div className="inline-flex items-center font-medium font-inter text-forest-ink text-sm transform translate-x-0 group-hover:-translate-x-1 transition-transform">
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">Read</span>
                <svg
                  className="w-4 h-4 ml-1.5 opacity-60 group-hover:opacity-100 transition-opacity"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EssayDetail = ({ essay, onBack }: { essay: Essay; onBack: () => void; }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [essay.id]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto bg-white rounded-[24px] shadow-sm border border-pencil-gray/20 p-8 md:p-12 lg:p-16 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,rgba(244,204,204,0.3)_0%,transparent_70%)] pointer-events-none" />

      <button
        onClick={onBack}
        className="relative z-10 text-forest-ink/60 hover:text-forest-ink transition-colors mb-8 flex items-center font-inter font-medium text-sm group"
      >
        <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Essays
      </button>

      <h1 className="relative z-10 text-3xl md:text-4xl font-extrabold text-forest-ink font-bricolage tracking-tight mb-8 leading-tight">{essay.title}</h1>

      {essay.image && (
        <div className="relative z-10 mb-10 rounded-xl overflow-hidden border border-pencil-gray/10">
          <div className="relative w-full aspect-video">
            <Image src={essay.image} alt={essay.title} fill className="object-cover" priority={true} />
          </div>
        </div>
      )}

      <div
        className="relative z-10 prose prose-lg prose-headings:font-bricolage prose-headings:text-forest-ink prose-p:font-inter prose-p:text-forest-ink/80 prose-a:text-forest-ink prose-strong:text-forest-ink max-w-none"
        dangerouslySetInnerHTML={{ __html: essay.fullContent }}
      />
    </motion.div>
  );
};

const TabNavigation = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void; }) => {
  return (
    <div className="flex justify-center mb-16 relative z-20">
      <div className="inline-flex bg-white rounded-full p-1.5 shadow-sm border border-pencil-gray/20 relative">
        {["videos", "essays"].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={cn(
                "relative px-8 py-2.5 rounded-full transition-all font-inter font-medium text-sm capitalize z-10",
                isActive ? "text-cream-paper" : "text-forest-ink/70 hover:text-forest-ink"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="resourceTab"
                  className="absolute inset-0 bg-forest-ink rounded-full shadow-sm -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const ResourcesHero = ({ isVisible }: { isVisible: boolean }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (!heroRef.current) return;
    gsap.from(heroRef.current.querySelector('h1'), { y: 20, opacity: 0, duration: 0.8, delay: 0.1 });
    gsap.from(heroRef.current.querySelector('p'), { y: 20, opacity: 0, duration: 0.8, delay: 0.2 });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-cream-paper w-full pt-24 pb-24">
      <AmbientBackground variant="mint" />
      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-ink font-bricolage tracking-tight mb-6">
            Free Learning{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-forest-ink">Resources</span>
              <motion.div
                className="absolute bottom-1 left-0 right-0 h-4 bg-highlighter-yellow/80 -z-10 -rotate-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </h1>

          <p className="text-forest-ink/80 text-lg font-inter max-w-2xl mx-auto leading-relaxed">
            Access our comprehensive collection of educational videos and
            sample essays to enhance your academic writing skills and excel in
            your IELTS exam.
          </p>
        </div>
      </div>
    </section>
  );
};

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    if (typeof window !== "undefined") {
      if (window.location.hash === "#essays") setActiveTab("essays");
      else if (window.location.hash === "#videos") setActiveTab("videos");
    }
  }, []);
  
  const videos = useMemo(() => resourceVideos, []);
  const essays = useMemo(() => resourceEssays, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    if (containerRef.current) {
      const y = containerRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <ResourcesHero isVisible={isVisible} />
      <SectionTransition fill="#faf9f6" />

      <div className="container mx-auto px-6 py-16 max-w-6xl relative z-10" ref={containerRef}>
        {!selectedEssay && (
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
        )}

        <AnimatePresence mode="wait">
          {!selectedEssay ? (
            <motion.div
              key={`tab-${activeTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "videos" ? (
                <div className="space-y-12">
                  {videos.map((video, index) => (
                    <VideoItem key={video.id} video={video} index={index} />
                  ))}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {essays.map((essay, index) => (
                    <EssayCard key={essay.id} essay={essay} onSelect={setSelectedEssay} index={index} />
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <EssayDetail key="essay-detail" essay={selectedEssay} onBack={() => setSelectedEssay(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResourcesPage;
