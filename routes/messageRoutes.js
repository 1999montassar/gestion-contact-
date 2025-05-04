const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageControllers');

// Routes
router.post('/send', messageController.sendMessage);
router.put('/delete/:id', messageController.deleteMessage);
router.delete('/permanent/:id', messageController.permanentlyDeleteMessage);
router.put('/favorite/:id', messageController.toggleFavorite);
router.put('/trash/:id', messageController.moveToTrash); // ✅ ligne ajoutée
router.get('/favorites', messageController.getFavorites);
router.get('/sent/:sender', messageController.getSentMessages);
router.get('/received/:recipient', messageController.getReceivedMessages);
router.get('/trash', messageController.getTrash);
router.put('/restore/:id', messageController.restoreMessage);
router.get('/notifications', messageController.getNotifications);
router.patch('/notifications/read/:id', messageController.markAsRead);
router.delete('/notifications/:id', messageController.deleteNotification);
router.put('/notifications/trash/:id', messageController.moveNotificationToTrash);


module.exports = router;
