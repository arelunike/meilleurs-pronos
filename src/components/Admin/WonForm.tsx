"use client"

import { createClient } from "@/lib/clientSupabase"
import { useState, useEffect } from "react"

interface WonData {
  id: number
  date: string | null
  odds: number | null
  stake: number | null
  gain: number | null
  image_url: string | null
  video_url: string | null
}

export default function WonForm() {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [message, setMessage] = useState({ text: "", type: "" })

  // Emplacement sélectionné pour l'édition (entre 1 et 5)
  const [selectedSlot, setSelectedSlot] = useState<number>(1)

  // États des champs du formulaire
  const [date, setDate] = useState("")
  const [odds, setOdds] = useState("")
  const [stake, setStake] = useState("")
  const [gain, setGain] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)

  // Liste des 5 slots stockés en BDD
  const [wonCoupons, setWonCoupons] = useState<WonData[]>([])
  
  // États pour les fenêtres surgissantes (Modales vidéo)
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null)

  // 1. Charger les coupons existants au démarrage (IDs 1 à 5)
  const fetchWonCoupons = async () => {
    try {
      const { data, error } = await supabase
        .from('won')
        .select('*')
        .in('id', [1, 2, 3, 4, 5])
        .order('id', { ascending: true })

      if (error) throw error
      if (data) setWonCoupons(data)
    } catch (error) {
      console.error("Erreur lors de la récupération des coupons gagnés :", error)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchWonCoupons()
  }, [])

  // 2. Mettre à jour le formulaire lorsqu'on change de slot d'édition
  useEffect(() => {
    const currentSlotData = wonCoupons.find(c => c.id === selectedSlot)
    if (currentSlotData) {
      setDate(currentSlotData.date || "")
      setOdds(currentSlotData.odds?.toString() || "")
      setStake(currentSlotData.stake?.toString() || "")
      setGain(currentSlotData.gain?.toString() || "")
    } else {
      setDate("")
      setOdds("")
      setStake("")
      setGain("")
    }
    setImageFile(null)
    setVideoFile(null)
  }, [selectedSlot, wonCoupons])

  // Fonction utilitaire pour supprimer un fichier média du bucket
  const deleteStorageFile = async (url: string | null) => {
    if (!url) return
    const fileName = url.split('/').pop()
    if (fileName) {
      await supabase.storage.from('won-media').remove([fileName])
    }
  }

  // Fonction utilitaire d'upload
  const uploadFile = async (file: File, prefix: string) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `won_${selectedSlot}_${prefix}_${Date.now()}.${fileExt}`
    
    const { error } = await supabase.storage
      .from('won-media')
      .upload(fileName, file)

    if (error) throw error

    const { data } = supabase.storage.from('won-media').getPublicUrl(fileName)
    return data.publicUrl
  }

  // 3. Validation et mise à jour de l'emplacement (UPSERT)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: "", type: "" })

    const currentSlotData = wonCoupons.find(c => c.id === selectedSlot)

    try {
      let imageUrl = currentSlotData?.image_url || null
      let videoUrl = currentSlotData?.video_url || null

      if (imageFile) {
        if (currentSlotData?.image_url) await deleteStorageFile(currentSlotData.image_url)
        imageUrl = await uploadFile(imageFile, 'img')
      }

      if (videoFile) {
        if (currentSlotData?.video_url) await deleteStorageFile(currentSlotData.video_url)
        videoUrl = await uploadFile(videoFile, 'vid')
      }

      const { error: upsertError } = await supabase
        .from('won')
        .upsert({
          id: selectedSlot,
          date: date || null,
          odds: odds ? parseFloat(odds) : null,
          stake: stake ? parseFloat(stake) : null,
          gain: gain ? parseFloat(gain) : null,
          image_url: imageUrl,
          video_url: videoUrl,
          created_at: new Date().toISOString()
        })

      if (upsertError) throw upsertError

      setMessage({ text: `Emplacement ${selectedSlot} mis à jour !`, type: "success" })
      
      setImageFile(null)
      setVideoFile(null)
      
      await fetchWonCoupons()

    } catch (error) {
      setMessage({ text: `Erreur : ${error instanceof Error ? error.message : "Inconnue"}`, type: "error" })
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return <div style={{ textAlign: "center", padding: "40px 0", color: "#6b7280", fontSize: "14px", fontFamily: "sans-serif" }}>Chargement des résultats...</div>
  }

  return (
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", alignItems: "start", fontFamily: "sans-serif" }}>
      
      {/* COLONNE 1 : FORMULAIRE D'ÉDITION */}
      <div style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", border: "1px solid #f3f4f6" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#1f2937", margin: "0 0 4px 0" }}>Gérer les Coupons Gagnés</h2>
        <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 16px 0" }}>Sélectionnez l'un des 5 emplacements disponibles pour le modifier.</p>

        {/* Sélecteur d'emplacements (1 à 5) */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {[1, 2, 3, 4, 5].map((slot) => {
            const exists = wonCoupons.some(c => c.id === slot)
            
            // Calcul du style dynamique pour les boutons de slot
            let buttonStyle: React.CSSProperties = {
              flex: 1,
              padding: "8px 0",
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              cursor: "pointer",
              transition: "all 0.2s"
            }

            if (selectedSlot === slot) {
              buttonStyle = { ...buttonStyle, backgroundColor: "#059669", color: "#ffffff", borderColor: "#059669", boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)" }
            } else if (exists) {
              buttonStyle = { ...buttonStyle, backgroundColor: "#ecfdf5", color: "#047857", borderColor: "#a7f3d0" }
            } else {
              buttonStyle = { ...buttonStyle, backgroundColor: "#f9fafb", color: "#9ca3af", borderColor: "#e5e7eb" }
            }

            return (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                style={buttonStyle}
              >
                Slot {slot}
              </button>
            )
          })}
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ backgroundColor: "#f9fafb", padding: "12px", borderRadius: "8px", fontSize: "12px", fontFamily: "monospace", color: "#065f46" }}>
            Modification en cours : <span style={{ fontWeight: "bold" }}>Configuration de l'Emplacement {selectedSlot}</span>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "4px" }}>Date du résultat</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="text-black" style={{ display: "block", width: "100%", borderRadius: "8px", border: "1px solid #d1d5db", padding: "8px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "4px" }}>Côte</label>
              <input type="number" step="0.01" value={odds} onChange={(e) => setOdds(e.target.value)} className="text-black" style={{ display: "block", width: "100%", borderRadius: "8px", border: "1px solid #d1d5db", padding: "8px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }} placeholder="2.10" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "4px" }}>Mise</label>
              <input type="number" step="0.01" value={stake} onChange={(e) => setStake(e.target.value)} className="text-black" style={{ display: "block", width: "100%", borderRadius: "8px", border: "1px solid #d1d5db", padding: "8px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }} placeholder="50" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "4px" }}>Gain</label>
              <input type="number" step="0.01" value={gain} onChange={(e) => setGain(e.target.value)} className="text-black" style={{ display: "block", width: "100%", borderRadius: "8px", border: "1px solid #d1d5db", padding: "8px 12px", fontSize: "14px", outline: "none", boxSizing: "border-box" }} placeholder="105" />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "4px" }}>Image de preuve (Remplace l'ancienne)</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} className="file:bg-blue-500 file:text-white file:p-2 text-black border cursor-pointer" style={{ display: "block", width: "100%", fontSize: "14px", color: "#6b7280", marginTop: "4px" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "4px" }}>Vidéo de preuve (Remplace l'ancienne)</label>
            <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)} className="file:bg-blue-500 file:text-white file:p-2 text-black border cursor-pointer" style={{ display: "block", width: "100%", fontSize: "14px", color: "#6b7280", marginTop: "4px" }} />
          </div>

          {message.text && (
            <div style={{ padding: "12px", borderRadius: "8px", fontSize: "14px", textAlign: "center", backgroundColor: message.type === "success" ? "#f0fdf4" : "#fef2f2", color: message.type === "success" ? "#166534" : "#991b1b" }}>
              {message.text}
            </div>
          )}

          <button type="submit" disabled={loading} style={{ width: "100%", backgroundColor: "#059669", color: "#ffffff", fontWeight: 500, padding: "10px 0", borderRadius: "8px", border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1, transition: "background 0.2s", fontSize: "14px", boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)" }}>
            {loading ? "Sauvegarde..." : `Enregistrer sur l'Emplacement ${selectedSlot}`}
          </button>
        </form>
      </div>

      {/* COLONNE 2 : GRILLE D'APERÇU DU LIVE */}
      <div style={{ backgroundColor: "#111827", color: "#ffffff", padding: "24px", borderRadius: "16px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)", border: "1px solid #1f2937" }}>
        <h3 style={{ fontWeight: "bold", fontSize: "18px", color: "#34d399", marginBottom: "16px", borderBottom: "1px solid #1f2937", paddingBottom: "8px", marginTop: 0 }}>VOS 5 EMPLACEMENTS EN LIGNE</h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          {[1, 2, 3, 4, 5].map((slotId) => {
            const coupon = wonCoupons.find(c => c.id === slotId)

            return (
              <div key={slotId} style={{ borderRadius: "12px", padding: "16px", border: "1px solid", transition: "all 0.2s", borderColor: selectedSlot === slotId ? '#10b981' : '#1f2937', backgroundColor: selectedSlot === slotId ? 'rgba(31, 41, 55, 0.8)' : '#030712' }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "bold", color: "#9ca3af", letterSpacing: "0.05em" }}>Slot {slotId}</span>
                  <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "9999px", fontWeight: "bold", backgroundColor: coupon ? 'rgba(16, 185, 129, 0.1)' : '#1f2937', color: coupon ? '#34d399' : '#6b7280' }}>
                    {coupon ? 'Actif' : 'Vide'}
                  </span>
                </div>

                {coupon ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ fontSize: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: "4px", backgroundColor: "#111827", padding: "8px", borderRadius: "4px", border: "1px solid rgba(31, 41, 55, 0.6)" }}>
                      <span style={{ color: "#6b7280" }}>Date :</span> <span style={{ textAlign: "right", color: "#d1d5db", fontWeight: 500 }}>{coupon.date || "—"}</span>
                      <span style={{ color: "#6b7280" }}>Côte :</span> <span style={{ textAlign: "right", color: "#fbbf24", fontWeight: "bold" }}>x{coupon.odds || "—"}</span>
                      <span style={{ color: "#6b7280" }}>Mise :</span> <span style={{ textAlign: "right", color: "#d1d5db" }}>{coupon.stake || "—"}</span>
                      <span style={{ color: "#6b7280" }}>Gain :</span> <span style={{ textAlign: "right", color: "#34d399", fontWeight: "bold" }}>{coupon.gain || "—"}</span>
                    </div>

                    {/* Image statique miniature */}
                    {coupon.image_url && (
                      <div style={{ position: "relative", height: "112px", width: "100%", backgroundColor: "#000000", borderRadius: "4px", overflow: "hidden", border: "1px solid #1f2937" }}>
                        <img src={coupon.image_url} alt="Preuve" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    )}

                    {/* Bouton d'action pour la vidéo */}
                    {coupon.video_url ? (
                      <button
                        type="button"
                        onClick={() => setActiveVideoUrl(coupon.video_url)}
                        style={{ width: "100%", textAlign: "center", fontSize: "12px", backgroundColor: "#1f2937", color: "#e5e7eb", fontWeight: 500, padding: "6px 12px", borderRadius: "4px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", transition: "background 0.2s" }}
                      >
                        🎥 Regarder la vidéo preuve
                      </button>
                    ) : (
                      <div style={{ fontSize: "11px", textAlign: "center", color: "#4b5563", fontStyle: "italic", padding: "4px 0", backgroundColor: "rgba(17, 24, 39, 0.4)", borderRadius: "4px" }}>Aucune vidéo ajoutée</div>
                    )}
                  </div>
                ) : (
                  <div style={{ height: "128px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#4b5563", fontStyle: "italic", border: "1px solid #1f2937", borderStyle: "dashed", borderRadius: "8px" }}>
                    Aucune donnée
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* MODALE POUR VISIONNER LA VIDÉO SANS CHARGER LA PAGE */}
      {activeVideoUrl && (
        <div className="modal-backdrop" style={{ position: "fixed", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: "16px" }} onClick={() => setActiveVideoUrl(null)}>
          <div style={{ backgroundColor: "#030712", padding: "16px", borderRadius: "16px", maxWidth: "576px", width: "100%", border: "1px solid #1f2937", position: "relative", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h4 style={{ fontSize: "14px", fontWeight: "bold", color: "#9ca3af", margin: 0 }}>Preuve Vidéo du Coupon</h4>
              <button 
                onClick={() => setActiveVideoUrl(null)} 
                style={{ fontSize: "12px", color: "#9ca3af", backgroundColor: "#111827", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer" }}
              >
                Fermer ✕
              </button>
            </div>
            <video 
              src={activeVideoUrl} 
              controls 
              autoPlay 
              style={{ width: "100%", height: "auto", maxHeight: "70vh", borderRadius: "8px", backgroundColor: "#000000" }}
            />
          </div>
        </div>
      )}

    </div>
  )
}