// models/UserSettings.js
const mongoose = require('mongoose');

const userSettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  language: { type: String, enum: ['fr', 'en'], default: 'fr' },
  emailNotifications: { type: Boolean, default: false },
  shareData: { type: Boolean, default: false },
  twoFactorAuth: { type: Boolean, default: false },
  notifications: { type: Boolean, default: true },
}, { timestamps: true });

const UserSettings = mongoose.model('UserSettings', userSettingsSchema);
module.exports = UserSettings;
