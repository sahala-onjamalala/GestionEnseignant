import { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import EnseignantPage from "./Pages/EnseignantPage";
import FormulairePage from "./Pages/FormulairePage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./pages/LoginPage";

// Placeholders simplifiés pour le test
const AjoutPage = () => <div className="page-container"><h2>Ajouter un enseignant</h2><p>En développement</p></div>;
const SuppressionPage = () => <div className="page-container"><h2>Supprimer un enseignant</h2><p>En développement</p></div>;
const ModificationPage = () => <div className="page-container"><h2>Modifier un enseignant</h2><p>En développement</p></div>;

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedLoginState = localStorage.getItem('isLogged');
    if (savedLoginState === 'true' && savedUser) {
      setIsLogged(true);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (loggedIn, userData) => {
    setIsLogged(loggedIn);
    if (userData) {
      setUser(userData);
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('isLogged');
      localStorage.removeItem('user');
    }
  };

  if (loading) return <div className="loading-screen">Chargement...</div>;

  return (
    <Router>
      <div className="app">
        {isLogged && <Navbar onLogout={() => handleLogin(false, null)} user={user} />}
        <main className={`main-content ${!isLogged ? 'centered' : ''}`}>
          <Routes>
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            {isLogged ? (
              <>
                <Route path="/accueil" element={<HomePage user={user} />} />
                <Route path="/enseignant" element={<EnseignantPage />} />
                <Route path="/ajout" element={<FormulairePage />} />
                <Route path="/modification" element={<ModificationPage />} />
                <Route path="/suppression" element={<SuppressionPage />} />
                <Route path="/formulaire" element={<FormulairePage />} />
                <Route path="*" element={<Navigate to="/accueil" replace />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;