"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ControlPanel from "@/components/generator/ControlPanel";
import Preview from "@/components/generator/Preview";
import type { ActionStyle } from "@/lib/prompts";

export default function GeneratorPage() {
  const t = useTranslations("generator");
  const [theme, setTheme] = useState("");
  const [panels, setPanels] = useState(4);
  const [action, setAction] = useState<ActionStyle>("fighting");
  const [dialogue, setDialogue] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[][]>([]);

  async function handleGenerate() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme, panels, action, dialogue }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Generation failed");
      }

      const data = await res.json();
      setImages(data.urls);
      setHistory((prev) => [data.urls, ...prev]);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Generation failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ background: "#000000", minHeight: "100vh" }}>
      {/* Hero banner */}
      <section className="relative overflow-hidden" style={{ height: "240px" }}>
        <Image
          src="/images/comics/bnb-chain-lightning.jpg"
          alt="Generator"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.75) 60%, #000000 100%)",
          }}
        />
        <div className="absolute left-0 top-0 h-1 w-full" style={{ background: "#F59E0B" }} />

        <div
          className="relative z-10 mx-auto flex h-full items-end"
          style={{ maxWidth: "960px", padding: "0 clamp(32px, 5vw, 96px) 32px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-2 flex items-center gap-3">
              <div className="h-px w-6" style={{ background: "#F59E0B" }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: "#F59E0B" }}>
                AI Powered
              </span>
            </div>
            <h1
              className="font-black uppercase leading-none tracking-tight text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {t("title")}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div
        className="mx-auto"
        style={{ maxWidth: "960px", padding: "64px clamp(32px, 5vw, 96px)" }}
      >
        <div className="generator-grid">
          {/* Left — Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ControlPanel
              theme={theme}
              setTheme={setTheme}
              panels={panels}
              setPanels={setPanels}
              action={action}
              setAction={setAction}
              dialogue={dialogue}
              setDialogue={setDialogue}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </motion.div>

          {/* Right — Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Preview
              images={images}
              isLoading={isLoading}
              onRegenerate={handleGenerate}
            />
          </motion.div>
        </div>

        {/* History */}
        {history.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-6" style={{ background: "#F59E0B" }} />
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#F59E0B" }}>
                {t("history")}
              </h3>
              <div className="h-px flex-1" style={{ background: "#1A1A1A" }} />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-3">
              {history.slice(1).map((urls, histIdx) =>
                urls.map((url, imgIdx) => (
                  <img
                    key={`${histIdx}-${imgIdx}`}
                    src={url}
                    alt={`History ${histIdx + 1}`}
                    onClick={() => setImages(urls)}
                    className="h-24 w-24 flex-shrink-0 cursor-pointer border object-cover transition-all hover:border-[#F59E0B]"
                    style={{ borderColor: "#222" }}
                  />
                ))
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
