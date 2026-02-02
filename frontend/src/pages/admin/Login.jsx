import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../api';
import { Lock, Mail } from 'lucide-react';
import Button from '../../components/ui/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
            localStorage.setItem('adminToken', res.data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Invalid login credentials');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#0a0a0a] border border-white/10 p-8 rounded-lg shadow-2xl">
                <h1 className="text-3xl font-black text-white text-center mb-8 uppercase tracking-tight">
                    Admin <span className="text-neon-blue">Login</span>
                </h1>

                {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded mb-6 text-center text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded p-3 pl-10 text-white focus:border-neon-blue outline-none transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded p-3 pl-10 text-white focus:border-neon-blue outline-none transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" variant="primary" className="w-full justify-center py-4">
                        Access Control
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
