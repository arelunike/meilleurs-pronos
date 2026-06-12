// app/layout.js
import { Suspense } from 'react';
import './globals.css'
import { Bebas_Neue, Outfit } from 'next/font/google'
import MetaPixel from '@/components/MetaPixel/MetaPixel';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
})

const outfit = Outfit({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-outfit',
})

// ─── OPTIMISATION SEO AVANCÉE ────────────────────────────────────────────────
export const metadata = {
  title: 'BestPronos – Récupère ton Coupon du Jour',
  description: 'Découvrez nos pronostics et coupons analysés à forte cote. Rejoignez notre communauté VIP exclusive sur WhatsApp pour maximiser vos gains dès aujourd’hui.',
  keywords: ['pronostics sportifs', 'coupon du jour', 'meilleur pronostiqueur', 'groupe vip whatsapp', 'pronos football', 'cote safe', 'coupon validé', 'gains sportifs', 'analyses de matchs','coupon gratuit', 'coupon grosse cote'],
  
  // ⚠️ Pensez à remplacer par votre domaine final dès que vous l'aurez acheté
  metadataBase: new URL('https://bestpronos.vercel.app'), 
  
  alternates: {
    canonical: '/',
  },

  // Indexation par les moteurs de recherche
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph (Optimise l'aperçu du lien quand vous le partagez sur WhatsApp, Telegram, Facebook)
  openGraph: {
    title: 'BestPronos – Le Coupon du Jour Analysé',
    description: 'Ne ratez pas les pronostics du jour. Accès direct au groupe VIP WhatsApp.',
    url: 'https://bestpronos.vercel.app',
    siteName: 'BestPronos',
    images: [
      {
        url: '/og-image.png', // Assurez-vous d'avoir ce fichier 1200x630px dans votre dossier /public
        width: 1200,
        height: 630,
        alt: 'Aperçu BestPronos - Coupon du jour',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },

  // Configuration Twitter / X Card
  twitter: {
    card: 'summary_large_image',
    title: 'BestPronos – Récupère ton Coupon du Jour',
    description: 'Pronostics sportifs à forte cote mis à jour quotidiennement.',
    images: ['/og-image.png'],
  },
  
  // Configuration des icônes corrigée pour Apple/iOS
  icons: {
    icon: "/logo1.ico",
    shortcut: "/logo1.ico",
    apple: "/apple-touch-icon.png", // 💡 Convertissez votre logo en PNG de 180x180px pour les iPhones !
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${bebasNeue.variable} ${outfit.variable}`}>
      <head>
        {/* Balise thématique pour colorer la barre de navigation mobile */}
        <meta name="theme-color" content="#12141A" />
      </head>
      <body style={{ backgroundColor: '#12141A', color: '#ffffff', minHeight: '100vh' }}>
        {/* Le pixel est parfaitement isolé dans sa Suspense (Indispensable pour le build Next.js statique) */}
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>
        {children}
      </body>
    </html>
  )
}