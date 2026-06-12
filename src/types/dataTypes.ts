export interface CouponData {
  id: number
  odds: number
  stake: number
  gain: number
  date: string
  whatsapp_link: string
  image_url: string
}

export interface WinningCoupon {
  id: number;
  date: string;
  odds: number;
  stake: number | string;
  gain: number | string;
  image_url: string;  // Correction ici
  video_url: string;  // Correction ici
}