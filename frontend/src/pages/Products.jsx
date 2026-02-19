import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash, HiSearch } from 'react-icons/hi';
import Loading from '../components/Loading';
import ProductForm from '../components/ProductForm';
import { useFetch } from '../hooks/useFetch';
import { productsAPI } from '../services/api';

const Products = () => {
    const { data: products, loading, refetch } = useFetch(() => productsAPI.getAll());
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(null);

    const filteredProducts = products?.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            setDeleteLoading(id);
            await productsAPI.delete(id);
            refetch();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete product');
        } finally {
            setDeleteLoading(null);
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingProduct(null);
        refetch();
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-primary-900 mb-2">
                            Products
                        </h1>
                        <p className="text-primary-600">
                            Manage your product inventory
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="btn-primary flex items-center space-x-2"
                    >
                        <HiPlus size={20} />
                        <span>Add Product</span>
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="card p-6 mb-6">
                <div className="relative">
                    <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-field pl-12"
                    />
                </div>
            </div>

            {/* Products Table */}
            <div className="card overflow-hidden">
                {filteredProducts && filteredProducts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-primary-50 border-b border-primary-200">
                                <tr>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-primary-700">
                                        Product
                                    </th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-primary-700">
                                        Category
                                    </th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-primary-700">
                                        Price
                                    </th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-primary-700">
                                        Stock
                                    </th>
                                    <th className="text-left py-4 px-6 text-sm font-semibold text-primary-700">
                                        Status
                                    </th>
                                    <th className="text-right py-4 px-6 text-sm font-semibold text-primary-700">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product, index) => (
                                    <motion.tr
                                        key={product.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b border-primary-100 hover:bg-primary-50 transition-colors"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-primary-100 rounded flex-shrink-0"></div>
                                                <div>
                                                    <p className="font-medium text-primary-900 text-sm">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-xs text-primary-500">{product.brand}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-primary-700">
                                            {product.category_name}
                                        </td>
                                        <td className="py-4 px-6 text-sm font-semibold text-primary-900">
                                            ₹{product.price.toLocaleString('en-IN')}
                                        </td>
                                        <td className="py-4 px-6 text-sm">
                                            {product.stock_status === 'in_stock' ? (
                                                <span className="text-green-600">Available</span>
                                            ) : (
                                                <span className="text-red-600">Unavailable</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-2">
                                                {product.is_featured && (
                                                    <span className="px-2 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="p-2 text-primary-600 hover:bg-primary-100 rounded transition-colors"
                                                    title="Edit"
                                                >
                                                    <HiPencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id)}
                                                    disabled={deleteLoading === product.id}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <HiTrash size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-primary-500">
                            {searchTerm ? 'No products match your search' : 'No products yet'}
                        </p>
                    </div>
                )}
            </div>

            {/* Product Form Modal */}
            {showForm && (
                <ProductForm
                    product={editingProduct}
                    onClose={handleFormClose}
                />
            )}
        </div>
    );
};

export default Products;
