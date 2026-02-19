import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-primary-50 flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-9xl font-display font-bold text-primary-900 mb-4">404</h1>
                <h2 className="text-3xl font-display font-semibold text-primary-900 mb-4">
                    Page Not Found
                </h2>
                <p className="text-primary-600 mb-8 max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="btn-primary">
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;