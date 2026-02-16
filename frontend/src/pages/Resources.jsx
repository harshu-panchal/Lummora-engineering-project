import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Truck, HardHat, Car, Settings, Lightbulb, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Resources = () => {
    const features = [
        { icon: <Globe />, title: "Tenders", desc: "Access the latest engineering and infrastructure tenders globally." },
        { icon: <Truck />, title: "Logistics Services", desc: "Specialized logistics solutions for project-based engineering." },
        { icon: <HardHat />, title: "Equipment Marketplace", desc: "Buy, sell or lease industrial equipment and machinery." },
        { icon: <Car />, title: "Vehicle Services", desc: "Fleet management and specialized vehicle services for project sites." },
        { icon: <Settings />, title: "Management Resources", desc: "Comprehensive tools for project management and site oversight." },
        { icon: <Lightbulb />, title: "Service Opportunities", desc: "Identify and participate in new project service opportunities." }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] -z-10 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lummora-900/5 blur-[150px] -z-10 rounded-full" />

            <div className="container-custom relative z-10">
                <Link to="/hirexo" className="inline-flex items-center gap-2 text-slate-400 hover:text-lummora-400 transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Selection
                </Link>

                <div className="max-w-4xl mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
                    >
                        Industrial Ecosystem
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight"
                    >
                        Project <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Resource Hub</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-400 font-light max-w-2xl"
                    >
                        A comprehensive industrial ecosystem. Access the equipment, logistics, and opportunities your engineering projects demand.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:border-cyan-400/50 transition-all group"
                        >
                            <div className="w-12 h-12 bg-cyan-400/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{f.title}</h3>
                            <p className="text-slate-400 font-light leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-12 bg-gradient-to-br from-[#06141a] to-[#0a0a0a] border border-cyan-400/20 rounded-3xl text-center relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Explore the marketplace</h2>
                        <p className="text-slate-400 mb-10 max-w-xl mx-auto font-light">
                            Join the Lummora ecosystem and access a wide range of industrial resources.
                        </p>
                        <div className="flex justify-center">
                            <Button to="https://www.hirexo.in/" className="px-12 py-4 bg-cyan-600 hover:bg-cyan-700">Visit Website</Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Resources;
