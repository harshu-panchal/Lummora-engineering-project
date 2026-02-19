import { motion } from 'framer-motion';
import { Scale, FileCheck, AlertCircle, Info } from 'lucide-react';
import { useEffect } from 'react';

const LegalTerms = () => {
    useEffect(() => {
        document.title = "Terms & Conditions | LUMMORA Engineering Projects";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'Terms and Conditions for using LUMMORA Engineering Projects services and website.');
        }
    }, []);

    return (
        <div className="bg-[#050505] min-h-screen text-gray-300">
            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#050505] z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
                        alt="Terms Background"
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
                        Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">Conditions</span>
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
                            <Scale className="text-neon-blue mb-4" size={32} />
                            <h3 className="text-white font-bold mb-2">Legal Compliance</h3>
                            <p className="text-sm text-gray-500">All services are provided in accordance with local and international laws.</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                            <FileCheck className="text-neon-green mb-4" size={32} />
                            <h3 className="text-white font-bold mb-2">Service Terms</h3>
                            <p className="text-sm text-gray-500">Clear and transparent terms for all our engineering and project services.</p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
                            <AlertCircle className="text-purple-500 mb-4" size={32} />
                            <h3 className="text-white font-bold mb-2">User Responsibility</h3>
                            <p className="text-sm text-gray-500">Understanding your rights and responsibilities when using our platform.</p>
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none space-y-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Info className="text-neon-blue" size={24} />
                                <h2 className="text-2xl font-bold text-white uppercase tracking-wider m-0">1. Acceptance of Terms</h2>
                            </div>
                            <p className="leading-relaxed text-gray-400">
                                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">2. Description of Service</h2>
                            <p className="leading-relaxed text-gray-400">
                                LUMMORA Engineering Projects Private Limited provides users with access to information regarding its engineering, construction, and project management services. You understand and agree that the Service is provided "AS-IS" and that we assume no responsibility for the timeliness, deletion, mis-delivery or failure to store any user communications or personalization settings.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">3. User Conduct</h2>
                            <p className="mb-4">You agree to use the website only for lawful purposes. You are prohibited from:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li>Using the website in any way that violates any applicable local, national or international law or regulation.</li>
                                <li>Engaging in any conduct that restricts or inhibits anyone's use or enjoyment of the website.</li>
                                <li>Attempting to interfere with the proper working of the website.</li>
                                <li>Transmitting any advertising or promotional material, including "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">4. Intellectual Property</h2>
                            <p className="leading-relaxed text-gray-400">
                                The website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by LUMMORA Engineering Projects Private Limited, its licensors, or other providers of such material and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">5. Limitation of Liability</h2>
                            <p className="leading-relaxed text-gray-400">
                                In no event will LUMMORA Engineering Projects Private Limited, its affiliates or their licensors, service providers, employees, agents, officers or directors be liable for damages of any kind, under any legal theory, arising out of or in connection with your use, or inability to use, the website, any websites linked to it, any content on the website or such other websites.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">6. Governing Law</h2>
                            <p className="leading-relaxed text-gray-400">
                                All matters relating to the website and these Terms and Conditions and any dispute or claim arising therefrom or related thereto (in each case, including non-contractual disputes or claims), shall be governed by and construed in accordance with the internal laws of India without giving effect to any choice or conflict of law provision or rule.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white uppercase tracking-wider mb-4">7. Changes to Terms</h2>
                            <p className="leading-relaxed text-gray-400">
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LegalTerms;
