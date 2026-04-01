"use client";

import { motion } from "framer-motion";

export default function InkLoading({ text = "Generating..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      {/* Morphing gradient blob */}
      <div className="relative h-24 w-24">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(${135 + i * 45}deg, #F59E0B, #8B5CF6)`,
              filter: "blur(8px)",
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: [0, 1.3, 1.8], opacity: [0.6, 0.3, 0] }}
            transition={{
              duration: 2,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
        {/* Center diamond */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rotate-45"
          style={{
            background: "linear-gradient(135deg, #F59E0B, #8B5CF6)",
          }}
          animate={{ rotate: [45, 225, 405], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Gradient line */}
      <svg width="200" height="4" viewBox="0 0 200 4" className="overflow-visible">
        <defs>
          <linearGradient id="ink-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0" y1="2" x2="200" y2="2"
          stroke="url(#ink-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <motion.p
        className="font-sans text-sm tracking-widest uppercase text-text-secondary"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  );
}
