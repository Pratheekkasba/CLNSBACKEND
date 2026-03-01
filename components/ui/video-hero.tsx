"use client";

import { useRef, useEffect, useState, useCallback, memo } from "react";
import Image from "next/image";

const HERO_VIDEO_SRC =
  "/video-hero/motion2Fast_Ultrarealistic_cinematic_video_of_a_modern_Indian__0.mp4";
const HERO_POSTER_SRC = "/video-hero/CLNS-removebg-preview123.png";

const StateEmblem = memo(function StateEmblem() {
  return (
    <div 
      className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 md:h-20 md:w-20 items-center justify-center rounded-full border border-[#f5c351]/40 bg-[#f5c351]/10 shadow-[0_0_35px_rgba(245,195,81,0.45)]"
      style={{ willChange: "transform" }}
    >
      <svg viewBox="0 0 64 64" className="h-10 w-10 sm:h-12 sm:w-12 md:h-12 md:w-12 text-[#f5c351]" fill="currentColor" aria-hidden="true">
        <path d="M28 10h8l4 12v12h-4v12l4 6h-16l4-6V34h-4V22l4-12z" opacity="0.85" />
        <path d="M22 22h20" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M20 46h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
});

// CSS-based animations for better performance (no JS overhead)
const heroStyles = `
  @keyframes heroFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes heroSlideUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .hero-container {
    animation: heroFadeIn 0.15s ease-out forwards;
  }
  .hero-item-1 {
    animation: heroSlideUp 0.15s ease-out 0.02s forwards;
    opacity: 0;
  }
  .hero-item-2 {
    animation: heroSlideUp 0.15s ease-out 0.06s forwards;
    opacity: 0;
  }
  .hero-item-3 {
    animation: heroSlideUp 0.15s ease-out 0.1s forwards;
    opacity: 0;
  }
  .hero-item-4 {
    animation: heroSlideUp 0.15s ease-out 0.14s forwards;
    opacity: 0;
  }
`;

export function VideoHero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showPoster, setShowPoster] = useState(true);

  useEffect(() => {
    // Load video immediately - hero is always visible
    setShouldLoadVideo(true);
  }, []);

  const handleVideoReady = useCallback(() => {
    setVideoLoaded(true);
    // Faster transition
    requestAnimationFrame(() => {
      setTimeout(() => setShowPoster(false), 50);
    });
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoLoaded(false);
    setShowPoster(true);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: heroStyles }} />
      <section
        ref={heroRef}
        className="relative isolate flex min-h-[100vh] md:min-h-[92vh] w-full items-center justify-center overflow-hidden text-white"
        style={{
          background: 'linear-gradient(180deg, #020817 0%, #051423 30%, #0a1f3a 60%, #051423 100%)',
        }}
      >
      {showPoster && (
        <div className="absolute inset-0 flex items-end justify-center bg-black/30 md:bg-black/70 pb-32 md:pb-0 md:items-center">
          <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-full md:h-full">
            <Image
              src={HERO_POSTER_SRC}
              alt="CLNS loading graphic"
              fill
              priority
              sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 100vw"
              className="object-contain opacity-30 md:opacity-100"
              quality={80}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      )}
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={handleVideoReady}
          onCanPlay={handleVideoReady}
          onError={handleVideoError}
          style={{ 
            opacity: videoLoaded ? 1 : 0, 
            transition: "opacity 0.15s ease-out",
            willChange: videoLoaded ? "auto" : "opacity"
          }}
        />
      )}
      {/* Optimized: Reduced gradient overlays for better performance */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(37,99,235,0.25),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent_0%,rgba(2,8,23,0.8)_100%)] pointer-events-none" />

      <div className="hero-container relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-3 sm:gap-4 md:gap-6 px-4 py-12 sm:py-16 md:py-24 text-center sm:px-6 lg:px-8">
        <div className="hero-item-1">
          <StateEmblem />
        </div>
        <p className="hero-item-2 text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/70 px-2">
          A next-generation legal ecosystem.
        </p>

        <div className="hero-item-3 space-y-3 sm:space-y-4 md:space-y-6">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold leading-tight tracking-tight px-2"
            style={{ textShadow: "0px 2px 16px rgba(0,0,0,0.4)" }}
          >
            Centralised Legal Network Solutions
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/85 px-2 max-w-2xl mx-auto"
            style={{ textShadow: "0px 2px 12px rgba(0,0,0,0.35)" }}
          >
            Fast, transparent, tech-enabled legal services for clients, students & advocates & officials.
          </p>
        </div>
        
        <div className="hero-item-4 mt-4 sm:mt-6 flex w-full justify-center px-4">
          <a
            href="https://calendly.com/clns-legal/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-4 text-sm sm:text-base font-semibold text-white shadow-[0_20px_50px_rgba(37,99,235,0.5)] transition-all duration-200 ease-out hover:brightness-110 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-[#020817] w-full sm:w-auto"
            aria-label="Schedule a meet with CLNS"
          >
            Schedule a Meet
          </a>
        </div>
      </div>
    </section>
    </>
  );
}


