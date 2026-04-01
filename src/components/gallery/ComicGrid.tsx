"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* ── Types ── */

interface StoryPanel {
  image: string;
  caption?: string;
  dialogue?: { text: string; position: "top-left" | "top-right" | "bottom-left" | "bottom-right" };
  sfx?: { text: string; color: string; rotation: number; top?: string; bottom?: string; left?: string; right?: string };
}

interface ComicStory {
  id: string;
  title: string;
  cover: string;
  description: string;
  panels: StoryPanel[];
}

/* ── Story data ── */

const COMICS: ComicStory[] = [
  {
    id: "1",
    title: "BNB vs The Bears",
    cover: "/images/comics/bnb-vs-bear-kapow.jpg",
    description: "Issue #01 — The legendary battle",
    panels: [
      {
        image: "/images/comics/bnb-hero-stance.jpg",
        caption: "BSC City. The bears have taken over the market...",
        dialogue: { text: "They think they've won. Not today.", position: "bottom-right" },
      },
      {
        image: "/images/comics/bnb-vs-bear-v1.jpg",
        caption: "The biggest bear charges forward!",
        sfx: { text: "GRRRR!", color: "#EF4444", rotation: -5, top: "8%", left: "5%" },
        dialogue: { text: "You dare challenge the chain?!", position: "bottom-left" },
      },
      {
        image: "/images/comics/bnb-vs-bear-kapow.jpg",
        sfx: { text: "KA-POW!", color: "#F59E0B", rotation: -8, top: "10%", right: "8%" },
        caption: "One punch. That's all it takes.",
        dialogue: { text: "I AM the blockchain.", position: "top-left" },
      },
    ],
  },
  {
    id: "2",
    title: "Diamond Hands",
    cover: "/images/comics/bnb-diamond-hands.jpg",
    description: "Issue #02 — Hold the line",
    panels: [
      {
        image: "/images/comics/bnb-chain-lightning.jpg",
        caption: "The FUD was everywhere. Paper hands were selling...",
        dialogue: { text: "Everyone is running. But not me.", position: "bottom-right" },
      },
      {
        image: "/images/comics/bnb-hero-stance.jpg",
        caption: "Something was changing inside him...",
        sfx: { text: "CRYSTALLIZE!", color: "#60A5FA", rotation: 3, bottom: "12%", right: "5%" },
        dialogue: { text: "My hands... they feel different.", position: "top-left" },
      },
      {
        image: "/images/comics/bnb-diamond-hands.jpg",
        sfx: { text: "DIAMOND!", color: "#F59E0B", rotation: -6, top: "8%", left: "5%" },
        caption: "Diamond hands activated. The FUD could not touch him.",
        dialogue: { text: "I. WILL. NEVER. SELL.", position: "top-right" },
      },
    ],
  },
  {
    id: "3",
    title: "Chain Lightning",
    cover: "/images/comics/bnb-chain-lightning.jpg",
    description: "Issue #03 — Speed of light",
    panels: [
      {
        image: "/images/comics/bnb-hero-stance.jpg",
        caption: "Block #999,999. The validators are under attack.",
        dialogue: { text: "The network needs me. NOW.", position: "bottom-left" },
      },
      {
        image: "/images/comics/bnb-chain-lightning.jpg",
        sfx: { text: "ZZZAP!", color: "#A78BFA", rotation: -4, top: "10%", right: "5%" },
        caption: "Pure blockchain energy surges through every node.",
        dialogue: { text: "Feel the power of BSC!", position: "top-left" },
      },
      {
        image: "/images/comics/bnb-vs-bear-kapow.jpg",
        sfx: { text: "BOOM!", color: "#F59E0B", rotation: 8, top: "8%", left: "8%" },
        caption: "The attackers never stood a chance.",
      },
    ],
  },
  {
    id: "4",
    title: "Moon Mission",
    cover: "/images/comics/bnb-moon-mission.jpg",
    description: "Issue #04 — Destination: Moon",
    panels: [
      {
        image: "/images/comics/bnb-diamond-hands.jpg",
        caption: "All resistances broken. The path is clear.",
        dialogue: { text: "It's time. Prepare for liftoff.", position: "bottom-right" },
      },
      {
        image: "/images/comics/bnb-chain-lightning.jpg",
        sfx: { text: "SURGE!", color: "#34D399", rotation: 5, bottom: "10%", left: "8%" },
        caption: "Every validator syncs. Maximum power.",
      },
      {
        image: "/images/comics/bnb-moon-mission.jpg",
        sfx: { text: "TO THE MOON!", color: "#F59E0B", rotation: -3, top: "10%", right: "5%" },
        caption: "Beyond the clouds. Beyond the FUD. Beyond everything.",
        dialogue: { text: "Nothing can stop us now!", position: "top-left" },
      },
    ],
  },
  {
    id: "5",
    title: "Kill The Bears",
    cover: "/images/comics/bnb-vs-bear-v1.jpg",
    description: "Issue #05 — No mercy",
    panels: [
      {
        image: "/images/comics/bnb-vs-bear-v1.jpg",
        caption: "They came back. Bigger. Angrier.",
        dialogue: { text: "Round two, hero?", position: "top-right" },
        sfx: { text: "ROAR!", color: "#EF4444", rotation: -8, top: "5%", left: "5%" },
      },
      {
        image: "/images/comics/bnb-hero-stance.jpg",
        caption: "But he was ready this time.",
        dialogue: { text: "I've been waiting for this.", position: "bottom-left" },
      },
      {
        image: "/images/comics/bnb-vs-bear-kapow.jpg",
        sfx: { text: "WHAM!", color: "#F59E0B", rotation: 6, top: "8%", right: "5%" },
        caption: "Bear market? What bear market?",
        dialogue: { text: "Stay. Down.", position: "top-left" },
      },
    ],
  },
  {
    id: "6",
    title: "Hero Stance",
    cover: "/images/comics/bnb-hero-stance.jpg",
    description: "Issue #06 — The unstoppable guardian",
    panels: [
      {
        image: "/images/comics/bnb-chain-lightning.jpg",
        caption: "The city was quiet. Too quiet.",
        sfx: { text: "CRACKLE!", color: "#A78BFA", rotation: -3, top: "10%", left: "8%" },
      },
      {
        image: "/images/comics/bnb-diamond-hands.jpg",
        caption: "He stood alone. He always did.",
        dialogue: { text: "This chain doesn't break.", position: "top-right" },
      },
      {
        image: "/images/comics/bnb-hero-stance.jpg",
        caption: "The guardian of BSC. Now and forever.",
        dialogue: { text: "I am BSCMAN.", position: "bottom-right" },
        sfx: { text: "LEGEND!", color: "#F59E0B", rotation: -5, top: "8%", left: "10%" },
      },
    ],
  },
];

