const express = require('express');
const router = express.Router();
const changercompteController = require('../controllers/ChangerComptecontrollers');



// Route pour récupérer tous les utilisateurs
router.get('/register', changercompteController.getAllUsers);

// Si tu as d'autres actions, tu peux les ajouter ici
// Exemple : route pour changer de compte
// router.post('/change', changercompteController.changeAccount);

module.exports = router;
