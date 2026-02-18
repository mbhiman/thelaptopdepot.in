const { body, param, validationResult } = require('express-validator');

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }
        next();
    };
};

const productValidation = {
    create: [
        body('name').trim().notEmpty().withMessage('Product name is required'),
        body('slug').trim().notEmpty().withMessage('Product slug is required'),
        body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
        body('category_id').isInt().withMessage('Valid category ID is required'),
        body('stock_status').isIn(['in_stock', 'out_of_stock', 'low_stock']).withMessage('Invalid stock status')
    ],
    update: [
        param('id').isInt().withMessage('Valid product ID is required'),
        body('name').optional().trim().notEmpty().withMessage('Product name cannot be empty'),
        body('price').optional().isFloat({ min: 0 }).withMessage('Valid price is required'),
        body('stock_status').optional().isIn(['in_stock', 'out_of_stock', 'low_stock']).withMessage('Invalid stock status')
    ]
};

const categoryValidation = {
    create: [
        body('name').trim().notEmpty().withMessage('Category name is required'),
        body('slug').trim().notEmpty().withMessage('Category slug is required')
    ],
    update: [
        param('id').isInt().withMessage('Valid category ID is required'),
        body('name').optional().trim().notEmpty().withMessage('Category name cannot be empty')
    ]
};

const authValidation = {
    login: [
        body('username').trim().notEmpty().withMessage('Username is required'),
        body('password').trim().notEmpty().withMessage('Password is required')
    ],
    register: [
        body('username').trim().notEmpty().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
        body('email').trim().isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    ]
};

module.exports = {
    validate,
    productValidation,
    categoryValidation,
    authValidation
};
