// app/dashboard/page.tsx (ou votre chemin actuel)
import CouponForm from "@/components/Admin/CouponForm";
import WonForm from "@/components/Admin/WonForm";
import { redirect } from "next/navigation";
import { LogOut, LayoutDashboard } from "lucide-react";
import { createClient } from "@/lib/serverSupabase";

export default async function Dashboard() {
  const supabase = await createClient();

  // 1. Protection de la page : Vérification de la session côté serveur
  const { data: { user }, error } = await supabase.auth.getUser();

  // Si aucun utilisateur n'est connecté ou s'il y a une erreur, redirection vers la page de login
  if (!user || error) {
    redirect("/adminLogin"); // Ajustez le chemin vers votre page de connexion si nécessaire
  }

  // 2. Action de déconnexion (Server Action)
  async function handleLogout() {
    "use server"; // S'exécute directement sur le serveur lors du clic
    const supabaseServer = await createClient();
    await supabaseServer.auth.signOut();
    redirect("/adminLogin");
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#111827", color: "#f3f4f6", padding: "40px 16px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto" }}>
        
        {/* Barre supérieure avec bouton de déconnexion */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "12px", padding: "16px", marginBottom: "40px", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ padding: "8px", backgroundColor: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", borderRadius: "8px", display: "flex", alignItems: "center" }}>
              <LayoutDashboard size={22} />
            </div>
            <div>
              <p style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500, margin: 0 }}>Session Administrateur</p>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#e5e7eb", margin: "2px 0 0 0" }}>{user.email}</p>
            </div>
          </div>

          {/* Formulaire contenant le bouton pour déclencher la Server Action */}
          <form action={handleLogout} style={{ margin: 0 }}>
            <button 
              type="submit" 
              style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#f87171", fontWeight: 500, fontSize: "14px", padding: "10px 16px", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s" }}
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </form>
        </header>

        {/* Titre Principal */}
        <h1 style={{ fontSize: "28px", fontWeight: 900, textAlign: "center", color: "#ffffff", marginBottom: "40px", letterSpacing: "-0.025em", margin: "0 0 40px 0" }}>
          Tableau de Bord — Gestion des Contenus
        </h1>
        
        {/* Grille des formulaires */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", alignItems: "start" }}>
          <div style={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "16px", padding: "24px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}>
            <CouponForm />
          </div>
          <div style={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "16px", padding: "24px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}>
            <WonForm />
          </div>
        </div>

      </div>
    </div>
  );
}