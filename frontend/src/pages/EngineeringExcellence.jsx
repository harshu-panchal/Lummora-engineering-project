import { motion } from 'framer-motion';
import { engineeringExcellence } from '../data/content';
import { Cpu, CheckCircle, Zap } from 'lucide-react';

const EngineeringExcellence = () => {
    return (
        <div className="bg-[#050505] min-h-screen text-gray-300">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img src="/cad_design.png" alt="Advanced Engineering" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"></div>
                </div>

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="font-heading font-black text-5xl md:text-7xl mb-6 text-white tracking-tight uppercase">
                            Engineering <span className="text-neon-blue">Excellence</span>
                        </h1>
                        <p className="text-gray-400 text-xl font-light max-w-2xl mx-auto leading-relaxed">
                            Precision. Innovation. Compliance. <br />
                            We define the standards of modern engineering.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content - Timeline Layout */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-neon-blue/30 to-transparent -translate-x-1/2 hidden md:block"></div>

                <div className="container-custom relative">
                    {engineeringExcellence.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`flex flex-col md:flex-row gap-12 items-center mb-32 last:mb-0 relative ${index % 2 === 0 ? '' : 'md:flex-row-reverse'
                                }`}
                        >
                            {/* Center Dot */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black border-2 border-neon-blue rounded-full z-10 hidden md:block shadow-[0_0_10px_rgba(0,243,255,0.8)]"></div>

                            {/* Content Side */}
                            <div className={`md:w-1/2 px-8 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white/5 border border-white/10 text-neon-blue mb-6 shadow-[0_0_15px_rgba(0,243,255,0.2)] ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'
                                    }`}>
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-wide">{item.title}</h3>
                                <p className="text-gray-400 text-lg leading-relaxed font-light">
                                    {item.description}
                                </p>
                            </div>

                            {/* Visual Side */}
                            <div className="md:w-1/2 px-8">
                                <div className="bg-white/5 rounded-none p-2 border border-white/10 shadow-2xl hover:border-neon-blue/50 transition-all duration-500 group relative">
                                    <div className="aspect-video overflow-hidden relative">
                                        <div className="absolute inset-0 bg-neon-blue/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity"></div>
                                        <img
                                            src={[
                                                '/cad_design.png',
                                                '/quality_check.png',
                                                '/smart_engineering.png',
                                                '/safety_gear.png'
                                            ][index] || '/cad_design.png'}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                            alt={item.title}
                                        />
                                    </div>
                                    <div className="p-4 flex items-center gap-2 text-sm text-neon-blue font-bold uppercase tracking-widest justify-center md:justify-start border-t border-white/5 bg-black/50">
                                        <CheckCircle size={14} />
                                        <span>Lummora Standard</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default EngineeringExcellence;
