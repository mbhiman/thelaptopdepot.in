import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { useFetch } from '../hooks/useFetch';
import { productsAPI, categoriesAPI } from '../services/api';

const Category = () => {
    const { slug } = useParams();

    const { data: category, loading: loadingCategory } = useFetch(
        () => categoriesAPI.getBySlug(slug),
        [slug]
    );

    const { data: products, loading: loadingProducts } = useFetch(
        () => productsAPI.getByCategory(slug),
        [slug]
    );

    if (loadingCategory) {
        return <Loading fullScreen />;
    }

    if (!category) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h2 className="text-3xl font-display font-bold text-primary-900 mb-4">
                    Category not found
                </h2>
                <p className="text-primary-600">The category you're looking for doesn't exist.</p>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <section className="bg-primary-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            {category.name}
                        </h1>
                        {category.description && (
                            <p className="text-xl text-primary-200 max-w-2xl">
                                {category.description}
                            </p>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loadingProducts ? (
                        <Loading />
                    ) : products && products.length > 0 ? (
                        <>
                            <div className="mb-8 flex justify-between items-center">
                                <p className="text-primary-600">
                                    Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map((product, index) => (
                                    <ProductCard key={product.id} product={product} index={index} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                                <span className="text-3xl">📦</span>
                            </div>
                            <h3 className="text-2xl font-display font-semibold text-primary-900 mb-2">
                                No products available
                            </h3>
                            <p className="text-primary-600">
                                Check back soon for new arrivals in this category.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Category;
