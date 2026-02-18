const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Validation errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: err.errors
        });
    }

    // Database errors
    if (err.code === '23505') { // Unique constraint violation
        return res.status(409).json({
            success: false,
            message: 'Resource already exists'
        });
    }

    if (err.code === '23503') { // Foreign key constraint violation
        return res.status(400).json({
            success: false,
            message: 'Invalid reference'
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token expired'
        });
    }

    // Default error
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal server error'
    });
};

const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
};

module.exports = { errorHandler, notFound };