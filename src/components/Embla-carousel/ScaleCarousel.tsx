"use client";

import React, { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { CircleCheckBig, SquareArrowRightEnter, Trophy } from "lucide-react";
import { WinningCoupon } from "@/types/dataTypes";
import CtaBtn from "../CouponPage/CtaBtn";


// Interface pour encapsuler proprement les props du composant
interface ScaleCarouselProps {
  winCoupons: WinningCoupon[];
  whatsappLink: string;
}

/* ─── VIDEO POPUP ──────────────────────────────────────────────────────────── */
interface VideoPopupProps {
  videoUrl: string;
  onClose: () => void;
  whatsappLink: string;
}

const VideoPopup = ({ videoUrl, onClose, whatsappLink }: VideoPopupProps) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="vp-backdrop" onClick={onClose}>
      <div className="vp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="vp-close" onClick={onClose} aria-label="Fermer">✕</button>
        <video className="vp-video" src={videoUrl} autoPlay controls playsInline/>
        <div className="vp-label">
          <Trophy size={15} color="#F5A623" strokeWidth={1.75} absoluteStrokeWidth /> Résultat du coupon &nbsp;·&nbsp; <span>Groupe VIP</span>
        </div>
        <div className="flex justify-center items-center" style={{ padding: '16px' }}>
          <CtaBtn whatsappUrl={whatsappLink} />
        </div>
      </div>
    </div>
  );
};

