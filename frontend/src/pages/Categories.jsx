import { useState, useEffect } from 'react';
import { categoriesAPI } from '../services/api';
import Loading from '../components/Loading';
import { HiPencil, HiTrash, HiPlus, HiX } from 'react-icons/hi';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        icon: 'laptop'
    });
    const [formLoading, setFormLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await categoriesAPI.getAll({ with_count: true });
            setCategories(response.data.data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingCategory(null);
        setFormData({
            name: '',
            slug: '',
            description: '',
            icon: 'laptop'
        });
        setShowForm(true);
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            slug: category.slug,
            description: category.description || '',
            icon: category.icon || 'laptop'
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category? Products in this category will have no category.')) {
            return;
        }

        try {
            await categoriesAPI.delete(id);
            fetchCategories();
        } catch (error) {
            alert('Failed to delete category');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Auto-generate slug from name
        if (name === 'name' && !editingCategory) {
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
        setFormLoading(true);

        try {
            if (editingCategory) {
                await categoriesAPI.update(editingCategory.id, formData);
            } else {
                await categoriesAPI.create(formData);
            }
            setShowForm(false);
            fetchCategories();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save category');
        } finally {
            setFormLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-primary-900 mb-2">
                        Categories
                    </h1>
                    <p className="text-primary-600">
                        Organize your products into categories
                    </p>
                </div>
                <button onClick={handleCreate} className="btn-primary">
                    <HiPlus className="inline mr-2" size={20} />
                    Add Category
                </button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(category => (
                    <div key={category.id} className="card p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">
                                    {category.icon === 'laptop' && '💻'}
                                    {category.icon === 'desktop' && '🖥️'}
                                    {category.icon === 'mobile' && '📱'}
                                    {category.icon === 'accessories' && '🎧'}
                                </span>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <HiPencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(category.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <HiTrash size={18} />
                                </button>
                            </div>
                        </div>

                        <h3 className="text-xl font-display font-semibold text-primary-900 mb-2">
                            {category.name}
                        </h3>
                        <p className="text-sm text-primary-600 mb-4">
                            {category.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-primary-500">Slug: {category.slug}</span>
                            <span className="px-3 py-1 bg-accent-50 text-accent-700 rounded-full font-medium">
                                {category.product_count || 0} products
                            </span>
                        </div>
                    </div>
                ))}

                {categories.length === 0 && (
                    <div className="col-span-full text-center py-16">
                        <p className="text-primary-500">No categories yet. Create your first one!</p>
                    </div>
                )}
            </div>

            {/* Category Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-primary-200">
                            <h2 className="text-2xl font-display font-bold text-primary-900">
                                {editingCategory ? 'Edit Category' : 'Add New Category'}
                            </h2>
                            <button
                                onClick={() => setShowForm(false)}
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

                            <div>
                                <label htmlFor="name" className="label">
                                    Category Name *
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

                            <div>
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

                            <div>
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
                                <label htmlFor="icon" className="label">
                                    Icon
                                </label>
                                <select
                                    id="icon"
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleChange}
                                    className="input"
                                >
                                    <option value="laptop">💻 Laptop</option>
                                    <option value="desktop">🖥️ Desktop</option>
                                    <option value="mobile">📱 Mobile</option>
                                    <option value="accessories">🎧 Accessories</option>
                                </select>
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end space-x-4 pt-6 border-t border-primary-200">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-6 py-2 border border-primary-300 text-primary-700 rounded-sm hover:bg-primary-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={formLoading}
                                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {formLoading ? 'Saving...' : editingCategory ? 'Update Category' : 'Create Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;