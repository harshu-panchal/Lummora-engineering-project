import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../api';
import { Save, AlertCircle, CheckCircle, Box } from 'lucide-react';
import Button from '../../components/ui/Button';
import * as staticContent from '../../data/content';

const ContentManager = () => {
    const [activeSection, setActiveSection] = useState('companyData');
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });

    const sections = [
        { id: 'companyData', label: 'Company Info' },
        { id: 'services', label: 'Services' },
        { id: 'whyChooseUs', label: 'Why Choose Us' },
        { id: 'portfolio', label: 'Portfolio' },
        { id: 'engineeringExcellence', label: 'Engineering Excellence' },
        { id: 'qualityStandards', label: 'Quality Standards' },
        { id: 'testimonials', label: 'Testimonials' },
        { id: 'engagementProcess', label: 'Engagement Process' }
    ];

    useEffect(() => {
        fetchData();
    }, [activeSection]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/api/content/${activeSection}`);
            let dbData = res.data;
            const staticSection = staticContent[activeSection];

            if (Array.isArray(staticSection)) {
                // For arrays (Services, Portfolio, etc): 
                // Merge database items with static defaults so images are never empty if available in code
                const merged = (staticSection || []).map((staticItem, idx) => {
                    const dbItem = (Array.isArray(dbData) && dbData[idx]) || {};
                    return { ...staticItem, ...dbItem };
                });
                setData(merged.length > 0 ? merged : (Array.isArray(dbData) ? dbData : []));
            } else {
                // For objects (Company Info):
                setData({ ...staticSection, ...dbData });
            }
        } catch (err) {
            console.error(err);
            setData(staticContent[activeSection] || {});
        }
        setLoading(false);
    };

    const handleSave = async (customData = null) => {
        // 1. Identify valid source data (exclude events/non-data objects)
        let sourceData = (customData && !customData.nativeEvent) ? customData : data;
        if (!sourceData || sourceData.nativeEvent) sourceData = data;

        // 2. Ultra-safe deep cleaning to prevent circularity (HTML nodes, React elements)
        const cleanForServer = (input, seen = new WeakSet()) => {
            if (input === null || typeof input !== 'object') return input;
            if (seen.has(input)) return undefined; // Prevent infinite loops

            // Skip problematic types
            if (typeof input === 'function') return undefined; // No icons/functions
            if (input.$$typeof) return undefined; // No React elements
            if (input instanceof Element || (input.constructor && input.constructor.name.includes('HTML'))) return undefined; // No DOM nodes

            seen.add(input);

            if (Array.isArray(input)) {
                return input.map(item => cleanForServer(item, seen)).filter(i => i !== undefined);
            }

            const clean = {};
            for (const key in input) {
                const val = cleanForServer(input[key], seen);
                if (val !== undefined) clean[key] = val;
            }
            return clean;
        };

        const cleanData = cleanForServer(sourceData);

        setLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/api/content/${activeSection}`, cleanData);
            setStatus({ type: 'success', msg: 'Deployed to Live Site' });
            setTimeout(() => setStatus({ type: '', msg: '' }), 3000);
        } catch (err) {
            console.error("Critical Save Failure:", err);
            setStatus({ type: 'error', msg: 'Sync Failed' });
        }
        setLoading(false);
    };

    const handleInputChange = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = async (field, file, isArray = false, index = null) => {
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const imageUrl = res.data.url;
            console.log("Upload Success:", imageUrl);

            setData(prev => {
                let nextState;
                if (isArray) {
                    nextState = [...prev];
                    nextState[index] = { ...nextState[index], [field]: imageUrl };
                } else {
                    nextState = { ...prev, [field]: imageUrl };
                }
                // Save immediately so it persists
                setTimeout(() => handleSave(nextState), 0);
                return nextState;
            });

            setStatus({ type: 'success', msg: 'Image Synced' });
        } catch (err) {
            console.error('Upload failed', err);
            setStatus({ type: 'error', msg: 'Upload Failed' });
        }
        setUploading(false);
        setTimeout(() => setStatus({ type: '', msg: '' }), 2000);
    };

    return (
        <div className="min-h-screen bg-black text-white p-10">
            <header className="mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black uppercase tracking-tight">Content <span className="text-neon-blue">Architecture</span></h1>
                    <p className="text-gray-500">Modify binary assets and textual information.</p>
                </div>
                <Button onClick={() => handleSave()} disabled={loading} variant="primary" className="gap-2">
                    <Save size={18} /> {loading ? 'Processing...' : 'Deploy Changes'}
                </Button>
            </header>

            {uploading && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-neon-blue font-bold uppercase tracking-widest animate-pulse">Syncing with Cloudinary...</p>
                </div>
            )}

            {status.msg && (
                <div className={`mb-6 p-4 border rounded flex items-center gap-3 ${status.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-500' : 'bg-red-500/10 border-red-500/50 text-red-500'}`}>
                    {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    {status.msg}
                </div>
            )}

            <div className="flex gap-10">
                {/* Tabs */}
                <div className="w-64 space-y-2">
                    {sections.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setActiveSection(s.id)}
                            className={`w-full text-left p-4 rounded transition-all font-bold uppercase tracking-tighter text-sm border ${activeSection === s.id ? 'bg-neon-blue/10 border-neon-blue text-neon-blue' : 'bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/30'
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Editor */}
                <div className="flex-grow bg-[#0a0a0a] border border-white/10 p-8 rounded">
                    {loading ? (
                        <div className="text-center py-20 text-gray-500">Scanning Database...</div>
                    ) : (
                        <div className="space-y-6">
                            {activeSection === 'companyData' && (
                                <>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Company Name</label>
                                            <input
                                                className="w-full bg-black border border-white/10 p-3 outline-none focus:border-neon-blue text-white"
                                                value={data.name || ''}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Tagline</label>
                                            <input
                                                className="w-full bg-black border border-white/10 p-3 outline-none focus:border-neon-blue text-white"
                                                value={data.tagline || ''}
                                                onChange={(e) => handleInputChange('tagline', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Description</label>
                                        <textarea
                                            rows="4"
                                            className="w-full bg-black border border-white/10 p-3 outline-none focus:border-neon-blue text-white"
                                            value={data.description || ''}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Phone</label>
                                            <input
                                                className="w-full bg-black border border-white/10 p-3 outline-none focus:border-neon-blue text-white"
                                                value={data.phone || ''}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Email</label>
                                            <input
                                                className="w-full bg-black border border-white/10 p-3 outline-none focus:border-neon-blue text-white"
                                                value={data.email || ''}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6 p-4 border border-white/5 bg-black/20">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Hero Image (Home)</label>
                                            <div className="flex gap-4 items-center">
                                                {data.heroImage && <img src={data.heroImage} alt="Hero" className="w-16 h-16 object-cover border border-white/10" />}
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleImageUpload('heroImage', e.target.files[0])}
                                                    className="text-[10px] text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:bg-neon-blue file:text-black cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">About Page Image</label>
                                            <div className="flex gap-4 items-center">
                                                {data.aboutImage && <img src={data.aboutImage} alt="About" className="w-16 h-16 object-cover border border-white/10" />}
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleImageUpload('aboutImage', e.target.files[0])}
                                                    className="text-[10px] text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:bg-neon-blue file:text-black cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Safety Image</label>
                                            <div className="flex gap-4 items-center">
                                                {data.safetyImage && <img src={data.safetyImage} alt="Safety" className="w-16 h-16 object-cover border border-white/10" />}
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleImageUpload('safetyImage', e.target.files[0])}
                                                    className="text-[10px] text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:bg-neon-blue file:text-black cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Success Stories Image</label>
                                            <div className="flex gap-4 items-center">
                                                {data.successImage && <img src={data.successImage} alt="Success" className="w-16 h-16 object-cover border border-white/10" />}
                                                <input
                                                    type="file"
                                                    onChange={(e) => handleImageUpload('successImage', e.target.files[0])}
                                                    className="text-[10px] text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:bg-neon-blue file:text-black cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {activeSection === 'services' && Array.isArray(data) && (
                                <div className="space-y-8">
                                    {data.map((service, idx) => (
                                        <div key={idx} className="p-6 border border-white/5 bg-black/40 rounded relative">
                                            <button
                                                onClick={() => {
                                                    const newData = [...data];
                                                    newData.splice(idx, 1);
                                                    setData(newData);
                                                }}
                                                className="absolute top-4 right-4 text-red-500/50 hover:text-red-500 transition-colors"
                                            >
                                                Remove
                                            </button>
                                            <div className="flex gap-6">
                                                <div className="w-32 h-32 bg-black border border-white/5 flex items-center justify-center overflow-hidden relative group">
                                                    {service.image ? <img src={service.image} className="w-full h-full object-cover" /> : <Box size={40} className="text-gray-800" />}
                                                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-[10px] font-bold uppercase">
                                                        Change
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(e) => handleImageUpload('image', e.target.files[0], true, idx)}
                                                        />
                                                    </label>
                                                </div>
                                                <div className="flex-grow grid gap-4">
                                                    <input
                                                        className="bg-transparent border-b border-white/10 p-2 text-xl font-bold outline-none focus:border-neon-blue"
                                                        value={service.title || ''}
                                                        placeholder="Service Title"
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setData(prev => {
                                                                const newData = [...prev];
                                                                newData[idx] = { ...newData[idx], title: val };
                                                                return newData;
                                                            });
                                                        }}
                                                    />
                                                    <textarea
                                                        className="bg-transparent border border-white/10 p-2 text-sm outline-none focus:border-neon-blue h-20"
                                                        value={service.description || service.desc || ''}
                                                        placeholder="Description"
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setData(prev => {
                                                                const newData = [...prev];
                                                                newData[idx] = { ...newData[idx], description: val };
                                                                return newData;
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        onClick={() => setData(prev => [...prev, { title: '', description: '', image: '' }])}
                                        variant="secondary"
                                        className="w-full"
                                    >
                                        + Add New Service
                                    </Button>
                                </div>
                            )}

                            {activeSection === 'portfolio' && Array.isArray(data) && (
                                <div className="space-y-8">
                                    {data.map((project, idx) => (
                                        <div key={idx} className="p-6 border border-white/5 bg-black/40 rounded relative">
                                            <button
                                                onClick={() => {
                                                    const newData = [...data];
                                                    newData.splice(idx, 1);
                                                    setData(newData);
                                                }}
                                                className="absolute top-4 right-4 text-red-500/50 hover:text-red-500 transition-colors"
                                            >
                                                Remove Project
                                            </button>
                                            <div className="flex gap-6">
                                                <div className="w-48 h-60 bg-black border border-white/5 flex items-center justify-center overflow-hidden relative group">
                                                    {project.image ? <img src={project.image} className="w-full h-full object-cover" /> : <Box size={40} className="text-gray-800" />}
                                                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-[10px] font-bold uppercase">
                                                        Change
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(e) => handleImageUpload('image', e.target.files[0], true, idx)}
                                                        />
                                                    </label>
                                                </div>
                                                <div className="flex-grow grid gap-4 grid-cols-2">
                                                    <div className="col-span-2">
                                                        <label className="text-[10px] text-gray-500 uppercase font-bold">Project Name</label>
                                                        <input
                                                            className="w-full bg-transparent border-b border-white/10 p-2 text-xl font-bold outline-none focus:border-neon-blue"
                                                            value={project.name || ''}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                setData(prev => {
                                                                    const newData = [...prev];
                                                                    newData[idx] = { ...newData[idx], name: val };
                                                                    return newData;
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] text-gray-500 uppercase font-bold">Category</label>
                                                        <input
                                                            className="w-full bg-transparent border-b border-white/10 p-2 text-sm outline-none focus:border-neon-blue"
                                                            value={project.category || ''}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                setData(prev => {
                                                                    const newData = [...prev];
                                                                    newData[idx] = { ...newData[idx], category: val };
                                                                    return newData;
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] text-gray-500 uppercase font-bold">Client</label>
                                                        <input
                                                            className="w-full bg-transparent border-b border-white/10 p-2 text-sm outline-none focus:border-neon-blue"
                                                            value={project.client || ''}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                setData(prev => {
                                                                    const newData = [...prev];
                                                                    newData[idx] = { ...newData[idx], client: val };
                                                                    return newData;
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        onClick={() => setData(prev => [...prev, { name: '', category: '', client: '', image: '' }])}
                                        variant="secondary"
                                        className="w-full"
                                    >
                                        + Add New Project
                                    </Button>
                                </div>
                            )}

                            {activeSection === 'whyChooseUs' && Array.isArray(data) && (
                                <div className="grid grid-cols-2 gap-6">
                                    {data.map((item, idx) => (
                                        <div key={idx} className="p-4 border border-white/10 bg-black/20 rounded">
                                            <input
                                                className="w-full bg-transparent font-bold mb-2 outline-none border-b border-transparent focus:border-neon-blue"
                                                value={item.title || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setData(prev => {
                                                        const newData = [...prev];
                                                        newData[idx] = { ...newData[idx], title: val };
                                                        return newData;
                                                    });
                                                }}
                                            />
                                            <textarea
                                                className="w-full bg-transparent text-sm text-gray-500 outline-none h-16"
                                                value={item.description || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setData(prev => {
                                                        const newData = [...prev];
                                                        newData[idx] = { ...newData[idx], description: val };
                                                        return newData;
                                                    });
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeSection === 'engineeringExcellence' && Array.isArray(data) && (
                                <div className="space-y-8">
                                    {data.map((item, idx) => (
                                        <div key={idx} className="p-6 border border-white/5 bg-black/40 rounded relative">
                                            <button
                                                onClick={() => {
                                                    const newData = [...data];
                                                    newData.splice(idx, 1);
                                                    setData(newData);
                                                }}
                                                className="absolute top-4 right-4 text-red-500/50 hover:text-red-500 transition-colors"
                                            >
                                                Remove Item
                                            </button>
                                            <div className="flex gap-6">
                                                <div className="w-48 h-32 bg-black border border-white/5 flex items-center justify-center overflow-hidden relative group">
                                                    {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <Box size={40} className="text-gray-800" />}
                                                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-[10px] font-bold uppercase">
                                                        Change
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(e) => handleImageUpload('image', e.target.files[0], true, idx)}
                                                        />
                                                    </label>
                                                </div>
                                                <div className="flex-grow grid gap-4">
                                                    <input
                                                        className="bg-transparent border-b border-white/10 p-2 text-xl font-bold outline-none focus:border-neon-blue"
                                                        value={item.title || ''}
                                                        placeholder="Title"
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setData(prev => {
                                                                const newData = [...prev];
                                                                newData[idx] = { ...newData[idx], title: val };
                                                                return newData;
                                                            });
                                                        }}
                                                    />
                                                    <textarea
                                                        className="bg-transparent border border-white/10 p-2 text-sm outline-none focus:border-neon-blue h-20"
                                                        value={item.description || ''}
                                                        placeholder="Description"
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            setData(prev => {
                                                                const newData = [...prev];
                                                                newData[idx] = { ...newData[idx], description: val };
                                                                return newData;
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        onClick={() => setData(prev => [...prev, { title: '', description: '', image: '' }])}
                                        variant="secondary"
                                        className="w-full"
                                    >
                                        + Add New Excellence Item
                                    </Button>
                                </div>
                            )}

                            {activeSection === 'qualityStandards' && Array.isArray(data) && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {data.map((item, idx) => (
                                        <div key={idx} className="p-4 border border-white/10 bg-black/20 rounded">
                                            <input
                                                className="w-full bg-transparent font-bold mb-1 outline-none text-neon-blue uppercase text-xs"
                                                value={item.code || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setData(prev => {
                                                        const newData = [...prev];
                                                        newData[idx] = { ...newData[idx], code: val };
                                                        return newData;
                                                    });
                                                }}
                                                placeholder="ISO Code"
                                            />
                                            <input
                                                className="w-full bg-transparent font-bold mb-2 outline-none border-b border-transparent focus:border-neon-blue"
                                                value={item.title || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setData(prev => {
                                                        const newData = [...prev];
                                                        newData[idx] = { ...newData[idx], title: val };
                                                        return newData;
                                                    });
                                                }}
                                                placeholder="Standard Title"
                                            />
                                            <textarea
                                                className="w-full bg-transparent text-sm text-gray-500 outline-none h-16"
                                                value={item.description || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setData(prev => {
                                                        const newData = [...prev];
                                                        newData[idx] = { ...newData[idx], description: val };
                                                        return newData;
                                                    });
                                                }}
                                                placeholder="Description"
                                            />
                                        </div>
                                    ))}
                                    <Button onClick={() => setData([...data, { code: '', title: '', description: '' }])} variant="secondary" className="w-full md:col-span-2">
                                        + Add Quality Standard
                                    </Button>
                                </div>
                            )}

                            {activeSection === 'testimonials' && Array.isArray(data) && (
                                <div className="space-y-6">
                                    {data.map((item, idx) => (
                                        <div key={idx} className="p-6 border border-white/10 bg-black/20 rounded relative">
                                            <button
                                                onClick={() => {
                                                    setData(prev => prev.filter((_, i) => i !== idx));
                                                }}
                                                className="absolute top-4 right-4 text-red-500/50 hover:text-red-500 transition-colors text-xs font-bold"
                                            >
                                                REMOVE
                                            </button>
                                            <textarea
                                                className="w-full bg-transparent text-xl font-light italic text-white mb-4 outline-none focus:border-neon-blue border-b border-white/5"
                                                value={item.quote || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setData(prev => {
                                                        const newData = [...prev];
                                                        newData[idx] = { ...newData[idx], quote: val };
                                                        return newData;
                                                    });
                                                }}
                                                placeholder="Testimonial Quote"
                                            />
                                            <div className="grid grid-cols-3 gap-4">
                                                <input
                                                    className="w-full bg-transparent border-b border-white/10 p-2 text-sm outline-none focus:border-neon-blue text-white"
                                                    value={item.author || ''}
                                                    placeholder="Author Name"
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        setData(prev => {
                                                            const newData = [...prev];
                                                            newData[idx] = { ...newData[idx], author: val };
                                                            return newData;
                                                        });
                                                    }}
                                                />
                                                <input
                                                    className="w-full bg-transparent border-b border-white/10 p-2 text-sm outline-none focus:border-neon-blue text-gray-500"
                                                    value={item.position || ''}
                                                    placeholder="Position"
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        setData(prev => {
                                                            const newData = [...prev];
                                                            newData[idx] = { ...newData[idx], position: val };
                                                            return newData;
                                                        });
                                                    }}
                                                />
                                                <input
                                                    className="w-full bg-transparent border-b border-white/10 p-2 text-sm outline-none focus:border-neon-blue text-neon-blue"
                                                    value={item.project || ''}
                                                    placeholder="Project Name"
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        setData(prev => {
                                                            const newData = [...prev];
                                                            newData[idx] = { ...newData[idx], project: val };
                                                            return newData;
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <Button onClick={() => setData([...data, { quote: '', author: '', position: '', project: '' }])} variant="secondary" className="w-full">
                                        + Add Testimonial
                                    </Button>
                                </div>
                            )}

                            {activeSection === 'engagementProcess' && Array.isArray(data) && (
                                <div className="space-y-4">
                                    {data.sort((a, b) => a.step - b.step).map((item, idx) => (
                                        <div key={idx} className="flex gap-6 items-start p-4 border border-white/10 bg-black/20 rounded">
                                            <div className="w-12 h-12 rounded bg-neon-blue/10 border border-neon-blue/30 flex items-center justify-center text-neon-blue font-black text-xl">
                                                {item.step || idx + 1}
                                            </div>
                                            <div className="flex-grow space-y-2">
                                                <input
                                                    className="w-full bg-transparent font-bold text-lg outline-none border-b border-transparent focus:border-neon-blue"
                                                    value={item.title || ''}
                                                    placeholder="Step Title"
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        setData(prev => {
                                                            const newData = [...prev];
                                                            newData[idx] = { ...newData[idx], title: val };
                                                            return newData;
                                                        });
                                                    }}
                                                />
                                                <textarea
                                                    className="w-full bg-transparent text-sm text-gray-500 outline-none h-12"
                                                    value={item.description || ''}
                                                    placeholder="Description"
                                                    onChange={(e) => {
                                                        const val = e.target.value;
                                                        setData(prev => {
                                                            const newData = [...prev];
                                                            newData[idx] = { ...newData[idx], description: val };
                                                            return newData;
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <Button onClick={() => setData([...data, { step: data.length + 1, title: '', description: '' }])} variant="secondary" className="w-full">
                                        + Add Process Step
                                    </Button>
                                </div>
                            )}

                            {['services', 'whyChooseUs', 'companyData', 'portfolio', 'engineeringExcellence', 'qualityStandards', 'testimonials', 'engagementProcess'].indexOf(activeSection) === -1 && (
                                <div className="text-center py-20 text-gray-500">
                                    <p className="mb-4">Visual List Editor for {activeSection} is ready for implementation.</p>
                                    <pre className="text-left bg-black p-4 text-xs overflow-auto max-h-60 border border-white/5">
                                        {JSON.stringify(data, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContentManager;
