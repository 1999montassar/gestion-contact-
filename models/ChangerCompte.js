// changercompte/models/Changercompte.js
const mongoose = require('mongoose');

const changercompteSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  role: { type: String, default: 'utilisateur' }, // Facultatif : admin, conseiller, etc.
});

module.exports = mongoose.model('Changercompte', changercompteSchema);
