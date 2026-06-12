"use client";

import { useEffect, useRef, useState } from "react";

const BONUS_CARDS = [
  {
    icon: "🎁",
    title: "Bonus de bienvenue",
    badge: "+130%",
    color: "#F5A623",
    desc: "Sur ton premier dépôt avec le code BONUS130. Crédité instantanément, sans conditions complexes.",
    features: ["Valable 30 jours", "Misez x5 pour retirer", "Tous sports éligibles"],
  },
  {
    icon: "⚽",
    title: "Paris sportifs",
    badge: "1000+ matchs/jour",
    color: "#4FC3F7",
    desc: "Foot, basket, tennis, rugby et bien plus. Les meilleures cotes du marché avec des centaines de marchés par match.",
    features: ["Cotes parmi les meilleures", "Cash-out disponible", "Paris combinés"],
  },
  {
    icon: "🎰",
    title: "Casino en ligne",
    badge: "5000+ jeux",
    color: "#CE93D8",
    desc: "Slots, blackjack, roulette, poker. Les plus grands fournisseurs comme Evolution Gaming et NetEnt.",
    features: ["Jackpots progressifs", "Tables exclusives", "Tournois réguliers"],
  },
  {
    icon: "📺",
    title: "Live betting",
    badge: "En temps réel",
    color: "#F48FB1",
    desc: "Parie en direct sur les matchs en cours avec des cotes qui évoluent en temps réel. Adrénaline garantie.",
    features: ["Streaming live intégré", "Stats en direct", "Paris rapides"],
  },
  {
    icon: "📱",
    title: "Application mobile",
    badge: "iOS & Android",
    color: "#81C784",
    desc: "L'app 1xBet est rapide, intuitive et disponible gratuitement. Toutes les fonctions desktop dans ta poche.",
    features: ["Notifications push", "Touch ID / Face ID", "Mode hors-ligne partiel"],
  },
  {
    icon: "⚡",
    title: "Retraits rapides",
    badge: "Sous 24h",
    color: "#FFB74D",
    desc: "Virement, carte bancaire, crypto, PayPal, Wave, Orange Money. Retraits traités en quelques heures.",
    features: ["10+ méthodes de paiement", "Sans frais cachés", "Historique complet"],
  },
];

