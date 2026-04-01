"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-start overflow-hidden bg-black"
    >
      {/* Full-bleed comic art background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: imageScale }}
      >
        <Image
          src="/images/comics/bnb-vs-bear-kapow.jpg"
          alt="BNB vs Bears"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay — left side lighter so art shows, right side dark for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.92) 100%)",
          }}
        />
        {/* Bottom fade to page bg */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #000000)",
          }}
        />
      </motion.div>

      {/* Red accent bar — Marvel-style top stripe */}
      <div
        className="absolute left-0 top-0 z-10 h-1 w-full"
        style={{ background: "#F59E0B" }}
      />

      {/* Content — pushed to right */}
      <motion.div
        className="relative z-10 ml-auto w-full max-w-2xl px-8 py-32 md:px-16 lg:pr-24"
        style={{ y: contentY, opacity }}
      >
        {/* Eyebrow label */}
        <motion.div
          className="mb-6 inline-flex items-center gap-3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="h-px w-10" style={{ background: "#F59E0B" }} />
          <span
            className="text-xs font-bold uppercase tracking-[0.35em]"
            style={{ color: "#F59E0B" }}
          >
            {t("subtitle")}
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", color: "#F59E0B" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {t("title")}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-6 max-w-md text-base leading-relaxed"
          style={{ color: "#aaaaaa" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          {t("description")}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <Link href="/generator">
            <span
              className="inline-block cursor-pointer px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ background: "#F59E0B" }}
            >
              {t("cta")}
            </span>
          </Link>
          <Link href="/gallery">
            <span
              className="inline-block cursor-pointer border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 active:scale-95"
            >
              View Gallery
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-[0.4em]"
          style={{ color: "#666666" }}
        >
          {t("scroll")}
        </span>
        <motion.div
          className="h-8 w-px"
          style={{ background: "linear-gradient(to bottom, #F59E0B, transparent)" }}
          animate={{ scaleY: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
