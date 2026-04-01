"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Swords, Rocket, Gem, Zap, Moon, Skull, type LucideIcon } from "lucide-react";
import type { ActionStyle } from "@/lib/prompts";

interface PromptSuggestion {
  icon: LucideIcon;
  text: string;
}

const PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  { icon: Swords, text: "BNB hero fighting bears in epic battle" },
  { icon: Rocket, text: "BNB warrior flying to the moon" },
  { icon: Gem, text: "BNB diamond hands power surge" },
  { icon: Zap, text: "BNB chain lightning attack" },
  { icon: Moon, text: "BNB hero standing on rooftop at night" },
  { icon: Skull, text: "BNB vs evil whale villain" },
];

interface ControlPanelProps {
  theme: string;
  setTheme: (v: string) => void;
  panels: number;
  setPanels: (v: number) => void;
  action: ActionStyle;
  setAction: (v: ActionStyle) => void;
  dialogue: string;
  setDialogue: (v: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export default function ControlPanel({
  theme,
  setTheme,
  panels,
  setPanels,
  action,
  setAction,
  dialogue,
  setDialogue,
  onGenerate,
  isLoading,
}: ControlPanelProps) {
  const t = useTranslations("generator");

  const actions: { value: ActionStyle; label: string }[] = [
    { value: "fighting", label: t("action_options.fighting") },
    { value: "heroic", label: t("action_options.heroic") },
    { value: "dramatic", label: t("action_options.dramatic") },
    { value: "comedy", label: t("action_options.comedy") },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Quick Ideas */}
      <div>
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-6" style={{ background: "#F59E0B" }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#F59E0B" }}>
            Quick Ideas
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PROMPT_SUGGESTIONS.map((s) => {
            const isActive = theme === s.text;
            return (
              <motion.button
                key={s.text}
                onClick={() => setTheme(s.text)}
                whileTap={{ scale: 0.97 }}
                className="flex cursor-pointer items-center gap-1.5 border px-3 py-2 text-[11px] font-medium tracking-wide transition-all"
                style={{
                  borderColor: isActive ? "#F59E0B" : "#1A1A1A",
                  background: isActive ? "rgba(245,158,11,0.08)" : "transparent",
                  color: isActive ? "#F59E0B" : "#666",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#333";
                    (e.currentTarget as HTMLButtonElement).style.color = "#CCC";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#1A1A1A";
                    (e.currentTarget as HTMLButtonElement).style.color = "#666";
                  }
                }}
              >
                <s.icon size={11} />
                {s.text}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Theme */}
      <div>
        <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#555" }}>
          {t("theme")}
        </label>
        <textarea
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder={t("theme_placeholder")}
          rows={3}
          className="w-full resize-none border bg-transparent px-4 py-3 text-[13px] leading-relaxed text-white placeholder-[#333] outline-none transition-colors focus:border-[#F59E0B]"
          style={{ borderColor: "#1A1A1A" }}
        />
      </div>

      {/* Panels */}
      <div>
        <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#555" }}>
          {t("panels")}
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 6].map((n) => (
            <button
              key={n}
              onClick={() => setPanels(n)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center border text-sm font-bold transition-all"
              style={{
                borderColor: panels === n ? "#F59E0B" : "#1A1A1A",
                background: panels === n ? "rgba(245,158,11,0.08)" : "transparent",
                color: panels === n ? "#F59E0B" : "#555",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Action Style */}
      <div>
        <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#555" }}>
          {t("action")}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((a) => (
            <button
              key={a.value}
              onClick={() => setAction(a.value)}
              className="cursor-pointer border px-3 py-2.5 text-[11px] font-medium tracking-wider transition-all"
              style={{
                borderColor: action === a.value ? "#F59E0B" : "#1A1A1A",
                background: action === a.value ? "rgba(245,158,11,0.08)" : "transparent",
                color: action === a.value ? "#F59E0B" : "#555",
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dialogue */}
      <div>
        <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#555" }}>
          {t("dialogue")}
        </label>
        <textarea
          value={dialogue}
          onChange={(e) => setDialogue(e.target.value)}
          placeholder={t("dialogue_placeholder")}
          rows={2}
          className="w-full resize-none border bg-transparent px-4 py-3 text-[13px] leading-relaxed text-white placeholder-[#333] outline-none transition-colors focus:border-[#F59E0B]"
          style={{ borderColor: "#1A1A1A" }}
        />
      </div>

      {/* Generate */}
      <motion.button
        onClick={onGenerate}
        disabled={isLoading || !theme}
        whileHover={{ scale: isLoading || !theme ? 1 : 1.01 }}
        whileTap={{ scale: isLoading || !theme ? 1 : 0.98 }}
        className="mt-2 w-full cursor-pointer py-4 text-[12px] font-black uppercase tracking-[0.25em] transition-all disabled:cursor-not-allowed disabled:opacity-25"
        style={{
          background: isLoading || !theme ? "#1A1A1A" : "#F59E0B",
          color: isLoading || !theme ? "#555" : "#000",
        }}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block h-4 w-4 rounded-full border-2 border-black/30 border-t-black"
            />
            {t("generating")}
          </span>
        ) : (
          t("generate")
        )}
      </motion.button>
    </div>
  );
}
