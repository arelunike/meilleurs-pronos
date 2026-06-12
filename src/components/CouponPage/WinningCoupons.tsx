// components/WinningCoupons.js
// Pas de 'use client' ici, ce composant s'exécute côté serveur

import { WONNING_COUPONS } from '@/constants/data'
import ScaleCarousel from '../Embla-carousel/ScaleCarousel'
import { Activity } from 'lucide-react'

export default function WinningCoupons({ whatsappLink }: { whatsappLink: string }) {
  const coupons = WONNING_COUPONS

  return (
    <section id='winningCouponsSection' className="py-10">
      <h2 className="section-title flex justify-center items-center gap-2">
        <Activity size={46} color="#F5A623" /> Derniers coupons <span className="text-amber-500">gagnants</span>
      </h2>
      
      {/* On passe les données au composant client */}
      <ScaleCarousel winCoupons={coupons} whatsappLink={whatsappLink} />
    </section>
  )
}