import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Save, User, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';

const TeamManager = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/team');
            setTeam(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addMember = () => {
        setTeam([...team, { name: 'New Member', role: 'Position', bio: '', image: '', linkedin: '' }]);
    };

    const removeMember = async (id, index) => {
        if (id) {
            try {
                await axios.delete(`http://localhost:5000/api/team/${id}`);
            } catch (err) { console.error(err); }
        }
        const newTeam = [...team];
        newTeam.splice(index, 1);
        setTeam(newTeam);
    };

    const handleSave = async () => {
        setLoading(true);
        setStatus({ type: 'info', msg: 'Synchronizing Team...' });
        try {
            const res = await axios.post('http://localhost:5000/api/team/sync', team);
            setTeam(res.data);
            setStatus({ type: 'success', msg: 'Team Synchronized' });
            setTimeout(() => setStatus({ type: '', msg: '' }), 3000);
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', msg: 'Sync Failed' });
        }
        setLoading(false);
    };

    const updateField = (index, field, value) => {
        setTeam(prev => {
            const newTeam = [...prev];
            newTeam[index] = { ...newTeam[index], [field]: value };
            return newTeam;
        });
    };

    const handleImageUpload = async (index, file) => {
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await axios.post('http://localhost:5000/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log("Team Member Image Uploaded:", res.data.url);
            updateField(index, 'image', res.data.url);
            setStatus({ type: 'success', msg: 'Image Uploaded' });
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
                    <h1 className="text-3xl font-black uppercase tracking-tight">Personnel <span className="text-neon-blue">Registry</span></h1>
                    <p className="text-gray-500">Manage the corporate leadership and workforce data.</p>
                </div>
                <div className="flex gap-4">
                    <Button onClick={addMember} variant="secondary" className="gap-2">
                        <Plus size={18} /> Add Member
                    </Button>
                    <Button onClick={handleSave} disabled={loading} variant="primary" className="gap-2">
                        <Save size={18} /> Update Registry
                    </Button>
                </div>
            </header>

            {uploading && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-neon-blue font-bold uppercase tracking-widest animate-pulse">Processing Image...</p>
                </div>
            )}

            {status.msg && (
                <div className={`mb-6 p-4 border rounded flex items-center gap-3 ${status.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-500' : (status.type === 'error' ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-blue-500/10 border-blue-500/50 text-blue-500')}`}>
                    {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    {status.msg}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {team.map((m, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-white/10 p-6 rounded relative group">
                        <button
                            onClick={() => removeMember(m._id, i)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>

                        <div className="flex gap-6">
                            <div className="relative group/img w-32 h-40 bg-black border border-white/5 flex items-center justify-center overflow-hidden">
                                {m.image ? <img src={m.image} className="w-full h-full object-cover" /> : <User size={40} className="text-gray-800" />}
                                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-[10px] font-bold uppercase">
                                    Change
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={(e) => handleImageUpload(i, e.target.files[0])}
                                    />
                                </label>
                            </div>
                            <div className="flex-grow space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-neon-blue uppercase tracking-widest mb-1 block">Full Name</label>
                                    <input
                                        className="w-full bg-black/50 border border-white/10 p-2 text-sm outline-none focus:border-neon-blue"
                                        value={m.name}
                                        onChange={(e) => updateField(i, 'name', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-neon-blue uppercase tracking-widest mb-1 block">Role / Designation</label>
                                    <input
                                        className="w-full bg-black/50 border border-white/10 p-2 text-sm outline-none focus:border-neon-blue"
                                        value={m.role}
                                        onChange={(e) => updateField(i, 'role', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="text-[10px] font-bold text-neon-blue uppercase tracking-widest mb-1 block">Biography</label>
                            <textarea
                                className="w-full bg-black/50 border border-white/10 p-2 text-sm outline-none focus:border-neon-blue h-20 resize-none"
                                value={m.bio}
                                onChange={(e) => updateField(i, 'bio', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamManager;
