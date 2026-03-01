"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Briefcase,
  FileCheck,
  FolderOpen,
  GraduationCap,
  MessageCircle,
  Users,
  Shield,
  Scale,
  Rocket,
  Building2,
} from "lucide-react";
import { Footerdemo } from "@/components/ui/footer-section";

type StatConfig = {
  label: string;
  target: number;
  suffix: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const stats: StatConfig[] = [
  { label: "Users", target: 10177, suffix: "+", icon: Users },
  { label: "Consultations", target: 6675, suffix: "+", icon: MessageCircle },
  { label: "Clients Onboarded", target: 454, suffix: "+", icon: Briefcase },
  { label: "Active Cases", target: 25, suffix: "+", icon: FolderOpen },
  { label: "Live Internships", target: 16, suffix: "", icon: GraduationCap },
  { label: "Internship Applications", target: 114, suffix: "", icon: FileCheck },
];

const personas = [
  {
    title: "Clients",
    icon: Shield,
    highlights: [
      "Verified advocates",
      "₹1 consultations",
      "Transparent pricing",
      "Case updates & document vault",
      "Multi-category legal help",
    ],
    gradient: "from-teal-500/20 via-cyan-500/10 to-blue-500/20",
    borderGradient: "from-teal-400/50 via-cyan-400/30 to-blue-400/50",
  },
  {
    title: "Students",
    icon: GraduationCap,
    highlights: [
      "Internship tracking",
      "Real case exposure",
      "Mentorship & workshops",
      "Learning dashboard",
      "Community access",
    ],
    gradient: "from-sky-500/20 via-blue-500/10 to-indigo-500/20",
    borderGradient: "from-sky-400/50 via-blue-400/30 to-indigo-400/50",
  },
  {
    title: "Advocates",
    icon: Scale,
    highlights: [
      "Lead generation",
      "Digital case management",
      "Paperless workflow",
      "Client communication tools",
      "Legal marketplace visibility",
    ],
    gradient: "from-cyan-500/20 via-teal-500/10 to-emerald-500/20",
    borderGradient: "from-cyan-400/50 via-teal-400/30 to-emerald-400/50",
  },
  {
    title: "Startups",
    icon: Rocket,
    highlights: [
      "Fast registration support",
      "Compliance documentation",
      "Government benefits access",
      "Early-stage legal guidance",
      "Startup-friendly pricing",
    ],
    gradient: "from-purple-500/20 via-pink-500/10 to-rose-500/20",
    borderGradient: "from-purple-400/50 via-pink-400/30 to-rose-400/50",
  },
  {
    title: "MSME",
    icon: Building2,
    highlights: [
      "MSME registration",
      "Compliance assistance",
      "Certificate handling",
      "Subsidies & credit support",
      "Ongoing advisory services",
    ],
    gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    borderGradient: "from-orange-400/50 via-amber-400/30 to-yellow-400/50",
  },
];

// Optimized animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
};

const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
};

const transitionFast = {
  duration: 0.2,
  ease: [0, 0, 0.2, 1] as const, // ease-out, optimized
};

const transitionMedium = {
  duration: 0.25,
  ease: [0, 0, 0.2, 1] as const, // ease-out, optimized
};

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

