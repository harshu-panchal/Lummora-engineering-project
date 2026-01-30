import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import Button from '../ui/Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Excellence', path: '/engineering-excellence' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Team', path: '/team' },
        { name: 'Quality & Safety', path: '/quality-safety' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${scrolled
                ? 'bg-[#050505]/80 backdrop-blur-md border-white/10 py-3'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="container-custom flex justify-between items-center relative">

                {/* Neon Glow Line on Scroll */}
                <div className={`absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-neon-blue to-transparent transition-all duration-500 ${scrolled ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-neon-blue blur-md opacity-20 group-hover:opacity-50 transition-opacity"></div>
                        <div className="w-10 h-10 border border-neon-blue/30 bg-black text-neon-blue flex items-center justify-center font-bold text-xl relative z-10 clip-path-hex">
                            <Zap size={20} fill="currentColor" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-heading font-bold text-2xl leading-none tracking-tight text-white group-hover:text-neon-blue transition-colors">
                            LUMMORA
                        </span>
                        <span className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-500">
                            Engineering
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    <div className="flex bg-white/5 rounded-full px-2 py-1 border border-white/5 backdrop-blur-sm mr-4">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="relative px-5 py-2 text-sm font-medium transition-colors"
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-neon-blue/10 rounded-full border border-neon-blue/30"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className={`relative z-10 ${isActive ? 'text-neon-blue' : 'text-gray-400 hover:text-white'}`}>
                                        {link.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>

                    <Button
                        to="/contact"
                        variant="primary"
                        className="text-xs px-6 py-2.5"
                    >
                        Start Project
                    </Button>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-white hover:text-neon-blue transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-black border-b border-white/10 overflow-hidden"
                    >
                        <div className="container-custom py-6 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`text-lg font-medium py-3 px-4 rounded-md border-l-2 ${location.pathname === link.path
                                        ? 'border-neon-blue text-neon-blue bg-neon-blue/5'
                                        : 'border-transparent text-gray-400'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button to="/contact" className="w-full mt-4 justify-center">
                                Get a Quote
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
