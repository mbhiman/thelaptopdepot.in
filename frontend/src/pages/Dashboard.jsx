import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiViewGrid, HiTag, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import Loading from '../components/Loading';
import { useFetch } from '../hooks/useFetch';
import { productsAPI, categoriesAPI } from '../services/api';

const Dashboard = () => {
    const { data: stats, loading: loadingStats } = useFetch(() => productsAPI.getStats());
    const { data: categories, loading: loadingCategories } = useFetch(() =>
        categoriesAPI.getAll({ with_count: true })
    );
    const { data: recentProducts, loading: loadingProducts } = useFetch(() => productsAPI.getAll());

    const statCards = [
        {
            title: 'Total Products',
            value: stats?.total_products || 0,
            icon: HiViewGrid,
            color: 'bg-blue-500',
            link: '/admin/products',
        },
        {
            title: 'In Stock',
            value: stats?.in_stock || 0,
            icon: HiCheckCircle,
            color: 'bg-green-500',
            link: '/admin/products',
        },
        {
            title: 'Out of Stock',
            value: stats?.out_of_stock || 0,
            icon: HiXCircle,
            color: 'bg-red-500',
            link: '/admin/products',
        },
        {
            title: 'Categories',
            value: categories?.length || 0,
            icon: HiTag,
            color: 'bg-purple-500',
            link: '/admin/categories',
        },
    ];

    if (loadingStats && loadingCategories) {
        return <Loading />;
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Welcome */}
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-primary-900 mb-2">
                    Dashboard
                </h1>
                <p className="text-primary-600">
                    Welcome back! Here's an overview of your store.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                        <Link
                            to={stat.link}
                            className="card p-6 hover:-translate-y-1 transition-all duration-300 block"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-sm ${stat.color}`}>
                                    <stat.icon className="text-white" size={24} />
                                </div>
                            </div>
                            <p className="text-primary-600 text-sm font-medium mb-1">
                                {stat.title}
                            </p>
                            <p className="text-3xl font-display font-bold text-primary-900">
                                {stat.value}
                            </p>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Recent Products */}
            <div className="card p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-display font-bold text-primary-900">
                        Recent Products
                    </h2>
                    <Link
                        to="/admin/products"
                        className="text-primary-600 hover:text-primary-900 text-sm font-medium transition-colors"
                    >
                        View All →
                    </Link>
                </div>

                {loadingProducts ? (
                    <Loading />
                ) : recentProducts && recentProducts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-primary-200">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-primary-700">
                                        Product
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-primary-700">
                                        Category
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-primary-700">
                                        Price
                                    </th>
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-primary-700">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentProducts.slice(0, 5).map((product) => (
                                    <tr
                                        key={product.id}
                                        className="border-b border-primary-100 hover:bg-primary-50 transition-colors"
                                    >
                                        <td className="py-3 px-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-primary-100 rounded flex-shrink-0"></div>
                                                <div>
                                                    <p className="font-medium text-primary-900 text-sm">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-xs text-primary-500">{product.brand}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-primary-700">
                                            {product.category_name}
                                        </td>
                                        <td className="py-3 px-4 text-sm font-semibold text-primary-900">
                                            ₹{product.price.toLocaleString('en-IN')}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-medium rounded ${product.stock_status === 'in_stock'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {product.stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-primary-500 py-8">No products found</p>
                )}
            </div>

            {/* Categories Overview */}
            <div className="card p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-display font-bold text-primary-900">
                        Categories
                    </h2>
                    <Link
                        to="/admin/categories"
                        className="text-primary-600 hover:text-primary-900 text-sm font-medium transition-colors"
                    >
                        Manage Categories →
                    </Link>
                </div>

                {loadingCategories ? (
                    <Loading />
                ) : categories && categories.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="border border-primary-200 rounded-sm p-4 hover:border-primary-400 transition-colors"
                            >
                                <h3 className="font-display font-semibold text-primary-900 mb-1">
                                    {category.name}
                                </h3>
                                <p className="text-sm text-primary-600">
                                    {category.product_count} {category.product_count === 1 ? 'product' : 'products'}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-primary-500 py-8">No categories found</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
