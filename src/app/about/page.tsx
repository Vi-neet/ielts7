"use client";

import { useState, useEffect, useRef } from "react";
import {
  Users,
  GraduationCap,
  Star,
  Trophy,
  ChevronDown,
  BadgeCheck,
  BookOpen,
  Globe,
  MessageSquareQuote
} from "lucide-react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeader } from "@/components/home/SectionHeader";
import { cn } from "@/lib/utils";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { FloatingShape } from "@/components/ui/FloatingShape";
import { SectionTransition } from "@/components/ui/SectionTransition";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutUs = () => {
  const prefersReducedMotion = useReducedMotion();

  // State for counters and accordion
  const [counts, setCounts] = useState({
    students: 0,
    success: 0,
    experience: 0,
    satisfaction: 0,
  });
  const [openSection, setOpenSection] = useState<number | null>(null);

  // References for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion) return;

    // Image Parallax
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // GSAP Scroll reveals for accordion
    if (accordionRef.current) {
      const items = accordionRef.current.querySelectorAll(".accordion-item");
      gsap.from(items, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: accordionRef.current,
          start: "top 80%",
        }
      });
    }
  }, { scope: heroRef });

  const toggleSection = (index: number): void => {
    setOpenSection(openSection === index ? null : index);
  };

  // Accordion data
  const accordionData = [
    {
      title: "What is the IELTS Test?",
      content:
        "IELTS = International English Language Testing System. It is the biggest English language test in the world with test centers in almost all countries. It is an international English test, which accepts international English, not just British English. It is taken by most people for their professional work, academic studies or moving to an English speaking country. The test can be taken on paper or on a computer. It is the same test regardless of whether you write your answers on paper or computer.",
    },
    {
      title: "About IELTS Listening Test",
      content:
        "This listening test comes in 4 sections with 40 questions. Section 1 & section 2 are based on social topics and section 3 & 4 are academic in nature. There are many different types of questions and you must prepare techniques for each type. The recording is played for 30 mins, there is then time to transfer or check answers (see the listening page for details). All candidates take the same listening test.",
    },
    {
      title: "About IELTS Reading Test",
      content:
        "This test has 3 passages with 40 questions. Academic reading contains academic style passages. GT reading contains everyday or work related topics and passage 3 is similar to academic reading. There are 14 types of questions, which are the same for both tests, and you must practice them all for familiarity and strategy. All reading practice lessons on this website are for both Academic & GT candidates. The reading test lasts 1 hour.",
    },
    {
      title: "About IELTS Writing Test",
      content:
        "There are two tasks. Task 1 is a report based on a chart, graph table etc. For GT IELTS candidates, task 1 is a letter. Writing task 2 is the same for both tests – a formal essay. There are five different essay types to prepare for. Essays are topic based so you must prepare ideas and vocabulary for topics. You must understand the marking criteria for success because it is not entirely based on your English language. See band scores below. The writing test is 1 hour.",
    },
    {
      title: "About IELTS Speaking Test",
      content:
        "This is a face to face, informal speaking test with the examiner either in a room or through video call. It lasts for 11 – 14 mins and has 3 parts. Part 1 and 3 are question/answers. Part 2 is a talk that you give for 2 mins with 1 min preparation. Topics are crucial for your speaking test preparation because it is a topic based test. Topic relevant vocabulary is vital. All candidates take the same test. You must understand the marking criteria.",
    },
  ];

  useGSAP(() => {
    // Trigger counters only when stats section is in view
    if (!statsRef.current) return;
    
    ScrollTrigger.create({
      trigger: statsRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        const targetCounts = {
          students: 7000,
          success: 95,
          experience: 10,
          satisfaction: 98,
        };
    
        const duration = 2000;
        const steps = 50;
        const interval = duration / steps;
    
        const incrementCounts = (step: number): void => {
          setCounts({
            students: Math.floor((targetCounts.students / steps) * step),
            success: Math.floor((targetCounts.success / steps) * step),
            experience: Math.floor((targetCounts.experience / steps) * step),
            satisfaction: Math.floor((targetCounts.satisfaction / steps) * step),
          });
        };
    
        let currentStep = 0;
        const timer = setInterval(() => {
          currentStep++;
          if (currentStep <= steps) {
            incrementCounts(currentStep);
          } else {
            clearInterval(timer);
            setCounts(targetCounts);
          }
        }, interval);
      }
    });

  }, { scope: statsRef });

  useEffect(() => {
    // Load Elfsight script
    const loadElfsightScript = () => {
      if (typeof document !== "undefined") {
        const script = document.createElement("script");
        script.src = "https://static.elfsight.com/platform/platform.js";
        script.defer = true;
        script.setAttribute("data-use-service-core", "");
        document.body.appendChild(script);

        return () => {
          // Clean up script
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
        };
      }
      return () => {};
    };

    const cleanup = loadElfsightScript();
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="bg-cream-paper min-h-screen font-inter">
      <AmbientBackground variant="cream" />

      {/* About Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-24 pb-24 overflow-hidden"
      >
        <FloatingShape speed={0.6} float className="top-20 right-[15%] opacity-15 hidden lg:block">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path d="M50 0L65.45 34.55L100 50L65.45 65.45L50 100L34.55 65.45L0 50L34.55 34.55L50 0Z" fill="#1a3300"/>
          </svg>
        </FloatingShape>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row md:items-start gap-16 lg:gap-24">
            
            <div className="md:w-1/2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-pencil-gray/20 bg-white shadow-sm mb-6">
                  <BookOpen className="w-4 h-4 text-forest-ink/70" />
                  <span className="text-sm font-medium font-inter text-forest-ink">About IELTS 7+ House</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-forest-ink font-bricolage tracking-tight leading-tight">
                  Your Path to{" "}
                  <span className="relative inline-block text-forest-ink z-10">
                    IELTS Success
                    <motion.div
                      className="absolute bottom-1 left-0 right-0 h-4 bg-highlighter-yellow/80 -z-10 -rotate-1"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      style={{ transformOrigin: "left" }}
                    />
                  </span>
                </h1>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl border border-pencil-gray/20 shadow-sm p-8 relative"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-highlighter-yellow rounded-full flex items-center justify-center text-forest-ink text-xl font-serif">
                  "
                </div>
                <p className="text-forest-ink/80 italic text-lg leading-relaxed font-inter">
                  I have been teaching English since 2013. My formal experience
                  with IELTS training starts from 2017. I have trained hundreds
                  of students and worked with companies like Hindustan Times
                  Learning Centers, English by Experts.
                </p>
                <p className="text-right text-forest-ink font-semibold mt-4 text-sm font-inter">
                  - MEENU NARULA
                </p>
              </motion.div>

              <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                {[
                  { icon: BadgeCheck, text: "Certified IELTS Trainer", bg: "bg-sticky-note-mint/30" },
                  { icon: Globe, text: "Global Experience", bg: "bg-sticky-note-blush/30" },
                ].map((badge, index) => (
                  <div key={index} className={cn("px-4 py-2 rounded-xl flex items-center border border-pencil-gray/10", badge.bg)}>
                    <badge.icon className="w-4 h-4 text-forest-ink mr-2.5" />
                    <span className="font-medium text-sm text-forest-ink font-inter">{badge.text}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                className="p-5 bg-white border border-pencil-gray/20 rounded-xl"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-forest-ink/80 flex items-center font-medium text-sm font-inter">
                  <Star className="w-5 h-5 text-highlighter-yellow fill-highlighter-yellow mr-3 flex-shrink-0" />
                  We've helped <span className="font-bold text-forest-ink mx-1">2400+ people</span> score
                  <span className="font-bold text-forest-ink mx-1">8+ bands</span> in IELTS
                </p>
              </motion.div>
            </div>

            {/* Profile image */}
            <motion.div
              className="md:w-1/2 mt-10 md:mt-0 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div ref={imageRef} className="relative max-w-md mx-auto">
                <div className="relative rounded-2xl overflow-hidden border border-pencil-gray/20 shadow-md">
                  <Image
                    src="/meenu-narula.webp"
                    alt="Meenu Narula - IELTS Trainer"
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  
                  {/* Info card */}
                  <div
                    className="absolute bottom-5 left-5 right-5 p-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-sm border border-pencil-gray/10"
                  >
                    <h3 className="text-lg font-bold text-forest-ink font-bricolage tracking-tight">
                      Meenu Narula
                    </h3>
                    <p className="text-forest-ink/60 text-sm font-medium font-inter mb-2">
                      IELTS Trainer & Founder
                    </p>
                    <div className="flex items-center text-forest-ink text-sm font-roboto-mono bg-sticky-note-teal/20 px-3 py-1.5 rounded-md inline-flex">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      <span>{counts.experience}+ years experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionTransition fill="#faf9f6" />

      {/* Stats Section */}
      <section className="py-24 bg-[#faf9f6] relative z-10" ref={statsRef}>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, value: counts.students, label: "Students Trained", suffix: "+", bg: "bg-sticky-note-mint/30" },
              { icon: Trophy, value: counts.success, label: "Success Rate", suffix: "%", bg: "bg-sticky-note-blush/30" },
              { icon: GraduationCap, value: counts.experience, label: "Years Experience", suffix: "+", bg: "bg-sticky-note-teal/30" },
              { icon: Star, value: counts.satisfaction, label: "Satisfaction", suffix: "%", bg: "bg-highlighter-yellow/30" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-[20px] p-8 border border-pencil-gray/20 shadow-sm flex flex-col items-center text-center"
              >
                <div className={cn("w-14 h-14 rounded-full flex items-center justify-center mb-6", stat.bg)}>
                  <stat.icon className="w-7 h-7 text-forest-ink" />
                </div>
                <div className="text-5xl font-extrabold text-forest-ink font-bricolage tracking-tight mb-3">
                  {stat.value}
                  <span className="text-terracotta ml-1">{stat.suffix}</span>
                </div>
                <div className="text-forest-ink/70 font-inter text-[15px] font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IELTS Information Section */}
      <section className="py-32 relative bg-white border-t border-pencil-gray/10" ref={accordionRef}>
        <AmbientBackground variant="blush" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <SectionHeader
            eyebrowText="IELTS Knowledge"
            eyebrowIcon={<BookOpen className="w-3.5 h-3.5" />}
            title="Understanding the IELTS Exam"
            description="Learn about the different sections of the IELTS exam and how our expert coaching can help you succeed."
            className="mb-16"
          />

          <div className="space-y-4">
            {accordionData.map((item, index) => (
              <div
                key={index}
                className="accordion-item bg-white rounded-[20px] shadow-sm border border-pencil-gray/20 overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full p-6 md:p-8 flex justify-between items-center text-left transition-colors hover:bg-forest-ink/5 outline-none"
                >
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full mr-5 flex items-center justify-center font-roboto-mono text-sm transition-colors font-bold",
                        openSection === index ? "bg-highlighter-yellow text-forest-ink" : "bg-whisper-gray text-forest-ink/60"
                      )}
                    >
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-forest-ink font-inter text-lg md:text-xl">
                      {item.title}
                    </h3>
                  </div>
                  <ChevronDown className={cn("w-5 h-5 text-forest-ink/50 transition-transform duration-300 shrink-0 ml-4", openSection === index ? "rotate-180" : "rotate-0")} />
                </button>

                <AnimatePresence>
                  {openSection === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                        <div className="p-6 rounded-2xl bg-cream-paper border border-pencil-gray/10">
                          <p className="text-forest-ink/80 font-inter leading-relaxed text-[15px] md:text-[16px]">{item.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success-stories" className="py-32 border-t border-pencil-gray/10 bg-cream-paper relative overflow-hidden">
        <FloatingShape speed={0.4} float className="bottom-20 left-10 opacity-10 pointer-events-none hidden lg:block">
          <MessageSquareQuote className="w-32 h-32 text-forest-ink" strokeWidth={1} />
        </FloatingShape>
        
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <SectionHeader
            eyebrowText="Reviews"
            eyebrowIcon={<MessageSquareQuote className="w-3.5 h-3.5" />}
            title="Success Stories"
            description="Read what our students have to say about their experience and success with our IELTS preparation program."
            className="mb-16"
          />

          <div className="bg-white rounded-[24px] shadow-[var(--shadow-card)] border border-pencil-gray/20 overflow-hidden p-6 md:p-10">
            <div className="elfsight-app-d1308ecc-ede2-4180-a34d-7a3b82f32886"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
