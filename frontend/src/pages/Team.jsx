import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, UserCheck } from 'lucide-react';
import axios from 'axios';

const Team = () => {
    const staticTeam = [
        {
            name: "Amit Verma",
            role: "Managing Director",
            bio: "Over 25 years of experience in civil and mechanical engineering leadership.",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
        }
    ];
    const [team, setTeam] = useState(staticTeam);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/team`);
                if (res.data && res.data.length > 0) {
                    setTeam(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch team, using fallback", err);
            }
        };
        fetchTeam();
    }, []);

    return (
        <div className="bg-[#050505] min-h-screen text-gray-300">
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/engineering_team.png"
                        alt="Lummora Engineering Team"
                        className="w-full h-full object-cover grayscale opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
                </div>

                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-2 bg-neon-blue/10 border border-neon-blue/30 rounded-full mb-6"
                    >
                        <span className="text-neon-blue font-bold uppercase tracking-widest text-xs">The Visionaries</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-heading font-black text-5xl md:text-7xl mb-6 text-white uppercase tracking-tight"
                    >
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">Leadership</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-xl font-light tracking-wide max-w-2xl mx-auto"
                    >
                        Driven by expertise, united by a vision for excellence.
                    </motion.p>
                </div>
            </section>

            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-[500px] bg-neon-blue/5 -skew-y-6 transform -translate-y-1/2 z-0"></div>

                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-[#0a0a0a] rounded-sm overflow-hidden border border-white/10 hover:border-neon-blue/50 transition-all duration-500 group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>

                                <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                <div className="p-8 relative z-20 bg-[#0a0a0a]">
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-neon-blue transition-colors">{member.name}</h3>
                                    <div className="text-neon-blue font-bold text-xs mb-4 uppercase tracking-widest">{member.role}</div>
                                    <p className="text-gray-400 text-sm mb-6 leading-relaxed border-l-2 border-white/10 pl-4 py-1 group-hover:border-neon-blue transition-colors">{member.bio}</p>

                                    <div className="flex gap-4 pt-4 border-t border-white/10">
                                        <a href="#" className="p-2 bg-white/5 rounded hover:bg-neon-blue hover:text-black transition-colors text-white">
                                            <Linkedin size={18} />
                                        </a>
                                        <a href="#" className="p-2 bg-white/5 rounded hover:bg-neon-blue hover:text-black transition-colors text-white">
                                            <Mail size={18} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-24 max-w-4xl mx-auto text-center">
                        <div className="p-10 border border-white/10 bg-white/5 relative overflow-hidden backdrop-blur-sm">
                            <div className="absolute top-0 left-0 w-2 h-full bg-neon-blue"></div>

                            <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-wider">Qualified Professionals Driving Excellence</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                {[
                                    "Chartered Mechanical Engineers",
                                    "PMP-Certified Project Managers",
                                    "Licensed Contractors & Supervisors",
                                    "Qualified Safety Officers (ISO 45001)"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center text-neon-blue group-hover:border-neon-blue transition-colors">
                                            <UserCheck size={20} />
                                        </div>
                                        <span className="font-semibold text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Team;
