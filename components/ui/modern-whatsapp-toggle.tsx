"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModernWhatsAppToggleProps {
  phoneNumber?: string;
  defaultMessage?: string;
  className?: string;
  variant?: "hover" | "click";
}

const DEFAULT_PHONE = "8465958825";
const DEFAULT_MESSAGE = "Hello! I'm interested in CLNS services.";

// WhatsApp Icon SVG
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export function ModernWhatsAppToggle({
  phoneNumber = DEFAULT_PHONE,
  defaultMessage = DEFAULT_MESSAGE,
  className,
  variant = "hover",
}: ModernWhatsAppToggleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleClick = () => {
    if (variant === "click") {
      if (isExpanded) {
        openWhatsApp();
        // Auto-collapse after opening WhatsApp
        setTimeout(() => setIsExpanded(false), 300);
      } else {
        setIsExpanded(true);
      }
    } else {
      // On hover variant, click always opens WhatsApp
      openWhatsApp();
    }
  };

  const handleMouseEnter = () => {
    if (variant === "hover" && !isMobile) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (variant === "hover" && !isMobile) {
      setIsExpanded(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25, duration: 0.2 }}
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "md:bottom-8 md:right-8",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.button
        onClick={handleClick}
        aria-label="Chat on WhatsApp"
        role="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "flex items-center gap-3",
          "bg-emerald-500/90 backdrop-blur-md",
          "text-white",
          "shadow-lg shadow-emerald-500/30",
          "transition-all duration-200 ease-out",
          "focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#020712]",
          isExpanded
            ? "rounded-full px-4 py-3 pr-5"
            : "rounded-full p-3"
        )}
      >
        <WhatsAppIcon className="h-6 w-6 flex-shrink-0" />
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
              className="whitespace-nowrap text-sm font-medium cursor-pointer"
            >
              Chat on WhatsApp
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

