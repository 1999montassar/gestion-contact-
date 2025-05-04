// models/Profil.js

const mongoose = require('mongoose');

// Schéma du profil utilisateur
const ProfilSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'http://localhost:5000/uploads/default-avatar.png',
  },
});

// Eviter la recréation du modèle si déjà défini
const Profil = mongoose.models.Profil || mongoose.model('Profil', ProfilSchema);

module.exports = Profil;
