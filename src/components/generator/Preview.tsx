"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Download, RefreshCw } from "lucide-react";
import InkLoading from "../ui/InkLoading";

interface PreviewProps {
  images: string[];
  isLoading: boolean;
  onRegenerate: () => void;
}

export default function Preview({ images, isLoading, onRegenerate }: PreviewProps) {
  const t = useTranslations("generator");

  async function handleDownload(url: string, index: number) {
    const res = await fetch(url);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `bnb-comic-${index + 1}.png`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div
      className="flex min-h-[480px] flex-col items-center justify-center border"
      style={{ borderColor: "#1A1A1A", background: "#050505" }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <InkLoading text={t("generating")} />
          </motion.div>
        ) : images.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex w-full flex-col gap-0"
          >
            {images.map((url, i) => (
              <div key={i} className="group relative overflow-hidden">
                <img src={url} alt={`Panel ${i + 1}`} className="w-full" />
                <div
                  className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ background: "rgba(0,0,0,0.5)" }}
                />
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => handleDownload(url, i)}
                    className="flex cursor-pointer items-center gap-1.5 border px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors"
                    style={{ borderColor: "#F59E0B", background: "rgba(0,0,0,0.8)", color: "#F59E0B" }}
                    onMouseEnter={(e) => { (e.currentTarget).style.background = "#F59E0B"; (e.currentTarget).style.color = "#000"; }}
                    onMouseLeave={(e) => { (e.currentTarget).style.background = "rgba(0,0,0,0.8)"; (e.currentTarget).style.color = "#F59E0B"; }}
                  >
                    <Download size={12} />
                    {t("download")}
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={onRegenerate}
              className="flex w-full cursor-pointer items-center justify-center gap-2 border-t py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all"
              style={{ borderColor: "#1A1A1A", color: "#444" }}
              onMouseEnter={(e) => { (e.currentTarget).style.color = "#F59E0B"; }}
              onMouseLeave={(e) => { (e.currentTarget).style.color = "#444"; }}
            >
              <RefreshCw size={12} />
              {t("regenerate")}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-5 px-8 py-24"
          >
            <motion.div
              className="h-px w-10"
              style={{ background: "#F59E0B" }}
              animate={{ scaleX: [0.4, 1, 0.4], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#2A2A2A" }}>
              Configure and generate your comic
            </p>
            <motion.div
              className="h-px w-10"
              style={{ background: "#F59E0B" }}
              animate={{ scaleX: [0.4, 1, 0.4], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
