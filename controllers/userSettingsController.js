// controllers/userSettingsController.js
const UserSettings = require('../models/UserSettings');

// Obtenir les paramètres utilisateur
exports.getUserSettings = async (req, res) => {
  try {
    const userSettings = await UserSettings.findOne({ userId: req.params.userId });

    if (!userSettings) {
      return res.status(404).json({ message: 'Paramètres non trouvés' });
    }

    res.json(userSettings);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Sauvegarder les paramètres utilisateur
exports.saveUserSettings = async (req, res) => {
  const { language, emailNotifications, shareData, twoFactorAuth, notifications } = req.body;
  const userId = req.body.userId;

  try {
    // Chercher si les paramètres existent déjà
    let userSettings = await UserSettings.findOne({ userId });

    if (!userSettings) {
      // Si les paramètres n'existent pas, on les crée
      userSettings = new UserSettings({
        userId,
        language,
        emailNotifications,
        shareData,
        twoFactorAuth,
        notifications
      });
    } else {
      // Si les paramètres existent, on les met à jour
      userSettings.language = language;
      userSettings.emailNotifications = emailNotifications;
      userSettings.shareData = shareData;
      userSettings.twoFactorAuth = twoFactorAuth;
      userSettings.notifications = notifications;
    }

    await userSettings.save();
    res.status(200).json({ message: 'Paramètres enregistrés avec succès !' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
