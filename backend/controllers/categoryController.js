const Category = require('../models/Category');

const categoryController = {
    // Get all categories
    getAllCategories: async (req, res) => {
        try {
            const withCount = req.query.with_count === 'true';

            const categories = withCount
                ? await Category.getWithProductCount()
                : await Category.findAll();

            res.json({
                success: true,
                count: categories.length,
                data: categories
            });
        } catch (error) {
            console.error('Get categories error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch categories'
            });
        }
    },

    // Get single category by ID
    getCategoryById: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }

            res.json({
                success: true,
                data: category
            });
        } catch (error) {
            console.error('Get category error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch category'
            });
        }
    },

    // Get category by slug
    getCategoryBySlug: async (req, res) => {
        try {
            const category = await Category.findBySlug(req.params.slug);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }

            res.json({
                success: true,
                data: category
            });
        } catch (error) {
            console.error('Get category by slug error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch category'
            });
        }
    },

    // Create new category (Admin only)
    createCategory: async (req, res) => {
        try {
            const category = await Category.create(req.body);

            res.status(201).json({
                success: true,
                message: 'Category created successfully',
                data: category
            });
        } catch (error) {
            console.error('Create category error:', error);

            if (error.code === '23505') {
                return res.status(409).json({
                    success: false,
                    message: 'Category with this name or slug already exists'
                });
            }

            res.status(500).json({
                success: false,
                message: 'Failed to create category'
            });
        }
    },

    // Update category (Admin only)
    updateCategory: async (req, res) => {
        try {
            const category = await Category.update(req.params.id, req.body);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }

            res.json({
                success: true,
                message: 'Category updated successfully',
                data: category
            });
        } catch (error) {
            console.error('Update category error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update category'
            });
        }
    },

    // Delete category (Admin only)
    deleteCategory: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: 'Category not found'
                });
            }

            await Category.delete(req.params.id);

            res.json({
                success: true,
                message: 'Category deleted successfully'
            });
        } catch (error) {
            console.error('Delete category error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete category'
            });
        }
    }
};

module.exports = categoryController;
