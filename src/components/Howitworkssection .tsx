"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    icon: "👤",
    title: "Créer ton compte",
    desc: "Clique sur le bouton ci-dessous et remplis le formulaire d'inscription 1xBet en moins de 2 minutes. C'est gratuit et sans engagement.",
    detail: "Nom • Email • Mot de passe",
    cta: "Créer mon compte",
    color: "#F5A623",
    link: "https://www.1xbet.com",
  },
  {
    number: "02",
    icon: "🎟️",
    title: "Entrer le code promo",
    desc: "Lors de l'inscription, saisis le code promo dans le champ dédié. Le bonus est immédiatement ajouté à ton profil.",
    detail: "Champ « Code promo » → BONUS130",
    cta: "Copier le code",
    color: "#4FC3F7",
    link: null,
  },
  {
    number: "03",
    icon: "💰",
    title: "Déposer & recevoir ton bonus",
    desc: "Effectue ton premier dépôt. 1xBet crédite automatiquement +130% de bonus sur ton compte. Tu peux commencer à parier immédiatement.",
    detail: "Virement • Carte • Crypto • PayPal",
    cta: "Activer mon bonus",
    color: "#81C784",
    link: "https://www.1xbet.com",
  },
];

function StepCard({ step, index, isLast }:{ step: typeof steps[0], index: number, isLast: boolean }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleCta = () => {
    if (step.link) {
      window.open(step.link, "_blank", "noopener noreferrer");
    } else {
      navigator.clipboard.writeText("BONUS130").catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0",
        position: "relative",
      }}
    >
      {/* Connector line between steps */}
      {!isLast && (
        <div style={{
          position: "absolute",
          top: "56px",
          left: "calc(50% + 140px)",
          right: "calc(-50% + 140px)",
          height: "2px",
          background: `linear-gradient(90deg, ${step.color}60, transparent)`,
          zIndex: 0,
          display: "none", // shown via CSS below in desktop
        }} className="connector" />
      )}

      {/* Card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "#16181F" : "#12141A",
          border: `1px solid ${hovered ? step.color + "50" : "#1E2230"}`,
          borderRadius: "24px",
          padding: "36px 28px 28px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
          transition: "border 0.3s, background 0.3s",
        }}
      >
        {/* Top accent */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "3px",
          background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
          opacity: hovered ? 1 : 0.3,
          transition: "opacity 0.3s",
        }} />

        {/* Ambient glow */}
        <div style={{
          position: "absolute", bottom: "-30%", right: "-20%",
          width: "200px", height: "200px",
          background: `radial-gradient(circle, ${step.color}10 0%, transparent 70%)`,
          pointerEvents: "none",
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s",
        }} />

        {/* Step number — big background */}
        <div style={{
          position: "absolute", top: "16px", right: "20px",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "80px",
          lineHeight: 1,
          color: step.color,
          opacity: 0.06,
          letterSpacing: "-2px",
          pointerEvents: "none",
          userSelect: "none",
        }}>
          {step.number}
        </div>

        {/* Step badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: step.color + "18",
          border: `1px solid ${step.color}35`,
          borderRadius: "100px",
          padding: "4px 14px 4px 8px",
          marginBottom: "20px",
        }}>
          <div style={{
            width: "20px", height: "20px",
            background: step.color,
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "10px", fontWeight: 700,
            color: "#0A0B0F",
            fontFamily: "'Outfit', sans-serif",
          }}>
            {index + 1}
          </div>
          <span style={{
            fontSize: "11px", fontWeight: 600,
            color: step.color, letterSpacing: "1px",
            textTransform: "uppercase",
            fontFamily: "'Outfit', sans-serif",
          }}>
            Étape {index + 1}
          </span>
        </div>

        {/* Icon */}
        <div style={{
          fontSize: "40px",
          marginBottom: "20px",
          display: "block",
          transform: hovered ? "scale(1.12) rotate(-5deg)" : "scale(1) rotate(0deg)",
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          width: "fit-content",
        }}>
          {step.icon}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "30px",
          letterSpacing: "0.5px",
          color: "#fff",
          marginBottom: "12px",
          lineHeight: 1.05,
        }}>
          {step.title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: "14px",
          lineHeight: "1.7",
          color: "#8B92A5",
          marginBottom: "20px",
          fontFamily: "'Outfit', sans-serif",
        }}>
          {step.desc}
        </p>

        {/* Detail chip */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "#0A0B0F",
          border: "1px solid #1E2230",
          borderRadius: "8px",
          padding: "8px 14px",
          marginBottom: "24px",
          width: "100%",
        }}>
          <span style={{
            fontSize: "11px",
            color: step.color,
            fontWeight: 600,
            letterSpacing: "0.5px",
            fontFamily: "'Outfit', sans-serif",
          }}>
            {step.detail}
          </span>
        </div>

        {/* CTA button */}
        <button
          onClick={handleCta}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
            padding: "13px 20px",
            background: hovered ? step.color : "transparent",
            border: `1.5px solid ${step.color}`,
            borderRadius: "10px",
            color: hovered ? "#0A0B0F" : step.color,
            fontFamily: "'Outfit', sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.25s",
            letterSpacing: "0.3px",
          }}
        >
          {index === 1 && copied ? "✓ Copié !" : step.cta}
          {!copied && <span style={{ fontSize: "16px" }}>→</span>}
        </button>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  const [titleVisible, setTitleVisible] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTitleVisible(true); setTimeout(() => setBarVisible(true), 500); } },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --gold: #F5A623;
          --dark-bg: #0A0B0F;
          --dark-card: #12141A;
          --dark-border: #1E2230;
          --text-muted: #8B92A5;
        }

        .how-section {
          background: var(--dark-bg);
          padding: 100px 48px;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }
        .how-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,166,35,0.25), transparent);
        }
        .how-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(245,166,35,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,166,35,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* Left ambient blob */
        .how-blob {
          position: absolute;
          left: -10%;
          top: 20%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(79,195,247,0.05) 0%, transparent 65%);
          pointer-events: none;
        }

        .how-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .how-header {
          text-align: center;
          margin-bottom: 72px;
        }

        .section-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(245,166,35,0.08);
          border: 1px solid rgba(245,166,35,0.2);
          border-radius: 100px;
          padding: 6px 18px 6px 10px;
          margin-bottom: 22px;
        }
        .tag-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--gold);
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
        .section-tag span {
          font-size: 11px; font-weight: 600;
          color: var(--gold); letter-spacing: 1px;
          text-transform: uppercase;
        }

        .how-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(42px, 5vw, 68px);
          line-height: 1;
          color: #fff;
          letter-spacing: 1px;
          margin-bottom: 14px;
        }
        .how-title em { color: var(--gold); font-style: normal; }

        .how-subtitle {
          font-size: 15px;
          color: var(--text-muted);
          max-width: 420px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* Progress bar */
        .progress-bar-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin-bottom: 56px;
        }
        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .progress-circle {
          width: 40px; height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          border: 2px solid;
          transition: all 0.5s ease;
        }
        .progress-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          transition: color 0.5s;
        }
        .progress-line {
          width: 120px;
          height: 2px;
          margin-bottom: 22px;
          transition: background 0.8s ease;
        }

        /* Steps grid */
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          position: relative;
        }

        /* Connector between cards */
        .step-connector {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 80px;
        }
        .connector-arrow {
          width: 28px; height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #2a2d38;
        }

        /* Bottom guarantee strip */
        .guarantee-strip {
          margin-top: 56px;
          background: #12141A;
          border: 1px solid #1E2230;
          border-radius: 16px;
          padding: 24px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .guarantee-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .guarantee-icon {
          font-size: 28px;
          flex-shrink: 0;
        }
        .guarantee-text h4 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          color: #fff;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }
        .guarantee-text p {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.4;
        }
        .guarantee-items {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .guarantee-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 500;
        }
        .g-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .how-section { padding: 60px 20px; }
          .steps-grid { grid-template-columns: 1fr; }
          .progress-line { width: 60px; }
          .guarantee-strip { flex-direction: column; }
        }
      `}</style>

      <section className="how-section">
        <div className="how-blob" />
        <div className="how-inner">

          {/* Header */}
          <div className="how-header" ref={titleRef}>
            <div className="section-tag" style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
              <div className="tag-dot" />
              <span>3 étapes simples</span>
            </div>

            <h2 className="how-title" style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}>
              Comment ça <em>marche</em> ?
            </h2>

            <p className="how-subtitle" style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}>
              Obtenir ton bonus prend moins de 5 minutes. Suis ces 3 étapes et c'est parti.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="progress-bar-wrap" style={{
            opacity: titleVisible ? 1 : 0,
            transition: "opacity 0.6s ease 0.3s",
          }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <div className="progress-step">
                  <div className="progress-circle" style={{
                    borderColor: barVisible ? step.color : "#2a2d38",
                    background: barVisible ? step.color + "18" : "transparent",
                    color: barVisible ? step.color : "#444",
                    transitionDelay: `${i * 0.2}s`,
                  }}>
                    {i + 1}
                  </div>
                  <span className="progress-label" style={{
                    color: barVisible ? step.color : "#333",
                    transitionDelay: `${i * 0.2}s`,
                    fontSize: "10px",
                  }}>
                    Étape {i + 1}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="progress-line" style={{
                    background: barVisible
                      ? `linear-gradient(90deg, ${step.color}80, ${steps[i + 1].color}40)`
                      : "#1E2230",
                    transitionDelay: `${i * 0.2 + 0.1}s`,
                    margin: "0 4px",
                    marginBottom: "22px",
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className="steps-grid">
            {steps.map((step, i) => (
              <StepCard key={i} step={step} index={i} isLast={i === steps.length - 1} />
            ))}
          </div>

          {/* Guarantee strip */}
          <div className="guarantee-strip">
            <div className="guarantee-left">
              <div className="guarantee-icon">⏱️</div>
              <div className="guarantee-text">
                <h4>Inscription en moins de 5 minutes</h4>
                <p>Aucune compétence requise — le processus est 100% guidé.</p>
              </div>
            </div>
            <div className="guarantee-items">
              {["Sans frais cachés", "Bonus garanti", "Support disponible"].map((item, i) => (
                <div key={i} className="guarantee-item">
                  <div className="g-dot" />
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}