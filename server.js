require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const messageRoutes = require('./routes/messageRoutes');
const profilRoutes = require('./routes/profilRoutes');
const changercompteRoutes = require('./routes/ChangerCompteRoutes'); // Assure-toi que le chemin est correct
const tagRoutes = require('./routes/TagRoutes'); // ✅ Ajout pour la gestion des tags
const userSettingsRoutes = require('./routes/userSettingsRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));



// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connecté avec succès');
    
    // Montée des routes
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/contacts', require('./routes/contactRoutes'));
    app.use('/api/messages', messageRoutes);
    app.use('/api/profil', profilRoutes);
    app.use('/api/changercompte', changercompteRoutes);
    app.use('/api/tags', tagRoutes); // ✅ Ajout de la route pour les tags
    app.use('/api/settings', userSettingsRoutes);
    // Démarrage du serveur accessible depuis tous les appareils du réseau local
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Serveur démarré sur le port ${PORT} (accessible sur le réseau local)`));
  })
  .catch(err => {
    console.error('❌ Erreur de connexion à MongoDB :', err);
    process.exit(1);
  });
