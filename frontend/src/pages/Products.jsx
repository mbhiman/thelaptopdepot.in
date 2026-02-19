import { useState, useEffect } from 'react';
import { productsAPI, categoriesAPI } from '../services/api';
import Loading from '../components/Loading';
import ProductForm from '../components/ProductForm';
import { HiPencil, HiTrash, HiPlus, HiSearch } from 'react-icons/hi';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productsAPI.getAll();
            setProducts(response.data.data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoriesAPI.getAll();
            setCategories(response.data.data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const handleCreate = () => {
        setEditingProduct(null);
        setShowForm(true);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            await productsAPI.delete(id);
            fetchProducts();
        } catch (error) {
            alert('Failed to delete product');
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingProduct(null);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingProduct(null);
        fetchProducts();
    };

    const handleStockToggle = async (product) => {
        const newStatus = product.stock_status === 'in_stock' ? 'out_of_stock' : 'in_stock';
        try {
            await productsAPI.updateStock(product.id, newStatus);
            fetchProducts();
        } catch (error) {
            alert('Failed to update stock status');
        }
    };

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || product.category_id === parseInt(selectedCategory);
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-primary-900 mb-2">
                        Products
                    </h1>
                    <p className="text-primary-600">
                        Manage your product inventory
                    </p>
                </div>
                <button onClick={handleCreate} className="btn-primary">
                    <HiPlus className="inline mr-2" size={20} />
                    Add Product
                </button>
            </div>

            {/* Filters */}
            <div className="card p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input pl-10"
                        />
                    </div>

                    {/* Category filter */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="input"
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Products Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-primary-200">
                        <thead className="bg-primary-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                                    Product
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                                    Featured
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-primary-700 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-primary-200">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <tr key={product.id} className="hover:bg-primary-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-primary-900">
                                                    {product.name}
                                                </div>
                                                <div className="text-sm text-primary-500">
                                                    {product.brand}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-primary-900">
                                                {product.category_name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-primary-900">
                                                ₹{product.price.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleStockToggle(product)}
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${product.stock_status === 'in_stock'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}
                                            >
                                                {product.stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {product.is_featured ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    Featured
                                                </span>
                                            ) : (
                                                <span className="text-sm text-primary-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="text-primary-600 hover:text-primary-900 mr-4"
                                                title="Edit"
                                            >
                                                <HiPencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-600 hover:text-red-900"
                                                title="Delete"
                                            >
                                                <HiTrash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-primary-500">
                                        No products found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Product Form Modal */}
            {showForm && (
                <ProductForm
                    product={editingProduct}
                    categories={categories}
                    onClose={handleFormClose}
                    onSuccess={handleFormSuccess}
                />
            )}
        </div>
    );
};

export default Products;