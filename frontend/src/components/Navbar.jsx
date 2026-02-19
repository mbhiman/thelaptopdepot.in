import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiMenu, HiX, HiHome, HiViewGrid } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { path: '/', label: 'Home', icon: HiHome },
        { path: '/category/laptops', label: 'Laptops', icon: HiViewGrid },
        { path: '/category/desktops', label: 'Desktops', icon: HiViewGrid },
        { path: '/category/mobiles', label: 'Mobiles', icon: HiViewGrid },
    ];

    return (
        <nav className="bg-white border-b border-primary-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-primary-800 rounded-sm flex items-center justify-center">
                            <span className="text-white font-display font-bold text-xl">LD</span>
                        </div>
                        <span className="text-xl font-display font-bold text-primary-900 hidden sm:block">
                            The Laptop Depot
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex items-center space-x-1 text-sm font-medium transition-colors ${isActive
                                        ? 'text-primary-800'
                                        : 'text-primary-600 hover:text-primary-900'
                                    }`
                                }
                            >
                                <link.icon size={18} />
                                <span>{link.label}</span>
                            </NavLink>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-sm text-primary-600 hover:text-primary-900 hover:bg-primary-50"
                    >
                        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-primary-100"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-2 px-4 py-3 rounded-sm transition-colors ${isActive
                                            ? 'bg-primary-800 text-white'
                                            : 'text-primary-600 hover:bg-primary-50'
                                        }`
                                    }
                                >
                                    <link.icon size={20} />
                                    <span className="font-medium">{link.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;