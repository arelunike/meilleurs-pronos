// components/FinalCTA.js
import CtaBtn from "./CtaBtn";
import '../../app/FinalCTA.css'; // Import du fichier CSS

export default function FinalCTA({ whatsappLink }: { whatsappLink: string }) {
  return (
    <section id="finalCTASection" className="final-section">
      <div className="final-container">
        
        {/* Effet de lueur en arrière-plan pour attirer l'œil */}
        <div className="final-glow"></div>

        <h2 className="final-title">
          Le coupon du jour
          <br />
          est encore <span>disponible 🔥</span>
        </h2>
        
        <p className="final-desc">
          Rejoins la chaîne maintenant et crée ton compte pour commencer à gagner dès ce soir.
        </p>
        
        <div className="final-cta-wrapper">
          <CtaBtn whatsappUrl={whatsappLink} />
        </div>

      </div>
    </section>
  );
}