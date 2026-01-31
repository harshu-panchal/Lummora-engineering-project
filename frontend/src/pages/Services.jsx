import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { services as staticServices } from '../data/content';
import { ArrowUpRight, Wrench } from 'lucide-react';
import Button from '../components/ui/Button';
import axios from 'axios';

const Services = () => {
    const [services, setServices] = useState(staticServices);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/content/services');
                if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                    setServices(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch services", err);
            }
        };
        fetchServices();
    }, []);
    return (
        <div className="bg-[#050505] min-h-screen">
            <section className="relative py-32 bg-black overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                    <motion.div
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-neon-blue/10 to-transparent"
                    />
                </div>

                <div className="container-custom relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-heading font-black text-6xl md:text-8xl mb-6 text-white tracking-tight"
                    >
                        OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">SERVICES</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-xl max-w-2xl mx-auto font-light"
                    >
                        Precision engineering for the modern world.
                    </motion.p>
                </div>
            </section>

            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>

                {services.map((service, index) => (
                    <section key={service.id} className="py-24 relative overflow-hidden group">
                        <div className="container-custom relative z-10">
                            <div className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

                                <div className="md:w-1/2">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group-hover:border-neon-blue/50 transition-colors duration-500"
                                    >
                                        <div className="absolute inset-0 bg-neon-blue/10 mix-blend-overlay z-10"></div>
                                        <img
                                            src={service.image || (service.id === 'construction' ? '/construction_site.png' : service.id === 'mechanical' ? '/industrial_pipes.png' : '/project_management.png')}
                                            alt={service.title}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 grayscale hover:grayscale-0"
                                        />
                                    </motion.div>
                                </div>

                                <div className="md:w-1/2 p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 border border-neon-blue/30 bg-neon-blue/10 rounded text-neon-blue">
                                            {service.icon && typeof service.icon !== 'string' ? <service.icon size={28} /> : <Wrench size={28} />}
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider">{service.title}</h2>
                                    </div>

                                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                        {service.description || service.desc}
                                    </p>

                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                        {(service.details || []).map((detail, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                                                <div className="w-1.5 h-1.5 bg-neon-blue rounded-full"></div>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>

                                    <Button to="/contact" variant="outline" className="border-white/20 text-white hover:border-neon-blue hover:text-neon-blue">
                                        Explore Solutions <ArrowUpRight size={18} className="ml-2" />
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </section>
                ))}
            </div>

            <section className="py-20 bg-neon-blue/5 text-center border-t border-white/5">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-white mb-6">Custom Engineering Requirements?</h2>
                    <Button to="/contact" variant="primary">
                        Contact Our Experts
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Services;
