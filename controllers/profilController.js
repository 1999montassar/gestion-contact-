const Profil = require('../models/Profil');
const bcrypt = require('bcryptjs'); // Nous ne l'utiliserons plus si le mot de passe est omis

// Fonction pour enregistrer un utilisateur sans mot de passe
const createUser = async (req, res) => {
  try {
    const { nom, email, telephone } = req.body;

    // Vérification si l'utilisateur existe déjà
    const existingUser = await Profil.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    const newUser = new Profil({
      nom,
      email,
      telephone,
      avatar: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null,
    });

    const savedUser = await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès', data: savedUser });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la création de l\'utilisateur' });
  }
};

module.exports = { createUser };
