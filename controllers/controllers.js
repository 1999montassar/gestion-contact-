const Contact = require('../models/Contact');
const mongoose = require('mongoose');

// Récupérer tous les contacts avec pagination + recherche
exports.getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (page - 1) * limit;

    const filter = search
      ? {
          $or: [
            { nom: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { telephone: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const contacts = await Contact.find(filter).skip(skip).limit(Number(limit));
    const totalContacts = await Contact.countDocuments(filter);

    res.json({ contacts, totalContacts });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts', error: err });
  }
};

exports.createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ message: 'Error creating contact', error: err });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findByIdAndDelete(contactId);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting contact', error: err });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!updatedContact) return res.status(404).json({ message: 'Contact not found' });
    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ message: 'Error updating contact', error: err });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    contact.isFavorite = !contact.isFavorite;
    await contact.save();
    res.json({ isFavorite: contact.isFavorite });
  } catch (err) {
    res.status(500).json({ message: 'Error toggling favorite', error: err });
  }
};
