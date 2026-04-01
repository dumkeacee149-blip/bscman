"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  mode?: "word" | "char";
  stagger?: number;
  once?: boolean;
}

export default function TextReveal({
  children,
  className = "",
  mode = "word",
  stagger = 0.03,
  once = true,
}: TextRevealProps) {
  const units = mode === "word" ? children.split(" ") : children.split("");

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
    >
      {units.map((unit, i) => (
        <motion.span key={i} variants={child} className="inline-block">
          {unit}
          {mode === "word" && i < units.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
