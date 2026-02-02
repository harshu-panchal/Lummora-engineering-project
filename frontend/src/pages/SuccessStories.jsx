import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { testimonials as staticTestimonials } from '../data/content';
import { Quote, Star, ArrowRight, Trophy } from 'lucide-react';
import Button from '../components/ui/Button';
import axios from 'axios';
import { API_BASE_URL } from '../api';

const SuccessStories = () => {
    const [testimonials, setTestimonials] = useState(staticTestimonials);
    const [companyData, setCompanyData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [testRes, cdRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/content/testimonials`),
                    axios.get(`${API_BASE_URL}/api/content/companyData`)
                ]);

                if (testRes.data && Array.isArray(testRes.data) && testRes.data.length > 0) {
                    setTestimonials(testRes.data);
                }
                if (cdRes.data) {
                    setCompanyData(cdRes.data);
                }
            } catch (err) {
                console.error("Testimonials fetch failed", err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-slate-50">
            {/* Hero */}
            <section className="bg-lummora-900 text-white py-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                {/* Decorative blurred circles */}
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-lummora-600 rounded-full blur-[128px] opacity-20"></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-teal-500 rounded-full blur-[96px] opacity-20"></div>

                <div className="container-custom relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-heading font-bold text-5xl md:text-7xl mb-6"
                    >
                        Success Stories
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lummora-200 text-xl font-light"
                    >
                        Real challenges, engineered solutions, proven results.
                    </motion.p>
                </div>
            </section>

            {/* Featured Case Study */}
            <section className="py-24 -mt-16 relative z-20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col lg:flex-row bg-white rounded-lg overflow-hidden shadow-2xl"
                    >
                        <div className="lg:w-1/2 relative min-h-[500px] overflow-hidden group">
                            <img
                                src={companyData.successImage || "/modern_building.png"}
                                alt="Modern Corporate Complex"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 md:p-12">
                                <div className="text-white transform transition-transform duration-500 group-hover:translate-y-[-10px]">
                                    <span className="bg-lummora-500 text-white px-4 py-1 text-sm font-bold uppercase tracking-wider mb-4 inline-flex items-center gap-2 rounded-sm shadow-lg">
                                        <Trophy size={14} /> Featured Project
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-bold mb-2">Industrial Complex Development</h3>
                                    <p className="text-gray-300">500,000 sq.ft • Manufacturing Sector</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-white relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-0"></div>

                            <h2 className="heading-lg text-lummora-900 mb-10 relative z-10">Concept to Completion</h2>

                            <div className="space-y-10 relative z-10">
                                <div className="group">
                                    <h4 className="font-bold text-lummora-600 uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                                        <span className="w-8 h-px bg-lummora-400 group-hover:w-12 transition-all"></span>
                                        The Challenge
                                    </h4>
                                    <p className="text-gray-700 text-lg leading-relaxed pl-10 border-l border-gray-200">
                                        Design and construct a 75,000 sq. ft. industrial facility with complex mechanical systems within a strict 14-month timeline.
                                    </p>
                                </div>
                                <div className="group">
                                    <h4 className="font-bold text-lummora-600 uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                                        <span className="w-8 h-px bg-lummora-400 group-hover:w-12 transition-all"></span>
                                        The Solution
                                    </h4>
                                    <p className="text-gray-700 text-lg leading-relaxed pl-10 border-l border-gray-200">
                                        Integrated planning, prefabrication techniques, and parallel construction methodologies.
                                    </p>
                                </div>
                                <div className="bg-green-50 p-8 border-l-4 border-green-500 rounded-r-lg shadow-sm">
                                    <h4 className="font-bold text-green-700 uppercase tracking-widest text-xs mb-3">The Result</h4>
                                    <p className="text-green-900 font-bold text-xl">
                                        Project delivered two weeks early, 8% under budget, with zero safety incidents and full regulatory compliance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-padding bg-lummora-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-lummora-800 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-lummora-950 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-60"></div>

                <div className="container-custom relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-lummora-300 font-bold tracking-widest uppercase text-sm mb-3 block">Trusted By Industry Leaders</span>
                        <h2 className="text-4xl md:text-5xl font-bold">Client Testimonials</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-2xl relative hover:bg-white/10 transition-colors group"
                            >
                                <Quote size={64} className="text-lummora-500 absolute top-8 right-8 opacity-20 group-hover:opacity-40 transition-opacity" />

                                <div className="flex gap-1 text-yellow-500 mb-8">
                                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={18} fill="currentColor" />)}
                                </div>

                                <p className="text-xl md:text-2xl text-gray-200 mb-10 italic leading-relaxed font-light">
                                    "{t.quote}"
                                </p>

                                <div className="flex items-center gap-5 border-t border-white/10 pt-8">
                                    <div className="w-14 h-14 bg-gradient-to-br from-lummora-400 to-lummora-600 rounded-full flex items-center justify-center font-bold text-white text-xl shadow-lg">
                                        {t.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white text-lg">{t.author}</div>
                                        <div className="text-sm text-lummora-300">{t.position}</div>
                                        <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{t.project}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-20">
                        <h3 className="text-2xl mb-8 font-light">Ready to be our next success story?</h3>
                        <Button to="/contact" variant="primary" className="text-lg px-10 py-4 shadow-xl shadow-lummora-900/50">
                            Start Your Project
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SuccessStories;
