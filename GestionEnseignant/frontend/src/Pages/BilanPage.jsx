// pages/BilanPage.jsx
import { useEffect, useState } from "react";
import BilanChart from "../Components/BilanChart";
import "./BilanPage.css";

export default function BilanPage() {
  const [bilan, setBilan] = useState({
    total: 0,
    min: 0,
    max: 0,
    moyenne: 0,
    nombre_enseignants: 0
  });
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    let eventSource;

    try {
      eventSource = new EventSource("http://localhost:5000/api/bilan/stream");

      eventSource.onopen = () => {
        console.log("Connexion SSE établie");
        setIsConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setBilan(data);
          setLastUpdate(new Date());
        } catch (error) {
          console.error("Erreur parsing données:", error);
        }
      };

      eventSource.onerror = (error) => {
        console.error("Erreur SSE:", error);
        setIsConnected(false);
        eventSource.close();
        
        // Tentative de reconnexion après 5 secondes
        setTimeout(() => {
          if (eventSource.readyState === EventSource.CLOSED) {
            window.location.reload();
          }
        }, 5000);
      };

    } catch (error) {
      console.error("Erreur création EventSource:", error);
      setIsConnected(false);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  const formatCurrency = (value) => {
    if (!value && value !== 0) return "0 FCFA";
    return new Intl.NumberFormat('fr-FR').format(value) + ' FCFA';
  };

  const formatNumber = (value) => {
    if (!value && value !== 0) return "0";
    return new Intl.NumberFormat('fr-FR').format(value);
  };

  return (
    <div className="bilan-container">
      <div className="bilan-header">
        <h1 className="bilan-title">
          <svg className="title-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12C21 13.2 20.5 14.2 19.7 15.1C18.9 15.9 17.8 16.5 16.5 16.8C15.2 17.1 13.8 17.1 12.3 16.8M3 12C3 10.8 3.5 9.8 4.3 8.9C5.1 8.1 6.2 7.5 7.5 7.2C8.8 6.9 10.2 6.9 11.7 7.2M12 5V7M12 19V17M12 12H12.01M7 3.5L9 5.5M15 18.5L17 20.5M7 20.5L9 18.5M15 5.5L17 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Bilan des Prestations
        </h1>
        <div className="connection-status">
          <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
          <span className="status-text">
            {isConnected ? 'Mise à jour en temps réel' : 'Reconnexion...'}
          </span>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card stat-card-total">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <p className="stat-label">Total des prestations</p>
            <p className="stat-value">{formatCurrency(bilan.total)}</p>
          </div>
        </div>

        <div className="stat-card stat-card-min">
          <div className="stat-icon">📉</div>
          <div className="stat-content">
            <p className="stat-label">Prestation minimum</p>
            <p className="stat-value">{formatCurrency(bilan.min)}</p>
          </div>
        </div>

        <div className="stat-card stat-card-max">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <p className="stat-label">Prestation maximum</p>
            <p className="stat-value">{formatCurrency(bilan.max)}</p>
          </div>
        </div>

        <div className="stat-card stat-card-moyenne">
          <div className="stat-icon">⚖️</div>
          <div className="stat-content">
            <p className="stat-label">Moyenne des prestations</p>
            <p className="stat-value">{formatCurrency(bilan.moyenne)}</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="info-card">
          <div className="info-icon">👨‍🏫</div>
          <div className="info-content">
            <p className="info-label">Nombre total d'enseignants</p>
            <p className="info-value">{formatNumber(bilan.nombre_enseignants)}</p>
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">🕐</div>
          <div className="info-content">
            <p className="info-label">Dernière mise à jour</p>
            <p className="info-value">{lastUpdate.toLocaleTimeString('fr-FR')}</p>
            <p className="info-date">{lastUpdate.toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
      </div>

      {bilan.total > 0 && <BilanChart bilan={bilan} />}

      {!isConnected && (
        <div className="warning-banner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V12M12 16H12.01M3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3C7.03 3 3 7.03 3 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Connexion au serveur perdue. Tentative de reconnexion...</span>
        </div>
      )}
    </div>
  );
}