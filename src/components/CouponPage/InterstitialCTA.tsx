// components/InterstitialCTA.js
import { Lock } from "lucide-react";
import CtaBtn from "./CtaBtn";
import '../../app/InterstitialCTA.css'; // N'oublie pas d'importer le fichier CSS

export default function InterstitialCTA({ whatsappLink }: { whatsappLink: string }) {
  return (
    <section id="interstitialCTASection" className="inter-section">
      <div className="inter-card">
        
        {/* Icône de cadenas stylisée */}
        <div className="inter-icon-wrapper">
          <Lock size={32} className="inter-icon" strokeWidth={2.5} />
          <div className="inter-icon-glow"></div>
        </div>

        {/* Titre */}
        <h2 className="inter-title">
          Prochains coupons
          <br />
          <span>publiés en avant-première</span>
        </h2>

        {/* Description */}
        <p className="inter-desc">
          Les sélections sont partagées <strong>directement sur WhatsApp</strong> avant le début des matchs. Ne rate pas le prochain.
        </p>

        {/* Bouton d'action */}
        <div className="inter-cta-wrapper">
          <CtaBtn whatsappUrl={whatsappLink} />
        </div>
        
      </div>
    </section>
  );
}