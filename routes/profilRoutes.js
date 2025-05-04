const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { createUser } = require('../controllers/profilController');

router.post('/register', upload.single('avatar'), createUser);

module.exports = router;