/* ─── COMPONENT ─────────────────────────────────────────────────────────────── */
// 2. Correction ici : On destructure proprement l'objet props { winCoupons }
export default function ScaleCarousel({ winCoupons, whatsappLink }: ScaleCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    skipSnaps: false,
    dragFree: false,
    containScroll: "keepSnaps",
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Sécurité additionnelle si la table est vide ou en cours de chargement
  if (!winCoupons || winCoupons.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 font-medium text-sm">
        Aucun coupon validé disponible pour le moment.
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700&display=swap');

        .carousel-container { position: relative; width: 100%; padding: 24px 0 16px; }
        .embla { width: 100%; }
        .embla__viewport { overflow: hidden; width: 100%; }
        .embla__container { display: flex; align-items: center; gap: 0; will-change: transform; }
        .embla__slide {
          flex: 0 0 80%;
          min-width: 0;
          padding: 12px 10px;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease;
          transform: scale(0.88);
          opacity: 0.55;
          display: flex;
          justify-content: center;
        }
        .embla__slide.is-selected { transform: scale(1); opacity: 1; z-index: 2; }
        .win-card {
          width: 100%;
          max-width: 360px;
          background: #12141A;
          border: 1px solid #1E2230;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.5);
          transition: box-shadow 0.4s ease;
        }
        .embla__slide.is-selected .win-card {
          border-color: rgba(245,166,35,0.35);
          box-shadow: 0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,166,35,0.15), 0 0 50px rgba(245,166,35,0.08);
        }
        .win-card-image { position: relative; width: 100%; height: auto; aspect-ratio: 3 / 4; }
        .win-card-image::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 55%, rgba(10,11,15,0.85) 100%);
          z-index: 1; pointer-events: none;
        }
        .win-card-content { padding: 0; }
        .win-card-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid #1E2230; }
        .badge-valid {
          display: inline-flex; align-items: center; gap: 5px; background: rgba(37,211,102,0.12);
          border: 1px solid rgba(37,211,102,0.3); color: #25D366; font-size: 11px; font-weight: 700;
          letter-spacing: 0.07em; padding: 4px 10px; border-radius: 100px; font-family: 'Outfit', sans-serif;
        }
        .win-date { font-size: 11px; color: #8B92A5; font-family: 'Outfit', sans-serif; }
        .win-stats { display: grid; grid-template-columns: repeat(3, 1fr); }
        .win-stat { text-align: center; padding: 12px 8px; border-right: 1px solid #1E2230; }
        .win-stat:last-child { border-right: none; }
        .s-label { font-size: 10px; color: #8B92A5; text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 4px; font-family: 'Outfit', sans-serif; }
        .s-val { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: #FFD580; letter-spacing: 0.04em; }
        .s-val.green { color: #25D366; }
        .win-card-footer { padding: 10px 16px; background: rgba(245,166,35,0.04); border-top: 1px solid #1E2230; font-size: 11px; color: #8B92A5; text-align: center; font-family: 'Outfit', sans-serif; }
        .win-card-footer span { color: #F5A623; font-weight: 600; }
        .carousel-button {
          position: absolute; top: 50%; transform: translateY(-60%); width: 36px; height: 36px; border-radius: 50%;
          border: 1px solid #1E2230; background: rgba(18,20,26,0.92); color: #F5A623; font-size: 16px;
          display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10;
          transition: background 0.2s, border-color 0.2s; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); line-height: 1;
        }
        .carousel-button:hover { background: rgba(245,166,35,0.12); border-color: rgba(245,166,35,0.4); }
        .carousel-button.prev { left: 4px; }
        .carousel-button.next { right: 4px; }
        .pagination { display: flex; justify-content: center; gap: 8px; margin-top: 20px; }
        .pagination-bullet { width: 8px; height: 8px; border-radius: 100px; border: none; background: #1E2230; cursor: pointer; padding: 0; transition: width 0.3s ease, background 0.3s ease; }
        .pagination-bullet.active { width: 24px; background: #F5A623; }
        @media (max-width: 400px) { .embla__slide { flex: 0 0 88%; } }

        .play-btn {
          position: absolute; bottom: 14px; right: 14px; z-index: 2; display: flex; align-items: center; gap: 8px;
          background: rgba(10,11,15,0.68); border: 1px solid rgba(245,166,35,0.55); color: #F5A623;
          font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.05em;
          padding: 8px 14px 8px 8px; border-radius: 100px; cursor: pointer; backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px); transition: background 0.2s, border-color 0.2s, transform 0.15s;
          -webkit-tap-highlight-color: transparent;
        }
        .play-btn:hover { background: rgba(245,166,35,0.16); border-color: rgba(245,166,35,0.9); transform: scale(1.04); }
        .play-btn:active { transform: scale(0.97); }
        .play-btn__circle { width: 24px; height: 24px; border-radius: 50%; background: #F5A623; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .play-btn__circle svg { width: 9px; height: 9px; fill: #0A0B0F; margin-left: 2px; }

        .vp-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.88); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; animation: vp-in 0.22s ease; }
        @keyframes vp-in { from { opacity: 0; } to { opacity: 1; } }
        .vp-modal { position: relative; width: 100%; max-width: 480px; background: #12141A; border: 1px solid rgba(245,166,35,0.2); border-radius: 20px; overflow: hidden; box-shadow: 0 24px 80px rgba(0,0,0,0.85), 0 0 80px rgba(245,166,35,0.06); animation: vp-up 0.28s cubic-bezier(0.25, 1, 0.5, 1); }
        @keyframes vp-up { from { transform: translateY(32px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .vp-close { position: absolute; top: 12px; right: 12px; z-index: 10; width: 32px; height: 32px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.14); background: rgba(10,11,15,0.75); color: #fff; font-size: 13px; display: flex; align-items: center; justify-content: center; cursor: pointer; backdrop-filter: blur(8px); transition: background 0.2s, color 0.2s; }
        .vp-close:hover { background: rgba(245,166,35,0.2); color: #F5A623; border-color: rgba(245,166,35,0.5); }
        .vp-video { display: block; width: 100%; max-height: 72vh; background: #000; outline: none; }
        .vp-label { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 12px 16px; font-family: 'Outfit', sans-serif; font-size: 12px; color: #8B92A5; text-align: center; border-top: 1px solid #1E2230; background: rgba(245,166,35,0.03); }
        .vp-label span { color: #F5A623; font-weight: 600; }
      `}</style>

      {activeVideo && (
        <VideoPopup videoUrl={activeVideo} onClose={() => setActiveVideo(null)} whatsappLink={whatsappLink} />
      )}

      <div className="carousel-container">
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {winCoupons.map((coupon, index) => (
                <div
                  key={coupon.id}
                  className={`embla__slide${selectedIndex === index ? " is-selected" : ""}`}
                >
                  <div className="win-card">
                    <div className="win-card-image">
                      {coupon.image_url ? (
                        <Image
                          src={coupon.image_url}
                          alt={`Coupon gagnant n°${coupon.id}`}
                          fill
                          style={{ objectFit: "contain" }}
                          sizes="(max-width: 480px) 88vw, 360px"
                          priority={index === 0}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center text-xs text-gray-600">
                          Aucun visuel
                        </div>
                      )}

                      {/* N'affiche le bouton play que si une vidéo existe */}
                      {coupon.video_url && (
                        <button
                          className="play-btn"
                          onClick={() => setActiveVideo(coupon.video_url)}
                          aria-label="Voir la vidéo du résultat"
                        >
                          <span className="play-btn__circle">
                            <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                              <polygon points="2,1 9,5 2,9" />
                            </svg>
                          </span>
                          Voir le résultat
                        </button>
                      )}
                    </div>

                    <div className="win-card-content">
                      <div className="win-card-header">
                        <div className="badge-valid"><CircleCheckBig size={16} color="#25D366" /> VALIDÉ</div>
                        <div className="win-date">{coupon.date || "—"}</div>
                      </div>

                      <div className="win-stats">
                        <div className="win-stat">
                          <div className="s-label">Cote</div>
                          <div className="s-val">x{coupon.odds || "—"}</div>
                        </div>
                        <div className="win-stat">
                          <div className="s-label">Mise</div>
                          <div className="s-val">{coupon.stake || "—"}</div>
                        </div>
                        <div className="win-stat">
                          <div className="s-label">Gain</div>
                          <div className="s-val green">{coupon.gain || "—"}</div>
                        </div>
                      </div>

                      <div className="win-card-footer">
                        Partagé dans le groupe <span>VIP</span> avant les matchs
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="carousel-button prev" onClick={scrollPrev} aria-label="Précédent">←</button>
        <button className="carousel-button next" onClick={scrollNext} aria-label="Suivant">→</button>

        <div className="pagination" role="tablist">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={selectedIndex === index}
              aria-label={`Coupon ${index + 1}`}
              className={`pagination-bullet${selectedIndex === index ? " active" : ""}`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}