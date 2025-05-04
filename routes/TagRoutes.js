const express = require('express');
const router = express.Router();
const tagController = require('../controllers/TagController');

router.post('/', tagController.ajouterTag);
router.get('/', tagController.getTags);
router.put('/:id', tagController.modifierTag);
router.delete('/:id', tagController.supprimerTag);

module.exports = router;
