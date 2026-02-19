import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/category/laptops', label: 'Laptops' },
        { path: '/category/desktops', label: 'Desktops' },
        { path: '/category/mobiles', label: 'Mobiles' },
        { path: '/category/accessories', label: 'Accessories' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white border-b border-primary-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 bg-primary-800 rounded-md flex items-center justify-center overflow-hidden group-hover:bg-primary-900 transition-colors">
                            <img
                                src="/logo.png"
                                alt="The Laptop Depot logo"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div>
                            <h1 className="text-xl font-display font-bold text-primary-900 leading-none">
                                The Laptop Depot
                            </h1>
                            <p className="text-xs text-primary-500">Refurbished Excellence</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative py-2 text-sm font-medium transition-colors ${isActive(link.path)
                                    ? 'text-primary-900'
                                    : 'text-primary-600 hover:text-primary-900'
                                    }`}
                            >
                                {link.label}
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-[1px] left-0 right-0 h-0.5 bg-primary-900"
                                        initial={false}
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-sm text-primary-600 hover:text-primary-900 hover:bg-primary-50 transition-colors"
                        aria-label="Toggle menu"
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
                        transition={{ duration: 0.2 }}
                        className="md:hidden border-t border-primary-100 bg-white"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block py-2 text-base font-medium transition-colors ${isActive(link.path)
                                        ? 'text-primary-900'
                                        : 'text-primary-600 hover:text-primary-900'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
