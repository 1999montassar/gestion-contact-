const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importer le modèle User
const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
  try {
    const { username, email, phoneNumber, password } = req.body;

    // Validation des données
    if (!username || !email || !phoneNumber || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email déjà utilisé' });

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = new User({
      username,
      email,
      phoneNumber,
      password: hashedPassword
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur inscrit avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Réinitialisation du mot de passe (envoi du code)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const user = await User.findOne({ email }) || await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    // Génération d'un code de vérification
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    user.verificationCodeExpiry = new Date(Date.now() + 15 * 60 * 1000); // Le code expire après 15 minutes
    await user.save();

    // Envoi du code de vérification (ici, tu pourrais aussi envoyer un e-mail ou un SMS)
    res.json({ message: 'Code envoyé', verificationCode: verificationCode }); // Tu peux aussi envoyer un email ici
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vérification du code
router.post('/verify-code', async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    if (user.verificationCode === verificationCode) {
      return res.status(200).json({ message: 'Code validé' });
    } else {
      return res.status(400).json({ message: 'Code invalide. Veuillez réessayer.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur du serveur. Veuillez réessayer.' });
  }
});

// Réinitialisation du mot de passe
router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    // Hashage du nouveau mot de passe
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // Réponse de succès
    res.json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});






module.exports = router;