export default function AboutPage() {
  const containerRef = useMemo(() => ({ current: null }), []);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <main className="relative min-h-screen bg-[#020712] text-white">
      {/* 1. HERO SECTION - Optimized */}
      <section className="relative isolate flex min-h-[90vh] items-center justify-center px-6 py-32">
        {/* Animated Gradient Background - Optimized */}
        <motion.div
          style={{ y: backgroundY, willChange: "transform" }}
          className="absolute inset-0 bg-gradient-to-b from-teal-950/30 via-navy-950/40 to-black transform-gpu"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.2),transparent_70%)] blur-[140px] transform-gpu" />
        
        {/* Shimmer Effect - Optimized */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ willChange: "background-position" }}
          className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(34,211,238,0.1)_50%,transparent_100%)] bg-[length:200%_100%] opacity-60 transform-gpu"
        />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
          <motion.h1
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ ...transitionMedium, delay: 0.1 }}
            className="text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Centralised Legal-Tech Ecosystem
          </motion.h1>

          {/* Neon Accent Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ ...transitionMedium, delay: 0.3 }}
            className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.6)] transform-gpu"
          />

          <motion.p
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ ...transitionMedium, delay: 0.2 }}
            className="mt-10 max-w-3xl text-lg leading-relaxed text-white/80 sm:text-xl"
          >
            CLNS unifies clients, students, and advocates into a single digital operating system making legal access
            simple, fast, and transparent for everyone.
          </motion.p>
        </div>
      </section>

      {/* 2. ABOUT TEXT SECTION - Optimized */}
      <section className="relative px-6 py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#041424] via-[#020916] to-[#010207]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,204,0.15),transparent_65%)]" />
        
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-16 lg:flex-row lg:items-start">
          {/* Left: Text Content */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideInLeft}
            transition={transitionMedium}
            style={{ willChange: "transform, opacity" }}
            className="flex-1 space-y-8 transform-gpu"
          >
            {/* About CLNS Label */}
            <motion.p
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ ...transitionFast, delay: 0.1 }}
              className="text-xs uppercase tracking-[0.4em] text-teal-200"
            >
              ABOUT CLNS
            </motion.p>

            <motion.h2
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ ...transitionFast, delay: 0.2 }}
              className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              A New Era of Legal Access
            </motion.h2>

            <div className="space-y-5 text-base leading-relaxed text-white/80">
              <motion.p
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ ...transitionFast, delay: 0.3 }}
              >
                CLNS is the first unified{" "}
                <span className="text-teal-300 font-semibold">legal-tech ecosystem</span> connecting clients, students, and advocates through a single digital platform that brings legal help, learning, and case management into one modern workflow.
              </motion.p>
              
              <motion.p
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ ...transitionFast, delay: 0.4 }}
              >
                We eliminate the fear, confusion, and high cost of legal processes by blending technology with{" "}
                <span className="text-teal-300 font-semibold">verified advocates</span> and real-world learning making legal access transparent, fast, and empowering for everyone.
              </motion.p>
              
              <motion.p
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ ...transitionFast, delay: 0.5 }}
              >
                From{" "}
                <span className="text-teal-300 font-semibold">₹1 consultations</span> to live case exposure and digital practice tools, CLNS is building the future of the legal support system accessible to anyone, anywhere.
              </motion.p>
            </div>
          </motion.div>

          {/* Right: Unified Justice Grid - Optimized */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideInRight}
            transition={{ ...transitionMedium, delay: 0.2 }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-1 justify-center lg:sticky lg:top-24 transform-gpu"
          >
            <div className="group relative w-full max-w-md rounded-[36px] border border-white/10 bg-white/5 p-10 shadow-[0_50px_120px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-200 ease-out hover:-translate-y-1 hover:border-teal-400/30 hover:shadow-[0_60px_150px_rgba(34,211,238,0.25)] transform-gpu" style={{ backfaceVisibility: "hidden" }}>
              {/* Gradient Border */}
              <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-teal-500/20 via-cyan-500/10 to-blue-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
              
              {/* Internal Grid Pattern */}
              <div className="absolute inset-[24px] rounded-[30px] border border-white/10 opacity-30" />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(60deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px]" />
              
              {/* Ambient Shadow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-teal-500/10 via-transparent to-blue-500/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.5em] text-white/60">
                  {/* Pulsing Status Dot - Optimized */}
                  <motion.span
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ willChange: "transform, opacity" }}
                    className="inline-flex h-2.5 w-2.5 rounded-full bg-teal-300 shadow-[0_0_12px_rgba(34,211,238,0.8)] transform-gpu"
                  />
                  Unified Justice Grid
                </div>
                
                <p className="mt-6 text-lg leading-relaxed text-white/85">
                  Real-time case tracking, ₹1 consults, and digital practice tools in one connected system.
                </p>
                
                <div className="mt-10 grid grid-cols-2 gap-6 text-sm">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-3xl font-bold text-white">24/7</p>
                    <p className="mt-2 text-white/70">Platform Availability</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <p className="text-3xl font-bold text-white">100%</p>
                    <p className="mt-2 text-white/70">Case Transparency</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* 4. PLATFORM PERSONA BLOCKS - Optimized */}
      <section className="relative px-4 py-32 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-[#040c18] via-[#030914] to-[#010205]" />
        <div className="relative z-10 mx-auto max-w-[1600px]">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={transitionMedium}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">The CLNS Ecosystem</h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/75 max-w-2xl mx-auto">One platform. Five personas. Endless possibilities.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-6 xl:gap-8 items-stretch">
            {personas.map((persona, index) => (
              <PersonaCard key={persona.title} persona={persona} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. MISSION STATEMENT - Optimized */}
      <section className="relative px-6 py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#02050b] via-[#02060e] to-[#000]" />
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={transitionMedium}
          style={{ willChange: "transform, opacity" }}
          className="relative z-10 mx-auto flex max-w-5xl flex-col items-center rounded-[40px] border border-white/10 bg-black/30 p-16 text-center shadow-[0_50px_150px_rgba(0,0,0,0.6)] backdrop-blur-xl transform-gpu"
        >
          <h2 className="text-4xl font-bold leading-tight text-transparent sm:text-5xl bg-gradient-to-r from-teal-300 via-sky-400 to-blue-400 bg-clip-text">
            Legal access should be fast, transparent, and affordable for everyone.
          </h2>
          <p className="mt-8 text-xl text-white/80">
            That's why CLNS exists to redefine how people interact with the law.
          </p>
        </motion.div>
      </section>

      {/* 6. CTA SECTION - Optimized */}
      <section className="relative px-6 py-32">
        <div className="absolute inset-0 bg-[#010307]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.25),transparent_70%)] blur-[120px]" />
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={transitionMedium}
          className="relative z-10 mx-auto max-w-4xl text-center"
        >
          <h2 className="text-4xl font-bold text-white sm:text-5xl">Access CLNS Anywhere</h2>
          <p className="mt-6 text-lg text-white/75">
            Manage cases, connect with advocates, and track progress all in one app.
          </p>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={transitionFast}
              href="https://play.google.com/store/apps/details?id=com.clns.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-3xl border border-white/15 bg-white/5 px-8 py-5 text-left text-white/85 shadow-[0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur transition hover:border-white/40 transform-gpu"
              style={{ willChange: "transform" } as React.CSSProperties}
            >
              <img src="/play-store.jpg" alt="Google Play" className="h-14 w-14 rounded-2xl object-contain" width={56} height={56} />
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Get it on</p>
                <p className="text-lg font-semibold text-white">Google Play</p>
              </div>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={transitionFast}
              href="https://apps.apple.com/in/app/clns-law-services-made-easy/id6741812022"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-3xl border border-white/15 bg-white/5 px-8 py-5 text-left text-white/85 shadow-[0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur transition hover:border-white/40 transform-gpu"
              style={{ willChange: "transform" } as React.CSSProperties}
            >
              <img src="/app-store.jpg" alt="App Store" className="h-14 w-14 rounded-2xl object-contain" width={56} height={56} />
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Download on the</p>
                <p className="text-lg font-semibold text-white">App Store</p>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* 7. JUSTICE IMAGE - Optimized */}
      <section className="relative h-[460px] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#010409]/70 to-[#000]/90 z-10" />
        <Image
          src="/images/lady-justice-footer.jpg"
          alt="Lady Justice"
          fill
          className="object-cover object-center transform-gpu"
          priority={false}
          sizes="100vw"
        />
      </section>

      <Footerdemo />
    </main>
  );
}

