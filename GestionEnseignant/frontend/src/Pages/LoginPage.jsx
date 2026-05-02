// pages/LoginPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage({ onLogin }) {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const nav = document.querySelector('.navbar');
    if (nav) nav.style.display = 'none';

    return () => {
      if (nav) nav.style.display = 'block';
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      alert("Veuillez entrer votre nom d'utilisateur");
      return;
    }
    
    if (!code.trim()) {
      alert("Veuillez entrer le code");
      return;
    }
    
    setIsLoading(true);
    
    // Simulation d'appel API
    setTimeout(() => {
      const isAdmin = username.toLowerCase() === "admin";
      
      if (code === "1234") {
        onLogin(true, { username, isAdmin });
        navigate("/accueil");  // ← Redirection vers la page d'accueil
      } else {
        alert("Code incorrect");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1>Bienvenue</h1>
          <p>Connectez-vous pour accéder à votre espace</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <div className="input-icon">
              <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <input
                type="text"
                id="username"
                placeholder="ex: admin, john_doe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="code">Code d'accès</label>
            <div className="input-icon">
              <svg className="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 11V7C7 4.2 9.2 2 12 2C14.8 2 17 4.2 17 7V11" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                id="code"
                placeholder="Entrez votre code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <span className="loader"></span>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        <div className="login-footer">
          
        </div>
      </div>
    </div>
  );
}