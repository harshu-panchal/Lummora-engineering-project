import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { Filter, ArrowUpRight } from 'lucide-react';

const Portfolio = () => {
    // Enhanced project data with categories
    const allProjects = [
        {
            id: 1,
            name: "Mega Industrial Complex",
            category: "Industrial",
            client: "Global Mfg Corp",
            location: "Gujarat, India",
            image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=1000",
            stats: { area: "500,000 sq.ft", duration: "18 Months" }
        },
        {
            id: 2,
            name: "City Metro Pipeline",
            category: "Infrastructure",
            client: "Metro Rail Corp",
            location: "Mumbai, India",
            image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000",
            stats: { length: "25 km", duration: "24 Months" }
        },
        {
            id: 3,
            name: "Tech Park One",
            category: "Commercial",
            client: "Innovate Builders",
            location: "Bangalore, India",
            image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1000",
            stats: { area: "1M sq.ft", duration: "30 Months" }
        },
        {
            id: 4,
            name: "Solar Energy Farm",
            category: "Infrastructure",
            client: "Green Power Ltd",
            location: "Rajasthan, India",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000",
            stats: { capacity: "500 MW", duration: "12 Months" }
        },
        {
            id: 5,
            name: "Luxury Hotel Tower",
            category: "Commercial",
            client: "Grand Hosp. Grp",
            location: "Delhi, India",
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000",
            stats: { floors: "45 Floors", duration: "36 Months" }
        }
    ];

    const [filter, setFilter] = useState('All');

    const filteredProjects = filter === 'All'
        ? allProjects
        : allProjects.filter(p => p.category === filter);

    const categories = ['All', 'Industrial', 'Infrastructure', 'Commercial'];

    return (
        <div className="bg-[#050505] min-h-screen text-gray-300">
            <section className="bg-black text-white py-24 text-center relative overflow-hidden text-gradient-border-bottom">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
                <div className="container-custom relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="font-heading font-black text-5xl md:text-7xl mb-4 text-white uppercase tracking-tight"
                    >
                        Our <span className="text-neon-blue">Portfolio</span>
                    </motion.h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">Delivering landmark engineering projects across India.</p>
                </div>
            </section>

            <section className="py-16">
                <div className="container-custom">
                    {/* Neon Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-8 py-2 text-sm uppercase tracking-widest font-bold transition-all duration-300 border skew-x-[-10deg] ${filter === cat
                                    ? 'bg-neon-blue border-neon-blue text-black shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                                    : 'bg-transparent border-white/20 text-gray-400 hover:border-white hover:text-white'
                                    }`}
                            >
                                <span className="skew-x-[10deg] inline-block">{cat}</span>
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative border border-white/10 bg-white/5 overflow-hidden shadow-2xl hover:border-neon-blue/50 transition-colors duration-500"
                                >
                                    <div className="aspect-[4/5] relative overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent opacity-90 transition-opacity"></div>

                                        {/* Content Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="mb-4">
                                                <span className="text-neon-blue text-xs font-bold uppercase tracking-wider mb-2 block glow-text">
                                                    {project.category}
                                                </span>
                                                <h3 className="text-2xl font-bold text-white leading-tight uppercase font-heading">{project.name}</h3>
                                            </div>

                                            <div className="space-y-2 text-gray-400 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 border-t border-white/10 pt-4">
                                                <div className="flex justify-between">
                                                    <span>Client</span>
                                                    <span className="font-semibold text-white">{project.client}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Location</span>
                                                    <span className="font-semibold text-white">{project.location}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Scale</span>
                                                    <span className="font-semibold text-neon-green">{project.stats.area || project.stats.capacity || project.stats.length || project.stats.floors}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest group-hover:text-neon-blue transition-colors cursor-pointer">
                                                Case Study <ArrowUpRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
