import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { useEffect } from 'react';

const LegalPrivacy = () => {
    useEffect(() => {
        document.title = "Privacy Policy | LUMMORA Engineering Projects";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Privacy Policy for LUMMORA Engineering Projects. Learn how we handle and protect your personal data.');
        }
    }, []);

    return (
        <div className="bg-[#050505] min-h-screen text-gray-300">
            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#050505] z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000"
                        alt="Security Background"
                        className="w-full h-full object-cover opacity-30 grayscale"
                    />
                </div>

                <div className="container-custom relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block mb-4 px-4 py-1 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-sm font-bold uppercase tracking-widest"
                    >
                        Legal
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-heading font-black text-5xl md:text-6xl mb-6 text-white uppercase tracking-tight"
                    >
                        Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">Policy</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-400 font-light"
                    >
                        Last Updated: February 19, 2026
                    </motion.p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="container-custom max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                            <Shield className="text-neon-blue mb-4" size={32} />
                            <h3 className="text-white font-bold mb-2">Data Protection</h3>
                            <p className="text-sm text-gray-500">Your data is encrypted and stored securely on our servers.</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                            <Lock className="text-neon-green mb-4" size={32} />
                            <h3 className="text-white font-bold mb-2">Secure Access</h3>
                            <p className="text-sm text-gray-500">Only authorized personnel have access to your information.</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                            <Eye className="text-purple-500 mb-4" size={32} />
                            <h3 className="text-white font-bold mb-2">Transparency</h3>
                            <p className="text-sm text-gray-500">We are clear about what data we collect and how we use it.</p>
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none space-y-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="text-neon-blue" size={24} />
                                <h2 className="text-2xl font-bold text-white uppercase tracking-wider m-0">1. Introduction</h2>
                            </div>
                            <p className="leading-relaxed text-gray-400">
                                LUMMORA Engineering Projects Private Limited ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">2. Information We Collect</h2>
                            <p className="mb-4">We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li><strong className="text-white">Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.</li>
                                <li><strong className="text-white">Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                                <li><strong className="text-white">Financial Data:</strong> Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">3. Use of Your Information</h2>
                            <p className="mb-4">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li>Create and manage your account.</li>
                                <li>Process your transactions and send you related information.</li>
                                <li>Improve our website and services to better serve you.</li>
                                <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                                <li>Send you technical notices, updates, security alerts, and support and administrative messages.</li>
                                <li>Communicate with you about products, services, offers, and events offered by us.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">4. Disclosure of Your Information</h2>
                            <p className="leading-relaxed text-gray-400">
                                We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                                <br /><br />
                                <strong className="text-white">By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                                <br /><br />
                                <strong className="text-white">Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">5. Security of Your Information</h2>
                            <p className="leading-relaxed text-gray-400">
                                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">6. Contact Us</h2>
                            <p className="leading-relaxed text-gray-400">
                                If you have questions or comments about this Privacy Policy, please contact us at:
                                <br /><br />
                                <strong className="text-white">LUMMORA Engineering Projects Private Limited</strong><br />
                                Email: lumora.aura369@gmail.com<br />
                                Phone: +91 91574 73449
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LegalPrivacy;
