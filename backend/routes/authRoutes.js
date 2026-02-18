const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');
const { validate, authValidation } = require('../middleware/validation');

// Public routes
router.post('/login', validate(authValidation.login), authController.login);

// Protected routes
router.get('/profile', authenticateToken, authController.getProfile);
router.post('/change-password', authenticateToken, authController.changePassword);

module.exports = router;