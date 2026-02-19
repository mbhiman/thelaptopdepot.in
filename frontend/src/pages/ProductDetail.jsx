// ============================================
// Product Detail Page
// ============================================
import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { productsAPI } from '../services/api';
import Loading from '../components/Loading';
import { HiCheckCircle, HiXCircle, HiChevronLeft } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const ProductDetail = () => {
    const { slug } = useParams();
    const { data: product, loading, error } = useFetch(() => productsAPI.getBySlug(slug));

    if (loading) {
        return <Loading />;
    }

    if (error || !product) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h2 className="text-2xl font-display font-bold text-primary-900 mb-4">
                    Product Not Found
                </h2>
                <p className="text-primary-600 mb-8">The product you're looking for doesn't exist.</p>
                <Link to="/" className="btn-primary">
                    Back to Home
                </Link>
            </div>
        );
    }

    const inStock = product.stock_status === 'in_stock';
    const whatsappMessage = `Hi! I'm interested in ${product.name} (₹${product.price})`;
    const whatsappUrl = `https://wa.me/918389021443?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="bg-primary-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back button */}
                <Link
                    to={`/category/${product.category_slug}`}
                    className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-900 mb-8 transition-colors"
                >
                    <HiChevronLeft size={20} />
                    <span>Back to {product.category_name}</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div>
                        <div className="card overflow-hidden bg-white aspect-square flex items-center justify-center text-primary-300">
                            <span className="text-9xl">💻</span>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        {/* Stock status */}
                        <div className="flex items-center space-x-2 mb-4">
                            {inStock ? (
                                <>
                                    <HiCheckCircle className="text-green-500" size={24} />
                                    <span className="text-green-700 font-medium">In Stock</span>
                                </>
                            ) : (
                                <>
                                    <HiXCircle className="text-red-500" size={24} />
                                    <span className="text-red-700 font-medium">Out of Stock</span>
                                </>
                            )}
                        </div>

                        {/* Product name */}
                        <h1 className="text-4xl font-display font-bold text-primary-900 mb-4">
                            {product.name}
                        </h1>

                        {/* Category */}
                        <Link
                            to={`/category/${product.category_slug}`}
                            className="inline-block text-sm text-accent-600 hover:text-accent-700 mb-6"
                        >
                            {product.category_name}
                        </Link>

                        {/* Price */}
                        <div className="mb-8">
                            <div className="flex items-baseline space-x-3 mb-2">
                                <span className="text-4xl font-bold text-primary-900">
                                    ₹{product.price.toLocaleString()}
                                </span>
                                {product.original_price && (
                                    <span className="text-xl text-primary-400 line-through">
                                        ₹{product.original_price.toLocaleString()}
                                    </span>
                                )}
                            </div>
                            {product.original_price && (
                                <p className="text-green-600 font-medium">
                                    Save ₹{(product.original_price - product.price).toLocaleString()} (
                                    {Math.round(((product.original_price - product.price) / product.original_price) * 100)}% off)
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-display font-semibold text-primary-900 mb-3">
                                Description
                            </h2>
                            <p className="text-primary-700 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Specifications */}
                        <div className="mb-8">
                            <h2 className="text-xl font-display font-semibold text-primary-900 mb-4">
                                Specifications
                            </h2>
                            <div className="space-y-3">
                                {product.brand && (
                                    <div className="flex justify-between py-2 border-b border-primary-200">
                                        <span className="text-primary-600">Brand</span>
                                        <span className="text-primary-900 font-medium">{product.brand}</span>
                                    </div>
                                )}
                                {product.processor && (
                                    <div className="flex justify-between py-2 border-b border-primary-200">
                                        <span className="text-primary-600">Processor</span>
                                        <span className="text-primary-900 font-medium">{product.processor}</span>
                                    </div>
                                )}
                                {product.ram && (
                                    <div className="flex justify-between py-2 border-b border-primary-200">
                                        <span className="text-primary-600">RAM</span>
                                        <span className="text-primary-900 font-medium">{product.ram}</span>
                                    </div>
                                )}
                                {product.storage && (
                                    <div className="flex justify-between py-2 border-b border-primary-200">
                                        <span className="text-primary-600">Storage</span>
                                        <span className="text-primary-900 font-medium">{product.storage}</span>
                                    </div>
                                )}
                                {product.display && (
                                    <div className="flex justify-between py-2 border-b border-primary-200">
                                        <span className="text-primary-600">Display</span>
                                        <span className="text-primary-900 font-medium">{product.display}</span>
                                    </div>
                                )}
                                {product.condition && (
                                    <div className="flex justify-between py-2 border-b border-primary-200">
                                        <span className="text-primary-600">Condition</span>
                                        <span className="text-primary-900 font-medium">{product.condition}</span>
                                    </div>
                                )}
                                {product.warranty && (
                                    <div className="flex justify-between py-2 border-b border-primary-200">
                                        <span className="text-primary-600">Warranty</span>
                                        <span className="text-primary-900 font-medium">{product.warranty}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action buttons */}
                        {inStock && (
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center space-x-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-sm transition-colors"
                                >
                                    <FaWhatsapp size={24} />
                                    <span>Buy on WhatsApp</span>
                                </a>
                                <a
                                    href="tel:+918389021443"
                                    className="flex-1 inline-flex items-center justify-center px-8 py-4 bg-primary-800 hover:bg-primary-900 text-white font-medium rounded-sm transition-colors"
                                >
                                    Call Us
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;