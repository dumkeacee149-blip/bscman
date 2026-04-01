"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "strong" | "iridescent";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function GlassCard({
  children,
  className = "",
  variant = "default",
  hover = false,
  padding = "none",
}: GlassCardProps) {
  const base = variant === "strong" ? "glass-strong" : "glass";
  const iridescent = variant === "iridescent" ? "iridescent-border" : "";
  const pad = paddingMap[padding];

  return (
    <motion.div
      className={`rounded-xl ${base} ${iridescent} ${pad} ${className}`}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow:
                "0 8px 40px rgba(139,92,246,0.15), 0 0 60px rgba(245,158,11,0.08)",
            }
          : undefined
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
