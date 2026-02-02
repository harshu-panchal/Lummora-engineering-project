import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, ArrowRight } from 'lucide-react';
import { companyData as staticCompanyData, services as staticServices } from '../../data/content';
import axios from 'axios';
import { API_BASE_URL } from '../../api';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [companyData, setCompanyData] = useState(staticCompanyData);
    const [services, setServices] = useState(staticServices);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const compRes = await axios.get(`${API_BASE_URL}/api/content/companyData`);
                if (compRes.data && Object.keys(compRes.data).length > 0) {
                    // Normalize backend structure to match expected frontend structure if needed
                    const d = compRes.data;
                    setCompanyData({
                        ...staticCompanyData,
                        name: d.name || staticCompanyData.name,
                        description: d.description || staticCompanyData.description,
                        contact: {
                            ...staticCompanyData.contact,
                            phone: d.phone || staticCompanyData.contact.phone,
                            email: d.email || staticCompanyData.contact.email,
                            address: d.address || staticCompanyData.contact.address,
                        }
                    });
                }

                const servRes = await axios.get(`${API_BASE_URL}/api/content/services`);
                if (servRes.data && Array.isArray(servRes.data)) {
                    setServices(servRes.data);
                }
            } catch (err) {
                console.error("Footer data fetch failed, using defaults", err);
            }
        };
        fetchData();
    }, []);

    return (
        <footer className="bg-lummora-900 text-white pt-20 pb-10">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div className="flex flex-col">
                            <div className="bg-white p-2 rounded-sm shadow-md inline-block w-fit">
                                <img src="/logo.svg" alt="Lummora Logo" className="h-16 w-auto object-contain" />
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {companyData.description}
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href={companyData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="bg-lummora-800 p-2 rounded hover:bg-lummora-700 transition-colors">
                                <Linkedin size={20} className="text-lummora-200" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-bold text-lg mb-6 text-lummora-100">Quick Links</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'About Us', path: '/about' },
                                { name: 'Our Team', path: '/team' },
                                { name: 'Portfolio', path: '/portfolio' },
                                { name: 'Success Stories', path: '/success-stories' },
                                { name: 'Contact', path: '/contact' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-gray-400 hover:text-lummora-300 transition-colors flex items-center gap-2 group">
                                        <span className="w-0 group-hover:w-2 h-0.5 bg-lummora-300 transition-all duration-300"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-heading font-bold text-lg mb-6 text-lummora-100">Our Services</h4>
                        <ul className="space-y-4">
                            {services.map((service, idx) => (
                                <li key={service.id || idx}>
                                    <Link to="/services" className="text-gray-400 hover:text-lummora-300 transition-colors text-sm">
                                        {service.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading font-bold text-lg mb-6 text-lummora-100">Contact Us</h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <MapPin className="text-lummora-400 mt-1 flex-shrink-0" size={20} />
                                <span className="text-gray-400 text-sm">{companyData.contact.address}</span>
                            </li>
                            <li className="flex gap-4">
                                <Phone className="text-lummora-400 flex-shrink-0" size={20} />
                                <span className="text-gray-400 text-sm">{companyData.contact.phone}</span>
                            </li>
                            <li className="flex gap-4">
                                <Mail className="text-lummora-400 flex-shrink-0" size={20} />
                                <span className="text-gray-400 text-sm">{companyData.contact.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-lummora-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; {currentYear} {companyData.name}. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
