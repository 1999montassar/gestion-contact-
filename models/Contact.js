// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  nom: { type: String, required: false },  // Make sure these are not required
  email: { type: String, required: false },
  telephone: { type: String, required: false },
  isFavorite: { type: Boolean, default: false }  // Optionally, a favorite field
});

module.exports = mongoose.model('Contact', contactSchema);
