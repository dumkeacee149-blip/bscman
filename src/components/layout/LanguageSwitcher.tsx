"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const t = useTranslations("nav");
  const router = useRouter();

  function switchLocale() {
    const current = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1] || "en";

    const next = current === "en" ? "zh" : "en";
    document.cookie = `locale=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  }

  return (
    <button
      onClick={switchLocale}
      className="cursor-pointer rounded-full glass px-3 py-1 font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-text-secondary transition-all hover:text-text hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
    >
      {t("language")}
    </button>
  );
}
