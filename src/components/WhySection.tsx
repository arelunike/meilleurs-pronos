"use client";

import { useEffect, useRef, useState } from "react";

const cards = [
  {
    icon: "🎁",
    title: "Bonus augmenté",
    desc: "Grâce à mon code promo exclusif, ton bonus de bienvenue passe à +130% sur ton premier dépôt — bien au-dessus de l'offre standard.",
    highlight: "130% offerts",
    color: "#F5A623",
    delay: 0,
  },
  {
    icon: "⚡",
    title: "Activation rapide",
    desc: "Ton bonus est activé automatiquement dès l'inscription. Pas besoin d'attendre : tu joues en moins de 5 minutes.",
    highlight: "< 5 min",
    color: "#4FC3F7",
    delay: 0.1,
  },
  {
    icon: "📱",
    title: "Compatible Android & iPhone",
    desc: "L'application 1xBet fonctionne parfaitement sur iOS et Android. Parie où tu veux, quand tu veux.",
    highlight: "iOS • Android",
    color: "#81C784",
    delay: 0.2,
  },
  {
    icon: "🔒",
    title: "Plateforme sécurisée",
    desc: "1xBet est une plateforme licenciée et régulée. Tes données et ton argent sont protégés par un chiffrement SSL.",
    highlight: "SSL 256-bit",
    color: "#CE93D8",
    delay: 0.3,
  },
  {
    icon: "🌍",
    title: "Disponible dans +100 pays",
    desc: "Peu importe où tu te trouves, 1xBet est accessible dans plus de 100 pays avec une interface multilingue.",
    highlight: "100+ pays",
    color: "#F48FB1",
    delay: 0.4,
  },
];

function Card({ card, index }: { card: typeof cards[0], index: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
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
        border: `1px solid ${hovered ? card.color + "40" : "#1E2230"}`,
        borderRadius: "20px",
        padding: "32px 28px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${card.delay}s, transform 0.6s ease ${card.delay}s, border 0.3s, background 0.3s`,
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${card.color}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s",
      }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", bottom: "-40%", right: "-20%",
        width: "180px", height: "180px",
        background: `radial-gradient(circle, ${card.color}12 0%, transparent 70%)`,
        pointerEvents: "none",
        transition: "opacity 0.3s",
        opacity: hovered ? 1 : 0.5,
      }} />

      {/* Icon */}
      <div style={{
        fontSize: "36px",
        marginBottom: "20px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "64px", height: "64px",
        background: card.color + "18",
        borderRadius: "16px",
        border: `1px solid ${card.color}30`,
        transform: hovered ? "scale(1.1) rotate(-4deg)" : "scale(1) rotate(0deg)",
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {card.icon}
      </div>

      {/* Highlight badge */}
      <div style={{
        position: "absolute", top: "28px", right: "28px",
        background: card.color + "18",
        border: `1px solid ${card.color}35`,
        color: card.color,
        fontSize: "11px", fontWeight: 700,
        padding: "4px 12px", borderRadius: "100px",
        letterSpacing: "0.5px",
        fontFamily: "'Outfit', sans-serif",
      }}>
        {card.highlight}
      </div>

      <h3 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "26px",
        letterSpacing: "0.5px",
        color: "#fff",
        marginBottom: "12px",
      }}>
        {card.title}
      </h3>

      <p style={{
        fontSize: "14px",
        lineHeight: "1.7",
        color: "#8B92A5",
        fontFamily: "'Outfit', sans-serif",
      }}>
        {card.desc}
      </p>
    </div>
  );
}

