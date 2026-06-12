import { MessageCircle } from "lucide-react";
import { useState } from "react";

export function WaBtn({ label = "Rejoindre le groupe WhatsApp", large = false, full = false, WA_URL, G }:{ label?: string; large?: boolean; full?: boolean; WA_URL: string; G: string }) {
  const [h, setH] = useState(false);
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        gap: 10, textDecoration: "none",
        background: h ? "#16a34a" : G,
        color: "#fff",
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: large ? 18 : 15,
        padding: large ? "18px 48px" : "13px 30px",
        borderRadius: 14,
        width: full ? "100%" : "auto",
        boxShadow: h
          ? "0 0 0 4px rgba(34,197,94,0.2), 0 16px 40px rgba(34,197,94,0.4)"
          : "0 6px 24px rgba(34,197,94,0.28)",
        transform: h ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s ease",
        position: "relative", overflow: "hidden",
      }}
    >
      <span style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg,rgba(255,255,255,0.14) 0%,transparent 55%)",
        pointerEvents: "none",
      }} />
      <MessageCircle size={large ? 22 : 17} />
      {label}
    </a>
  );
}