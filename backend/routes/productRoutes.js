const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const { validate, productValidation } = require('../middleware/validation');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/slug/:slug', productController.getProductBySlug);
router.get('/category/:categorySlug', productController.getProductsByCategory);
router.get('/:id', productController.getProductById);

// Protected routes (Admin only)
router.post(
    '/',
    authenticateToken,
    isAdmin,
    validate(productValidation.create),
    productController.createProduct
);

router.put(
    '/:id',
    authenticateToken,
    isAdmin,
    validate(productValidation.update),
    productController.updateProduct
);

router.patch(
    '/:id/stock',
    authenticateToken,
    isAdmin,
    productController.updateStock
);

router.delete(
    '/:id',
    authenticateToken,
    isAdmin,
    productController.deleteProduct
);

router.get(
    '/admin/stats',
    authenticateToken,
    isAdmin,
    productController.getStats
);

module.exports = router;