"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ScrollReveal from "../ui/ScrollReveal";

interface ComicCard {
  id: number;
  title: string;
  image: string;
  issue: string;
  tag: string;
}

const SHOWCASE_ITEMS: ComicCard[] = [
  {
    id: 1,
    title: "BNB vs Bears",
    image: "/images/comics/bnb-vs-bear-kapow.jpg",
    issue: "Issue #01",
    tag: "ACTION",
  },
  {
    id: 2,
    title: "Hero Stance",
    image: "/images/comics/bnb-hero-stance.jpg",
    issue: "Issue #02",
    tag: "ORIGIN",
  },
  {
    id: 3,
    title: "Chain Lightning",
    image: "/images/comics/bnb-chain-lightning.jpg",
    issue: "Issue #03",
    tag: "POWER",
  },
  {
    id: 4,
    title: "Diamond Hands",
    image: "/images/comics/bnb-diamond-hands.jpg",
    issue: "Issue #04",
    tag: "LEGEND",
  },
  {
    id: 5,
    title: "Moon Mission",
    image: "/images/comics/bnb-moon-mission.jpg",
    issue: "Issue #05",
    tag: "EPIC",
  },
  {
    id: 6,
    title: "Kill The Bears",
    image: "/images/comics/bnb-vs-bear-v1.jpg",
    issue: "Issue #06",
    tag: "BATTLE",
  },
];

export default function Showcase() {
  const t = useTranslations("showcase");
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden py-24" style={{ background: "#000000" }}>
      {/* Top divider */}
      <div className="h-px w-full" style={{ background: "#F59E0B" }} />

      <div className="mx-auto max-w-7xl px-6 pt-16">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-12 flex items-end justify-between">
            <div>
              {/* Eyebrow */}
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-8" style={{ background: "#F59E0B" }} />
                <span
                  className="text-xs font-bold uppercase tracking-[0.35em]"
                  style={{ color: "#F59E0B" }}
                >
                  Comics
                </span>
              </div>
              <h2
                className="font-black uppercase leading-none tracking-tight text-white"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                {t("title")}
              </h2>
            </div>
            <p
              className="hidden max-w-xs text-right text-sm leading-relaxed md:block"
              style={{ color: "#666666" }}
            >
              {t("subtitle")}
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Horizontal scroll track — extends beyond container for full bleed feel */}
      <div className="relative mt-2 overflow-hidden">
        {/* Left/right edge fades */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16"
          style={{ background: "linear-gradient(to right, #000000, transparent)" }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16"
          style={{ background: "linear-gradient(to left, #000000, transparent)" }}
        />

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto px-6 pb-4 pt-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {SHOWCASE_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              className="group relative flex-shrink-0 cursor-pointer overflow-hidden"
              style={{ width: 280, height: 380 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6 }}
            >
              {/* Comic art image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="280px"
              />

              {/* Tag — top-left pill */}
              <div className="absolute left-3 top-3 z-10">
                <span
                  className="px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white"
                  style={{ background: "#F59E0B" }}
                >
                  {item.tag}
                </span>
              </div>

              {/* Bottom info bar */}
              <div
                className="absolute inset-x-0 bottom-0 z-10 p-4 pt-12"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
                }}
              >
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.25em]"
                  style={{ color: "#F59E0B" }}
                >
                  {item.issue}
                </p>
                <h3 className="mt-1 text-base font-black uppercase leading-tight tracking-tight text-white">
                  {item.title}
                </h3>
              </div>

              {/* Hover red border */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ boxShadow: "inset 0 0 0 2px #F59E0B" }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="mt-16 h-px w-full" style={{ background: "#111111" }} />
    </section>
  );
}
