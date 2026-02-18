const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const { validate, categoryValidation } = require('../middleware/validation');

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/slug/:slug', categoryController.getCategoryBySlug);
router.get('/:id', categoryController.getCategoryById);

// Protected routes (Admin only)
router.post(
    '/',
    authenticateToken,
    isAdmin,
    validate(categoryValidation.create),
    categoryController.createCategory
);

router.put(
    '/:id',
    authenticateToken,
    isAdmin,
    validate(categoryValidation.update),
    categoryController.updateCategory
);

router.delete(
    '/:id',
    authenticateToken,
    isAdmin,
    categoryController.deleteCategory
);

module.exports = router;
