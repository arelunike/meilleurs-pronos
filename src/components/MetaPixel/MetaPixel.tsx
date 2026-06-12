// components/MetaPixel.js
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Cette fonction s'exécute à chaque fois que l'utilisateur change de page
    if (typeof (window as any).fbq !== "undefined") {
      (window as any).fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return (
    <>
      {/* 1. Chargement du script principal Meta Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1041696028281802'); // ⚠️ REMPLACEZ PAR VOTRE ID
            fbq('track', 'PageView');
          `,
        }}
      />
      {/* 2. Solution de secours si JavaScript est désactivé */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?1041696028281802&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}