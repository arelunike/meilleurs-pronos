// // app/page.js
// import { createServerClient } from '@/lib/createCLient'
// import FinalCTA from '@/components/CouponPage/FinalCTA'
// import Hero from '@/components/CouponPage/Hero'
// import InterstitialCTA from '@/components/CouponPage/InterstitialCTA'
// import StickyBar from '@/components/CouponPage/StickyBar'
// import TicketTicker from '@/components/CouponPage/TicketTicker'
// import WhyJoin from '@/components/CouponPage/WhyJoin'
// import WinningCoupons from '@/components/CouponPage/WinningCoupons'

// // Cache Next.js : Revalider la page toutes les X secondes (ex: 60s) pour ne pas saturer Supabase
// export const revalidate = 60 

// async function getWhatsappLink() {
//   try {
//     const supabase = createServerClient()
//     const { data } = await supabase
//       .from('coupons')
//       .select('whatsapp_link')
//       .eq('id', 1)
//       .single()

//     return data?.whatsapp_link || 'https://wa.me/votre_numero_par_defaut'
//   } catch (error) {
//     console.error("Erreur récupération lien WhatsApp:", error)
//     return 'https://wa.me/votre_numero_par_defaut'
//   }
// }

// export default async function Home() {
//   // Récupération unique côté serveur
//   const whatsappLink = await getWhatsappLink()

//   return (
//     <main>
//       {/* On distribue le lien à chaque composant via les props */}
//       <Hero/>
//       <TicketTicker />
//       <WinningCoupons whatsappLink={whatsappLink} />
      
//       <div className="divider"></div>
//       <InterstitialCTA whatsappLink={whatsappLink} />
//       <div className="divider"></div>
      
//       <WhyJoin/>
//       <FinalCTA whatsappLink={whatsappLink} />
//       <StickyBar whatsappLink={whatsappLink} />
//     </main>
//   )
// }