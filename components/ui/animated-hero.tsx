"use client";

import { motion } from "framer-motion";
import { MoveRight, PhoneCall, Scale, Shield, BookOpen, Gavel, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero() {
  // Floating justice-themed icons
  const justiceIcons = [
    { Icon: Scale, delay: 0, x: 0, y: 0 },
    { Icon: Shield, delay: 0.2, x: 20, y: -30 },
    { Icon: BookOpen, delay: 0.4, x: -30, y: 20 },
    { Icon: Gavel, delay: 0.6, x: 30, y: 30 },
    { Icon: FileText, delay: 0.8, x: -20, y: -20 },
    { Icon: Users, delay: 1, x: 10, y: 40 },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: "#0B1221" }}>
      {/* Soft gradient glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20 lg:py-0">
          {/* Left Column - Text Content */}
          <div className="flex flex-col gap-8 z-10">
            <div className="hero-text-content space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
                Trusted Legal Solutions for a{" "}
                <span className="text-[#2D6CF6]">Modern Era</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
                Expert guidance. Verified advocates. Transparent pricing. CLNS brings legal support, learning, and technology together in one powerful platform.
              </p>
            </div>

            {/* Buttons */}
            <div className="hero-button-content flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="gap-3 bg-white text-[#0B1221] hover:bg-gray-100 font-semibold px-8 py-6 text-base"
              >
                Book a Free Consultation
                <PhoneCall className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-3 border-gray-700 bg-gray-900/50 text-white hover:bg-gray-800/50 hover:border-gray-600 font-semibold px-8 py-6 text-base backdrop-blur-sm"
              >
                Download the App
                <MoveRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right Column - 3D Icons */}
          <div className="relative hidden lg:flex items-center justify-center h-full min-h-[600px]">
            <div className="relative w-full h-full">
              {/* Central advocate figure representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="hero-center-icon relative z-10">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-blue-500/30 flex items-center justify-center">
                    <Scale className="w-24 h-24 text-[#2D6CF6]" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Floating justice-themed icons */}
              {justiceIcons.map(({ Icon, delay, x, y }, index) => (
                <div
                  key={index}
                  className="hero-floating-icon absolute"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                    animationDelay: `${delay * 0.1}s`,
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: delay,
                    }}
                    className="relative"
                  >
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-lg border border-blue-400/40 flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <Icon className="w-8 h-8 text-[#2D6CF6]" strokeWidth={1.5} />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl -z-10"></div>
                  </motion.div>
                </div>
              ))}

              {/* Additional floating particles/glow effects */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                  style={{
                    left: `${20 + i * 12}%`,
                    top: `${15 + (i % 3) * 25}%`,
                  }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Mobile view - Simplified icon display */}
          <div className="lg:hidden flex items-center justify-center py-12">
            <div className="relative w-full max-w-md h-64">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="hero-center-icon-mobile relative z-10">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-blue-500/30 flex items-center justify-center">
                    <Scale className="w-16 h-16 text-[#2D6CF6]" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              {justiceIcons.slice(0, 4).map(({ Icon, delay, x, y }, index) => (
                <div
                  key={index}
                  className="hero-floating-icon-mobile absolute"
                  style={{
                    left: `calc(50% + ${x * 0.5}px)`,
                    top: `calc(50% + ${y * 0.5}px)`,
                    transform: "translate(-50%, -50%)",
                    animationDelay: `${delay * 0.1}s`,
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-lg border border-blue-400/40 flex items-center justify-center"
                  >
                    <Icon className="w-6 h-6 text-[#2D6CF6]" strokeWidth={1.5} />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