/* ── Speech Bubble ── */

function SpeechBubble({ text, position }: { text: string; position: string }) {
  const posMap: Record<string, React.CSSProperties> = {
    "top-left": { top: 10, left: 10 },
    "top-right": { top: 10, right: 10 },
    "bottom-left": { bottom: 14, left: 10 },
    "bottom-right": { bottom: 14, right: 10 },
  };
  const tailSide = position.includes("left") ? "left" : "right";

  return (
    <div style={{ position: "absolute", ...posMap[position], maxWidth: "60%", zIndex: 10 }}>
      <div style={{ position: "relative", background: "#FFF", borderRadius: "14px", padding: "7px 12px", border: "2.5px solid #000" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 800, lineHeight: 1.4, color: "#000", textTransform: "uppercase", letterSpacing: "0.01em" }}>
          {text}
        </p>
        <div style={{ position: "absolute", bottom: -8, [tailSide]: 16, width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "8px solid #000" }} />
        <div style={{ position: "absolute", bottom: -5, [tailSide]: 17, width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid #FFF" }} />
      </div>
    </div>
  );
}

/* ── Cover Card ── */

function CoverCard({ comic, index, onSelect }: { comic: ComicStory; index: number; onSelect: (id: string) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <div
        onClick={() => onSelect(comic.id)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: "relative", cursor: "pointer", overflow: "hidden", backgroundColor: "#111", aspectRatio: "2/3" }}
      >
        <Image
          src={comic.cover}
          alt={comic.title}
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
          style={{ objectFit: "cover", transition: "transform 0.4s ease", transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />

        {/* Default overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 70%)",
            display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "20px 16px 16px",
            transition: "opacity 0.3s", opacity: hovered ? 0 : 1,
          }}
        >
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#F59E0B", marginBottom: "4px" }}>
            {comic.description}
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, textTransform: "uppercase", color: "#FFF", lineHeight: 1.2 }}>
            {comic.title}
          </span>
        </div>

        {/* Hover overlay */}
        <div
          style={{
            position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.75)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px",
            transition: "opacity 0.3s", opacity: hovered ? 1 : 0,
          }}
        >
          <span style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, textTransform: "uppercase", color: "#FFF", textAlign: "center", padding: "0 16px" }}>
            {comic.title}
          </span>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#FFF", border: "1px solid #F59E0B", padding: "6px 20px" }}>
            READ STORY
          </span>
        </div>

        {/* Gold top bar on hover */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", backgroundColor: "#F59E0B", transition: "transform 0.3s", transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left" }} />
      </div>
    </motion.div>
  );
}

/* ── Story Reader (Modal) ── */

function StoryReader({ comic, onClose }: { comic: ComicStory; onClose: () => void }) {
  const [panelIndex, setPanelIndex] = useState(0);
  const panel = comic.panels[panelIndex];
  const isFirst = panelIndex === 0;
  const isLast = panelIndex === comic.panels.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.95)", padding: "16px" }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", width: "100%", maxWidth: "720px", display: "flex", flexDirection: "column", gap: "0" }}
      >
        {/* Title bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#F59E0B" }}>
              {comic.description}
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 900, textTransform: "uppercase", color: "#FFF" }}>
              {comic.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: "transparent", border: "1px solid #333", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", cursor: "pointer" }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Panel view */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden", border: "3px solid #222", background: "#000" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={panelIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              style={{ position: "absolute", inset: 0 }}
            >
              <Image
                src={panel.image}
                alt={comic.title}
                fill
                className="object-cover"
                sizes="720px"
              />

              {/* Caption */}
              {panel.caption && (
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10 }}>
                  <div style={{ background: "#F59E0B", padding: "6px 14px", margin: "10px 12px", maxWidth: "75%", display: "inline-block" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, fontStyle: "italic", lineHeight: 1.5, color: "#000" }}>
                      {panel.caption}
                    </p>
                  </div>
                </div>
              )}

              {/* Dialogue */}
              {panel.dialogue && <SpeechBubble text={panel.dialogue.text} position={panel.dialogue.position} />}

              {/* SFX */}
              {panel.sfx && (
                <div
                  style={{
                    position: "absolute", zIndex: 10,
                    ...(panel.sfx.top != null && { top: panel.sfx.top }),
                    ...(panel.sfx.bottom != null && { bottom: panel.sfx.bottom }),
                    ...(panel.sfx.left != null && { left: panel.sfx.left }),
                    ...(panel.sfx.right != null && { right: panel.sfx.right }),
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, fontStyle: "italic",
                      color: panel.sfx.color, textTransform: "uppercase", transform: `rotate(${panel.sfx.rotation}deg)`, display: "inline-block",
                      textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000", lineHeight: 1,
                    }}
                  >
                    {panel.sfx.text}
                  </span>
                </div>
              )}

              {/* Panel number indicator */}
              <div style={{ position: "absolute", top: 10, left: 12, zIndex: 10 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", color: "#F59E0B", background: "rgba(0,0,0,0.7)", padding: "3px 8px" }}>
                  PANEL {panelIndex + 1} / {comic.panels.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows inside panel */}
          {!isFirst && (
            <button
              onClick={() => setPanelIndex((p) => p - 1)}
              style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", zIndex: 20, background: "rgba(0,0,0,0.6)", border: "1px solid #444", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", cursor: "pointer" }}
            >
              <ChevronLeft size={18} />
            </button>
          )}
          {!isLast && (
            <button
              onClick={() => setPanelIndex((p) => p + 1)}
              style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", zIndex: 20, background: "rgba(0,0,0,0.6)", border: "1px solid #444", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", cursor: "pointer" }}
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>

        {/* Panel thumbnails */}
        <div style={{ display: "flex", gap: "4px", marginTop: "8px" }}>
          {comic.panels.map((p, i) => (
            <button
              key={i}
              onClick={() => setPanelIndex(i)}
              style={{
                flex: 1, position: "relative", aspectRatio: "16/10", overflow: "hidden", cursor: "pointer",
                border: `2px solid ${i === panelIndex ? "#F59E0B" : "#333"}`,
                opacity: i === panelIndex ? 1 : 0.5,
                transition: "all 0.2s",
              }}
            >
              <Image src={p.image} alt={`Panel ${i + 1}`} fill className="object-cover" sizes="200px" />
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Grid ── */

export default function ComicGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedComic = COMICS.find((c) => c.id === selectedId);

  return (
    <>
      <div className="grid grid-cols-1 gap-[2px] sm:grid-cols-2 lg:grid-cols-3">
        {COMICS.map((comic, i) => (
          <CoverCard key={comic.id} comic={comic} index={i} onSelect={setSelectedId} />
        ))}
      </div>

      <AnimatePresence>
        {selectedComic && (
          <StoryReader comic={selectedComic} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
