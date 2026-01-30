import { motion } from 'framer-motion';
import { Target, Eye, Shield, Users, ArrowRight } from 'lucide-react';
import { companyData } from '../data/content';
import Button from '../components/ui/Button';

const About = () => {
    return (
        <div className="bg-[#050505] min-h-screen text-gray-300">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#050505] z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000"
                        alt="Engineering Blueprint"
                        className="w-full h-full object-cover opacity-40 grayscale"
                    />
                </div>

                <div className="container-custom relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block mb-4 px-4 py-1 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-sm font-bold uppercase tracking-widest"
                    >
                        Our Story
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-heading font-black text-5xl md:text-7xl mb-6 text-white uppercase tracking-tight"
                    >
                        Pioneering <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">Excellence</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl max-w-2xl mx-auto leading-relaxed text-gray-400 font-light"
                    >
                        We are architects of the future, building industrial solutions that define reliability and innovation.
                    </motion.p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        {/* Text Side */}
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl font-bold text-white mb-6 uppercase tracking-wider">Who We Are</h2>
                            <div className="space-y-6 text-gray-400 text-lg leading-relaxed border-l-2 border-neon-blue/30 pl-6">
                                <p>
                                    {companyData.description}
                                </p>
                                <p>
                                    {companyData.aboutShort}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                                <div className="p-6 border border-white/10 bg-white/5 hover:border-neon-blue/40 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-neon-blue/50 transition-all"></div>
                                    <Target className="text-neon-blue mb-4 group-hover:scale-110 transition-transform" size={40} />
                                    <h3 className="text-xl font-bold text-white mb-2 uppercase">Our Mission</h3>
                                    <p className="text-sm text-gray-500">To deliver world-class engineering solutions with zero compromise on quality.</p>
                                </div>
                                <div className="p-6 border border-white/10 bg-white/5 hover:border-neon-green/40 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-neon-green/50 transition-all"></div>
                                    <Eye className="text-neon-green mb-4 group-hover:scale-110 transition-transform" size={40} />
                                    <h3 className="text-xl font-bold text-white mb-2 uppercase">Our Vision</h3>
                                    <p className="text-sm text-gray-500">To be the global benchmark for industrial construction and mechanical safety.</p>
                                </div>
                            </div>
                        </div>

                        {/* Image Side */}
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue via-purple-500 to-neon-green opacity-30 blur-xl"></div>
                            <div className="relative rounded-sm overflow-hidden border border-white/10 bg-black">
                                <img src="/construction_site.png" alt="Construction Site" className="w-full h-full object-cover opacity-80" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/90 to-transparent border-t border-white/10">
                                    <div className="flex items-center gap-4">
                                        <Shield className="text-neon-blue" size={48} />
                                        <div>
                                            <div className="text-xs text-neon-blue uppercase tracking-[0.2em] mb-1">Certified Excellence</div>
                                            <div className="text-3xl font-bold text-white font-heading">ISO 9001:2015</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-neon-blue/5 border-y border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container-custom text-center relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-widest">Ready to Build the Future?</h2>
                    <Button to="/contact" variant="primary">
                        Partner With Us
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default About;
