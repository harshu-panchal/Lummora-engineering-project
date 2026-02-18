import React from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Building2,
    Globe,
    CheckCircle,
    ArrowRight,
    Briefcase,
    Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HireXO = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const cardData = [
        {
            title: "Employee",
            icon: <Briefcase className="w-10 h-10 text-lummora-400" />,
            description: [
                "Find jobs",
                "Manage profile and skills",
                "Track applications",
                "Subscription plans",
                "Get certificates",
                "Career growth tools"
            ],
            cta: "Explore Employee",
            link: "/employee",
            color: "from-cyan-500/20 to-teal-500/20"
        },
        {
            title: "Employer",
            icon: <Users className="w-10 h-10 text-lummora-400" />,
            description: [
                "Post job listings",
                "Manage applicants",
                "Recruiter dashboard",
                "Track hiring pipeline",
                "Candidate management tools"
            ],
            cta: "Explore Employer",
            link: "/employer",
            color: "from-teal-500/20 to-emerald-500/20"
        },
        {
            title: "Resources",
            icon: <Globe className="w-10 h-10 text-lummora-400" />,
            description: [
                "Tenders",
                "Logistics services",
                "Equipment marketplace",
                "Vehicle services",
                "Project management resources",
                "Service opportunities"
            ],
            cta: "Explore Resources",
            link: "/resources",
            color: "from-emerald-500/20 to-cyan-500/20"
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-lummora-400 selection:text-black overflow-hidden relative font-sans">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-lummora-900/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/10 blur-[120px] rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.05)_0%,transparent_70%)]" />
                {/* Simulated Noise overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-black" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
            </div>

            <main className="container-custom relative z-10 pt-32 pb-24 min-h-screen flex flex-col justify-center">
                {/* Header Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-lummora-400/10 border border-lummora-400/20 text-lummora-400 text-xs font-bold tracking-[0.2em] uppercase mb-6"
                    >
                        NEXT-GEN PLATFORM
                    </motion.span>
                    <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight leading-tight">
                        Choose Your <br />
                        <span className="text-gradient">Experience</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light">
                        Select your path and unlock a world of possibilities tailored to your engineering and project needs.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {cardData.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="group relative"
                        >
                            {/* Card Glow Background */}
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${card.color} rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500`} />

                            {/* Card Content (Glassmorphism) */}
                            <div className="relative h-full bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 p-8 rounded-2xl flex flex-col transition-all duration-300 group-hover:border-lummora-400/40 overflow-hidden">

                                {/* Background Decorative Icon */}
                                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                                    <div className="scale-[4] rotate-12 transition-transform duration-700 group-hover:rotate-0">
                                        {card.icon}
                                    </div>
                                </div>

                                {/* Icon Wrapper */}
                                <div className="mb-8 relative w-16 h-16 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-lummora-400/10 group-hover:border-lummora-400/30 transition-all duration-500">
                                    <motion.div
                                        whileHover={{ rotate: 5, scale: 1.1 }}
                                    >
                                        {card.icon}
                                    </motion.div>
                                </div>

                                <h3 className="text-3xl font-heading font-bold mb-6 tracking-tight group-hover:text-lummora-400 transition-colors">
                                    {card.title}
                                </h3>

                                <ul className="space-y-4 mb-10 flex-grow">
                                    {card.description.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-400 font-light group/item">
                                            <CheckCircle className="w-5 h-5 text-lummora-500/40 mt-0.5 shrink-0 group-hover/item:text-lummora-400 transition-colors" />
                                            <span className="group-hover/item:text-slate-200 transition-colors leading-snug">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to={card.link}
                                    className="group/btn relative w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 rounded-xl font-bold overflow-hidden transition-all duration-300 hover:bg-lummora-400 hover:text-black hover:border-lummora-400 shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                                >
                                    <span className="relative z-10 uppercase tracking-widest text-xs font-bold">{card.cta}</span>
                                    <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover/btn:translate-x-1" />

                                    {/* Shine reflection effect on hover */}
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "100%" }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                                    />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </main>

            {/* Subtle Floaties */}
            <motion.div
                animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-40 left-[10%] w-1 h-1 bg-lummora-400 rounded-full blur-[1px]"
            />
            <motion.div
                animate={{ y: [0, 20, 0], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                className="absolute bottom-40 right-[10%] w-2 h-2 bg-emerald-400 rounded-full blur-[2px]"
            />
        </div>
    );
};

export default HireXO;
