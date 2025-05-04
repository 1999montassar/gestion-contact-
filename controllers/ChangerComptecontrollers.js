const ChangerCompte = require('../models/ChangerCompte'); // Vérifie bien le chemin


// Fonction pour récupérer tous les utilisateurs sans afficher les mots de passe
exports.getAllUsers = async (req, res) => {
  try {
    // Récupérer tous les utilisateurs sans le mot de passe
    const users = await ChangerCompte.find({}, { motDePasse: 0 });
    res.status(200).json(users); // Envoi des utilisateurs au frontend
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};
