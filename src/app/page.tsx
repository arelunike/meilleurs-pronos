
// app/page.js
import FinalCTA from '@/components/CouponPage/FinalCTA'
import Hero from '@/components/CouponPage/Hero'
import InterstitialCTA from '@/components/CouponPage/InterstitialCTA'
import StickyBar from '@/components/CouponPage/StickyBar'
import TicketTicker from '@/components/CouponPage/TicketTicker'
import WhyJoin from '@/components/CouponPage/WhyJoin'
import WinningCoupons from '@/components/CouponPage/WinningCoupons'
import { COUPON_DATA } from '@/constants/data'

// Force le rendu en génération statique stricte (SSG)
export const dynamic = 'force-static'

export default function Home() {
  // Récupération instantanée depuis les constantes locales (Zéro latence)
  const whatsappLink = COUPON_DATA.whatsapp_link

  // Données structurées SEO (JSON-LD) pour donner de la force au site sur Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    'name': 'BestPronos VIP',
    'description': 'Analyses de pronostics sportifs et coupons à forte cote partagés quotidiennement.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'EUR',
      'url': whatsappLink
    }
  }

  return (
    <>
      {/* Injection des données structurées pour les robots de recherche Google */}
      <script
        type="application/ld-json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* On distribue le lien à chaque composant via les props */}
        <Hero />
        <div className="divider"></div>
        <WinningCoupons whatsappLink={whatsappLink} />

        <div className="divider"></div>

        <InterstitialCTA whatsappLink={whatsappLink} />
        <div className="divider"></div>

        <WhyJoin />
        <FinalCTA whatsappLink={whatsappLink} />
        <StickyBar whatsappLink={whatsappLink} />
      </main>
    </>
  );
}