function StatCard({ stat, index }: { stat: StatConfig; index: number }) {
  const value = useCountUp(stat.target);
  const Icon = stat.icon;

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
      transition={{ ...transitionFast, delay: index * 0.05 }}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
      className="group relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-left shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all hover:border-teal-400/30 hover:shadow-[0_40px_120px_rgba(34,211,238,0.2)] transform-gpu"
    >
      {/* Glass Gradient Overlay */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/2 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      
      {/* Gradient Border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/20 via-cyan-500/10 to-blue-500/20 opacity-0 transition-opacity group-hover:opacity-100" />

      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={transitionFast}
        style={{ willChange: "transform" }}
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-teal-200 transition-all group-hover:border-teal-400/30 group-hover:bg-teal-500/10 transform-gpu"
      >
        <Icon className="h-6 w-6" />
      </motion.div>
      
      <div className="relative z-10">
        <p className="text-4xl font-bold text-white">
          {value.toLocaleString()}
          {stat.suffix}
        </p>
        <p className="mt-3 text-sm uppercase tracking-[0.35em] text-white/60">{stat.label}</p>
      </div>
    </motion.div>
  );
}

function PersonaCard({
  persona,
  index,
}: {
  persona: (typeof personas)[0];
  index: number;
}) {
  const Icon = persona.icon;

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeInUp}
      transition={{ ...transitionFast, delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.02 }}
      style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
      className="group relative flex flex-col h-full rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 lg:p-6 xl:p-8 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-200 ease-out hover:border-teal-400/40 hover:shadow-[0_60px_150px_rgba(34,211,238,0.3)] transform-gpu"
    >
      {/* Moving Gradient Background - Optimized */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "background-position" }}
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${persona.gradient} bg-[length:200%_200%] opacity-70 transform-gpu`}
      />

      {/* Gradient Border */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${persona.borderGradient} opacity-0 transition-opacity group-hover:opacity-100`} />

      {/* Background Particles */}
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.02)_1px,transparent_1px),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:60px_60px]" />

      {/* Ambient Glow */}
      <div className="absolute -inset-4 bg-gradient-to-br from-teal-500/10 via-transparent to-blue-500/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100 rounded-3xl" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Section */}
        <div className="mb-6 flex items-center gap-3 sm:gap-4">
          <div className="flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 p-2.5 sm:p-3 backdrop-blur transition-all group-hover:border-teal-400/30 group-hover:bg-teal-500/10">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-teal-300" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">{persona.title}</h3>
        </div>
        
        {/* Features List */}
        <div className="flex-1 space-y-3 sm:space-y-4">
          {persona.highlights.map((item, idx) => (
            <motion.div
              key={item}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={slideInLeft}
              transition={{ ...transitionFast, delay: index * 0.08 + idx * 0.03 }}
              style={{ willChange: "transform, opacity" }}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm backdrop-blur transform-gpu transition-all group-hover:border-white/20"
            >
              <motion.span
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.15,
                }}
                style={{ willChange: "transform, opacity" }}
                className="flex-shrink-0 mt-0.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-teal-300 shadow-[0_0_8px_rgba(34,211,238,0.6)] transform-gpu"
              />
              <span className="text-white/85 leading-relaxed">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
