"use client";

import { useState } from "react";

const NAV_LINKS = {
  "Navigation": [
    { label: "Accueil",            href: "/" },
    { label: "Pourquoi ce code ?", href: "#why" },
    { label: "Comment ça marche ?",href: "#how" },
    { label: "Bonus & avantages",  href: "#bonus" },
    { label: "Avis utilisateurs",  href: "#reviews" },
    { label: "FAQ",                href: "#faq" },
  ],
  "1xBet": [
    { label: "Créer un compte",    href: "https://www.1xbet.com" },
    { label: "Paris sportifs",     href: "https://www.1xbet.com/sport" },
    { label: "Casino en ligne",    href: "https://www.1xbet.com/casino" },
    { label: "Application mobile", href: "https://www.1xbet.com/mobile" },
    { label: "Live betting",       href: "https://www.1xbet.com/live" },
  ],
  "Légal": [
    { label: "Mentions légales",          href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
    { label: "Conditions d'utilisation", href: "/conditions" },
    { label: "Jeu responsable",           href: "/jeu-responsable" },
    { label: "Cookies",                   href: "/cookies" },
  ],
};

const SOCIALS = [
  {
    name: "Telegram",
    href: "https://t.me/votrepseudo",
    color: "#29B6F6",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.24 13.627l-2.94-.918c-.64-.203-.653-.64.135-.954l11.57-4.461c.532-.194.998.13.889.927z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/33600000000",
    color: "#4CAF50",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.1 1.524 5.823L.057 23.7l5.991-1.573A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.127 16.933c-.258.724-1.51 1.385-2.073 1.47-.55.083-1.243.117-2.006-.126-.463-.148-1.058-.346-1.817-.68-3.197-1.38-5.283-4.62-5.444-4.834-.162-.214-1.32-1.754-1.32-3.346 0-1.592.833-2.375 1.129-2.699.296-.323.645-.404.86-.404.215 0 .43.002.618.01.198.009.464-.075.726.554.27.647.918 2.239.998 2.4.08.161.134.35.027.564-.108.215-.162.35-.323.538-.162.188-.34.42-.485.564-.162.16-.33.334-.142.654.188.32.835 1.376 1.794 2.23 1.233 1.098 2.273 1.437 2.594 1.598.32.162.508.135.697-.081.188-.215.807-.942 1.022-1.265.215-.323.43-.269.726-.162.296.108 1.886.889 2.207 1.05.32.162.538.242.618.377.08.134.08.778-.178 1.503z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://twitter.com/votrepseudo",
    color: "#E0E0E0",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@votrepseudo",
    color: "#F44336",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@votrepseudo",
    color: "#E0E0E0",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

function SocialButton({ social }: { social: typeof SOCIALS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.name}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 40, height: 40,
        borderRadius: 10,
        border: `1px solid ${hovered ? social.color + "60" : "#1E2230"}`,
        background: hovered ? social.color + "18" : "#12141A",
        color: hovered ? social.color : "#8B92A5",
        display: "flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 20px ${social.color}22` : "none",
        transition: "all 0.25s",
        flexShrink: 0,
      }}
    >
      {social.icon}
    </a>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 13,
        color: hovered ? "#F5A623" : "#8B92A5",
        textDecoration: "none",
        fontFamily: "'Outfit', sans-serif",
        fontWeight: 500,
        display: "flex", alignItems: "center", gap: 6,
        transition: "color 0.2s",
      }}
    >
      <span style={{
        width: 5, height: 5, borderRadius: "50%",
        background: hovered ? "#F5A623" : "#2a2d38",
        flexShrink: 0, transition: "background 0.2s",
      }} />
      {label}
    </a>
  );
}

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');
        .footer-nav-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        @media (max-width: 768px) {
          .footer-main     { flex-direction: column !important; }
          .footer-nav-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
          .footer-bottom   { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; }
        }
        @media (max-width: 480px) {
          .footer-nav-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <footer style={{
        background: "#080910",
        borderTop: "1px solid #1E2230",
        fontFamily: "'Outfit', sans-serif",
      }}>

        {/* ── CTA Banner ── */}
        <div style={{
          background: "linear-gradient(135deg, #12141A 0%, #161926 100%)",
          borderBottom: "1px solid #1E2230",
          padding: "40px 48px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 2,
            background: "linear-gradient(90deg, transparent, #F5A623, transparent)",
          }} />
          <div style={{
            position: "absolute", right: "-5%", top: "50%", transform: "translateY(-50%)",
            width: 300, height: 300,
            background: "radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />
          <div style={{
            maxWidth: 1100, margin: "0 auto",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: 24,
            flexWrap: "wrap", position: "relative", zIndex: 1,
          }}>
            <div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                color: "#fff", letterSpacing: "1px", marginBottom: 6,
              }}>
                Prêt à activer ton{" "}
                <span style={{ color: "#F5A623" }}>+130% de bonus</span> ?
              </div>
              <div style={{ fontSize: 14, color: "#8B92A5" }}>
                Inscription gratuite · Bonus immédiat · Code{" "}
                <span style={{ color: "#F5A623", fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1px" }}>
                  BONUS130
                </span>
              </div>
            </div>
            <CtaBannerButton />
          </div>
        </div>

        {/* ── Main footer ── */}
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 48px 40px" }}>
          <div className="footer-main" style={{ display: "flex", gap: 60, marginBottom: 52 }}>

            {/* Brand column */}
            <div style={{ minWidth: 220, flexShrink: 0 }}>
              {/* Logo */}
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 28, letterSpacing: "2px",
                color: "#fff", marginBottom: 14,
              }}>
                Promo<span style={{ color: "#F5A623" }}>Bet</span>
              </div>

              <p style={{
                fontSize: 13, lineHeight: 1.7, color: "#8B92A5",
                marginBottom: 24, maxWidth: 240,
              }}>
                Site affilié indépendant. Nous aidons les parieurs à obtenir le meilleur bonus de bienvenue sur 1xBet.
              </p>

              {/* Socials */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {SOCIALS.map((s, i) => (
                  <SocialButton key={i} social={s} />
                ))}
              </div>

              {/* Contact block */}
              <div style={{
                marginTop: 24,
                background: "#12141A",
                border: "1px solid #1E2230",
                borderRadius: 12, padding: "14px 16px",
                display: "flex", flexDirection: "column", gap: 10,
              }}>
                <ContactItem
                  icon="💬"
                  label="Telegram"
                  value="@votrepseudo"
                  href="https://t.me/votrepseudo"
                />
                <div style={{ height: 1, background: "#1E2230" }} />
                <ContactItem
                  icon="📲"
                  label="WhatsApp"
                  value="+33 6 00 00 00 00"
                  href="https://wa.me/33600000000"
                />
              </div>
            </div>

            {/* Nav links */}
            <div className="footer-nav-grid" style={{ flex: 1 }}>
              {Object.entries(NAV_LINKS).map(([title, links]) => (
                <div key={title}>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 16, letterSpacing: "1.5px",
                    color: "#fff", marginBottom: 18,
                    textTransform: "uppercase",
                  }}>
                    {title}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                    {links.map((link, i) => (
                      <FooterLink key={i} href={link.href} label={link.label} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Responsible gambling strip ── */}
          <div style={{
            background: "#12141A",
            border: "1px solid #1E2230",
            borderRadius: 14, padding: "18px 24px",
            display: "flex", alignItems: "center", gap: 14,
            marginBottom: 36, flexWrap: "wrap",
          }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>⚠️</span>
            <p style={{ fontSize: 12, color: "#8B92A5", lineHeight: 1.65, margin: 0, flex: 1 }}>
              <strong style={{ color: "#C8CDD8" }}>Jeu responsable.</strong>{" "}
              Les jeux d&apos;argent peuvent créer une dépendance. Jouez de manière responsable et ne misez que ce que vous pouvez vous permettre de perdre. Interdit aux moins de 18 ans.
              {" "}<a href="/jeu-responsable" style={{ color: "#F5A623", textDecoration: "none" }}>En savoir plus →</a>
            </p>
            <div style={{
              display: "flex", gap: 10, flexShrink: 0, flexWrap: "wrap",
            }}>
              {["18+", "🔒 SSL", "✓ Licencié"].map((badge, i) => (
                <span key={i} style={{
                  background: "#1E2230",
                  border: "1px solid #2a2d38",
                  borderRadius: 6, padding: "4px 10px",
                  fontSize: 11, fontWeight: 600, color: "#8B92A5",
                }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div
            className="footer-bottom"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              paddingTop: 24,
              borderTop: "1px solid #1E2230",
            }}
          >
            <div style={{ fontSize: 12, color: "#444" }}>
              © {new Date().getFullYear()} PromoBet. Site affilié indépendant non lié à 1xBet Corp.
            </div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[
                { label: "Mentions légales",   href: "/mentions-legales" },
                { label: "Confidentialité",     href: "/confidentialite" },
                { label: "Cookies",             href: "/cookies" },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  style={{ fontSize: 12, color: "#444", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#8B92A5")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#444")}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ── Sous-composants ─────────────────────────── */
function CtaBannerButton() {
  const [hovered, setHovered] = useState(false);
  return (
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
        fontSize: 15, fontWeight: 700,
        padding: "15px 36px", borderRadius: 12,
        textDecoration: "none",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 30px rgba(245,166,35,0.38)" : "none",
        transition: "all 0.2s", whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      Activer mon bonus →
    </a>
  );
}

function ContactItem({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        textDecoration: "none",
      }}
    >
      <span style={{ fontSize: 18 }}>{icon}</span>
      <div>
        <div style={{ fontSize: 10, color: "#555", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          {label}
        </div>
        <div style={{
          fontSize: 13, fontWeight: 600,
          color: hovered ? "#F5A623" : "#C8CDD8",
          transition: "color 0.2s",
        }}>
          {value}
        </div>
      </div>
    </a>
  );
}