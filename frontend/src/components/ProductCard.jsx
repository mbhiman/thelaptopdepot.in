import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

const ProductCard = ({ product, index = 0 }) => {
    const isInStock = product.stock_status === 'in_stock';
    const discount = product.original_price
        ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
        : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link
                to={`/product/${product.slug}`}
                className="group block card overflow-hidden h-full hover:-translate-y-1 transition-transform duration-300"
            >
                {/* Image Container */}
                <div className="aspect-[4/3] bg-primary-50 relative overflow-hidden">
                    {product.image_url ? (
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-primary-300 text-4xl font-display">LD</span>
                        </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {discount > 0 && (
                            <span className="bg-accent-500 text-white px-3 py-1 text-xs font-semibold rounded-sm">
                                {discount}% OFF
                            </span>
                        )}
                        {product.is_featured && (
                            <span className="bg-primary-800 text-white px-3 py-1 text-xs font-semibold rounded-sm">
                                FEATURED
                            </span>
                        )}
                    </div>

                    {/* Stock Status */}
                    <div className="absolute top-3 right-3">
                        {isInStock ? (
                            <HiCheckCircle className="text-green-500" size={24} />
                        ) : (
                            <HiXCircle className="text-red-500" size={24} />
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Brand & Category */}
                    <div className="flex items-center justify-between mb-2">
                        {product.brand && (
                            <span className="text-xs font-medium text-primary-500 uppercase tracking-wider">
                                {product.brand}
                            </span>
                        )}
                        {product.category_name && (
                            <span className="text-xs text-primary-400">
                                {product.category_name}
                            </span>
                        )}
                    </div>

                    {/* Name */}
                    <h3 className="font-display font-semibold text-lg text-primary-900 mb-3 line-clamp-2 group-hover:text-primary-700 transition-colors">
                        {product.name}
                    </h3>

                    {/* Specs (if available) */}
                    <div className="space-y-1 mb-4 text-xs text-primary-600">
                        {product.processor && (
                            <p className="line-clamp-1">• {product.processor}</p>
                        )}
                        {product.ram && product.storage && (
                            <p className="line-clamp-1">• {product.ram} | {product.storage}</p>
                        )}
                    </div>

                    {/* Price */}
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-2xl font-display font-bold text-primary-900">
                                ₹{product.price.toLocaleString('en-IN')}
                            </p>
                            {product.original_price && (
                                <p className="text-sm text-primary-400 line-through">
                                    ₹{product.original_price.toLocaleString('en-IN')}
                                </p>
                            )}
                        </div>
                        {product.condition && (
                            <span className="text-xs font-medium text-accent-600 bg-accent-50 px-2 py-1 rounded">
                                {product.condition}
                            </span>
                        )}
                    </div>

                    {/* Stock Status Text */}
                    <div className="mt-4 pt-4 border-t border-primary-100">
                        <p className={`text-xs font-medium ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
                            {isInStock ? '✓ In Stock' : '✗ Out of Stock'}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
