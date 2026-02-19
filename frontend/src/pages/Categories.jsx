import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import Loading from '../components/Loading';
import { useFetch } from '../hooks/useFetch';
import { categoriesAPI } from '../services/api';

const Categories = () => {
    const { data: categories, loading, refetch } = useFetch(() =>
        categoriesAPI.getAll({ with_count: true })
    );
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        icon: 'laptop',
    });
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState('');

    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            slug: category.slug,
            description: category.description || '',
            icon: category.icon || 'laptop',
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure? This will remove all products from this category.')) return;

        try {
            await categoriesAPI.delete(id);
            refetch();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to delete category');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormLoading(true);

        try {
            if (editingCategory) {
                await categoriesAPI.update(editingCategory.id, formData);
            } else {
                await categoriesAPI.create(formData);
            }
            setShowForm(false);
            setEditingCategory(null);
            setFormData({ name: '', slug: '', description: '', icon: 'laptop' });
            refetch();
        } catch (err) {
            setFormError(err.response?.data?.message || 'Failed to save category');
        } finally {
            setFormLoading(false);
        }
    };

    const generateSlug = (name) => {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-primary-900 mb-2">
                            Categories
                        </h1>
                        <p className="text-primary-600">
                            Organize your products into categories
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setEditingCategory(null);
                            setFormData({ name: '', slug: '', description: '', icon: 'laptop' });
                            setShowForm(true);
                        }}
                        className="btn-primary flex items-center space-x-2"
                    >
                        <HiPlus size={20} />
                        <span>Add Category</span>
                    </button>
                </div>
            </div>

            {/* Form */}
            {showForm && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-6 mb-6"
                >
                    <h3 className="text-xl font-display font-semibold text-primary-900 mb-4">
                        {editingCategory ? 'Edit Category' : 'Add New Category'}
                    </h3>

                    {formError && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">
                            {formError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                            slug: generateSlug(e.target.value),
                                        });
                                    }}
                                    required
                                    className="input-field"
                                    placeholder="Laptops"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-primary-700 mb-2">
                                    Slug *
                                </label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    required
                                    className="input-field"
                                    placeholder="laptops"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-primary-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows="2"
                                className="input-field"
                                placeholder="Premium refurbished laptops"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-primary-700 mb-2">
                                Icon
                            </label>
                            <select
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="input-field"
                            >
                                <option value="laptop">💻 Laptop</option>
                                <option value="desktop">🖥️ Desktop</option>
                                <option value="mobile">📱 Mobile</option>
                                <option value="accessories">🎧 Accessories</option>
                            </select>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingCategory(null);
                                }}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={formLoading}
                                className="btn-primary disabled:opacity-50"
                            >
                                {formLoading ? 'Saving...' : editingCategory ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories?.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="card p-6"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="text-3xl">
                                    {category.icon === 'laptop' && '💻'}
                                    {category.icon === 'desktop' && '🖥️'}
                                    {category.icon === 'mobile' && '📱'}
                                    {category.icon === 'accessories' && '🎧'}
                                </div>
                                <div>
                                    <h3 className="font-display font-semibold text-lg text-primary-900">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-primary-500">/{category.slug}</p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="p-2 text-primary-600 hover:bg-primary-100 rounded transition-colors"
                                    title="Edit"
                                >
                                    <HiPencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                    title="Delete"
                                >
                                    <HiTrash size={18} />
                                </button>
                            </div>
                        </div>

                        {category.description && (
                            <p className="text-sm text-primary-600 mb-3">{category.description}</p>
                        )}

                        <div className="pt-3 border-t border-primary-100">
                            <p className="text-sm font-medium text-primary-700">
                                {category.product_count} {category.product_count === 1 ? 'Product' : 'Products'}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {categories?.length === 0 && (
                <div className="text-center py-12 card">
                    <p className="text-primary-500">No categories yet. Create one to get started.</p>
                </div>
            )}
        </div>
    );
};

export default Categories;
