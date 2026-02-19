import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-white"
            >
                <h1 className="text-9xl font-display font-bold mb-4">404</h1>
                <h2 className="text-3xl font-display font-semibold mb-4">
                    Page Not Found
                </h2>
                <p className="text-xl text-primary-200 mb-8 max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="btn-accent">
                    Back to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
