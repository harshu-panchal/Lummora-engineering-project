import { motion } from 'framer-motion';
import { whyChooseUs } from '../data/content';
import { Trophy, Layers, ShieldCheck, HardHat, DollarSign, Clock } from 'lucide-react';
import Button from '../components/ui/Button';

const WhyChooseUs = () => {
    // Precise icon mapping based on content.js order
    const icons = [Trophy, Layers, ShieldCheck, HardHat, DollarSign, Clock];

    return (
        <div className="bg-[#050505] min-h-screen text-gray-300">
            <section className="bg-black text-white py-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                {/* Neon Glows */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue rounded-full blur-[150px] opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-green rounded-full blur-[150px] opacity-10"></div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="font-heading font-black text-5xl md:text-7xl mb-6 tracking-tight uppercase">
                            The Lummora <span className="text-neon-blue">Edge</span>
                        </h1>
                        <p className="text-gray-400 text-xl font-light max-w-2xl mx-auto">
                            Redefining engineering standards through innovation, integrity, and operational excellence.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 relative">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {whyChooseUs.map((item, index) => {
                            const Icon = icons[index] || Trophy; // Fallback

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white/5 rounded-none p-8 border border-white/10 hover:border-neon-blue/50 transition-all duration-300 group relative overflow-hidden"
                                >
                                    {/* Hover Beam Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-neon-blue group-hover:w-full transition-all duration-700 delay-100"></div>

                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:border-neon-blue text-white group-hover:text-neon-blue transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                                            <Icon size={32} />
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wide group-hover:text-neon-blue transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed font-light">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Decorative number */}
                                    <div className="absolute -bottom-6 -right-2 text-9xl font-black text-white/5 opacity-50 group-hover:text-neon-blue/10 transition-colors pointer-events-none select-none">
                                        0{index + 1}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="mt-24 text-center">
                        <div className="inline-block p-[1px] bg-gradient-to-r from-neon-blue to-neon-green">
                            <div className="bg-black px-12 py-8">
                                <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Ready to start your project?</h3>
                                <Button to="/contact" variant="primary" className="text-lg px-12">
                                    Partner With Us Today
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhyChooseUs;
