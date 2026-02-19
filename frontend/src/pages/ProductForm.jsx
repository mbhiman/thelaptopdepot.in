import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import { HiX } from 'react-icons/hi';

const ProductForm = ({ product, categories, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        original_price: '',
        category_id: '',
        brand: '',
        processor: '',
        ram: '',
        storage: '',
        graphics: '',
        display: '',
        battery: '',
        condition: '',
        warranty: '',
        image_url: '',
        stock_status: 'in_stock',
        is_featured: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                slug: product.slug || '',
                description: product.description || '',
                price: product.price || '',
                original_price: product.original_price || '',
                category_id: product.category_id || '',
                brand: product.brand || '',
                processor: product.processor || '',
                ram: product.ram || '',
                storage: product.storage || '',
                graphics: product.graphics || '',
                display: product.display || '',
                battery: product.battery || '',
                condition: product.condition || '',
                warranty: product.warranty || '',
                image_url: product.image_url || '',
                stock_status: product.stock_status || 'in_stock',
                is_featured: product.is_featured || false
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });

        // Auto-generate slug from name
        if (name === 'name' && !product) {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Convert prices to numbers
            const dataToSubmit = {
                ...formData,
                price: parseFloat(formData.price),
                original_price: formData.original_price ? parseFloat(formData.original_price) : null,
                category_id: parseInt(formData.category_id)
            };

            if (product) {
                await productsAPI.update(product.id, dataToSubmit);
            } else {
                await productsAPI.create(dataToSubmit);
            }

            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-primary-200 sticky top-0 bg-white">
                    <h2 className="text-2xl font-display font-bold text-primary-900">
                        {product ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-primary-100 rounded-full transition-colors"
                    >
                        <HiX size={24} className="text-primary-600" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-sm">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Basic Information */}
                    <div>
                        <h3 className="text-lg font-semibold text-primary-900 mb-4">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label htmlFor="name" className="label">
                                    Product Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="slug" className="label">
                                    Slug *
                                </label>
                                <input
                                    type="text"
                                    id="slug"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                />
                                <p className="text-xs text-primary-500 mt-1">
                                    URL-friendly version (auto-generated from name)
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="description" className="label">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className="input"
                                />
                            </div>

                            <div>
                                <label htmlFor="category_id" className="label">
                                    Category *
                                </label>
                                <select
                                    id="category_id"
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="brand" className="label">
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    id="brand"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div>
                        <h3 className="text-lg font-semibold text-primary-900 mb-4">Pricing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="price" className="label">
                                    Price (₹) *
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label htmlFor="original_price" className="label">
                                    Original Price (₹)
                                </label>
                                <input
                                    type="number"
                                    id="original_price"
                                    name="original_price"
                                    value={formData.original_price}
                                    onChange={handleChange}
                                    className="input"
                                    min="0"
                                    step="0.01"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div>
                        <h3 className="text-lg font-semibold text-primary-900 mb-4">Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="processor" className="label">
                                    Processor
                                </label>
                                <input
                                    type="text"
                                    id="processor"
                                    name="processor"
                                    value={formData.processor}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="e.g., Intel Core i5 8th Gen"
                                />
                            </div>

                            <div>
                                <label htmlFor="ram" className="label">
                                    RAM
                                </label>
                                <input
                                    type="text"
                                    id="ram"
                                    name="ram"
                                    value={formData.ram}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="e.g., 8GB DDR4"
                                />
                            </div>

                            <div>
                                <label htmlFor="storage" className="label">
                                    Storage
                                </label>
                                <input
                                    type="text"
                                    id="storage"
                                    name="storage"
                                    value={formData.storage}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="e.g., 256GB SSD"
                                />
                            </div>

                            <div>
                                <label htmlFor="graphics" className="label">
                                    Graphics
                                </label>
                                <input
                                    type="text"
                                    id="graphics"
                                    name="graphics"
                                    value={formData.graphics}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="e.g., Intel UHD Graphics"
                                />
                            </div>

                            <div>
                                <label htmlFor="display" className="label">
                                    Display
                                </label>
                                <input
                                    type="text"
                                    id="display"
                                    name="display"
                                    value={formData.display}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="e.g., 14 inch FHD"
                                />
                            </div>

                            <div>
                                <label htmlFor="battery" className="label">
                                    Battery
                                </label>
                                <input
                                    type="text"
                                    id="battery"
                                    name="battery"
                                    value={formData.battery}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="e.g., 6 hours"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Condition & Warranty */}
                    <div>
                        <h3 className="text-lg font-semibold text-primary-900 mb-4">Condition & Warranty</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="condition" className="label">
                                    Condition
                                </label>
                                <select
                                    id="condition"
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleChange}
                                    className="input"
                                >
                                    <option value="">Select Condition</option>
                                    <option value="Excellent">Excellent</option>
                                    <option value="Very Good">Very Good</option>
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="warranty" className="label">
                                    Warranty
                                </label>
                                <input
                                    type="text"
                                    id="warranty"
                                    name="warranty"
                                    value={formData.warranty}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="e.g., 3 Months"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Stock & Status */}
                    <div>
                        <h3 className="text-lg font-semibold text-primary-900 mb-4">Stock & Status</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="stock_status" className="label">
                                    Stock Status *
                                </label>
                                <select
                                    id="stock_status"
                                    name="stock_status"
                                    value={formData.stock_status}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                >
                                    <option value="in_stock">In Stock</option>
                                    <option value="out_of_stock">Out of Stock</option>
                                    <option value="low_stock">Low Stock</option>
                                </select>
                            </div>

                            <div className="flex items-center pt-8">
                                <input
                                    type="checkbox"
                                    id="is_featured"
                                    name="is_featured"
                                    checked={formData.is_featured}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-primary-800 border-primary-300 rounded focus:ring-primary-500"
                                />
                                <label htmlFor="is_featured" className="ml-2 text-sm font-medium text-primary-700">
                                    Feature this product on homepage
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-4 pt-6 border-t border-primary-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-primary-300 text-primary-700 rounded-sm hover:bg-primary-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;