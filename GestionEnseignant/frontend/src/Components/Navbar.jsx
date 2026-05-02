// components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ onLogout, user }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / Brand */}
        <div className="navbar-brand">
          <Link to="/accueil" className="brand-link">
            <svg className="brand-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="brand-text">Gestion Enseignants</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link 
            to="/accueil" 
            className={`nav-link ${location.pathname === "/accueil" ? "active" : ""}`}
          >
            <svg className="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 11V17L12 21L19 17V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Accueil
          </Link>

          <Link 
            to="/ajout" 
            className={`nav-link ${location.pathname === "/ajout" ? "active" : ""}`}
          >
            <svg className="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Ajouter un enseignant
          </Link>
          
          <Link 
            to="/enseignant" 
            className={`nav-link ${location.pathname === "/enseignant" ? "active" : ""}`}
          >
            <svg className="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 3L21 7L7 21H3V17L17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Liste, Modification et Suppression
          </Link>

          <Link 
            to="/bilan" 
            className={`nav-link ${location.pathname === "/bilan" ? "active" : ""}`}
          >
            <svg className="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12C21 13.2 20.5 14.2 19.7 15.1C18.9 15.9 17.8 16.5 16.5 16.8C15.2 17.1 13.8 17.1 12.3 16.8M3 12C3 10.8 3.5 9.8 4.3 8.9C5.1 8.1 6.2 7.5 7.5 7.2C8.8 6.9 10.2 6.9 11.7 7.2M12 5V7M12 19V17M12 12H12.01M7 3.5L9 5.5M15 18.5L17 20.5M7 20.5L9 18.5M15 5.5L17 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Bilan
          </Link>
        </div>

        {/* User Section & Logout */}
        <div className="navbar-user">
          {user && (
            <div className="user-info">
              <div className="user-avatar">
                {user.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="user-name">{user.username || "Utilisateur"}</span>
              {user.isAdmin && <span className="user-badge">Admin</span>}
            </div>
          )}
          <button onClick={onLogout} className="logout-button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}