// pages/HomePage.jsx
import { useEffect, useState } from "react";
import "./HomePage.css";

export default function HomePage({ user }) {
  const [stats, setStats] = useState({
    totalEnseignants: 0,
    totalPrestations: 0,
    moyennePrestations: 0
  });

  useEffect(() => {
    // Simuler le chargement des statistiques
    setTimeout(() => {
      setStats({
        totalEnseignants: 42,
        totalPrestations: 1250000,
        moyennePrestations: 29761.90
      });
    }, 1000);
  }, []);

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Tableau de bord</h1>
        <p>Bienvenue, <strong>{user?.username || "Utilisateur"}</strong> !</p>
        {user?.isAdmin && <span className="admin-badge">Administrateur</span>}
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-info">
            <h3>Enseignants</h3>
            <p className="stat-value">{stats.totalEnseignants}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Total Prestations</h3>
            <p className="stat-value">{stats.totalPrestations.toLocaleString()} FCFA</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Moyenne Prestations</h3>
            <p className="stat-value">{stats.moyennePrestations.toLocaleString()} FCFA</p>
          </div>
        </div>
      </div>

      <div className="actions-section">
        <h2>Actions rapides</h2>
        <div className="actions-grid">
          <a href="/ajout" className="action-card">
            <div className="action-icon">➕</div>
            <h3>Ajouter</h3>
            <p>Ajouter un nouvel enseignant</p>
          </a>
          
          <a href="/enseignant" className="action-card">
            <div className="action-icon">📊</div>
            <h3>Liste</h3>
            <p>Liste des enseignants</p>
          </a>
          
          <a href="/bilan" className="action-card">
            <div className="action-icon">📈</div>
            <h3>Bilan</h3>
            <p>Consulter le bilan général</p>
          </a>
        </div>
      </div>
    </div>
  );
}