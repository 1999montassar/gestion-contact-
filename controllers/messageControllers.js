const Message = require('../models/Message');

// 1. Envoyer un message
exports.sendMessage = async (req, res) => {
  const { sender, recipient, content, mode } = req.body;
  try {
    const message = await Message.create({
      sender,
      recipient,
      content,
      mode,
      isDeleted: false,
      isFavorite: false
    });
    res.status(201).json({ message: 'Message envoyé avec succès', data: message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l’envoi du message' });
  }
};

// 2. Mettre un message à la corbeille
exports.deleteMessage = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'ID du message requis' });
  }

  try {
    // Vérifier si le message existe et le mettre à la corbeille
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ error: 'Message non trouvé' });
    }

    // Mise à jour du champ isDeleted
    message.isDeleted = true;
    await message.save();

    res.json({ message: 'Message déplacé à la corbeille', data: message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
};

// 3. Suppression définitive
exports.permanentlyDeleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message non trouvé' });
    }
    res.json({ message: 'Message supprimé définitivement' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression définitive' });
  }
};

// 4. Marquer/démarquer comme favori
exports.toggleFavorite = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message non trouvé' });
    }

    // Bascule de l'état favori
    message.isFavorite = !message.isFavorite;
    await message.save();

    res.json({ message: 'Favori mis à jour', data: message });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du favori', error: err });
  }
};

// 5. Restaurer un message
exports.restoreMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ error: 'Message non trouvé' });
    }
    res.json({ message: 'Message restauré avec succès', data: message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la restauration' });
  }
};

// 6. Récupérer les messages envoyés
exports.getSentMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      sender: req.params.sender,
      isDeleted: false
    }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des messages envoyés' });
  }
};

// 7. Récupérer les messages reçus
exports.getReceivedMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      recipient: req.params.recipient,
      isDeleted: false
    }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des messages reçus' });
  }
};

// 8. Récupérer les messages favoris
// Récupérer les messages favoris
exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Message.find({ isFavorite: true });
    res.json({ data: favorites });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des messages favoris', error: err });
  }
};
exports.moveToTrash = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!message) return res.status(404).json({ message: 'Message introuvable' });
    res.json({ message: 'Message déplacé à la corbeille', data: message });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};


// 9. Récupérer les messages supprimés (corbeille)
exports.getTrash = async (req, res) => {
  try {
    const messages = await Message.find({ isDeleted: true }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération de la corbeille' });
  }
};


// Exemple de notifications basiques à partir des messages non lus
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Message.find({ read: false, isDeleted: false }).sort({ createdAt: -1 });
    res.json({ data: notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des notifications' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!message) return res.status(404).json({ error: 'Notification non trouvée' });
    res.json({ message: 'Notification marquée comme lue', data: message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ error: 'Notification non trouvée' });
    res.json({ message: 'Notification supprimée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
};
// controllers/messageControllers.js

exports.moveNotificationToTrash = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Message.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    res.status(200).json({ success: true, message: "Notification déplacée dans la corbeille", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};
