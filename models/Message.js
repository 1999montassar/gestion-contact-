const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  content: { type: String, required: true },
  mode: { type: String, required: true }, // 'email' ou 'telephone'
  isFavorite: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }, // ✅ virgule ici
  read: { type: Boolean, default: false }       // ✅ champ bien défini
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
