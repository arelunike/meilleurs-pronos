// components/WhyJoin.js
import { Activity, Bell, Zap } from "lucide-react";
import '../../app/WhyJoin.css'; // N'oublie pas d'importer le fichier CSS

export default function WhyJoin() {
  const reasons = [
    {
      icon: Zap,
      title: 'Coupons rapides',
      description: 'Reçois les coupons avant tout le monde, directement sur ton téléphone.',
    },
    {
      icon: Activity,
      title: 'Coupons analysés',
      description: 'Sélections optimisées quotidiennement par notre équipe d\'experts.',
    },
    {
      icon: Bell,
      title: 'Alertes instantanées',
      description: 'Notification directe sur WhatsApp avant le coup d\'envoi.',
    },
  ];

  return (
    <section id="whyJoinSection" className="why-section">
      <div className="why-container">
        <h2 className="why-title">
          Pourquoi nous <span>rejoindre ?</span>
        </h2>

        <div className="why-grid">
          {reasons.map((reason, idx) => (
            <div key={idx} className="why-card">
              <div className="why-icon-wrapper">
                <reason.icon size={28} className="why-icon" strokeWidth={2.5} />
                <div className="why-icon-glow"></div>
              </div>
              <div className="why-content">
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}