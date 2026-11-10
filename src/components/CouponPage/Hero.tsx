// components/Hero.js
import { COUPON_DATA } from '@/constants/data'
import { CouponData } from '@/types/dataTypes'
import { SquareCheckBig, Users, Lock } from 'lucide-react'
import Image from 'next/image'
import CtaBtn from './CtaBtn'
import '../../app/Hero.css' // Assure-toi d'importer le fichier CSS

export default function Hero() {
  const currentCoupon: CouponData = COUPON_DATA

  // Valeurs de secours (fallback)
  const odds = currentCoupon?.odds ? currentCoupon.odds.toFixed(2) : "—"
  const stake = currentCoupon?.stake ? `${currentCoupon.stake.toLocaleString('fr-FR')} FCFA` : "—"
  const gain = currentCoupon?.gain ? `${currentCoupon.gain.toLocaleString('fr-FR')} FCFA` : "—"
  const couponImage = currentCoupon?.image_url || "/assets/image.png"
  const whatsappUrl = currentCoupon?.whatsapp_link || "https://chat.whatsapp.com/DTobg9SWau099IAdQ7WU4v"

  return (
    <section id="heroSection" className="hero-section">
      {/* Effet de lueur en arrière-plan */}
      <div className="hero-glow"></div>

      {/* Logo */}
      <div className="hero-logo">
        <Image 
          src="/abelo.webp" 
          alt="Logo BestPronos" 
          width={160} 
          height={160} 
          priority
          className='rounded-full'
        />
      </div>

      {/* Badge VIP */}
      <div className="hero-badge">
        <span className="dot"></span>
        Coupon VIP disponible aujourd'hui
      </div>

      {/* Titre principal */}
      <h1 className="hero-title">
        Récupère le coupon <br />
        <span>du jour</span>
      </h1>

      <p className="hero-subtitle">
        Coupon analysé • <strong>Cote élevée</strong> • Disponible uniquement dans notre groupe WhatsApp
      </p>

      {/* Design du Ticket */}
      <div className="ticket-wrapper">
        <div className="ticket-inner">
          
          {/* En-tête du ticket */}
          <div className="ticket-header">
            <div>
              <div className="ticket-label">Coupon VIP</div>
              <div className="ticket-val-small">{currentCoupon.date}</div>
            </div>
            <div className="ticket-odds">
              <div className="ticket-label">Cote totale</div>
              <div className="ticket-val-large">{odds}</div>
            </div>
          </div>

          {/* Corps du ticket (Image verrouillée) */}
          <div className="ticket-body">
            <Image 
              src={couponImage} 
              alt="Match du jour" 
              width={350} 
              height={350} 
              className="coupon-image"
              fetchPriority="high"
              sizes="(max-width: 768px) 322px, 400px"
              priority
            />
            
          </div>

          {/* Pied du ticket */}
          <div className="ticket-footer">
            <div>
              <div className="ticket-label">Mise totale</div>
              <div className="ticket-val-small">{stake}</div>
            </div>
            <div className="ticket-gain">
              <div className="ticket-label">Gain potentiel</div>
              <div className="ticket-val-bold">{gain}</div>
            </div>
          </div>

        </div>
      </div>

      {/* Call to Action */}
      <div className="hero-cta">
        <CtaBtn whatsappUrl={whatsappUrl} />
      </div>

      {/* Preuve sociale */}
      <div className="hero-social-proof">
        <div className="proof-item">
          <SquareCheckBig className="icon-emerald" size={20}/>
          <span>
            <strong>50</strong> coupons validés
          </span>
        </div>
        <div className="proof-divider"></div>
        <div className="proof-item">
          <Users className="icon-blue" size={20} />
          <span>
            <strong>+2 500</strong> membres actifs
          </span>
        </div>
      </div>
    </section>
  )
}