import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Box, Layers, Globe } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { companyData as staticCompanyData, services as staticServices, whyChooseUs as staticWhy } from '../data/content';
import axios from 'axios';
import { API_BASE_URL } from '../api';

const Home = () => {
    const [companyData, setCompanyData] = useState(staticCompanyData);
    const [services, setServices] = useState(staticServices);
    const [whyChooseUs, setWhyChooseUs] = useState(staticWhy);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [compRes, servRes, whyRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/content/companyData`),
                    axios.get(`${API_BASE_URL}/api/content/services`),
                    axios.get(`${API_BASE_URL}/api/content/whyChooseUs`)
                ]);

                if (compRes.data && Object.keys(compRes.data).length > 0) {
                    const d = compRes.data;
                    setCompanyData({
                        ...staticCompanyData,
                        ...d,
                        contact: {
                            ...staticCompanyData.contact,
                            phone: d.phone || staticCompanyData.contact.phone,
                            email: d.email || staticCompanyData.contact.email,
                            address: d.address || staticCompanyData.contact.address,
                        }
                    });
                }
                if (servRes.data && Array.isArray(servRes.data) && servRes.data.length > 0) {
                    setServices(servRes.data);
                }
                if (whyRes.data && Array.isArray(whyRes.data) && whyRes.data.length > 0) {
                    setWhyChooseUs(whyRes.data);
                }
            } catch (err) {
                console.error("Home data fetch failed", err);
            }
        };
        fetchHomeData();
    }, []);
    return (
        <div className="w-full overflow-hidden bg-[#050505]">
            {/* Hero Section */}
            <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
                {/* Dark Futuristic Background */}
                <div className="absolute inset-0 z-0 bg-black">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                    {/* Animated Gradient Orbs */}
                    <motion.div
                        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-blue/20 rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
                        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-lummora-600/20 rounded-full blur-[120px]"
                    />
                </div>

                <div className="container-custom relative z-20 pt-20">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/30 bg-neon-blue/5 text-neon-blue text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md"
                        >
                            <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></span>
                            Next-Gen Engineering
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-tight mb-8 text-white relative z-10"
                        >
                            BUILDING THE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-blue bg-300% animate-gradient">
                                IMPOSSIBLE
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
                        >
                            {companyData.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                        >
                            <Button to="/contact" variant="primary" className="w-full sm:w-auto text-lg px-10 py-4 shadow-[0_0_30px_rgba(0,243,255,0.3)] hover:shadow-[0_0_50px_rgba(0,243,255,0.6)]">
                                Initiate Project
                            </Button>
                            <Button to="/portfolio" variant="outline" className="w-full sm:w-auto text-lg px-10 py-4 border-white/20 text-white hover:bg-white/10 hover:border-white">
                                View Portfolio
                            </Button>
                        </motion.div>
                    </div>
                </div>

                {/* Tech Grid Decoration */}
                <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </section>

            {/* Dark Cards Section */}
            <section className="py-24 relative">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-32 relative z-30">
                        {services.slice(0, 3).map((item, i) => {
                            const icons = [Layers, Zap, Globe];
                            const Icon = icons[i] || Box;
                            return (
                                <motion.div
                                    key={item._id || item.id || i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (i * 0.1) }}
                                    className="bg-[#0f0f0f]/90 backdrop-blur-xl p-8 border border-white/10 hover:border-neon-blue/50 transition-all duration-500 group"
                                >
                                    <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center text-neon-blue mb-6 group-hover:scale-110 transition-transform">
                                        {item.image ? (
                                            <img src={item.image} className="w-full h-full object-cover rounded" />
                                        ) : (
                                            <Icon size={30} />
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-400 mb-6 line-clamp-2">{item.description || item.desc}</p>
                                    <div className="h-0.5 w-12 bg-white/10 group-hover:w-full group-hover:bg-neon-blue transition-all duration-500"></div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="mt-32 flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <span className="text-neon-blue font-bold tracking-widest uppercase text-xs mb-4 block">Our Expertise</span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                Engineering for a <br />
                                <span className="text-gray-500">Resilient Future.</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                We combine decades of experience with cutting-edge technology to deliver projects that stand the test of time. From complex piping systems to massive industrial structures, Lummora is the gold standard.
                            </p>

                            <div className="grid grid-cols-2 gap-8 mb-10">
                                {Array.isArray(companyData.stats) && companyData.stats.map((stat, i) => (
                                    <div key={i}>
                                        <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <Button to="/about" variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black">
                                Learn More About Us
                            </Button>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-neon-blue/20 blur-[100px] -z-10"></div>
                            <div className="relative border border-white/10 p-2 bg-white/5 backdrop-blur-sm">
                                <img src={companyData.heroImage || "/smart_engineering.png"} alt="Engineering" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />

                                {/* Floating Tech Card */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-10 -left-10 bg-black border border-neon-blue/30 p-6 shadow-2xl max-w-xs hidden md:block"
                                >
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-3 h-3 rounded-full bg-neon-blue animate-pulse"></div>
                                        <div className="text-neon-blue font-bold text-sm tracking-widest">SYSTEM ACTIVE</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full w-[85%] bg-neon-blue"></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-400">
                                            <span>Efficiency</span>
                                            <span>98%</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
