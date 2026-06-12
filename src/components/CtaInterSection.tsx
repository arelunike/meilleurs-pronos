"use client";

import { useEffect, useRef, useState } from "react";

const PROMO_CODE = "BONUS130";

function PrimaryButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://www.1xbet.com"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: hovered ? "#FFD580" : "#F5A623",
        color: "#0A0B0F",
        fontFamily: "'Outfit', sans-serif",
        fontSize: 17,
        fontWeight: 700,
        padding: "18px 46px",
        borderRadius: 12,
        border: "none",
        cursor: "pointer",
        whiteSpace: "nowrap",
        textDecoration: "none",
        letterSpacing: "0.3px",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 14px 36px rgba(245,166,35,0.38)" : "none",
        transition: "all 0.2s",
      }}
    >
      Activer mon bonus
      <span style={{
        fontSize: 20,
        display: "inline-block",
        transform: hovered ? "translateX(5px)" : "translateX(0)",
        transition: "transform 0.2s",
      }}>→</span>
    </a>
  );
}

export default function CtaInterSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@400;500;600;700&display=swap');
        @media (max-width: 768px) {
          .cta-band { flex-direction: column !important; padding: 36px 28px !important; }
          .cta-right { width: 100% !important; }
          .cta-btn-wrap { width: 100% !important; justify-content: center !important; }
        }
      `}</style>

      <section style={{
        background: "#0A0B0F",
        padding: "80px 48px",
        fontFamily: "'Outfit', sans-serif",
        position: "relative",
      }}>
        {/* Top separator */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.25), transparent)",
        }} />

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            ref={ref}
            className="cta-band"
            style={{
              background: "linear-gradient(135deg, #12141A 0%, #161926 100%)",
              border: "1px solid #1E2230",
              borderRadius: 24,
              padding: "56px 60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 40,
              position: "relative",
              overflow: "hidden",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            {/* Top gold border */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: "linear-gradient(90deg, transparent, #F5A623, transparent)",
            }} />

            {/* Background glow */}
            <div style={{
              position: "absolute", right: "-8%", top: "50%",
              transform: "translateY(-50%)",
              width: 360, height: 360,
              background: "radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 65%)",
              pointerEvents: "none",
            }} />

            {/* ── LEFT ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "relative", zIndex: 1 }}>
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#F5A623" }}>
                🎁 Offre limitée
              </span>

              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(38px, 4.5vw, 60px)",
                lineHeight: 0.95,
                letterSpacing: "1px",
                color: "#fff",
                margin: 0,
              }}>
                Je veux mon bonus{" "}
                <span style={{ color: "#F5A623" }}>maintenant</span>
              </h2>

              <p style={{ fontSize: 15, color: "#8B92A5", lineHeight: 1.65, maxWidth: 400, margin: 0 }}>
                Utilise le code{" "}
                <strong style={{ color: "#F5A623" }}>{PROMO_CODE}</strong>{" "}
                à l&apos;inscription et reçois +130% sur ton premier dépôt. Aucune attente.
              </p>

              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 4 }}>
                {["✓ Gratuit", "✓ Bonus immédiat", "✓ Sans risque"].map((item, i) => (
                  <span key={i} style={{ fontSize: 13, color: "#8B92A5", fontWeight: 500 }}>{item}</span>
                ))}
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div
              className="cta-right"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, flexShrink: 0, position: "relative", zIndex: 1 }}
            >
              <PrimaryButton />
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#8B92A5" }}>
                Code promo :{" "}
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: "2px", color: "#F5A623" }}>
                  {PROMO_CODE}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}