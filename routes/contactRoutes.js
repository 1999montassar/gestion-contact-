const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/controllers');

// Define routes
router.get('/', ContactController.getContacts);
router.post('/', ContactController.createContact);  // Handles POST request to create a new contact
router.delete('/:id', ContactController.deleteContact);
router.put('/:id', ContactController.updateContact);
router.patch('/:id/favorite', ContactController.toggleFavorite);

module.exports = router;
