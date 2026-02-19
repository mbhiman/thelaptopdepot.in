import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiArrowLeft } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import Loading from '../components/Loading';
import { useFetch } from '../hooks/useFetch';
import { productsAPI } from '../services/api';

const ProductDetail = () => {
    const { slug } = useParams();
    const { data: product, loading } = useFetch(() => productsAPI.getBySlug(slug), [slug]);

    if (loading) {
        return <Loading fullScreen />;
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h2 className="text-3xl font-display font-bold text-primary-900 mb-4">
                    Product not found
                </h2>
                <p className="text-primary-600 mb-8">
                    The product you're looking for doesn't exist or has been removed.
                </p>
                <Link to="/" className="btn-primary">
                    Back to Home
                </Link>
            </div>
        );
    }

    const isInStock = product.stock_status === 'in_stock';
    const discount = product.original_price
        ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
        : 0;

    const whatsappMessage = encodeURIComponent(
        `Hi, I'm interested in ${product.name} (₹${product.price.toLocaleString('en-IN')})`
    );

    const specs = [
        { label: 'Brand', value: product.brand },
        { label: 'Processor', value: product.processor },
        { label: 'RAM', value: product.ram },
        { label: 'Storage', value: product.storage },
        { label: 'Graphics', value: product.graphics },
        { label: 'Display', value: product.display },
        { label: 'Battery', value: product.battery },
        { label: 'Condition', value: product.condition },
        { label: 'Warranty', value: product.warranty },
    ].filter(spec => spec.value);

    return (
        <div>
            {/* Breadcrumb */}
            <div className="bg-primary-50 border-b border-primary-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link
                        to={product.category_slug ? `/category/${product.category_slug}` : '/'}
                        className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-900 transition-colors"
                    >
                        <HiArrowLeft />
                        <span>Back to {product.category_name || 'Products'}</span>
                    </Link>
                </div>
            </div>

            {/* Product Detail */}
            <section className="py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="aspect-square bg-primary-50 rounded-sm overflow-hidden sticky top-24">
                                {product.image_url ? (
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <span className="text-primary-300 text-6xl font-display">LD</span>
                                    </div>
                                )}

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {discount > 0 && (
                                        <span className="bg-accent-500 text-white px-4 py-2 text-sm font-semibold rounded-sm">
                                            {discount}% OFF
                                        </span>
                                    )}
                                    {product.is_featured && (
                                        <span className="bg-primary-800 text-white px-4 py-2 text-sm font-semibold rounded-sm">
                                            FEATURED
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            {/* Category */}
                            {product.category_name && (
                                <Link
                                    to={`/category/${product.category_slug}`}
                                    className="inline-block text-sm font-medium text-primary-600 hover:text-primary-900 transition-colors"
                                >
                                    {product.category_name}
                                </Link>
                            )}

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-900">
                                {product.name}
                            </h1>

                            {/* Stock Status */}
                            <div className="flex items-center space-x-2">
                                {isInStock ? (
                                    <>
                                        <HiCheckCircle className="text-green-500" size={24} />
                                        <span className="text-green-600 font-medium">In Stock</span>
                                    </>
                                ) : (
                                    <>
                                        <HiXCircle className="text-red-500" size={24} />
                                        <span className="text-red-600 font-medium">Out of Stock</span>
                                    </>
                                )}
                            </div>

                            {/* Price */}
                            <div className="py-6 border-y border-primary-200">
                                <div className="flex items-baseline space-x-4">
                                    <p className="text-4xl md:text-5xl font-display font-bold text-primary-900">
                                        ₹{product.price.toLocaleString('en-IN')}
                                    </p>
                                    {product.original_price && (
                                        <p className="text-2xl text-primary-400 line-through">
                                            ₹{product.original_price.toLocaleString('en-IN')}
                                        </p>
                                    )}
                                </div>
                                {discount > 0 && (
                                    <p className="text-green-600 font-medium mt-2">
                                        You save ₹{(product.original_price - product.price).toLocaleString('en-IN')} ({discount}%)
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div>
                                    <h2 className="font-display font-semibold text-xl text-primary-900 mb-3">
                                        Description
                                    </h2>
                                    <p className="text-primary-700 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* Specifications */}
                            {specs.length > 0 && (
                                <div>
                                    <h2 className="font-display font-semibold text-xl text-primary-900 mb-4">
                                        Specifications
                                    </h2>
                                    <div className="bg-primary-50 rounded-sm p-6 space-y-3">
                                        {specs.map((spec, index) => (
                                            <div key={index} className="flex justify-between py-2 border-b border-primary-200 last:border-0">
                                                <span className="text-primary-600 font-medium">{spec.label}</span>
                                                <span className="text-primary-900 font-semibold text-right">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA Buttons */}
                            <div className="pt-6 space-y-4">
                                <a
                                    href={`https://wa.me/918389021443?text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center space-x-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <FaWhatsapp size={24} />
                                    <span>Buy on WhatsApp</span>
                                </a>

                                <a
                                    href="tel:+918389021443"
                                    className="w-full inline-flex items-center justify-center px-8 py-4 border-2 border-primary-800 text-primary-800 hover:bg-primary-800 hover:text-white text-lg font-semibold rounded-sm transition-all duration-300"
                                >
                                    Call Us: +91 98765 43210
                                </a>
                            </div>

                            {/* Additional Info */}
                            <div className="bg-accent-50 border border-accent-200 rounded-sm p-6">
                                <h3 className="font-display font-semibold text-lg text-primary-900 mb-3">
                                    Why Choose Us?
                                </h3>
                                <ul className="space-y-2 text-primary-700">
                                    <li className="flex items-start">
                                        <span className="text-accent-600 mr-2">✓</span>
                                        <span>Thoroughly tested and quality assured</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent-600 mr-2">✓</span>
                                        <span>Warranty included for peace of mind</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent-600 mr-2">✓</span>
                                        <span>Visit our store for hands-on experience</span>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetail;
