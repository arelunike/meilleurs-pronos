"use client"

import { createClient } from "@/lib/clientSupabase"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Mail, ShieldAlert } from "lucide-react"

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })
  
  // États de survol (hover) pour les boutons gérés en JS
  const [isBtnHovered, setIsBtnHovered] = useState(false)

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: "", type: "" })

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage({ text: `Erreur : ${error.message}`, type: "error" })
      setLoading(false)
    } else {
      setMessage({ text: "Connexion réussie ! Redirection...", type: "success" })
      router.refresh()
      router.push("/admin/dashboard")
    }
  }

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#030712", // gray-950
      padding: "48px 16px",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "448px",
        backgroundColor: "#111827", // gray-900
        padding: "32px",
        borderRadius: "16px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        border: "1px solid #1f2937" // gray-800
      }}>
        
        {/* En-tête / Titre */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            margin: "0 auto 16px auto",
            display: "flex",
            height: "48px",
            width: "48px",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "12px",
            backgroundColor: "rgba(245, 158, 11, 0.1)", // amber-500/10
            color: "#f59e0b" // amber-500
          }}>
            <ShieldAlert size={28} />
          </div>
          <h2 style={{
            fontSize: "30px",
            fontWeight: 900,
            letterSpacing: "-0.025em",
            color: "#ffffff",
            margin: "0"
          }}>
            Best<span style={{ color: "#f59e0b" }}>Pronos</span>
          </h2>
          <p style={{
            marginTop: "8px",
            fontSize: "14px",
            color: "#9ca3af", // gray-400
            margin: "8px 0 0 0"
          }}>
            Espace d'administration sécurisé
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Champ Email */}
          <div>
            <label htmlFor="email-address" style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 500,
              color: "#d1d5db", // gray-300
              marginBottom: "6px"
            }}>
              Adresse e-mail
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute",
                top: "0",
                bottom: "0",
                left: "0",
                display: "flex",
                alignItems: "center",
                paddingLeft: "12px",
                color: "#6b7280" // gray-500
              }}>
                <Mail size={16} />
              </span>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  display: "block",
                  width: "100%",
                  borderRadius: "12px",
                  border: "1px solid #374151", // gray-700
                  backgroundColor: "rgba(31, 41, 55, 0.5)", // gray-800/50
                  padding: "10px 12px 10px 40px",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box"
                }}
                placeholder="admin@bestpronos.com"
              />
            </div>
          </div>
          
          {/* Champ Mot de Passe */}
          <div>
            <label htmlFor="password" style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 500,
              color: "#d1d5db",
              marginBottom: "6px"
            }}>
              Mot de passe
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute",
                top: "0",
                bottom: "0",
                left: "0",
                display: "flex",
                alignItems: "center",
                paddingLeft: "12px",
                color: "#6b7280"
              }}>
                <Lock size={16} />
              </span>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  display: "block",
                  width: "100%",
                  borderRadius: "12px",
                  border: "1px solid #374151",
                  backgroundColor: "rgba(31, 41, 55, 0.5)",
                  padding: "10px 12px 10px 40px",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box"
                }}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Messages d'état */}
          {message.text && (
            <div style={{
              borderRadius: "12px",
              padding: "14px",
              fontSize: "14px",
              textAlign: "center",
              fontWeight: 500,
              border: "1px solid",
              backgroundColor: message.type === "success" ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
              borderColor: message.type === "success" ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)",
              color: message.type === "success" ? "#4ade80" : "#f87171"
            }}>
              {message.text}
            </div>
          )}

          {/* Bouton d'action */}
          <div style={{ paddingTop: "8px" }}>
            <button
              type="submit"
              disabled={loading}
              onMouseEnter={() => setIsBtnHovered(true)}
              onMouseLeave={() => setIsBtnHovered(false)}
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                borderRadius: "12px",
                backgroundColor: isBtnHovered ? "#d97706" : "#f59e0b", // amber-600 au hover, sinon amber-500
                padding: "12px 16px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#030712", // text-gray-950
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.4 : 1,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s ease"
              }}
            >
              {loading ? "Vérification en cours..." : "Se connecter au Dashboard"}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}