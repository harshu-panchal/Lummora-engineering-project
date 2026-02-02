import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { companyData as staticCompanyData, engagementProcess as staticProcess } from '../data/content';
import Button from '../components/ui/Button';
import axios from 'axios';
import { API_BASE_URL } from '../api';

const Contact = () => {
    const [companyData, setCompanyData] = useState(staticCompanyData);
    const [engagementProcess, setEngagementProcess] = useState(staticProcess);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [compRes, procRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/api/content/companyData`),
                    axios.get(`${API_BASE_URL}/api/content/engagementProcess`)
                ]);

                if (compRes.data && Object.keys(compRes.data).length > 0) {
                    setCompanyData({ ...staticCompanyData, ...compRes.data });
                }
                if (procRes.data && Array.isArray(procRes.data) && procRes.data.length > 0) {
                    setEngagementProcess(procRes.data);
                }
            } catch (err) {
                console.error("Contact data fetch failed", err);
            }
        };
        fetchData();
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Transmitting...');

        try {
            await axios.post(`${API_BASE_URL}/api/contact`, formData);
            setStatus('Sent');
            alert(`MESSAGE TRANSMITTED TO ADMIN: wazahatqureshi4@gmail.com`);
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
            setTimeout(() => setStatus(''), 3000);
        } catch (err) {
            console.error(err);
            setStatus('Error');
            const errorMsg = err.response?.data?.message || 'Failed to send message. Please check the backend connection.';
            alert(errorMsg);
            setTimeout(() => setStatus(''), 3000);
        }
    };

    return (
        <div className="bg-[#050505] min-h-screen text-gray-300">
            <div className="flex flex-col lg:flex-row min-h-screen pt-20">

                {/* Visual Side */}
                <div className="lg:w-5/12 bg-black relative overflow-hidden flex flex-col justify-center p-8 lg:p-16 border-r border-white/10">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-neon-blue/10 to-transparent"></div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative z-10"
                    >
                        <h4 className="text-neon-blue font-bold uppercase tracking-widest text-sm mb-4">Contact Protocol</h4>
                        <h1 className="font-heading font-black text-5xl lg:text-6xl mb-6 text-white leading-tight">
                            INITIATE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-white">COLLABORATION</span>
                        </h1>
                        <p className="text-gray-400 text-lg mb-12 max-w-md font-light">
                            Ready to transform your vision into reality? Our engineering professionals are on standby.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: MapPin, title: "Head Office", val: companyData.contact.address },
                                { icon: Phone, title: "Secure Line", val: companyData.contact.phone },
                                { icon: Mail, title: "Digital Mail", val: companyData.contact.email },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 group">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-none group-hover:border-neon-blue/50 transition-colors">
                                        <item.icon className="text-neon-blue" size={24} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-white text-lg mb-1 uppercase tracking-wide">{item.title}</h5>
                                        <p className="text-gray-500 text-sm whitespace-pre-line hover:text-white transition-colors">{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Form Side */}
                <div className="lg:w-7/12 bg-[#080808] flex items-center justify-center p-8 lg:p-24 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-blue/5 via-transparent to-transparent opacity-20"></div>

                    <div className="w-full max-w-2xl relative z-10">
                        <div className="mb-10 text-center lg:text-left">
                            <h2 className="text-3xl font-bold text-white mb-2 uppercase">Message Transmission</h2>
                            <div className="h-1 w-20 bg-neon-blue lg:mx-0 mx-auto"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 group">
                                    <label className="text-xs font-bold text-neon-blue uppercase tracking-widest">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-black border border-white/10 text-white focus:border-neon-blue focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] outline-none transition-all placeholder:text-gray-700"
                                        placeholder="Identification"
                                        required
                                    />
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-xs font-bold text-neon-blue uppercase tracking-widest">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-black border border-white/10 text-white focus:border-neon-blue focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] outline-none transition-all placeholder:text-gray-700"
                                        placeholder="username@domain.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-xs font-bold text-neon-blue uppercase tracking-widest">Subject Protocol</label>
                                <select
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-black border border-white/10 text-gray-400 focus:text-white focus:border-neon-blue outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option>General Inquiry</option>
                                    <option>Project Proposal</option>
                                    <option>Careers</option>
                                    <option>Partnership</option>
                                </select>
                            </div>

                            <div className="space-y-2 group">
                                <label className="text-xs font-bold text-neon-blue uppercase tracking-widest">Message Data</label>
                                <textarea
                                    id="message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-black border border-white/10 text-white focus:border-neon-blue focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] outline-none transition-all resize-none placeholder:text-gray-700"
                                    placeholder="Input requirements..."
                                    required
                                ></textarea>
                            </div>

                            <Button variant="primary" className="w-full md:w-auto px-12 py-4 text-lg border border-neon-blue/20">
                                {status || 'Transmit Message'} <Send size={18} className="ml-2" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
