// routes/userSettingsRoutes.js
const express = require('express');
const router = express.Router();
const userSettingsController = require('../controllers/userSettingsController');

// Route pour obtenir les paramètres utilisateur
router.get('/settings/:userId', userSettingsController.getUserSettings);

// Route pour sauvegarder les paramètres utilisateur
router.post('/settings', userSettingsController.saveUserSettings);

module.exports = router;
