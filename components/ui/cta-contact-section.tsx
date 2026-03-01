"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CTAContactSection() {
  const { scrollYProgress } = useScroll();
  const bannerY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section className="relative w-full overflow-hidden bg-[#020712]">
      {/* 1. Lady Justice Banner */}
      <motion.div
        style={{ y: bannerY }}
        className="relative h-[240px] w-full md:h-[400px]"
      >
        <div className="relative h-full w-full">
          <Image
            src="/images/lady-justice-footer.jpg"
            alt="Lady Justice"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_60%,rgba(34,211,238,0.15)_100%)]" />
          <div className="absolute inset-0 ring-1 ring-teal-400/20 ring-inset" />
        </div>
      </motion.div>

      {/* 2. Headline Block */}
      <div className="relative z-10 -mt-20 px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Your Legal Journey Starts Here.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70 sm:text-xl">
            Get support, guidance, and professional legal solutions all through the centralised legal-tech
            ecosystem.
          </p>
        </motion.div>

        {/* 3. Two-Column CTA Cards */}
        <div className="mx-auto mt-16 max-w-6xl">
          {/* Radial gradient background */}
          <div className="absolute inset-x-0 -z-10 h-full bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]" />

          <div className="flex justify-center">
            {/* Download CLNS App Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:scale-[1.02] hover:border-teal-400/30 hover:bg-white/8 hover:shadow-[0_20px_60px_rgba(34,211,238,0.2)]"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-white">Access CLNS On The Go</h3>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  Manage your cases, track internships, and connect with advocates from anywhere.
                </p>

                {/* App Mockup Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative mt-6 flex justify-center"
                >
                  <motion.div
                    whileHover={{ rotate: 2, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative h-48 w-32 overflow-hidden rounded-2xl border-4 border-white/20 bg-gradient-to-b from-[#03202F] to-[#061421] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                  >
                    <Image
                      src="/logo.png"
                      alt="CLNS App"
                      fill
                      className="object-contain p-6"
                    />
                  </motion.div>
                </motion.div>

                {/* Download Buttons */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.clns.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex flex-1 items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-medium text-white backdrop-blur transition-all hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                  >
                    <img src="/play-store.jpg" alt="Google Play" className="h-5 w-5 object-contain" />
                    <span>Google Play</span>
                  </a>
                  <a
                    href="https://apps.apple.com/in/app/clns-law-services-made-easy/id6741812022"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn flex flex-1 items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-medium text-white backdrop-blur transition-all hover:border-white/40 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                  >
                    <img src="/app-store.jpg" alt="App Store" className="h-5 w-5 object-contain" />
                    <span>App Store</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4. Footer Transition - Glowing Dividing Line */}
      <div className="relative px-6 pb-12">
        <div className="mx-auto max-w-6xl">
          <div className="h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.3)]" />
        </div>
      </div>
    </section>
  );
}

