"use client"; // 👈 OBLIGATOIRE dans l'App Router de Next.js pour utiliser onClick et window

import { SquareArrowRightEnter } from 'lucide-react';
import '../../app/CtaBtn.css'; // N'oublie pas d'importer le fichier CSS

// Déclaration propre de fbq pour TypeScript
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

interface CtaBtnProps {
  whatsappUrl: string;
}

function CtaBtn({ whatsappUrl }: CtaBtnProps) {

  const handleWhatsAppClick = () => {
    // Vérification propre si fbq est chargé dans le navigateur
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Contact", {
        content_name: "Rejoindre la chaîne WhatsApp",
        content_category: "Community"
      }); 
      // console.log("Meta Pixel: Événement Contact envoyé !");
    }
  };

  return (
    <div className="cta-wrapper">
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn-whatsapp" 
        onClick={handleWhatsAppClick}
      >
        <span className="btn-icon">
          <SquareArrowRightEnter size={22} strokeWidth={2.5} />
        </span>
        <span className="btn-text">Rejoindre la chaîne</span>
      </a>
    </div>
  );
}

export default CtaBtn;