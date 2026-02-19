import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiShieldCheck, HiCurrencyRupee } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { useFetch } from '../hooks/useFetch';
import { productsAPI, categoriesAPI } from '../services/api';

const Home = () => {
    const { data: featuredProducts, loading: loadingProducts, error: productsError } = useFetch(() => productsAPI.getFeatured());
    const { data: categories, loading: loadingCategories } = useFetch(() => categoriesAPI.getAll({ with_count: true }));

    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzMuMzEzIDAgNiAyLjY4NyA2IDZzLTIuNjg3IDYtNiA2LTYtMi42ODctNi02IDIuNjg3LTYgNi02ek0wIDIwYzMuMzEzIDAgNiAyLjY4NyA2IDZzLTIuNjg3IDYtNiA2di0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <h1 className="section-title text-white mb-6">
                            Premium Refurbished Electronics
                        </h1>
                        <p className="text-xl md:text-2xl text-primary-100 mb-8 font-light leading-relaxed">
                            Discover quality laptops, desktops, and mobiles at unbeatable prices.
                            Based in Siliguri, serving with trust and excellence.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link to="/category/laptops" className="btn-accent">
                                Browse Products
                            </Link>
                            <a
                                href="https://wa.me/918389021443"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-sm font-medium transition-all duration-300"
                            >
                                <FaWhatsapp size={20} />
                                <span>Contact on WhatsApp</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
                    >
                        <div className="flex items-start space-x-4">
                            <HiShieldCheck className="flex-shrink-0 text-accent-400" size={32} />
                            <div>
                                <h3 className="font-display font-semibold text-lg mb-1">Quality Assured</h3>
                                <p className="text-primary-200 text-sm">Thoroughly tested and certified products</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <HiCurrencyRupee className="flex-shrink-0 text-accent-400" size={32} />
                            <div>
                                <h3 className="font-display font-semibold text-lg mb-1">Best Prices</h3>
                                <p className="text-primary-200 text-sm">Competitive pricing on all products</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <HiLocationMarker className="flex-shrink-0 text-accent-400" size={32} />
                            <div>
                                <h3 className="font-display font-semibold text-lg mb-1">Visit Our Store</h3>
                                <p className="text-primary-200 text-sm">Panitanki More, Sevoke Rd, Siliguri</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Categories Section - Improved Styling */}
            <section className="py-20 bg-gradient-to-b from-white to-primary-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="section-title text-primary-900 mb-4">Shop by Category</h2>
                        <p className="section-subtitle mx-auto">
                            Find exactly what you're looking for
                        </p>
                    </motion.div>

                    {loadingCategories ? (
                        <Loading />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories?.map((category, index) => (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Link
                                        to={`/category/${category.slug}`}
                                        className="group block bg-white/60 backdrop-blur-sm border border-primary-100 p-8 rounded-lg text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary-800 group-hover:to-primary-700 transition-all duration-300">
                                            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                                                {category.icon === 'laptop' && '💻'}
                                                {category.icon === 'desktop' && '🖥️'}
                                                {category.icon === 'mobile' && '📱'}
                                                {category.icon === 'accessories' && '🎧'}
                                            </span>
                                        </div>
                                        <h3 className="font-display font-semibold text-xl text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-primary-600 mb-3">{category.description}</p>
                                        {category.product_count > 0 && (
                                            <p className="text-xs text-accent-600 font-semibold bg-accent-50 inline-block px-3 py-1 rounded-full">
                                                {category.product_count} Products
                                            </p>
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Products Section - Dynamic from API */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="section-title text-primary-900 mb-4">Featured Products</h2>
                        <p className="section-subtitle mx-auto">
                            Handpicked deals you don't want to miss
                        </p>
                    </motion.div>

                    {loadingProducts ? (
                        <Loading />
                    ) : productsError ? (
                        <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
                            <p className="text-red-600 mb-4">Failed to load featured products</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="btn-primary"
                            >
                                Retry
                            </button>
                        </div>
                    ) : featuredProducts && featuredProducts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredProducts.slice(0, 6).map((product, index) => (
                                    <ProductCard key={product.id} product={product} index={index} />
                                ))}
                            </div>

                            <div className="text-center mt-12">
                                <Link to="/category/laptops" className="btn-secondary">
                                    View All Products
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16 bg-primary-50 rounded-lg">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
                                <span className="text-4xl">📦</span>
                            </div>
                            <h3 className="text-2xl font-display font-semibold text-primary-900 mb-2">
                                No Featured Products Yet
                            </h3>
                            <p className="text-primary-600 mb-6">
                                Check back soon for our latest deals, or browse all products.
                            </p>
                            <Link to="/category/laptops" className="btn-primary">
                                Browse All Products
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Location Section */}
            <section className="py-20 bg-primary-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="section-title text-primary-900 mb-4">Visit Our Store</h2>
                        <p className="section-subtitle mx-auto">
                            Located in the heart of Siliguri
                        </p>
                    </motion.div>

                    <div className="card overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.5898933527!2d88.42828231504234!3d26.719999283227805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e441f0b1b1b1b1%3A0x1b1b1b1b1b1b1b1b!2sPanitanki%20More%2C%20Siliguri!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Store Location"
                        ></iframe>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-primary-700 font-medium mb-2">
                            Panitanki More, Ramkrishna Samity Building, Sevoke Rd
                        </p>
                        <p className="text-primary-600 mb-6">Siliguri, West Bengal 734001</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://maps.google.com/?q=Panitanki More, Siliguri"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                Get Directions
                            </a>
                            <a
                                href="tel:+918389021443"
                                className="btn-secondary"
                            >
                                Call: +91 83890 21443
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
