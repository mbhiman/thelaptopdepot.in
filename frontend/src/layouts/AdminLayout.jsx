import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { HiHome, HiViewGrid, HiTag, HiLogout } from 'react-icons/hi';
import { useAuth } from '../hooks/useAuth';

const AdminLayout = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: HiHome },
        { path: '/admin/products', label: 'Products', icon: HiViewGrid },
        { path: '/admin/categories', label: 'Categories', icon: HiTag },
    ];

    return (
        <div className="min-h-screen bg-primary-50">
            {/* Top Bar */}
            <header className="bg-white border-b border-primary-200 sticky top-0 z-40">
                <div className="px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">

                        {/* Logo + Title */}
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-md overflow-hidden bg-primary-800 flex items-center justify-center">
                                <img
                                    src="/logo.png"
                                    alt="The Laptop Depot"
                                    className="w-full h-full object-contain"
                                />
                            </div>


                            <div>
                                <h1 className="text-lg font-display font-bold text-primary-900">
                                    Admin Panel
                                </h1>
                                <p className="text-xs text-primary-500">The Laptop Depot</p>
                            </div>
                        </div>

                        {/* User + Logout */}
                        <div className="flex items-center space-x-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-primary-900">{user?.username}</p>
                                <p className="text-xs text-primary-500">{user?.role}</p>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-sm transition-colors"
                                title="Logout"
                            >
                                <HiLogout size={18} />
                                <span className="hidden sm:inline text-sm font-medium">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="bg-white border-b border-primary-200">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${isActive
                                        ? 'border-primary-800 text-primary-900'
                                        : 'border-transparent text-primary-600 hover:text-primary-900 hover:border-primary-300'
                                    }`
                                }
                            >
                                <item.icon size={18} />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
