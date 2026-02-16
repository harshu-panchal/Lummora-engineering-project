import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, UserCheck, FileText, PieChart, Award, TrendingUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Employee = () => {
    const features = [
        { icon: <Briefcase />, title: "Find Jobs", desc: "Access exclusive engineering opportunities across the globe." },
        { icon: <UserCheck />, title: "Profile Management", desc: "Showcase your expertise with a professional AI-enhanced profile." },
        { icon: <FileText />, title: "Track Applications", desc: "Real-time updates on your job applications and interview status." },
        { icon: <PieChart />, title: "Subscription Plans", desc: "Premium plans for enhanced visibility and career tools." },
        { icon: <Award />, title: "Certificates", desc: "Get verified certifications from Lummora Engineering Projects." },
        { icon: <TrendingUp />, title: "Growth Tools", desc: "Skill assessment and personalized career path recommendations." }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lummora-900/10 blur-[120px] -z-10 rounded-full" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] -z-10 rounded-full" />

            <div className="container-custom relative z-10">
                <Link to="/hirexo" className="inline-flex items-center gap-2 text-slate-400 hover:text-lummora-400 transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Selection
                </Link>

                <div className="max-w-4xl mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-lummora-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
                    >
                        Employee Portal
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight"
                    >
                        Empowering Your <br />
                        <span className="text-gradient">Engineering Career</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-400 font-light max-w-2xl"
                    >
                        Join a network of elite professionals. Access specialized tools and opportunities designed to accelerate your growth in the engineering sector.
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
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:border-lummora-400/50 transition-all group"
                        >
                            <div className="w-12 h-12 bg-lummora-400/10 rounded-xl flex items-center justify-center text-lummora-400 mb-6 group-hover:scale-110 transition-transform">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-lummora-400 transition-colors">{f.title}</h3>
                            <p className="text-slate-400 font-light leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-12 bg-gradient-to-br from-lummora-950 to-[#0a0a0a] border border-lummora-400/20 rounded-3xl text-center relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your journey?</h2>
                        <p className="text-slate-400 mb-10 max-w-xl mx-auto font-light">
                            Create your account today and gain immediate access to the Lummora Engineering network.
                        </p>
                        <div className="flex justify-center">
                            <Button className="px-12 py-4">Visit Website</Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Employee;