export default function WhySection() {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.3 }
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
        .why-section {
          background: var(--dark-bg);
          padding: 100px 48px;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }
        .why-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(245,166,35,0.3), transparent);
        }
        /* subtle grid texture */
        .why-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(245,166,35,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,166,35,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .why-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .why-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .section-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(245,166,35,0.08);
          border: 1px solid rgba(245,166,35,0.2);
          border-radius: 100px;
          padding: 6px 18px 6px 10px;
          margin-bottom: 24px;
        }
        .section-tag-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--gold);
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
        .section-tag span {
          font-size: 12px;
          font-weight: 600;
          color: var(--gold);
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .why-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(40px, 5vw, 68px);
          line-height: 1;
          color: #fff;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }
        .why-title em {
          color: var(--gold);
          font-style: normal;
        }
        .why-subtitle {
          font-size: 16px;
          color: var(--text-muted);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.65;
        }
        /* Cards grid: 2-2-1 with last card wider */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .card-wide {
          grid-column: 1 / -1;
        }
        .card-wide-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* bottom CTA */
        .why-cta {
          text-align: center;
          margin-top: 56px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .why-cta-text {
          font-size: 15px;
          color: var(--text-muted);
        }
        .why-cta-text strong { color: #fff; }
        .why-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--gold);
          color: #0A0B0F;
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 700;
          padding: 16px 40px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          text-decoration: none;
          position: relative; overflow: hidden;
        }
        .why-btn::before {
          content:'';position:absolute;inset:0;
          background:linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%);
        }
        .why-btn:hover {
          background: #FFD580;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(245,166,35,0.35);
        }

        @media (max-width: 768px) {
          .why-section { padding: 60px 20px; }
          .cards-grid { grid-template-columns: 1fr; }
          .card-wide { grid-column: auto; }
          .card-wide-inner { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="why-section">
        <div className="why-inner">

          {/* Header */}
          <div className="why-header" ref={titleRef}>
            <div className="section-tag" style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
              <div className="section-tag-dot" />
              <span>Avantages exclusifs</span>
            </div>

            <h2 className="why-title" style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}>
              Pourquoi utiliser <em>mon code promo</em> ?
            </h2>

            <p className="why-subtitle" style={{
              opacity: titleVisible ? 1 : 0,
              transform: titleVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}>
              Un simple code peut changer ton expérience sur 1xBet. Voici tout ce que tu gagnes en l'utilisant.
            </p>
          </div>

          {/* Cards : 2 colonnes sur 2 rangées + last card pleine largeur */}
          <div className="cards-grid">
            {cards.slice(0, 4).map((card, i) => (
              <Card key={i} card={card} index={i} />
            ))}
            <div className="card-wide">
              <div className="card-wide-inner">
                <Card card={cards[4]} index={4} />
                {/* Bonus: stat strip card */}
                <div style={{
                  background: "#12141A",
                  border: "1px solid #1E2230",
                  borderRadius: "20px",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "24px",
                }}>
                  {[
                    { label: "Utilisateurs actifs", value: "3 M+", color: "#F5A623" },
                    { label: "Bonus distribués", value: "€12 M+", color: "#4FC3F7" },
                    { label: "Taux de satisfaction", value: "96%", color: "#81C784" },
                  ].map((stat, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "13px", color: "#8B92A5", fontWeight: 500 }}>{stat.label}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          height: "4px", width: "80px", borderRadius: "2px",
                          background: "#1E2230", position: "relative", overflow: "hidden",
                        }}>
                          <div style={{
                            position: "absolute", inset: 0,
                            width: i === 0 ? "70%" : i === 1 ? "85%" : "96%",
                            background: stat.color,
                            borderRadius: "2px",
                          }} />
                        </div>
                        <span style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          fontSize: "22px", letterSpacing: "1px",
                          color: stat.color, minWidth: "52px", textAlign: "right",
                        }}>{stat.value}</span>
                      </div>
                    </div>
                  ))}
                  <div style={{
                    marginTop: "8px", paddingTop: "20px",
                    borderTop: "1px solid #1E2230",
                    fontSize: "12px", color: "#555",
                  }}>
                    * Données basées sur les affiliés actifs 2024–2025
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="why-cta">
            <p className="why-cta-text">
              Prêt à profiter de l'offre ? <strong>Il te faut moins de 5 minutes.</strong>
            </p>
            <a
              href="https://www.1xbet.com"
              target="_blank"
              rel="noopener noreferrer"
              className="why-btn"
            >
              Créer mon compte maintenant →
            </a>
          </div>

        </div>
      </section>
    </>
  );
}