"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer
      style={{
        backgroundColor: "#000000",
        borderTop: "1px solid #222222",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "32px 24px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* Logo + copyright */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "14px",
              fontWeight: 900,
              letterSpacing: "0.05em",
              color: "#FFFFFF",
              textTransform: "uppercase",
            }}
          >
            BSC<span style={{ color: "#F59E0B" }}>MAN</span>
          </span>
          <span
            style={{
              width: "1px",
              height: "12px",
              backgroundColor: "#333333",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              letterSpacing: "0.05em",
              color: "#666666",
            }}
          >
            &copy; 2026 {t("rights")}
          </span>
        </div>

        {/* Links + powered by */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link
            href="/gallery"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#666666",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLAnchorElement).style.color = "#FFFFFF")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLAnchorElement).style.color = "#666666")
            }
          >
            Gallery
          </Link>
          <Link
            href="/generator"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#666666",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLAnchorElement).style.color = "#FFFFFF")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLAnchorElement).style.color = "#666666")
            }
          >
            Generator
          </Link>
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              letterSpacing: "0.05em",
              color: "#333333",
            }}
          >
            {t("powered")}
          </span>
        </div>
      </div>
    </footer>
  );
}
