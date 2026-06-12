"use client";

import { useEffect, useRef, useState } from "react";

const PROMO_CODE = "AREL1";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(PROMO_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`

        :root {
          --gold: #F5A623;
          --gold-light: #FFD580;
          --gold-dark: #C8851A;
          --dark-bg: #0A0B0F;
          --dark-card: #12141A;
          --dark-border: #1E2230;
          --text-muted: #8B92A5;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .hero-root {
          min-height: 100vh;
          background: var(--dark-bg);
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Radial ambient glow */
        .hero-root::before {
          content: '';
          position: absolute;
          top: -20%;
          right: -10%;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(245,166,35,0.10) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        /* Grid overlay texture */
        .hero-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(245,166,35,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,166,35,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        /* ─── NAV ─────────────────────────────── */
        .hero-nav {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 48px;
          border-bottom: 1px solid var(--dark-border);
        }

        .nav-logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 2px;
          color: #fff;
        }

        .nav-logo span {
          color: var(--gold);
        }

        .nav-badge {
          background: rgba(245,166,35,0.12);
          border: 1px solid rgba(245,166,35,0.3);
          color: var(--gold);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          padding: 6px 14px;
          border-radius: 100px;
          text-transform: uppercase;
        }

        /* ─── MAIN CONTENT ────────────────────── */
        .hero-body {
          position: relative;
          z-index: 5;
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 48px;
          padding: 60px 48px 80px;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }

        /* ─── LEFT COLUMN ─────────────────────── */
        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .tag-line {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(245,166,35,0.08);
          border: 1px solid rgba(245,166,35,0.2);
          border-radius: 100px;
          padding: 6px 16px 6px 8px;
          width: fit-content;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .tag-line.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .tag-dot {
          width: 8px; height: 8px;
          background: var(--gold);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .tag-line span {
          font-size: 13px;
          font-weight: 600;
          color: var(--gold);
          letter-spacing: 0.5px;
        }

        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 6vw, 88px);
          line-height: 0.95;
          letter-spacing: 1px;
          color: #fff;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s;
        }

        .hero-title.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-title .accent {
          color: var(--gold);
          display: block;
        }

        .hero-subtitle {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
        }

        .hero-subtitle.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--dark-card);
          border: 1px solid var(--dark-border);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .pill-icon {
          font-size: 15px;
        }

        /* ─── CTA GROUP ───────────────────────── */
        .cta-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s;
        }

        .cta-group.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: var(--gold);
          color: #0A0B0F;
          font-family: 'Outfit', sans-serif;
          font-size: 17px;
          font-weight: 700;
          padding: 18px 40px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          text-decoration: none;
          width: fit-content;
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
          pointer-events: none;
        }

        .btn-primary:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(245,166,35,0.35);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        .btn-arrow {
          font-size: 20px;
          transition: transform 0.2s;
        }

        .btn-primary:hover .btn-arrow {
          transform: translateX(4px);
        }

        .promo-strip {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--dark-card);
          border: 1px solid var(--dark-border);
          border-radius: 12px;
          padding: 14px 18px;
          width: fit-content;
        }

        .promo-label {
          font-size: 12px;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .promo-code-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .promo-code {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          letter-spacing: 3px;
          color: var(--gold);
        }

        .copy-btn {
          background: rgba(245,166,35,0.12);
          border: 1px solid rgba(245,166,35,0.25);
          color: var(--gold);
          font-size: 12px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.3px;
        }

        .copy-btn:hover {
          background: rgba(245,166,35,0.22);
        }

        /* ─── RIGHT COLUMN ────────────────────── */
        .hero-right {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          opacity: 0;
          transform: scale(0.95) translateX(20px);
          transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
        }

        .hero-right.visible {
          opacity: 1;
          transform: scale(1) translateX(0);
        }

        /* Big bonus card */
        .bonus-card {
          background: var(--dark-card);
          border: 1px solid var(--dark-border);
          border-radius: 24px;
          padding: 48px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
          width: 340px;
        }

        .bonus-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .bonus-card::after {
          content: '';
          position: absolute;
          bottom: -40%;
          left: 50%;
          transform: translateX(-50%);
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .bonus-label {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .bonus-pct {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 110px;
          line-height: 1;
          color: var(--gold);
          letter-spacing: -2px;
          position: relative;
          z-index: 1;
        }

        .bonus-pct sup {
          font-size: 48px;
          vertical-align: super;
          letter-spacing: 0;
        }

        .bonus-sub {
          font-size: 14px;
          color: var(--text-muted);
          margin-top: 8px;
          margin-bottom: 32px;
          line-height: 1.5;
        }

        .bonus-sub strong {
          color: #fff;
          font-weight: 600;
        }

        /* Stats row */
        .stats-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .stat-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--dark-border);
          border-radius: 12px;
          padding: 14px;
        }

        .stat-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #fff;
        }

        .stat-label {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: 2px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* floating badge */
        .float-badge {
          position: absolute;
          z-index: 10;
          top: -16px;
          right: -16px;
          background: var(--gold);
          color: #0A0B0F;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.5px;
          padding: 8px 14px;
          border-radius: 100px;
          text-transform: uppercase;
          white-space: nowrap;
          animation: floatBadge 3s ease-in-out infinite;
          box-shadow: 0 8px 24px rgba(245,166,35,0.4);
        }

        @keyframes floatBadge {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-8px) rotate(-3deg); }
        }

        /* ─── BOTTOM BAR ──────────────────────── */
        .hero-bottom {
          position: relative;
          z-index: 5;
          border-top: 1px solid var(--dark-border);
          padding: 18px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .trust-items {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .trust-item svg {
          color: var(--gold);
          flex-shrink: 0;
        }

        .disclaimer {
          font-size: 11px;
          color: #444;
        }

        /* ─── RESPONSIVE ──────────────────────── */
        @media (max-width: 900px) {
          .hero-nav { padding: 20px 24px; }
          .hero-body {
            grid-template-columns: 1fr;
            padding: 40px 24px 60px;
            gap: 40px;
          }
          .hero-right { order: 1; }
          .bonus-card { width: 100%; max-width: 340px; }
          .float-badge { top: -12px; right: 16px; }
          .hero-bottom {
            flex-direction: column;
            gap: 12px;
            padding: 16px 24px;
          }
          .trust-items { flex-wrap: wrap; justify-content: center; gap: 16px; }
        }
      `}</style>

      <div className="hero-root" ref={heroRef}>

        {/* ── NAV ── */}
        <nav className="hero-nav">
          <div className="nav-logo">Promo<span>Bet</span></div>
          <div className="nav-badge">🔒 Code vérifié</div>
        </nav>

        {/* ── MAIN ── */}
        <div className="hero-body">

          {/* LEFT */}
          <div className="hero-left">
            <div className={`tag-line ${visible ? "visible" : ""}`}>
              <div className="tag-dot" />
              <span>Offre exclusive 2025</span>
            </div>

            <h1 className={`hero-title ${visible ? "visible" : ""}`}>
              Obtiens jusqu'à
              <span className="accent">200% de bonus</span>
              avec mon code 1xBet
            </h1>

            <div className={`hero-subtitle ${visible ? "visible" : ""}`}>
              <span className="pill"><span className="pill-icon">⚡</span> Inscription rapide</span>
              <span className="pill"><span className="pill-icon">🎁</span> Bonus immédiat</span>
              <span className="pill"><span className="pill-icon">📱</span> Compatible mobile</span>
            </div>

            <div className={`cta-group ${visible ? "visible" : ""}`}>
              <a
                href="https://www.1xbet.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Activer mon bonus
                <span className="btn-arrow">→</span>
              </a>

              <div className="promo-strip">
                <span className="promo-label">Code promo</span>
                <div className="promo-code-box">
                  <span className="promo-code">{PROMO_CODE}</span>
                  <button className="copy-btn" onClick={handleCopy}>
                    {copied ? "✓ Copié" : "Copier"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className={`hero-right ${visible ? "visible" : ""}`}>
            <div className="float-badge">✦ Sans dépôt minimum</div>
            <div className="bonus-card">
              <p className="bonus-label">Bonus de bienvenue</p>
              <div className="bonus-pct"><sup>+</sup>200<sup>%</sup></div>
              <p className="bonus-sub">
                Sur votre <strong>premier dépôt</strong><br />
                Valable jusqu'au 31 décembre 2025
              </p>
              <div className="stats-row">
                <div className="stat-box">
                  <div className="stat-value">5 min</div>
                  <div className="stat-label">Inscription</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">24/7</div>
                  <div className="stat-label">Disponible</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">+50</div>
                  <div className="stat-label">Sports couverts</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">100%</div>
                  <div className="stat-label">Sécurisé</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="hero-bottom">
          <div className="trust-items">
            <div className="trust-item">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Paiements sécurisés
            </div>
            <div className="trust-item">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Retraits rapides
            </div>
            <div className="trust-item">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Support 24/7
            </div>
          </div>
          <span className="disclaimer">18+ • Jeu responsable • Conditions applicables</span>
        </div>

      </div>
    </>
  );
}