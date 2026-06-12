"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "3 M+",    label: "Utilisateurs inscrits",     icon: "👥" },
  { value: "98%",     label: "Bonus activés avec succès", icon: "✅" },
  { value: "4.8/5",   label: "Note moyenne",              icon: "⭐" },
  { value: "< 2 min", label: "Temps d'activation moyen",  icon: "⚡" },
];

const TESTIMONIALS = [
  { name: "Kevin M.",   city: "Montréal", avatar: "KM", text: "Inscription rapide et bonus reçu immédiatement. J'ai parié le soir même !",      gain: "+85€",  color: "#F5A623" },
  { name: "Aliou D.",   city: "Dakar",    avatar: "AD", text: "Le code promo a fonctionné du premier coup. Le bonus de 130% est réel.",          gain: "+120€", color: "#4FC3F7" },
  { name: "Romuald K.", city: "Abidjan",  avatar: "RK", text: "Interface claire, retrait rapide. Je recommande à tous mes amis.",               gain: "+200€", color: "#81C784" },
  { name: "Théo B.",    city: "Paris",    avatar: "TB", text: "J'étais sceptique au début mais le bonus est arrivé en 2 minutes.",              gain: "+65€",  color: "#CE93D8" },
  { name: "Moussa T.",  city: "Bamako",   avatar: "MT", text: "Très bonne plateforme. Le code BONUS130 m'a donné un vrai avantage.",            gain: "+150€", color: "#F48FB1" },
  { name: "Jean-P. L.", city: "Lyon",     avatar: "JL", text: "Simple, rapide, efficace. Le bonus est crédité automatiquement.",                gain: "+95€",  color: "#FFB74D" },
];

/* ─── Stat card ──────────────────────────────── */
function StatCard({ stat, delay }: { stat: typeof STATS[0], delay: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
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
        background: "#12141A",
        border: `1px solid ${hovered ? "rgba(245,166,35,0.45)" : "#1E2230"}`,
        borderRadius: 16,
        padding: "24px 20px",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, border 0.3s`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(90deg, transparent, #F5A623, transparent)",
        opacity: hovered ? 0.8 : 0,
        transition: "opacity 0.3s",
      }} />
      <div style={{ fontSize: 26, marginBottom: 10 }}>{stat.icon}</div>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 34, letterSpacing: "1px", color: "#F5A623", marginBottom: 6,
      }}>
        {stat.value}
      </div>
      <div style={{ fontSize: 12, color: "#8B92A5", fontWeight: 500 }}>
        {stat.label}
      </div>
    </div>
  );
}

/* ─── Testimonial card ───────────────────────── */
function TestimonialCard({ t, delay }: { t: typeof TESTIMONIALS[0], delay: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
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
        border: `1px solid ${hovered ? t.color + "55" : "#1E2230"}`,
        borderRadius: 18,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        position: "relative",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, border 0.3s, background 0.3s`,
      }}
    >
      {/* Colored top line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${t.color}, transparent)`,
        opacity: hovered ? 1 : 0.4,
        transition: "opacity 0.3s",
      }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", bottom: "-40%", right: "-20%",
        width: 160, height: 160,
        background: `radial-gradient(circle, ${t.color}12 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Avatar */}
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            background: t.color + "20",
            border: `1px solid ${t.color}45`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Outfit', sans-serif",
            fontSize: 13, fontWeight: 700, color: t.color, flexShrink: 0,
          }}>
            {t.avatar}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", fontFamily: "'Outfit', sans-serif" }}>
              {t.name}
            </div>
            <div style={{ fontSize: 12, color: "#8B92A5" }}>{t.city}</div>
          </div>
        </div>

        {/* Gain badge */}
        <div style={{
          background: "rgba(129,199,132,0.12)",
          border: "1px solid rgba(129,199,132,0.3)",
          borderRadius: 8, padding: "4px 10px",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 16, letterSpacing: "1px", color: "#81C784",
          flexShrink: 0,
        }}>
          {t.gain}
        </div>
      </div>

      {/* Stars */}
      <div style={{ display: "flex", gap: 3 }}>
        {Array(5).fill(null).map((_, i) => (
          <span key={i} style={{ color: "#F5A623", fontSize: 14 }}>★</span>
        ))}
      </div>

      {/* Quote */}
      <p style={{
        fontSize: 14, lineHeight: 1.7, color: "#8B92A5",
        fontStyle: "italic", margin: 0,
        fontFamily: "'Outfit', sans-serif",
      }}>
        &ldquo;{t.text}&rdquo;
      </p>
    </div>
  );
}

/* ─── Section principale ─────────────────────── */
export default function SocialProofSection() {
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
        @keyframes livePulse { 0%,100%{ opacity:1; } 50%{ opacity:0.35; } }
        .sp-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:56px; }
        .sp-grid  { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
        @media (max-width:900px){
          .sp-stats { grid-template-columns:repeat(2,1fr) !important; }
          .sp-grid  { grid-template-columns:1fr !important; }
        }
        @media (max-width:600px){
          .sp-stats { grid-template-columns:1fr !important; }
        }
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

        {/* Right ambient blob */}
        <div style={{
          position: "absolute", right: "-5%", top: "10%",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* ── Header ── */}
          <div ref={titleRef} style={{ textAlign: "center", marginBottom: 56 }}>
            {/* Live badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(129,199,132,0.10)",
              border: "1px solid rgba(129,199,132,0.25)",
              borderRadius: 100, padding: "6px 16px 6px 10px",
              marginBottom: 20,
              opacity: titleVisible ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#81C784",
                animation: "livePulse 1.5s infinite",
              }} />
              <span style={{
                fontSize: 11, fontWeight: 600, color: "#81C784",
                letterSpacing: "1px", textTransform: "uppercase",
              }}>
                Avis vérifiés
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
              Ils l&apos;ont déjà{" "}
              <span style={{ color: "#F5A623" }}>utilisé</span>
            </h2>

            <p style={{
              fontSize: 15, color: "#8B92A5",
              maxWidth: 420, margin: "0 auto", lineHeight: 1.65,
              opacity: titleVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.2s",
            }}>
              Plus de 3 millions d&apos;utilisateurs ont déjà activé leur bonus grâce à ce code promo.
            </p>
          </div>

          {/* ── Stats ── */}
          <div className="sp-stats">
            {STATS.map((stat, i) => (
              <StatCard key={i} stat={stat} delay={i * 0.1} />
            ))}
          </div>

          {/* ── Testimonials ── */}
          <div className="sp-grid">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} t={t} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}