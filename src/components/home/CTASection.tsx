"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "../ui/ScrollReveal";

export default function CTASection() {
  const t = useTranslations("cta");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Top red accent line */}
      <div className="h-px w-full" style={{ background: "#F59E0B" }} />

      <div className="relative mx-auto flex max-w-7xl flex-col items-stretch md:flex-row">
        {/* Left: comic art panel — takes up roughly half on desktop */}
        <div className="relative h-64 w-full overflow-hidden md:w-1/2" style={{ minHeight: "360px" }}>
          <motion.div className="absolute inset-0" style={{ y: imageY }}>
            <Image
              src="/images/comics/bnb-hero-stance.jpg"
              alt="BNB Hero"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          {/* Right-side fade into dark bg */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, transparent 40%, #000000 100%)",
            }}
          />
          {/* Bottom fade for mobile */}
          <div
            className="absolute inset-0 md:hidden"
            style={{
              background:
                "linear-gradient(to bottom, transparent 50%, #000000 100%)",
            }}
          />
        </div>

        {/* Right: text content */}
        <div className="relative z-10 flex w-full flex-col justify-center px-8 py-16 md:w-1/2 md:px-16">
          {/* Eyebrow */}
          <ScrollReveal>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "#F59E0B" }} />
              <span
                className="text-xs font-bold uppercase tracking-[0.35em]"
                style={{ color: "#F59E0B" }}
              >
                Create Now
              </span>
            </div>
          </ScrollReveal>

          {/* Heading */}
          <ScrollReveal delay={0.1}>
            <h2
              className="font-black uppercase leading-none tracking-tight text-white"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              {t("title")}
            </h2>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal delay={0.2}>
            <p
              className="mt-6 max-w-sm text-base leading-relaxed"
              style={{ color: "#888888" }}
            >
              {t("description")}
            </p>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.35}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/generator">
                <span
                  className="inline-block cursor-pointer px-10 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-all duration-200 hover:brightness-110 active:scale-95"
                  style={{ background: "#F59E0B" }}
                >
                  {t("button")}
                </span>
              </Link>

              {/* Stat callouts */}
              <div className="flex items-center gap-6 pl-2">
                <div>
                  <p className="text-2xl font-black leading-none text-white">AI</p>
                  <p
                    className="mt-0.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "#666666" }}
                  >
                    Powered
                  </p>
                </div>
                <div
                  className="h-8 w-px"
                  style={{ background: "#222222" }}
                />
                <div>
                  <p className="text-2xl font-black leading-none text-white">Free</p>
                  <p
                    className="mt-0.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ color: "#666666" }}
                  >
                    Forever
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Bottom red accent line */}
      <div className="h-px w-full" style={{ background: "#F59E0B" }} />
    </section>
  );
}
