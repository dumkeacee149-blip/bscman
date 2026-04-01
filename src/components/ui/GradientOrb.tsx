"use client";

import { useEffect, useRef, useState } from "react";

interface GradientOrbProps {
  className?: string;
  size?: number;
  color?: "gold" | "violet" | "mixed";
  intensity?: number;
  follow?: boolean;
}

const gradients = {
  gold: "radial-gradient(circle, #F59E0B, #D97706, transparent 70%)",
  violet: "radial-gradient(circle, #8B5CF6, #7C3AED, transparent 70%)",
  mixed: "radial-gradient(circle, #F59E0B, #8B5CF6, transparent 70%)",
};

export default function GradientOrb({
  className = "",
  size = 400,
  color = "mixed",
  intensity = 0.15,
  follow = false,
}: GradientOrbProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!follow || !ref.current) return;

    const el = ref.current;
    el.style.left = `${window.innerWidth / 2}px`;
    el.style.top = `${window.innerHeight / 2}px`;

    const handler = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [follow]);

  // Don't render follow orbs on server
  if (follow && !mounted) return null;

  return (
    <div
      ref={ref}
      className={`pointer-events-none fixed z-0 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: gradients[color],
        opacity: intensity,
        filter: `blur(${size * 0.3}px)`,
        borderRadius: "50%",
        ...(follow
          ? { transform: "translate(-50%, -50%)", transition: "left 0.3s ease-out, top 0.3s ease-out" }
          : {}),
      }}
    />
  );
}
