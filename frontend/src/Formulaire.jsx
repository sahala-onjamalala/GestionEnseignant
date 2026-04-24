import { useState } from "react";
import "./App.css";

function Formulaire() {
  const [form, setForm] = useState({
    matricule: "",
    nom: "",
    taux_horaire: "",
    nombre_heure: "",
  });
  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("");

  const prestation =
    form.taux_horaire && form.nombre_heure
      ? (parseFloat(form.taux_horaire) * parseFloat(form.nombre_heure)).toLocaleString("fr-FR")
      : null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/enseignants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setTypeMessage(data.success ? "success" : "error");
      setMessage(data.message);
      if (data.success)
        setForm({ matricule: "", nom: "", taux_horaire: "", nombre_heure: "" });
    } catch {
      setTypeMessage("error");
      setMessage("Erreur de connexion au serveur.");
    }
  };

  return (
    <div className="f-page">
      <div className="f-header">
        <span className="f-pill">Menu 1</span>
        <h1 className="f-title">Ajout d'un enseignant</h1>
        <p className="f-sub">
          Renseignez les informations ci-dessous pour enregistrer un nouvel enseignant.
        </p>
      </div>

      <div className="f-card">
        <form onSubmit={handleSubmit}>
          <p className="f-section-label">Informations personnelles</p>
          <div className="f-grid">
            <div className="f-field">
              <label>Matricule</label>
              <input name="matricule" value={form.matricule}
                placeholder="ex : ENS-001" onChange={handleChange} required />
            </div>
            <div className="f-field">
              <label>Nom complet</label>
              <input name="nom" value={form.nom}
                placeholder="ex : Rakoto Jean" onChange={handleChange} required />
            </div>
          </div>

          <p className="f-section-label">Informations salariales</p>
          <div className="f-grid">
            <div className="f-field">
              <label>Taux horaire (Ar)</label>
              <input name="taux_horaire" value={form.taux_horaire}
                type="number" placeholder="ex : 15 000" onChange={handleChange} required />
            </div>
            <div className="f-field">
              <label>Nombre d'heures</label>
              <input name="nombre_heure" value={form.nombre_heure}
                type="number" placeholder="ex : 40" onChange={handleChange} required />
            </div>
          </div>

          <div className="f-prestation">
            <span>Prestation calculée</span>
            <strong>{prestation ? `${prestation} Ar` : "— Ar"}</strong>
          </div>

          <button type="submit" className="f-btn">
            + Enregistrer l'enseignant
          </button>
        </form>

        {message && (
          <div className={`f-msg f-msg--${typeMessage}`}>
            <span className="f-dot" />
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Formulaire;