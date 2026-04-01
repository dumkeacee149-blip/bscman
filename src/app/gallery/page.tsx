"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ComicGrid from "@/components/gallery/ComicGrid";

export default function GalleryPage() {
  const t = useTranslations("gallery");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000000",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      {/* Page header */}
      <div
        style={{
          borderBottom: "1px solid #1a1a1a",
          padding: "48px 0 40px",
          marginBottom: "0",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 clamp(24px, 5vw, 96px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#F59E0B",
                marginBottom: "12px",
              }}
            >
              BSCMAN Universe
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 6vw, 72px)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                lineHeight: 1,
                marginBottom: "16px",
              }}
            >
              {t("title")}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                letterSpacing: "0.05em",
                color: "#666666",
                maxWidth: "480px",
              }}
            >
              {t("subtitle")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Comic grid — full width with minimal outer padding */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 96px)",
          marginTop: "40px",
        }}
      >
        <ComicGrid />
      </div>
    </div>
  );
}
