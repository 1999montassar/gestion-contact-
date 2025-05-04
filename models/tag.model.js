const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  role: { type: String, required: true },
  couleur: { type: String, required: true }
});

module.exports = mongoose.model('Tag', tagSchema);
