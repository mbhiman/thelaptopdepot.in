import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { productsAPI, categoriesAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

const Category = () => {
    const { slug } = useParams();
    const { data: category, loading: categoryLoading } = useFetch(() => categoriesAPI.getBySlug(slug));
    const { data: products, loading: productsLoading } = useFetch(() => productsAPI.getByCategory(slug));

    if (categoryLoading || productsLoading) {
        return <Loading />;
    }

    if (!category) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h2 className="text-2xl font-display font-bold text-primary-900 mb-4">
                    Category Not Found
                </h2>
                <p className="text-primary-600">The category you're looking for doesn't exist.</p>
            </div>
        );
    }

    return (
        <div className="bg-primary-50 min-h-screen">
            {/* Header */}
            <div className="bg-primary-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-display font-bold mb-2">{category.name}</h1>
                    <p className="text-primary-200">{category.description}</p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {products && products.length > 0 ? (
                    <>
                        <div className="mb-6">
                            <p className="text-primary-600">
                                Showing {products.length} product{products.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                            <span className="text-4xl">📦</span>
                        </div>
                        <h3 className="text-2xl font-display font-semibold text-primary-900 mb-2">
                            No Products Available
                        </h3>
                        <p className="text-primary-600">
                            Check back soon for new arrivals in this category.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Category;