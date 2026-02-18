const Product = require('../models/Product');

const productController = {
    // Get all products with optional filters
    getAllProducts: async (req, res) => {
        try {
            const filters = {
                category_id: req.query.category_id,
                stock_status: req.query.stock_status,
                is_featured: req.query.is_featured === 'true',
                search: req.query.search
            };

            const products = await Product.findAll(filters);

            res.json({
                success: true,
                count: products.length,
                data: products
            });
        } catch (error) {
            console.error('Get products error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch products'
            });
        }
    },

    // Get single product by ID
    getProductById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }

            res.json({
                success: true,
                data: product
            });
        } catch (error) {
            console.error('Get product error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch product'
            });
        }
    },

    // Get product by slug
    getProductBySlug: async (req, res) => {
        try {
            const product = await Product.findBySlug(req.params.slug);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }

            res.json({
                success: true,
                data: product
            });
        } catch (error) {
            console.error('Get product by slug error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch product'
            });
        }
    },

    // Get products by category
    getProductsByCategory: async (req, res) => {
        try {
            const products = await Product.findByCategory(req.params.categorySlug);

            res.json({
                success: true,
                count: products.length,
                data: products
            });
        } catch (error) {
            console.error('Get products by category error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch products'
            });
        }
    },

    // Get featured products
    getFeaturedProducts: async (req, res) => {
        try {
            const products = await Product.getFeatured();

            res.json({
                success: true,
                count: products.length,
                data: products
            });
        } catch (error) {
            console.error('Get featured products error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch featured products'
            });
        }
    },

    // Create new product (Admin only)
    createProduct: async (req, res) => {
        try {
            const product = await Product.create(req.body);

            res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: product
            });
        } catch (error) {
            console.error('Create product error:', error);

            if (error.code === '23505') {
                return res.status(409).json({
                    success: false,
                    message: 'Product with this slug already exists'
                });
            }

            res.status(500).json({
                success: false,
                message: 'Failed to create product'
            });
        }
    },

    // Update product (Admin only)
    updateProduct: async (req, res) => {
        try {
            const product = await Product.update(req.params.id, req.body);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }

            res.json({
                success: true,
                message: 'Product updated successfully',
                data: product
            });
        } catch (error) {
            console.error('Update product error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update product'
            });
        }
    },

    // Update stock status (Admin only)
    updateStock: async (req, res) => {
        try {
            const { stock_status } = req.body;
            const product = await Product.updateStock(req.params.id, stock_status);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }

            res.json({
                success: true,
                message: 'Stock status updated successfully',
                data: product
            });
        } catch (error) {
            console.error('Update stock error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update stock status'
            });
        }
    },

    // Delete product (Admin only)
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }

            await Product.delete(req.params.id);

            res.json({
                success: true,
                message: 'Product deleted successfully'
            });
        } catch (error) {
            console.error('Delete product error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete product'
            });
        }
    },

    // Get product statistics (Admin only)
    getStats: async (req, res) => {
        try {
            const stats = await Product.getStats();

            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            console.error('Get stats error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch statistics'
            });
        }
    }
};

module.exports = productController;