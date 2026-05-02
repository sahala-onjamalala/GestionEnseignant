import axios from 'axios';
import { useEffect, useState } from 'react';
import "./EnseignantPage.css";

const EnseignantPage = () => {
  const [enseignants, setEnseignants] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  useEffect(() => { 
    fetchEnseignants(); 
  }, []);

  const fetchEnseignants = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/enseignant');
      setEnseignants(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des enseignants", err);
    }
  };

  const handleEditClick = (prof) => {
    setEditingItem({ ...prof }); //Ouvre la modal de modification
  };

  const handleDeleteClick = (prof) => {
    setDeletingItem({ ...prof }); //Ouvre la modal de suppression
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/enseignant/${editingItem.id}`, editingItem);
      setEditingItem(null);
      fetchEnseignants();
    } catch (err) {
      console.error("Erreur lors de la mise à jour", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/enseignant/${deletingItem.id}`);
      setDeletingItem(null); //Ferme la modal de suppression
      fetchEnseignants(); //Rafraîchir la liste
    } catch (err) {
      console.error("Impossible d'effectuer la suppression", err);
    }
  };

  return (
    <div className="page-container">
      
      <div className='table-container'>
      <h2 className="table-title">Liste des Enseignants</h2>
        <table>
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Taux horaire</th>
              <th>Nombre d'heures</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enseignants.map((prof) => (
              <tr key={prof.id}>
                <td>{prof.matricule}</td>
                <td>{prof.nom}</td>
                <td>{prof.taux_horaire} Ar</td>
                <td>{prof.nombre_heure} h</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEditClick(prof)}>Modifier</button>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => handleDeleteClick(prof)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE MODIFICATION */}
      {editingItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Modifier l'enseignant</h3>
            <div className="modal-form-group">
              <label>Matricule</label>
              <input type="text" value={editingItem.matricule} onChange={(e) => setEditingItem({...editingItem, matricule: e.target.value})} />
              
              <label>Nom</label>
              <input type="text" value={editingItem.nom} onChange={(e) => setEditingItem({...editingItem, nom: e.target.value})} />
              
              <label>Taux horaire</label>
              <input type="number" value={editingItem.taux_horaire} onChange={(e) => setEditingItem({...editingItem, taux_horaire: e.target.value})} />
              
              <label>Nombre d'heures</label>
              <input type="number" value={editingItem.nombre_heure} onChange={(e) => setEditingItem({...editingItem, nombre_heure: e.target.value})} />
            </div>
            <div className="modal-actions">
              <button className="btn-save" onClick={handleUpdate}>Sauvegarder</button>
              <button className="btn-cancel" onClick={() => setEditingItem(null)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      { /* Modal de suppression */}
      {deletingItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Supprimer l'enseignant</h3>
            <p style={{ margin: "15px 0", color: "#4a5568" }}>
              Êtes-vous sûr de vouloir supprimer l'enseignant <strong>{deletingItem.nom}</strong> ? Cette action est irréversible.
            </p>
            <div className="modal-actions">
              <button className="btn-confirm-delete" onClick={handleDelete}>Confirmer la suppression</button>
              <button className="btn-cancel" onClick={() => setDeletingItem(null)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnseignantPage;