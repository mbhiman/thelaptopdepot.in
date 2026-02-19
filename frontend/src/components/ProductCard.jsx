import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';

const ProductCard = ({ product, index = 0 }) => {
    const inStock = product.stock_status === 'in_stock';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link to={`/product/${product.slug}`} className="block group">
                <div className="card overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                    {/* Image placeholder */}
                    <div className="bg-primary-50 aspect-video flex items-center justify-center text-primary-300">
                        <span className="text-6xl">💻</span>
                    </div>

                    <div className="p-6">
                        {/* Stock status */}
                        <div className="flex items-center space-x-2 mb-2">
                            {inStock ? (
                                <>
                                    <HiCheckCircle className="text-green-500" size={18} />
                                    <span className="text-xs text-green-700 font-medium">In Stock</span>
                                </>
                            ) : (
                                <>
                                    <HiXCircle className="text-red-500" size={18} />
                                    <span className="text-xs text-red-700 font-medium">Out of Stock</span>
                                </>
                            )}
                        </div>

                        {/* Product name */}
                        <h3 className="text-lg font-display font-semibold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                            {product.name}
                        </h3>

                        {/* Specs preview */}
                        <div className="space-y-1 mb-4 text-sm text-primary-600">
                            {product.processor && (
                                <p className="line-clamp-1">{product.processor}</p>
                            )}
                            {product.ram && product.storage && (
                                <p className="line-clamp-1">{product.ram} | {product.storage}</p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-bold text-primary-900">
                                ₹{product.price.toLocaleString()}
                            </span>
                            {product.original_price && (
                                <span className="text-sm text-primary-400 line-through">
                                    ₹{product.original_price.toLocaleString()}
                                </span>
                            )}
                        </div>

                        {/* Condition badge */}
                        {product.condition && (
                            <div className="mt-4">
                                <span className="inline-block px-3 py-1 bg-accent-50 text-accent-700 text-xs font-medium rounded-full">
                                    {product.condition}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;