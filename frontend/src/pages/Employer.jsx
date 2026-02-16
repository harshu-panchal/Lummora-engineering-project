import React from 'react';
import { motion } from 'framer-motion';
import { Users, FilePlus, LayoutDashboard, LineChart, ShieldCheck, Zap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Employer = () => {
    const features = [
        { icon: <FilePlus />, title: "Post Job Listings", desc: "Reach thousands of vetted engineering professionals instantly." },
        { icon: <Users />, title: "Manage Applicants", desc: "Streamlined applicant tracking system for efficient hiring." },
        { icon: <LayoutDashboard />, title: "Recruiter Dashboard", desc: "Centralized hub for all your recruitment activities and data." },
        { icon: <LineChart />, title: "Hiring Pipeline", desc: "Visual tracking of candidate stages from application to offer." },
        { icon: <ShieldCheck />, title: "Management Tools", desc: "Robust tools for collaborative hiring and team management." },
        { icon: <Zap />, title: "Direct Sourcing", desc: "Proactively search and contact candidates from our elite pool." }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-900/10 blur-[120px] -z-10 rounded-full" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-900/10 blur-[120px] -z-10 rounded-full" />

            <div className="container-custom relative z-10">
                <Link to="/hirexo" className="inline-flex items-center gap-2 text-slate-400 hover:text-lummora-400 transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Selection
                </Link>

                <div className="max-w-4xl mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-emerald-400 font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
                    >
                        Employer Portal
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight"
                    >
                        Strategic <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Talent Acquisition</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-400 font-light max-w-2xl"
                    >
                        Find the world's best engineering talent. Level up your hiring process with our specialized recruitment technology.
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
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:border-emerald-400/50 transition-all group"
                        >
                            <div className="w-12 h-12 bg-emerald-400/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">{f.title}</h3>
                            <p className="text-slate-400 font-light leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-12 bg-gradient-to-br from-[#061a1a] to-[#0a0a0a] border border-emerald-400/20 rounded-3xl text-center relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Scale your project team</h2>
                        <p className="text-slate-400 mb-10 max-w-xl mx-auto font-light">
                            Connect with our talent partners and start building your dream team today.
                        </p>
                        <div className="flex justify-center">
                            <Button to="https://www.hirexo.in/" className="px-12 py-4 bg-emerald-600 hover:bg-emerald-700">Visit Website</Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Employer;
