import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { qualityStandards as staticStandards } from '../data/content';
import { ShieldCheck, Check, HardHat } from 'lucide-react';
import axios from 'axios';

const QualitySafety = () => {
    const [qualityStandards, setQualityStandards] = useState(staticStandards);
    const [companyData, setCompanyData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [qsRes, cdRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/content/qualityStandards`),
                    axios.get(`${API_BASE_URL}/api/content/companyData`)
                ]);

                if (qsRes.data && Array.isArray(qsRes.data) && qsRes.data.length > 0) {
                    setQualityStandards(qsRes.data);
                }
                if (cdRes.data) {
                    setCompanyData(cdRes.data);
                }
            } catch (err) {
                console.error("Quality standards fetch failed", err);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="bg-[#050505] min-h-screen">
            {/* Hero Split */}
            <section className="relative flex flex-col md:flex-row min-h-[85vh]">
                <div className="md:w-1/2 relative min-h-[400px] overflow-hidden group">
                    <img
                        src={companyData.safetyImage || "/safety_gear.png"}
                        alt="Safety Gear"
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent md:bg-gradient-to-l md:from-transparent md:to-black/50"></div>
                </div>

                <div className="md:w-1/2 flex items-center p-8 md:p-16 lg:p-24 text-white bg-black border-l border-white/10">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="p-2 bg-yellow-500/10 border border-yellow-500/50 rounded text-yellow-500">
                                <HardHat size={24} />
                            </span>
                            <span className="text-yellow-500 font-bold tracking-widest uppercase text-sm">
                                Our Commitment
                            </span>
                        </div>

                        <h1 className="font-heading font-black text-5xl lg:text-7xl mb-8 leading-tight">
                            SAFETY IS OUR <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">PRIORITY</span>
                        </h1>

                        <div className="border-l-4 border-yellow-500 pl-8 py-2 mb-10 bg-gradient-to-r from-yellow-500/5 to-transparent">
                            <p className="text-2xl text-gray-300 leading-relaxed italic font-light">
                                “Every team member returns home safely, every single day.”
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white/5 p-6 rounded-none border border-white/10 hover:border-yellow-500/50 transition-all group">
                                <ShieldCheck size={32} className="text-yellow-400 mb-3 group-hover:scale-110 transition-transform" />
                                <div className="font-bold text-lg mb-1 text-white">Zero Compromise</div>
                                <div className="text-sm text-gray-500">On every site, every day.</div>
                            </div>
                            <div className="bg-white/5 p-6 rounded-none border border-white/10 hover:border-green-500/50 transition-all group">
                                <Check size={32} className="text-green-400 mb-3 group-hover:scale-110 transition-transform" />
                                <div className="font-bold text-lg mb-1 text-white">100% Compliance</div>
                                <div className="text-sm text-gray-500">ISO certified standards.</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Certifications Grid */}
            <section className="py-24 bg-[#080808] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-64 bg-neon-blue rounded-full blur-[200px] opacity-5 translate-x-1/2 -translate-y-1/2"></div>

                <div className="container-custom relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-neon-blue font-bold tracking-widest uppercase text-sm mb-3 block">Global Benchmarks</span>
                        <h2 className="heading-lg text-white mb-6 uppercase">Certifications & Standards</h2>
                        <p className="text-gray-400 text-lg">
                            At LUMMORA, quality and safety are fundamental principles embedded in our operational DNA.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {qualityStandards.map((std, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 p-10 rounded-sm hover:-translate-y-2 transition-all duration-300 border border-white/10 hover:border-neon-blue/50 group relative overflow-hidden hover:shadow-[0_0_30px_rgba(0,243,255,0.1)]"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <ShieldCheck size={100} className="text-white" />
                                </div>

                                <div className="text-8xl font-black text-white/5 mb-6 group-hover:text-neon-blue/10 transition-colors absolute -top-6 -left-6 z-0 select-none">
                                    0{index + 1}
                                </div>

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-neon-blue mb-3">{std.code}</h3>
                                    <h4 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">{std.title}</h4>
                                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                        {std.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QualitySafety;
