import { useFetch } from '../hooks/useFetch';
import { productsAPI } from '../services/api';
import Loading from '../components/Loading';
import { HiViewGrid, HiCheckCircle, HiXCircle, HiStar } from 'react-icons/hi';

const Dashboard = () => {
    const { data: stats, loading, error } = useFetch(() => productsAPI.getStats());

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">Failed to load statistics</p>
            </div>
        );
    }

    const statCards = [
        {
            title: 'Total Products',
            value: stats?.total_products || 0,
            icon: HiViewGrid,
            color: 'bg-blue-500',
            textColor: 'text-blue-600'
        },
        {
            title: 'In Stock',
            value: stats?.in_stock || 0,
            icon: HiCheckCircle,
            color: 'bg-green-500',
            textColor: 'text-green-600'
        },
        {
            title: 'Out of Stock',
            value: stats?.out_of_stock || 0,
            icon: HiXCircle,
            color: 'bg-red-500',
            textColor: 'text-red-600'
        },
        {
            title: 'Featured',
            value: stats?.featured || 0,
            icon: HiStar,
            color: 'bg-yellow-500',
            textColor: 'text-yellow-600'
        }
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-primary-900 mb-2">
                    Dashboard
                </h1>
                <p className="text-primary-600">
                    Overview of your store inventory
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => (
                    <div key={index} className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                                <stat.icon className={stat.textColor} size={24} />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-primary-900 mb-1">
                            {stat.value}
                        </h3>
                        <p className="text-sm text-primary-600">{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="card p-6">
                <h2 className="text-xl font-display font-semibold text-primary-900 mb-4">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <a href="/admin/products" className="btn-primary text-center">
                        Manage Products
                    </a>
                    <a href="/admin/categories" className="btn-secondary text-center">
                        Manage Categories
                    </a>
                    <a href="/" target="_blank" className="btn-secondary text-center">
                        View Store
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;