/* ─── Card individuelle ──────────────────────── */
function BonusCard({ card, delay }: { card: typeof BONUS_CARDS[0], delay: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#16181F" : "#12141A",
        border: `1px solid ${hovered ? card.color + "55" : "#1E2230"}`,
        borderRadius: 22,
        padding: "32px 26px 28px",
        position: "relative",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, border 0.3s, background 0.3s`,
        display: "flex",
        flexDirection: "column",
        gap: 0,
      }}
    >
      {/* Top colored line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
        opacity: hovered ? 1 : 0.25,
        transition: "opacity 0.3s",
      }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", bottom: "-30%", right: "-15%",
        width: 180, height: 180,
        background: `radial-gradient(circle, ${card.color}12 0%, transparent 70%)`,
        pointerEvents: "none",
        opacity: hovered ? 1 : 0.5,
        transition: "opacity 0.3s",
      }} />

      {/* Background watermark number */}
      <div style={{
        position: "absolute", bottom: 12, right: 20,
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 80, lineHeight: 1,
        color: card.color, opacity: 0.04,
        pointerEvents: "none", userSelect: "none",
        letterSpacing: "-2px",
      }}>
        {(BONUS_CARDS.indexOf(card) + 1).toString().padStart(2, "0")}
      </div>

      {/* Header: icon + badge */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{
          fontSize: 36,
          display: "inline-block",
          transform: hovered ? "scale(1.12) rotate(-5deg)" : "scale(1) rotate(0deg)",
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }}>
          {card.icon}
        </div>
        <span style={{
          background: card.color + "18",
          border: `1px solid ${card.color}38`,
          color: card.color,
          fontSize: 10, fontWeight: 700,
          padding: "4px 10px", borderRadius: 100,
          letterSpacing: "0.5px",
          fontFamily: "'Outfit', sans-serif",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}>
          {card.badge}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 26, letterSpacing: "0.5px",
        color: "#fff", marginBottom: 10,
      }}>
        {card.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 13, lineHeight: 1.72,
        color: "#8B92A5", marginBottom: 20, flexGrow: 1,
      }}>
        {card.desc}
      </p>

      {/* Feature list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {card.features.map((feature, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            fontFamily: "'Outfit', sans-serif",
            fontSize: 13, color: "#8B92A5",
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: card.color, flexShrink: 0,
            }} />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Section principale ─────────────────────── */
export default function BonusSection() {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTitleVisible(true); },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@400;500;600;700&display=swap');
        @keyframes bPulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
        .bonus-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
        @media (max-width:900px)  { .bonus-grid { grid-template-columns:repeat(2,1fr) !important; } }
        @media (max-width:600px)  { .bonus-grid { grid-template-columns:1fr !important; } }
      `}</style>

      <section style={{
        background: "#0A0B0F",
        padding: "100px 48px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Outfit', sans-serif",
      }}>
        {/* Top separator */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(245,166,35,0.25), transparent)",
        }} />

        {/* Background grid texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(245,166,35,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        {/* Ambient blobs */}
        <div style={{
          position: "absolute", top: "15%", left: "-8%",
          width: 450, height: 450,
          background: "radial-gradient(circle, rgba(79,195,247,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "-8%",
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* ── Header ── */}
          <div ref={titleRef} style={{ textAlign: "center", marginBottom: 64 }}>
            {/* Tag */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(245,166,35,0.08)",
              border: "1px solid rgba(245,166,35,0.22)",
              borderRadius: 100, padding: "6px 18px 6px 10px",
              marginBottom: 22,
              opacity: titleVisible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#F5A623",
                animation: "bPulse 2s infinite",
              }} />
              <span style={{
                fontSize: 11, fontWeight: 600, color: "#F5A623",
                letterSpacing: "1px", textTransform: "uppercase",
              }}>
                Tout ce que tu obtiens
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: 1, letterSpacing: "1px",
              color: "#fff", margin: "0 0 14px",
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}>
              Tous les{" "}
              <span style={{ color: "#F5A623" }}>avantages</span>{" "}
              détaillés
            </h2>

            <p style={{
              fontSize: 15, color: "#8B92A5",
              maxWidth: 440, margin: "0 auto", lineHeight: 1.65,
              opacity: titleVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.2s",
            }}>
              1xBet ne se limite pas aux paris sportifs. Voici tout ce à quoi tu as accès dès l&apos;inscription.
            </p>
          </div>

          {/* ── Grid de cartes ── */}
          <div className="bonus-grid">
            {BONUS_CARDS.map((card, i) => (
              <BonusCard
                key={i}
                card={card}
                delay={(i % 3) * 0.12}
              />
            ))}
          </div>

          {/* ── Bottom CTA ── */}
          <BottomCta visible={titleVisible} />
        </div>
      </section>
    </>
  );
}

/* ─── CTA bas de section ─────────────────────── */
function BottomCta({ visible }: { visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      textAlign: "center",
      marginTop: 60,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 14,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
    }}>
      <p style={{ fontSize: 15, color: "#8B92A5" }}>
        Tout ça t&apos;attend après une inscription de{" "}
        <strong style={{ color: "#fff" }}>5 minutes</strong>.
      </p>
      <a
        href="https://www.1xbet.com"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: hovered ? "#FFD580" : "#F5A623",
          color: "#0A0B0F",
          fontFamily: "'Outfit', sans-serif",
          fontSize: 16, fontWeight: 700,
          padding: "16px 44px", borderRadius: 12, border: "none",
          cursor: "pointer", textDecoration: "none",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
          boxShadow: hovered ? "0 12px 32px rgba(245,166,35,0.38)" : "none",
          transition: "all 0.2s",
          position: "relative", overflow: "hidden",
        }}
      >
        <span style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%)",
          pointerEvents: "none",
        }} />
        Créer mon compte maintenant
        <span style={{
          fontSize: 18,
          display: "inline-block",
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          transition: "transform 0.2s",
        }}>→</span>
      </a>
    </div>
  );
}