import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { productsAPI, categoriesAPI } from '../services/api';
import { useFetch } from '../hooks/useFetch';

const ProductForm = ({ product, onClose }) => {
    const { data: categories } = useFetch(() => categoriesAPI.getAll());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
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
        condition: 'Excellent',
        warranty: '',
        image_url: '',
        stock_status: 'in_stock',
        is_featured: false,
    });

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
                condition: product.condition || 'Excellent',
                warranty: product.warranty || '',
                image_url: product.image_url || '',
                stock_status: product.stock_status || 'in_stock',
                is_featured: product.is_featured || false,
            });
        }
    }, [product]);

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Auto-generate slug from name
        if (name === 'name' && !product) {
            setFormData(prev => ({
                ...prev,
                slug: generateSlug(value),
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Convert numeric fields
            const data = {
                ...formData,
                price: parseFloat(formData.price),
                original_price: formData.original_price ? parseFloat(formData.original_price) : null,
                category_id: parseInt(formData.category_id),
            };

            if (product) {
                await productsAPI.update(product.id, data);
            } else {
                await productsAPI.create(data);
            }

            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-sm shadow-2xl max-w-4xl w-full my-8"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-primary-200">
                        <h2 className="text-2xl font-display font-bold text-primary-900">
                            {product ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-primary-100 rounded transition-colors"
                        >
                            <HiX size={24} />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6">
                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-2">
                            {/* Basic Info */}
                            <div className="md:col-span-2">
                                <h3 className="font-display font-semibold text-lg text-primary-900 mb-4">
                                    Basic Information
                                </h3>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Product Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="Dell Latitude 7490"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Slug *
                                </label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                    placeholder="dell-latitude-7490"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className="input-field"
                                    placeholder="Product description..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category_id"
                                    value={formData.category_id}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                >
                                    <option value="">Select category</option>
                                    {categories?.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="Dell, HP, Lenovo"
                                />
                            </div>

                            {/* Pricing */}
                            <div className="md:col-span-2 mt-4">
                                <h3 className="font-display font-semibold text-lg text-primary-900 mb-4">
                                    Pricing
                                </h3>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Price *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="0.01"
                                    className="input-field"
                                    placeholder="28999"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Original Price
                                </label>
                                <input
                                    type="number"
                                    name="original_price"
                                    value={formData.original_price}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    className="input-field"
                                    placeholder="45000"
                                />
                            </div>

                            {/* Specifications */}
                            <div className="md:col-span-2 mt-4">
                                <h3 className="font-display font-semibold text-lg text-primary-900 mb-4">
                                    Specifications
                                </h3>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Processor
                                </label>
                                <input
                                    type="text"
                                    name="processor"
                                    value={formData.processor}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="Intel Core i5 8th Gen"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    RAM
                                </label>
                                <input
                                    type="text"
                                    name="ram"
                                    value={formData.ram}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="8GB DDR4"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Storage
                                </label>
                                <input
                                    type="text"
                                    name="storage"
                                    value={formData.storage}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="256GB SSD"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Graphics
                                </label>
                                <input
                                    type="text"
                                    name="graphics"
                                    value={formData.graphics}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="Integrated Intel UHD"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Display
                                </label>
                                <input
                                    type="text"
                                    name="display"
                                    value={formData.display}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder='14" FHD (1920x1080)'
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Battery
                                </label>
                                <input
                                    type="text"
                                    name="battery"
                                    value={formData.battery}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="4-5 hours"
                                />
                            </div>

                            {/* Additional Info */}
                            <div className="md:col-span-2 mt-4">
                                <h3 className="font-display font-semibold text-lg text-primary-900 mb-4">
                                    Additional Information
                                </h3>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Condition
                                </label>
                                <select
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleChange}
                                    className="input-field"
                                >
                                    <option value="Excellent">Excellent</option>
                                    <option value="Very Good">Very Good</option>
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Warranty
                                </label>
                                <input
                                    type="text"
                                    name="warranty"
                                    value={formData.warranty}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="3 Months"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Stock Status
                                </label>
                                <select
                                    name="stock_status"
                                    value={formData.stock_status}
                                    onChange={handleChange}
                                    className="input-field"
                                >
                                    <option value="in_stock">In Stock</option>
                                    <option value="out_of_stock">Out of Stock</option>
                                    <option value="low_stock">Low Stock</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    name="image_url"
                                    value={formData.image_url}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="is_featured"
                                        checked={formData.is_featured}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-primary-800 border-primary-300 rounded focus:ring-primary-500"
                                    />
                                    <span className="text-sm font-medium text-primary-700">
                                        Mark as Featured Product
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-primary-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn-secondary"
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
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProductForm;
