import { Link } from 'react-router-dom';
import { HiLocationMarker, HiPhone, HiMail } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-display font-bold mb-4">The Laptop Depot</h3>
                        <p className="text-primary-300 text-sm leading-relaxed">
                            Your trusted destination for premium refurbished electronics in Siliguri.
                            Quality assured, affordably priced.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-display font-semibold text-lg mb-4">Shop</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/category/laptops" className="text-primary-300 hover:text-white text-sm transition-colors">
                                    Laptops
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/desktops" className="text-primary-300 hover:text-white text-sm transition-colors">
                                    Desktops
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/mobiles" className="text-primary-300 hover:text-white text-sm transition-colors">
                                    Mobiles
                                </Link>
                            </li>
                            <li>
                                <Link to="/category/accessories" className="text-primary-300 hover:text-white text-sm transition-colors">
                                    Accessories
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-display font-semibold text-lg mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-2 text-sm text-primary-300">
                                <HiLocationMarker className="flex-shrink-0 mt-1" size={16} />
                                <span>Panitanki More, Ramkrishna Samity Building, Sevoke Rd, Siliguri, West Bengal 734001</span>
                            </li>
                            <li className="flex items-center space-x-2 text-sm text-primary-300">
                                <HiPhone className="flex-shrink-0" size={16} />
                                <a href="tel:+918389021443" className="hover:text-white transition-colors">
                                    +91 83890 21443
                                </a>
                            </li>
                            <li className="flex items-center space-x-2 text-sm text-primary-300">
                                <HiMail className="flex-shrink-0" size={16} />
                                <a href="mailto:thelaptopdepot02@gmail.com" className="hover:text-white transition-colors">
                                    thelaptopdepot02@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Business Hours */}
                    <div>
                        <h4 className="font-display font-semibold text-lg mb-4">Business Hours</h4>
                        <ul className="space-y-2 text-sm text-primary-300">
                            <li className="flex justify-between">
                                <span>Monday - Saturday</span>
                                <span>10 AM - 8 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday</span>
                                <span>11 AM - 6 PM</span>
                            </li>
                        </ul>
                        <a
                            href="https://wa.me/918389021443"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-sm transition-colors"
                        >
                            <FaWhatsapp size={20} />
                            <span className="font-medium">Chat on WhatsApp</span>
                        </a>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-primary-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-primary-400">
                            © {currentYear} The Laptop Depot. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm text-primary-400">
                            <Link to="/admin/login" className="hover:text-white transition-colors">
                                Admin
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;