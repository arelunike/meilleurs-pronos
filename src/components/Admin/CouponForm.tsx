"use client"

import { createClient } from "@/lib/clientSupabase"
import { useState, useEffect } from "react"

interface CouponData {
  id?: number
  odds: number | null
  stake: number | null
  gain: number | null
  date: string | null
  whatsapp_link: string | null
  image_url: string | null
}

export default function CouponForm() {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [message, setMessage] = useState({ text: "", type: "" })

  // États du formulaire
  const [odds, setOdds] = useState("")
  const [stake, setStake] = useState("")
  const [gain, setGain] = useState("")
  const [date, setDate] = useState("")
  const [whatsappLink, setWhatsappLink] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  
  const [currentCoupon, setCurrentCoupon] = useState<CouponData | null>(null)
  const [localImagePreview, setLocalImagePreview] = useState<string | null>(null)

  const fetchCoupon = async () => {
    try {
      setFetching(true)
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('id', 1)
        .single()

      if (error && error.code !== 'PGRST116') throw error

      if (data) {
        setCurrentCoupon(data)
        setOdds(data.odds?.toString() || "")
        setStake(data.stake?.toString() || "")
        setGain(data.gain?.toString() || "")
        setDate(data.date || "")
        setWhatsappLink(data.whatsapp_link || "")
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du coupon:", error)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchCoupon()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setImageFile(file)
    if (file) {
      setLocalImagePreview(URL.createObjectURL(file))
    } else {
      setLocalImagePreview(null)
    }
  }

  // Fonction utilitaire pour supprimer l'ancienne image du storage
  const deleteOldImage = async (url: string | null) => {
    if (!url) return

    try {
      const fileName = url.split('/').pop()
      
      if (fileName) {
        await supabase.storage
          .from('coupons-media')
          .remove([fileName])
      }
    } catch (err) {
      console.error("Impossible de supprimer l'ancienne image du bucket:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: "", type: "" })

    try {
      let imageUrl = currentCoupon?.image_url || null

      if (imageFile) {
        if (currentCoupon?.image_url) {
          await deleteOldImage(currentCoupon.image_url)
        }

        const fileExt = imageFile.name.split('.').pop()
        const fileName = `coupon_unique_${Date.now()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('coupons-media')
          .upload(filePath, imageFile)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from('coupons-media')
          .getPublicUrl(filePath)
          
        imageUrl = urlData.publicUrl
      }

      const { error: upsertError } = await supabase
        .from('coupons')
        .upsert({
          id: 1,
          odds: odds ? parseFloat(odds) : null,
          stake: stake ? parseFloat(stake) : null,
          gain: gain ? parseFloat(gain) : null,
          date: date || null,
          image_url: imageUrl,
          whatsapp_link: whatsappLink || null,
          created_at: new Date().toISOString()
        })

      if (upsertError) throw upsertError

      setMessage({ text: "Coupon et médias mis à jour avec succès !", type: "success" })
      setLocalImagePreview(null)
      setImageFile(null)
      
      await fetchCoupon()

    } catch (error) {
      setMessage({ text: `Erreur : ${error instanceof Error ? error.message : "Inconnue"}`, type: "error" })
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return <div style={{ textAlign: "center", padding: "40px 0", color: "#6b7280", fontSize: "14px", fontFamily: "sans-serif" }}>Chargement du coupon...</div>
  }

  return (
    <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "32px 16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", alignItems: "start", fontFamily: "sans-serif" }}>
      
      {/* FORMULAIRE */}
      <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", border: "1px solid #f3f4f6", padding: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#1f2937", margin: "0 0 4px 0" }}>Gérer le Coupon Unique</h2>
        <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 24px 0" }}>L'ancienne image sera automatiquement supprimée de Supabase lors du remplacement.</p>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "4px" }}>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="text-black" style={{ display: "block", width: "100%", borderRadius: "8px", border: "1px solid #d1d5db", padding: "8px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "4px" }}>Côte (Odds)</label>
              <input type="number" step="0.01" value={odds} onChange={(e) => setOdds(e.target.value)} className="text-black" style={{ display: "block", width: "100%", borderRadius: "8px", border: "1px solid #d1d5db", padding: "8px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }} placeholder="1.85" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "4px" }}>Mise (Stake)</label>
              <input type="number" step="0.01" value={stake} onChange={(e) => setStake(e.target.value)} className="text-black" style={{ display: "block", width: "100%", borderRadius: "8px", border: "1px solid #d1d5db", padding: "8px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }} placeholder="100" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "4px" }}>Gain</label>
              <input type="number" step="0.01" value={gain} onChange={(e) => setGain(e.target.value)} className="text-black" style={{ display: "block", width: "100%", borderRadius: "8px", border: "1px solid #d1d5db", padding: "8px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }} placeholder="185" />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "4px" }}>Lien WhatsApp</label>
            <input type="url" value={whatsappLink} onChange={(e) => setWhatsappLink(e.target.value)} className="text-black" style={{ display: "block", width: "100%", borderRadius: "8px", border: "1px solid #d1d5db", padding: "8px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }} placeholder="https://wa.me/..." />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "4px" }}>Remplacer l'image (Supprime l'ancienne)</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="file:border-none file:bg-blue-500 file:p-2 file:text-white border text-gray-600 cursor-pointer" style={{ display: "block", width: "100%", fontSize: "14px", marginTop: "8px" }} />
          </div>

          {message.text && (
            <div style={{ padding: "12px", borderRadius: "8px", fontSize: "14px", textAlign: "center", backgroundColor: message.type === "success" ? "#f0fdf4" : "#fef2f2", color: message.type === "success" ? "#166534" : "#991b1b" }}>
              {message.text}
            </div>
          )}

          <button type="submit" disabled={loading} style={{ width: "100%", backgroundColor: "#2563eb", color: "#ffffff", fontWeight: 500, padding: "10px 0", borderRadius: "8px", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1, transition: "background 0.2s", fontSize: "14px", boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)" }}>
            {loading ? "Mise à jour..." : "Mettre à jour le Coupon Unique"}
          </button>
        </form>
      </div>

      {/* APERÇU */}
      <div style={{ backgroundColor: "#111827", color: "#ffffff", padding: "24px", borderRadius: "16px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)", border: "1px solid #1f2937", position: "sticky", top: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1f2937", paddingBottom: "12px", marginBottom: "16px" }}>
          <h3 style={{ fontWeight: "bold", fontSize: "18px", letterSpacing: "0.05em", color: "#60a5fa", margin: 0 }}>TICKET EN LIGNE (APERÇU)</h3>
          <span style={{ backgroundColor: "rgba(59, 130, 246, 0.1)", color: "#60a5fa", fontSize: "12px", padding: "4px 8px", borderRadius: "9999px", fontFamily: "monospace" }}>ID: 1</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px", fontSize: "14px", backgroundColor: "rgba(31, 41, 55, 0.5)", padding: "16px", borderRadius: "12px", border: "1px solid #1f2937" }}>
          <div>
            <p style={{ color: "#9ca3af", fontSize: "12px", margin: "0 0 2px 0" }}>Date du match</p>
            <p style={{ fontWeight: 600, color: "#e5e7eb", margin: 0 }}>{date || "Non définie"}</p>
          </div>
          <div>
            <p style={{ color: "#9ca3af", fontSize: "12px", margin: "0 0 2px 0" }}>Côte totale</p>
            <p style={{ fontWeight: "bold", color: "#fbbf24", fontSize: "18px", margin: 0 }}>{odds ? `x ${odds}` : "—"}</p>
          </div>
          <div>
            <p style={{ color: "#9ca3af", fontSize: "12px", margin: "0 0 2px 0" }}>Mise recommandée</p>
            <p style={{ fontWeight: 600, color: "#e5e7eb", margin: 0 }}>{stake ? `${stake} FCFA / €` : "—"}</p>
          </div>
          <div>
            <p style={{ color: "#9ca3af", fontSize: "12px", margin: "0 0 2px 0" }}>Gain potentiel</p>
            <p style={{ fontWeight: "bold", color: "#34d399", fontSize: "18px", margin: 0 }}>{gain ? `${gain} FCFA / €` : "—"}</p>
          </div>
        </div>

        {whatsappLink && (
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", fontSize: "12px", backgroundColor: "#059669", color: "#ffffff", fontWeight: 500, padding: "8px 16px", borderRadius: "8px", marginBottom: "16px", textDecoration: "none", transition: "background 0.2s" }}>
            💬 Rejoindre sur WhatsApp
          </a>
        )}

        <div>
          <p style={{ color: "#9ca3af", fontSize: "12px", marginBottom: "8px", margin: "0 0 8px 0" }}>Image du coupon :</p>
          {localImagePreview ? (
            <div style={{ position: "relative", border: "2px dashed #3b82f6", borderRadius: "12px", overflow: "hidden", backgroundColor: "#030712" }}>
              <span style={{ position: "absolute", top: "8px", left: "8px", backgroundColor: "#2563eb", fontSize: "10px", color: "#ffffff", padding: "2px 8px", borderRadius: "4px", fontWeight: "bold", textTransform: "uppercase", zIndex: 10 }}>Nouvel aperçu (va remplacer l'ancienne)</span>
              <img src={localImagePreview} alt="Aperçu local" style={{ width: "100%", height: "auto", maxHeight: "256px", objectFit: "contain", display: "block", margin: "0 auto" }} />
            </div>
          ) : currentCoupon?.image_url ? (
            <div style={{ border: "1px solid #1f2937", borderRadius: "12px", overflow: "hidden", backgroundColor: "#030712" }}>
              <img src={currentCoupon.image_url} alt="Coupon actuel" style={{ width: "100%", height: "auto", maxHeight: "256px", objectFit: "contain", display: "block", margin: "0 auto" }} />
            </div>
          ) : (
            <div style={{ height: "160px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#030712", border: "1px solid #1f2937", borderRadius: "12px", color: "#4b5563", fontSize: "12px" }}>
              <span>Aucune image liée à ce coupon</span>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}