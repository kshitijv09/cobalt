const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get user by Google ID
router.get('/:googleId', userController.getUserByGoogleId);

module.exports = router;
