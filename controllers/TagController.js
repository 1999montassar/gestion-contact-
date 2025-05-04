const Tag = require('../models/tag.model');

// Ajouter un tag
exports.ajouterTag = async (req, res) => {
  try {
    const nouveauTag = new Tag(req.body);
    const tag = await nouveauTag.save();
    res.status(201).json(tag);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de l'ajout", error: err });
  }
};

// Récupérer tous les tags
exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

// Modifier un tag
exports.modifierTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la modification", error: err });
  }
};

// Supprimer un tag
exports.supprimerTag = async (req, res) => {
  try {
    await Tag.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la suppression", error: err });
  }
};
