"use client";

import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    q: "Comment obtenir le bonus ?",
    a: "C'est simple : clique sur le bouton d'inscription, crée ton compte 1xBet, et saisis le code promo BONUS130 dans le champ prévu à cet effet. Ton bonus de +130% est automatiquement crédité sur ton premier dépôt.",
    icon: "🎁",
  },
  {
    q: "Le code promo est-il obligatoire ?",
    a: "Sans le code, tu reçois uniquement le bonus standard. Avec le code BONUS130, tu obtiens +130% au lieu de l'offre de base. Il est donc fortement recommandé de l'utiliser pour maximiser ton bonus de bienvenue.",
    icon: "🔑",
  },
  {
    q: "Puis-je utiliser mon téléphone pour m'inscrire ?",
    a: "Oui, 1xBet est entièrement compatible mobile. L'application est disponible gratuitement sur iOS (App Store) et Android (APK direct ou Play Store selon ta région). Tu peux t'inscrire, déposer et parier depuis ton téléphone.",
    icon: "📱",
  },
  {
    q: "Le bonus fonctionne-t-il dans mon pays ?",
    a: "1xBet est disponible dans plus de 100 pays, notamment en France, Belgique, Côte d'Ivoire, Sénégal, Cameroun, Mali, Canada et bien d'autres. Vérifie les conditions d'utilisation propres à ta région pour confirmer l'éligibilité.",
    icon: "🌍",
  },
  {
    q: "Comment retirer mes gains ?",
    a: "1xBet propose plus de 10 méthodes de retrait : virement bancaire, carte Visa/Mastercard, PayPal, Skrill, cryptomonnaies, Wave, Orange Money, MTN Money, etc. Les retraits sont généralement traités en moins de 24 heures.",
    icon: "💸",
  },
  {
    q: "Y a-t-il des conditions pour débloquer le bonus ?",
    a: "Le bonus de bienvenue doit être misé 5 fois sur des paris avec une cote minimale de 1.40 avant de pouvoir être retiré. Cette condition est standard dans l'industrie et tout à fait réalisable avec une stratégie simple.",
    icon: "📋",
  },
];

function FaqItem({ item, index, isOpen, onToggle }: { item: typeof FAQS[0], index: number, isOpen: boolean, onToggle: () => void }) {
  const [visible, setVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const contentHeight = isOpen && contentRef.current
    ? contentRef.current.scrollHeight
    : 0;

  return (
    <div
      ref={ref}
      style={{
        background: isOpen ? "#14161E" : "#12141A",
        border: `1px solid ${isOpen ? "rgba(245,166,35,0.4)" : "#1E2230"}`,
        borderRadius: 16,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s, border 0.3s, background 0.3s`,
      }}
    >
      {/* Question row */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "22px 28px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Icon bubble */}
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: isOpen ? "rgba(245,166,35,0.15)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${isOpen ? "rgba(245,166,35,0.3)" : "#1E2230"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 17,
            transition: "background 0.3s, border 0.3s",
          }}>
            {item.icon}
          </div>

          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 15,
            fontWeight: 600,
            color: isOpen ? "#fff" : "#C8CDD8",
            transition: "color 0.3s",
            lineHeight: 1.4,
          }}>
            {item.q}
          </span>
        </div>

        {/* Chevron */}
        <div style={{
          width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
          background: isOpen ? "#F5A623" : "rgba(255,255,255,0.05)",
          border: `1px solid ${isOpen ? "#F5A623" : "#1E2230"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.3s, border 0.3s",
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6h8" stroke={isOpen ? "#0A0B0F" : "#8B92A5"} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      </button>

      {/* Answer — animated height */}
      <div style={{
        maxHeight: isOpen ? `${contentHeight}px` : "0px",
        overflow: "hidden",
        transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div ref={contentRef} style={{ padding: "0 28px 24px 80px" }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 14, lineHeight: 1.75,
            color: "#8B92A5", margin: 0,
          }}>
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
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

  const toggle = (i : number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@400;500;600;700&display=swap');
        @keyframes faqPulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
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

        {/* Grid texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(rgba(245,166,35,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        {/* Ambient blob */}
        <div style={{
          position: "absolute", left: "-5%", top: "20%",
          width: 480, height: 480,
          background: "radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        <div style={{
          maxWidth: 820,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}>
          {/* ── Header ── */}
          <div ref={titleRef} style={{ textAlign: "center", marginBottom: 56 }}>
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
                animation: "faqPulse 2s infinite",
              }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#F5A623", letterSpacing: "1px", textTransform: "uppercase" }}>
                Questions fréquentes
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
              Toutes tes <span style={{ color: "#F5A623" }}>questions</span>,{" "}
              répondues
            </h2>

            <p style={{
              fontSize: 15, color: "#8B92A5",
              maxWidth: 440, margin: "0 auto", lineHeight: 1.65,
              opacity: titleVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.2s",
            }}>
              Tu as un doute ? Voici les réponses aux questions les plus posées avant de s&apos;inscrire.
            </p>
          </div>

          {/* ── FAQ list ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQS.map((item, i) => (
              <FaqItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>

          {/* ── Bottom CTA ── */}
          <div style={{
            marginTop: 48,
            background: "#12141A",
            border: "1px solid #1E2230",
            borderRadius: 16,
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            opacity: titleVisible ? 1 : 0,
            transition: "opacity 0.7s ease 0.5s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 28 }}>💬</span>
              <div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 20, color: "#fff", letterSpacing: "0.5px", marginBottom: 3,
                }}>
                  Tu as une autre question ?
                </div>
                <div style={{ fontSize: 13, color: "#8B92A5" }}>
                  Contacte-nous directement sur Telegram — réponse en moins d&apos;1h.
                </div>
              </div>
            </div>
            <a
              href="https://t.me/votrepseudo"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "transparent",
                border: "1.5px solid #F5A623",
                color: "#F5A623",
                fontFamily: "'Outfit', sans-serif",
                fontSize: 14, fontWeight: 700,
                padding: "11px 24px", borderRadius: 10,
                textDecoration: "none",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#F5A623";
                e.currentTarget.style.color = "#0A0B0F";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#F5A623";
              }}
            >
              Nous contacter →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}